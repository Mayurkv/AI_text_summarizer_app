from sqlalchemy import Column, Integer, String, DateTime, func
from database import Base

class SummaryModel(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())