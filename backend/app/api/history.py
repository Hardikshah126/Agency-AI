from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.deps import get_current_user
from app.db.session import get_db
from app.models.post_history import PostHistory
from app.schemas.post import PostOut

router = APIRouter()

@router.get("/", response_model=list[PostOut])
def get_history(db: Session = Depends(get_db), user=Depends(get_current_user)):
    items = db.query(PostHistory).filter(PostHistory.user_id==user.id).order_by(PostHistory.created_at.desc()).all()
    return items
