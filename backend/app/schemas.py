from pydantic import BaseModel, ConfigDict, field_validator
from typing import Optional
from datetime import datetime


class NoteBase(BaseModel):
    title: str
    content: Optional[str] = None

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Title cannot be empty')
        return v


class NoteCreate(NoteBase):
    pass


class Note(NoteBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)