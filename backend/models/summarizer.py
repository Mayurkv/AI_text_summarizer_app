from pydantic import BaseModel

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