import cv2
import numpy as np
import tempfile
from pathlib import Path

def read_frames_from_bytes(video_bytes, k=20, img_size=224):
    """
    Extracts k evenly-spaced frames from video bytes and resizes to (img_size, img_size).
    Returns a NumPy array of shape [k, img_size, img_size, 3].
    """
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as fp:
        # Support both io.BytesIO and raw bytes
        fp.write(video_bytes.read() if hasattr(video_bytes, 'read') else video_bytes)
        temp_path = fp.name

    cap = cv2.VideoCapture(temp_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    idx = np.linspace(0, max(total - 1, 0), k).astype(int)
    frames = []
    for i in idx:
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ok, f = cap.read()
        if not ok:
            continue
        f = cv2.cvtColor(f, cv2.COLOR_BGR2RGB)
        f = cv2.resize(f, (img_size, img_size))
        frames.append(f)
    cap.release()
    Path(temp_path).unlink(missing_ok=True)
    # Pad if few frames
    while len(frames) < k and frames:
        frames.append(frames[-1])
    if not frames:
        raise ValueError("No frames could be read from video.")
    return np.stack(frames)

def is_valid_video_file(video_bytes):
    """
    Checks if the video bytes can be opened and read by OpenCV.
    Returns True if valid, False otherwise.
    """
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as fp:
            fp.write(video_bytes.read() if hasattr(video_bytes, 'read') else video_bytes)
            temp_path = fp.name
        cap = cv2.VideoCapture(temp_path)
        ret, _ = cap.read()
        cap.release()
        Path(temp_path).unlink(missing_ok=True)
        return ret
    except Exception:
        return False