import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Note as NoteModel
from app.crud import create_note, get_note, get_notes, delete_note
from app.schemas import NoteCreate
from app.database import Base
from datetime import datetime

engine = create_engine("sqlite:///:memory:")
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)


def test_create_note_with_title_and_content_returns_note():
    db = SessionLocal()
    note_data = NoteCreate(title="Test Note", content="Test Content")
    note = create_note(db, note_data)
    assert note.id is not None
    assert note.title == "Test Note"
    assert note.content == "Test Content"
    assert note.created_at is not None
    db.close()


def test_create_note_with_missing_title_raises_validation_error():
    from pydantic import ValidationError
    db = SessionLocal()
    with pytest.raises(ValidationError):
        NoteCreate(title="")
    db.close()


def test_get_note_by_id_returns_correct_note():
    db = SessionLocal()
    note_data = NoteCreate(title="Test Note", content="Test Content")
    created = create_note(db, note_data)
    note = get_note(db, created.id)
    assert note is not None
    assert note.id == created.id
    assert note.title == "Test Note"
    db.close()


def test_get_note_by_nonexistent_id_returns_none():
    db = SessionLocal()
    note = get_note(db, 9999)
    assert note is None
    db.close()


def test_delete_note_removes_note_from_db():
    db = SessionLocal()
    note_data = NoteCreate(title="To Delete", content="Content")
    created = create_note(db, note_data)
    result = delete_note(db, created.id)
    assert result is True
    assert get_note(db, created.id) is None
    db.close()


def test_delete_note_with_nonexistent_id_does_nothing():
    db = SessionLocal()
    result = delete_note(db, 9999)
    assert result is False
    db.close()


def test_get_notes_returns_notes_ordered_by_created_at_desc():
    db = SessionLocal()
    count_before = db.query(NoteModel).count()
    note1 = create_note(db, NoteCreate(title="First Note"))
    note2 = create_note(db, NoteCreate(title="Second Note"))
    notes = get_notes(db)
    assert len(notes) == count_before + 2
    note_ids = [n.id for n in notes]
    assert note1.id in note_ids
    assert note2.id in note_ids
    db.close()