import pytest
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Note as NoteModel
from app.database import Base

engine = create_engine("sqlite:///:memory:")
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)


def test_note_model_creates_valid_instance():
    db = SessionLocal()
    note = NoteModel(title="Test Note", content="This is a test note.")
    db.add(note)
    db.commit()
    db.refresh(note)

    assert note.title == "Test Note"
    assert note.content == "This is a test note."
    assert note.id is not None
    assert note.created_at is not None
    db.close()


def test_note_model_requires_title_field():
    db = SessionLocal()
    note = NoteModel(content="Missing title")
    db.add(note)
    with pytest.raises(Exception):
        db.commit()
    db.rollback()
    db.close()


def test_note_model_content_nullable():
    db = SessionLocal()
    note = NoteModel(title="No Content Note", content=None)
    db.add(note)
    db.commit()
    db.refresh(note)

    assert note.title == "No Content Note"
    assert note.content is None
    db.close()


def test_note_model_created_at_auto_now():
    db = SessionLocal()
    note = NoteModel(title="Timestamp Test")
    db.add(note)
    db.commit()
    db.refresh(note)

    assert note.created_at is not None
    assert isinstance(note.created_at, datetime)
    db.close()