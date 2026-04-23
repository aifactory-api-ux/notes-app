from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class NoteBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[str] = None


class NoteCreate(NoteBase):
    pass


class Note(NoteBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
