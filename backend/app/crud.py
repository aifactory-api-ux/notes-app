from sqlalchemy.orm import Session
from app.models import Note as NoteModel
from app.schemas import NoteCreate


def create_note(db: Session, note: NoteCreate) -> NoteModel:
    db_note = NoteModel(**note.model_dump())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


def get_note(db: Session, note_id: int) -> NoteModel | None:
    return db.query(NoteModel).filter(NoteModel.id == note_id).first()


def get_notes(db: Session) -> list[NoteModel]:
    return db.query(NoteModel).order_by(NoteModel.created_at.desc()).all()


def delete_note(db: Session, note_id: int) -> bool:
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()
    if note:
        db.delete(note)
        db.commit()
        return True
    return False