from sqlalchemy import (
    Column,
    Integer,
    Float,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import Float
from datetime import datetime, timezone

from app.database import Base

class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    resume_text = Column(Text, nullable=False)


    resume_name = Column(Text)

    job_description = Column(Text, nullable=False)

    match_score = Column(Float)

    matched_keywords = Column(JSON)

    missing_keywords = Column(JSON)

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc)
)