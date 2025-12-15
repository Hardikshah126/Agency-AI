from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.profile import BrandProfileIn, BrandProfileOut
from app.db.session import get_db
from app.deps import get_current_user
from app.models.brand_profile import BrandProfile

router = APIRouter()

@router.get("/", response_model=List[BrandProfileOut])
def list_profiles(db: Session = Depends(get_db), user=Depends(get_current_user)):
    items = db.query(BrandProfile).filter(BrandProfile.user_id == user.id).all()
    return items

@router.post("/", response_model=BrandProfileOut, status_code=status.HTTP_201_CREATED)
def create_profile(inp: BrandProfileIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = BrandProfile(
        user_id=user.id,
        display_name=inp.display_name or "",
        keywords=inp.keywords or [],
        banned_phrases=inp.banned_phrases or [],
        tone_weights=inp.tone_weights or {},
        examples=inp.examples or []
    )
    db.add(p)
    db.commit()
    db.refresh(p)
    return p

@router.get("/{profile_id}", response_model=BrandProfileOut)
def get_profile(profile_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = db.query(BrandProfile).filter(BrandProfile.id == profile_id, BrandProfile.user_id == user.id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Profile not found")
    return p
