from PIL import Image, UnidentifiedImageError
import io

def validate_image_file(file_bytes: bytes):
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
        return True
    except Exception:
        return False

def format_prediction_result(result: dict) -> dict:
    return {
        "AI_probability_percent": round(result["prob_ai"] * 100, 2),
        "Human_probability_percent": round(result["prob_human"] * 100, 2),
        "Label": result["label"]
    }