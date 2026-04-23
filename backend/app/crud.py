from sqlalchemy.orm import Session
from app.models import Note
from app.schemas import NoteCreate


def get_notes(db: Session) -> list[Note]:
    return db.query(Note).order_by(Note.created_at.desc()).all()


def get_note(db: Session, note_id: int) -> Note | None:
    return db.query(Note).filter(Note.id == note_id).first()


def create_note(db: Session, note_in: NoteCreate) -> Note:
    note = Note(title=note_in.title, content=note_in.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


def delete_note(db: Session, note_id: int) -> bool:
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        return False
    db.delete(note)
    db.commit()
    return True
