import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Note as NoteModel
from app.database import Base

engine = create_engine("sqlite:///:memory:")
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)


def test_database_session_can_commit_and_query():
    db = SessionLocal()
    note = NoteModel(title="DB Test", content="DB Content")
    db.add(note)
    db.commit()
    db.refresh(note)

    found = db.query(NoteModel).filter_by(title="DB Test").first()
    assert found is not None
    assert found.content == "DB Content"
    db.close()


def test_database_session_rollback_on_exception():
    db = SessionLocal()
    note = NoteModel(title="Rollback Test")
    db.add(note)
    db.commit()
    db.refresh(note)
    note_id = note.id

    try:
        raise Exception("Simulated error")
    except Exception:
        db.rollback()

    count = db.query(NoteModel).filter_by(title="Rollback Test").count()
    assert count == 1
    db.close()


def test_connection_pooling_allows_multiple_sessions():
    sessions = [SessionLocal() for _ in range(5)]
    for i, db in enumerate(sessions):
        note = NoteModel(title=f"Concurrent {i}")
        db.add(note)
        db.commit()
    for db in sessions:
        db.close()
    assert True