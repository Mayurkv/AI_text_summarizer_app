from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

from sqlalchemy.orm import Session
from models.summarizer import TextInput, SummarizeTextResponse, SummaryBase
from models.models import SummaryModel
from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

# Load env variables
load_dotenv()

app = FastAPI(title="Text Summarizer App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    base_url = os.getenv("OPENAI_API_BASE"),
    api_key = os.getenv("OPENAI_API_KEY")
)

@app.post("/summarize", response_model=SummarizeTextResponse)
def summarize_text(payload: TextInput):
    system_prompt = (
        "You are a helpful assistant that summarizes any given text in a concise way. "
        "Always return only the summary."
    )
    user_prompt = f"Please summarize the following text:\n{payload.text}"
    try:
        response = client.chat.completions.create(
            model = os.getenv("MODEL"),
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature = 0.5,
            max_tokens = 300
        )
        summarized_text = response.choices[0].message.content.strip()
        return SummarizeTextResponse(summary=summarized_text)
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@app.post("/save_summary")
def save_summary(summary: SummaryBase, db: Session = Depends(get_db)):
    db_summary = SummaryModel(**summary.model_dump())
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    return db_summary