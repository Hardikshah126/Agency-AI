from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.generate import router as generate_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router, prefix="/api")

@app.get("/")
def root():
    return {"ok": True}
