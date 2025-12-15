import os
from fastapi import UploadFile
from pathlib import Path

UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def save_upload_file(file: UploadFile, user_id: str) -> str:
    dest_dir = UPLOAD_DIR / user_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_path = dest_dir / file.filename
    with open(dest_path, "wb") as f:
        f.write(file.file.read())
    return str(dest_path)
