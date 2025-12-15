# app/schemas/post.py
from pydantic import BaseModel
from datetime import datetime

class PostOut(BaseModel):
    id: int
    platform: str
    text: str
    created_at: datetime

    # pydantic v2: use model_config for ORM/attribute support
    model_config = {
        "from_attributes": True
    }
