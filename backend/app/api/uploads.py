from fastapi import APIRouter, UploadFile, File, Depends
from app.deps import get_current_user
from app.utils.file_utils import save_upload_file
from app.services.transcribe import transcribe_audio

router = APIRouter()

@router.post("/upload-sample")
async def upload_sample(
    file: UploadFile = File(...),
    user=Depends(get_current_user)
):
    # Save file
    path = save_upload_file(file, user_id=str(user.id))

    # Transcribe mock (replace with Whisper/Gemini speech later)
    transcript = transcribe_audio(path)

    return {
        "path": path,
        "transcript": transcript
    }
