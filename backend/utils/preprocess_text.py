import re

def clean_text(text: str) -> str:
    """Basic cleaning: lowercase, remove non-alphanumeric, collapse spaces."""
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def is_valid_text(text: str, min_length: int = 200) -> bool:
    """
    Returns True if text is a string and has at least `min_length` characters (after stripping).
    """
    if not isinstance(text, str):
        return False
    return len(text.strip()) >= min_length

def postprocess_result(result: dict) -> dict:
    """
    Optionally formats or adds extra fields to model result for frontend use.
    """
    return {
        "label": result["label"],
        "confidence": result["confidence"],
        "prob_ai": round(float(result["prob_ai"]), 4),
        "prob_human": round(float(result["prob_human"]), 4)
    }
