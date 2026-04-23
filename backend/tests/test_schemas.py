from app.schemas import NoteBase, NoteCreate, Note
from datetime import datetime


def test_note_base_schema():
    schema = NoteBase(title="Test", content="Content")
    assert schema.title == "Test"
    assert schema.content == "Content"


def test_note_create_schema():
    schema = NoteCreate(title="New Note")
    assert schema.title == "New Note"


def test_note_schema_with_content():
    schema = NoteCreate(title="Note", content="Some text")
    assert schema.content == "Some text"


def test_note_schema_orm_mode():
    schema = Note(id=1, title="Test", content="Content", created_at=datetime.now())
    data = schema.dict()
    assert data['id'] == 1
    assert data['title'] == "Test"