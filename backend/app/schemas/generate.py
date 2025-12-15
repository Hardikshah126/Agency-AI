from pydantic import BaseModel
from typing import List, Literal, Optional

class GenerateInput(BaseModel):
    input_type: Literal["text", "voice", "file"] = "text"
    content: str

    platforms: List[str]


    intensity: Literal["calm", "medium", "deep"] = "medium"
    variants: int = 1

    # 🔥 Brand Voice (FROM FRONTEND)
    brand_keywords: Optional[str] = None
    brand_tone: Optional[str] = None
    brand_sample: Optional[str] = None


class GeneratedOutput(BaseModel):
    platform: str
    text: str
