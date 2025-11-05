from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

from models.summarizer import TextInput, SummarizeTextResponse

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