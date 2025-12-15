from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str | None = None

    # pydantic v2: use from_attributes instead of orm_mode
    model_config = {"from_attributes": True}

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserRead(BaseModel):
    id: int
    email: EmailStr
    name: str | None

    model_config = {"from_attributes": True}
