from pydantic import BaseModel
from typing import List, Dict, Any

class BrandProfileIn(BaseModel):
    display_name: str | None = None
    keywords: List[str] | None = []
    banned_phrases: List[str] | None = []
    tone_weights: Dict[str, float] | None = {}
    examples: List[str] | None = []

class BrandProfileOut(BrandProfileIn):
    id: int

    class Config:
        orm_mode = True
