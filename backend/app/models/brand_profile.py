from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class BrandProfile(Base):
    __tablename__ = "brand_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    display_name = Column(String, default="")
    keywords = Column(JSON, default=[])
    banned_phrases = Column(JSON, default=[])
    tone_weights = Column(JSON, default={})
    examples = Column(JSON, default=[])

    owner = relationship("User", back_populates="profiles")
