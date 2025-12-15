import asyncio
import os
import re
from app.core.config import settings

# Safe Gemini import
try:
    import google.generativeai as genai
except Exception:
    genai = None


# ---------------- CONFIG ----------------

MODEL_NAME = "gemini-2.5-flash"

if genai:
    genai.configure(api_key=settings.GEMINI_API_KEY)


# ---------------- DURATION HELPERS ----------------

def extract_reel_duration(text: str) -> int:
    """
    Extract reel duration from user text.
    Examples:
    - "30 sec reel about consistency"
    - "15s reel idea"
    - "45 seconds reel"

    Defaults to 30 seconds.
    """
    match = re.search(r'(\d+)\s*(sec|secs|second|seconds|s)', text.lower())
    if match:
        duration = int(match.group(1))
        return max(10, min(duration, 90))  # clamp 10–90 sec
    return 30


def clean_rough_idea(text: str) -> str:
    """
    Remove duration mentions from the idea text.
    """
    return re.sub(
        r'\d+\s*(sec|secs|second|seconds|s)',
        '',
        text,
        flags=re.IGNORECASE
    ).strip()


# ---------------- PROMPT BUILDER ----------------

def build_prompt(
    rough_idea: str,
    platform: str,
    emotion: str,
    brand_keywords: str | None,
    brand_tone: str | None,
    brand_sample: str | None,
    reel_duration: int,
) -> str:

    system_prompt = """
You are a senior social media strategist and copywriter.

You expand rough, unstructured human thoughts into
platform-ready content that sounds natural and human.

Rules:
- Do not explain anything
- Do not mention AI
- Always expand the idea
- Avoid clichés
- Output only the final content
"""

    platform_rules = {
        "linkedin": """
LinkedIn rules:
- Strong scroll-stopping hook
- Short lines (7–8 words max per line)
- Mix lines and bullet points
- Include 3–5 relevant professional hashtags at the end
- No hashtags in the body text
- Personal, thoughtful tone
- Soft CTA at the end
""",
        "x": """
X (Twitter) rules:
- Punchy and opinionated
- Short, impactful lines
- Minimal wording
- No hashtags
- No emojis
""",
        "instagram_reel": f"""
Instagram Reel rules:

- Target duration: {reel_duration} seconds
- Adjust script length and pacing to match duration
- Speaking pace: ~2.5–3 words per second
- Strong hook in the first 3 seconds
- Natural, spoken, conversational style
- Short, easy-to-say sentences
- Use line breaks for pauses
- Clear flow: Hook → Insight → Takeaway → Soft close
- Do not overcomplicate the script
- Avoid heavy shooting or editing directions
- Minimal guidance only if absolutely necessary
- Focus on what to say, not how to shoot
"""
    }

    emotion_map = {
        "calm": "Calm, grounded, thoughtful emotion",
        "medium": "Balanced, confident, natural emotion",
        "deep": "Emotionally deep, reflective, impactful tone",
    }

    brand_block = ""
    if brand_keywords or brand_tone or brand_sample:
        brand_block = f"""
Brand Voice Guidelines:
- Keywords: {brand_keywords or "Not specified"}
- Tone preference: {brand_tone or "Not specified"}

Sample writing (match this style closely):
\"\"\"
{brand_sample or "No sample provided"}
\"\"\"
"""

    return f"""
{system_prompt}

Rough idea:
\"{rough_idea}\"

Emotional tone:
{emotion_map.get(emotion, emotion)}

{brand_block}

{platform_rules.get(platform, "")}

Generate the final content.
"""


# ---------------- CORE GENERATION ----------------

def _sync_generate(prompt: str) -> str:
    if not genai:
        return "AI service unavailable."

    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as exc:
        return f"[GENERATION ERROR] {str(exc)}"


# ---------------- PUBLIC API ----------------

async def generate_content(
    content: str,
    platform: str,
    intensity: str,
    brand_keywords: str | None,
    brand_tone: str | None,
    brand_sample: str | None,
) -> str:

    reel_duration = extract_reel_duration(content)
    cleaned_content = clean_rough_idea(content)

    prompt = build_prompt(
        rough_idea=cleaned_content,
        platform=platform,
        emotion=intensity,
        brand_keywords=brand_keywords,
        brand_tone=brand_tone,
        brand_sample=brand_sample,
        reel_duration=reel_duration,
    )

    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, _sync_generate, prompt)
