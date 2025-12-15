from sqlalchemy import Column, Integer, String, JSON
from app.db.base import Base

class EmbeddingDoc(Base):
    __tablename__ = "embedding_docs"
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String, unique=True, nullable=False)
    text = Column(JSON)  # store text/version
    metadata = Column(JSON, default={})
