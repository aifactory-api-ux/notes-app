from app.models import Note


def test_note_model_fields():
    note = Note(title="Test Note", content="Test content")
    assert note.title == "Test Note"
    assert note.content == "Test content"
    assert note.id is None


def test_note_repr():
    note = Note(title="Test", content="Content")
    assert "Test" in str(note)