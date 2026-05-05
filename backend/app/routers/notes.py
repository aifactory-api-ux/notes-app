from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import create_note, get_note, get_notes, delete_note
from app.schemas import Note, NoteCreate

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("", response_model=Note, status_code=status.HTTP_200_OK)
def create_note_endpoint(note: NoteCreate, db: Session = Depends(get_db)):
    return create_note(db, note)


@router.get("", response_model=List[Note], status_code=status.HTTP_200_OK)
def get_notes_endpoint(db: Session = Depends(get_db)):
    return get_notes(db)


@router.get("/{note_id}", response_model=Note, status_code=status.HTTP_200_OK)
def get_note_endpoint(note_id: int, db: Session = Depends(get_db)):
    note = get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note_endpoint(note_id: int, db: Session = Depends(get_db)):
    delete_note(db, note_id)
    return None