from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from models import video_model
import io

router = APIRouter()

@router.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File is not a video.")
    contents = await file.read()
    video_bytes = io.BytesIO(contents)
    try:
        result = video_model.predict_video_bytes(video_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    return JSONResponse(content=result)