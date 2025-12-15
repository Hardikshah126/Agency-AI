from fastapi import APIRouter
from app.schemas.generate import GenerateInput, GeneratedOutput
from app.services.llm import generate_content

router = APIRouter()


def normalize_platform(raw: str) -> str:
    p = raw.lower().strip()

    if "linkedin" in p:
        return "linkedin"

    if p == "x" or "twitter" in p or "x" in p:
        return "x"

    if (
        "reel" in p
        or "reels" in p
        or "instagram" in p
    ):
        return "instagram_reel"

    return "linkedin"



@router.post("/generate", response_model=list[GeneratedOutput])
async def generate(req: GenerateInput):
    results = []

    for raw_platform in req.platforms:
        platform = normalize_platform(raw_platform)

        text = await generate_content(
            content=req.content,
            platform=platform,
            intensity=req.intensity,
            brand_keywords=req.brand_keywords,
            brand_tone=req.brand_tone,
            brand_sample=req.brand_sample,
        )

        results.append(
            GeneratedOutput(
                platform=platform,
                text=text
            )
        )

    return results
