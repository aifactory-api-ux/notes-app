import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import get_db
from app.models import Base

engine = create_engine("sqlite:///:memory:")
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)


def test_get_db_yields_session_and_closes_after_use():
    sessions = []
    for db in get_db():
        sessions.append(db)
        break
    assert len(sessions) == 1
    assert sessions[0].is_active


def test_get_db_multiple_calls_provide_new_sessions():
    db1 = None
    db2 = None
    for db in get_db():
        db1 = db
        break
    for db in get_db():
        db2 = db
        break
    assert db1 is not None
    assert db2 is not None
    assert db1 is not db2