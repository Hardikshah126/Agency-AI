# app/services/transcribe.py
import os
from typing import Optional

def transcribe_audio(path: str, model: Optional[str] = None) -> str:
    """
    Minimal, safe transcription function for local dev.
    - By default returns a mock transcription message.
    - Replace body with Whisper / Google STT / Gemini Speech when ready.

    Args:
        path: path to the uploaded audio file
        model: optional model identifier (ignored in mock mode)

    Returns:
        transcript string
    """
    # Basic safety check
    if not path or not os.path.exists(path):
        return "Error: file not found."

    # Simple mock behaviour: return filename + placeholder text
    filename = os.path.basename(path)
    return f"Transcribed (mock) from file: {filename}"
