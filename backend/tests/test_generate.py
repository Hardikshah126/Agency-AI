from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_generate_mock():
    payload = {"content":"I failed my first startup","platforms":["linkedin"], "intensity":"deep"}
    r = client.post("/api/generate", json=payload)
    assert r.status_code == 200
    assert "outputs" in r.json()
