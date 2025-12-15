# app/db/init_db.py
import logging
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Import all model modules here so SQLAlchemy registers table metadata.
# Add any other model modules you created.
try:
    import app.models.user
    import app.models.brand_profile
    import app.models.post_history
    import app.models.embedding_doc
except Exception as e:
    # ignore import-time errors but log them
    logging.getLogger("init_db").warning("Model import warning: %s", e)

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("init_db")

def init_db():
    log.info("Using DB URL: %s", settings.DATABASE_URL)
    # show which tables SQLAlchemy already knows about
    known = list(Base.metadata.tables.keys())
    log.info("Known tables before create_all: %s", known)
    log.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    known_after = list(Base.metadata.tables.keys())
    log.info("Known tables after create_all: %s", known_after)

if __name__ == "__main__":
    init_db()
