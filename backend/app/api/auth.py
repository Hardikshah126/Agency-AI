from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.db.session import SessionLocal
from app.models.user import User



router = APIRouter()


# ---------- SCHEMAS ----------

class SignupRequest(BaseModel):
    email: str
    password: str
    name: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ---------- HELPERS ----------

def get_user_by_email(db, email: str):
    return db.query(User).filter(User.email == email).first()


# ---------- ROUTES ----------

@router.post("/signup")
def signup(data: SignupRequest):
    db = SessionLocal()

    existing = get_user_by_email(db, data.email)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    user = User(
        email=data.email,
        name=data.name,
        hashed_password=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully"}


@router.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    user = get_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }
