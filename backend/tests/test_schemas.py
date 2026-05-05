import pytest
from pydantic import ValidationError
from app.schemas import NoteBase, NoteCreate, Note


def test_note_base_schema_valid():
    data = {"title": "Schema Test", "content": "Some content"}
    schema = NoteBase(**data)
    assert schema.title == "Schema Test"
    assert schema.content == "Some content"


def test_note_base_schema_missing_title():
    data = {"content": "No title"}
    with pytest.raises(ValidationError) as exc_info:
        NoteBase(**data)
    errors = exc_info.value.errors()
    assert any("title" in e["loc"] for e in errors)


def test_note_create_schema_inherits_note_base():
    data = {"title": "Create Schema", "content": "Create content"}
    schema = NoteCreate(**data)
    assert schema.title == "Create Schema"
    assert schema.content == "Create content"


def test_note_schema_serializes_model_instance():
    from datetime import datetime
    data = {
        "id": 1,
        "title": "Serialized Note",
        "content": "Serialized content",
        "created_at": datetime(2024, 6, 1, 12, 0, 0)
    }
    schema = Note(**data)
    assert schema.id == 1
    assert schema.title == "Serialized Note"
    assert schema.content == "Serialized content"
    assert schema.created_at == datetime(2024, 6, 1, 12, 0, 0)


def test_note_schema_content_optional():
    from datetime import datetime
    data = {"id": 2, "title": "No Content", "created_at": datetime(2024, 6, 1, 12, 0, 0)}
    schema = Note(**data)
    assert schema.id == 2
    assert schema.title == "No Content"
    assert schema.content is None
    assert schema.created_at == datetime(2024, 6, 1, 12, 0, 0)