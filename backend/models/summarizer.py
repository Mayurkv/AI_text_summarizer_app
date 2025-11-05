from pydantic import BaseModel

# Text input for the model
class TextInput(BaseModel):
    text: str

# Text output of the model
class SummarizeTextResponse(BaseModel):
    summary: str


# Columns for the db
# id: int
# summary: str
# created_at: datetime