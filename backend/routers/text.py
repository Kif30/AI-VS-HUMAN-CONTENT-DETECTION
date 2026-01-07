from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from models import text_model
from utils import preprocess_text

router = APIRouter()

@router.post("/predict/text")
async def predict_text(request: Request):
    data = await request.json()
    text = data.get("text")
    if not preprocess_text.is_valid_text(text):
        raise HTTPException(
            status_code=400,
            detail="Text must be at least 200 characters."
        )
    result = text_model.predict_text(text)
    return JSONResponse(content=result)
