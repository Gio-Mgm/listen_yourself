from io import BytesIO
from pathlib import Path
from fastapi import UploadFile
import matplotlib.image as mpimg
from PIL import Image
import cv2
import joblib
import numpy as np
from tensorflow.keras.models import model_from_json
from tensorflow_addons.metrics import F1Score


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

def detect_face(img):
    print(img)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = np.array(gray, dtype='uint8')
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    # face_cascade = cv2.CascadeClassifier('./deep_learning/haarcascades/haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    print("face")
    x, y, w, h = faces[0]
    roi = gray[y:y + h, x:x + w]
    return np.expand_dims(np.expand_dims(cv2.resize(roi, (base_dim, base_dim)), -1), 0)

def make_prediction(img):
    print("IMG SHAPE", img.shape)
    model_base = "./deep_learning/fer_2013_1.0/model_48x48"
    with open(f'{model_base}.json', 'r') as f:
        loaded_json = f.read()

    model = model_from_json(loaded_json)
    model.load_weights(f'{model_base}.h5')
    return dict(zip(emotions, model.predict(img).tolist()[0]))
