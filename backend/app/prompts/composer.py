def build_composer_prompt(
    rough_idea: str,
    platform: str,
    emotion: str,
    brand_voice: str,
) -> str:
    system = """
You are a senior social media strategist and copywriter.

Your task is to EXPAND a rough, unstructured human draft into a complete,
platform-specific post or script.

Rules:
- Do NOT explain anything
- Do NOT mention AI
- Do NOT repeat the input text
- Always EXPAND the idea, even if it is very short
- Sound like a real human wrote it
- Avoid generic AI clichés
- Output ONLY the final content
"""

    platform_rules = {
        "linkedin": """
Platform: LinkedIn
- Strong hook in first 2 lines
- Short readable paragraphs
- Insightful, reflective tone
- Personal and authentic
- Soft CTA at the end (optional)
""",
        "x": """
Platform: X (Twitter)
- Punchy, opinionated
- Short impactful lines
- Clear stance or insight
- No fluff
""",
        "reel": """
Platform: Instagram Reel Script
- Hook in first 3 seconds
- Conversational spoken style
- Clear flow: Hook → Insight → Close
- End with a natural CTA
"""
    }

    emotion_map = {
        "calm": "Calm, thoughtful, grounded emotion",
        "neutral": "Balanced, confident, natural emotion",
        "deep": "Emotionally deep, reflective, impactful tone",
    }

    user = f"""
Rough draft:
"{rough_idea}"

Emotion:
{emotion_map.get(emotion, emotion)}

Brand voice:
{brand_voice}

{platform_rules.get(platform, "")}

Task:
Generate the final {platform.upper()} content.
"""

    return system + "\n" + user
