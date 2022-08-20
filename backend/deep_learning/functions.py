from typing import Coroutine
import cv2  # noqa
import numpy as np
from tensorflow.keras.models import model_from_json


base_dim = 48
emotions = [
    "angry",
    "calm",
    "disgust",
    "fearful",
    "happy",
    "neutral",
    "sad",
]

def detect_face(content: Coroutine):
    nparr = np.fromstring(content, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR).astype(np.float32)
    # convert into grayscale
    gray = np.array(cv2.cvtColor(img, cv2.COLOR_RGB2GRAY), dtype='uint8')
    # gray = np.array(gray, dtype='uint8')
    # load cascade classifier for detecting faces
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    # if a face is detected
    if len(faces) > 0:
        x, y, w, h = faces[0]
        roi = gray[y:y + h, x:x + w]
        # return the ROI with correct shape for prediction
        return np.expand_dims(np.expand_dims(cv2.resize(roi, (base_dim, base_dim)), -1), 0)
    else:
        return []


def make_prediction(img: np.ndarray):
    # load model
    model_base = "./deep_learning/fer_2013_1.0/model_48x48"
    with open(f'{model_base}.json', 'r') as f:
        loaded_json = f.read()

    model = model_from_json(loaded_json)
    model.load_weights(f'{model_base}.h5')
    return dict(zip(emotions, model.predict(img).tolist()[0]))
