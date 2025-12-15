# app/db/session.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings

# DATABASE URL (example: sqlite or postgres)
DATABASE_URL = settings.DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
    if DATABASE_URL.startswith("sqlite")
    else {},
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def get_db() -> Session:
    """
    FastAPI dependency that provides a DB session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
