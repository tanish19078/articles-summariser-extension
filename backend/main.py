from fastapi import FastAPI
from pydantic import BaseModel
from summarizer import summarize_article

app = FastAPI()

class RequestBody(BaseModel):
    html: str
    url: str

@app.post("/summarize")
def summarize(body: RequestBody):
    try:
        summary = summarize_article(body.html)
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}
