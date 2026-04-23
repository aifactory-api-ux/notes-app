from app.crud import get_notes, get_note, create_note, delete_note
from app.schemas import NoteCreate


def test_create_note(db_session):
    note_in = NoteCreate(title="Test Note", content="Test content")
    note = create_note(db_session, note_in)
    assert note.id is not None
    assert note.title == "Test Note"
    assert note.content == "Test content"


def test_create_note_without_content(db_session):
    note_in = NoteCreate(title="Minimal Note")
    note = create_note(db_session, note_in)
    assert note.title == "Minimal Note"
    assert note.content is None


def test_get_notes_empty(db_session):
    notes = get_notes(db_session)
    assert len(notes) == 0


def test_get_notes(db_session):
    note_in = NoteCreate(title="Note 1", content="Content 1")
    create_note(db_session, note_in)
    note_in2 = NoteCreate(title="Note 2", content="Content 2")
    create_note(db_session, note_in2)
    notes = get_notes(db_session)
    assert len(notes) == 2


def test_get_notes_ordered_by_created_at_desc(db_session):
    note_in = NoteCreate(title="First")
    create_note(db_session, note_in)
    note_in2 = NoteCreate(title="Second")
    create_note(db_session, note_in2)
    notes = get_notes(db_session)
    assert notes[0].title == "Second"
    assert notes[1].title == "First"


def test_get_note(db_session):
    note_in = NoteCreate(title="Test", content="Content")
    created = create_note(db_session, note_in)
    note = get_note(db_session, created.id)
    assert note is not None
    assert note.title == "Test"


def test_get_note_not_found(db_session):
    note = get_note(db_session, 9999)
    assert note is None


def test_delete_note(db_session):
    note_in = NoteCreate(title="To Delete", content="Content")
    created = create_note(db_session, note_in)
    result = delete_note(db_session, created.id)
    assert result is True
    assert get_note(db_session, created.id) is None


def test_delete_note_not_found(db_session):
    result = delete_note(db_session, 9999)
    assert result is False