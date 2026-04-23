from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import Note, NoteCreate
from app.crud import get_notes, get_note, create_note, delete_note

router = APIRouter()


@router.post("", response_model=Note, status_code=status.HTTP_201_CREATED)
def create_note_endpoint(note_in: NoteCreate, db: Session = Depends(get_db)):
    return create_note(db, note_in)


@router.get("", response_model=list[Note])
def list_notes_endpoint(db: Session = Depends(get_db)):
    return get_notes(db)


@router.get("/{note_id}", response_model=Note)
def get_note_endpoint(note_id: int, db: Session = Depends(get_db)):
    note = get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note


@router.delete("/{note_id}")
def delete_note_endpoint(note_id: int, db: Session = Depends(get_db)):
    success = delete_note(db, note_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return {"detail": "Note deleted"}
