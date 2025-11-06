from pydantic import BaseModel

# Output for all the summaries
from pydantic import BaseModel
from typing import List

class SummaryBase(BaseModel):
    title: str
    summary: str

class SummaryResponse(SummaryBase):
    id: int

    class Config:
        orm_mode = True  # 👈 Important: tells FastAPI to read from ORM objects

class AllSummariesResponse(BaseModel):
    summaries: List[SummaryResponse]


# Text input for the model
class TextInput(BaseModel):
    text: str

# Text output of the model
class SummarizeTextResponse(BaseModel):
    summary: str

# Input for the save_summary endpoint
class SummaryBase(BaseModel):
    title: str
    summary: str