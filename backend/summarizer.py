from bs4 import BeautifulSoup
from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_article(html):
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text(separator=" ", strip=True)
    if len(text) < 100:
        return "Not enough text to summarize."
    result = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return result[0]['summary_text']
