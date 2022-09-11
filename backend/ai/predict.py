import base64
from io import BytesIO
import os
from typing import Union
import cv2  # noqa
import numpy as np
import torch
from PIL import Image
import matplotlib.image as mpimg
from matplotlib import cm

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
cascades = [
    'haarcascade_frontalface_default.xml',
    'haarcascade_frontalface_alt.xml',
    'haarcascade_frontalface_alt_tree.xml',
    'haarcascade_profileface.xml',
]


def convert_image_into_ndarray(file) -> np.ndarray:
    return np.array(Image.open(file.file), dtype=np.uint8)


def detect_face(file) -> Union[np.ndarray, list]:
    img = convert_image_into_ndarray(file)

    # load cascade classifier for detecting faces
    for cascade in cascades:
        print(cascade)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + cascade)
        faces = face_cascade.detectMultiScale(img, scaleFactor=1.3, minNeighbors=5)
        if len(faces) > 0:
            x, y, w, h = faces[0]
            roi = img[y:y + h, x:x + w]
            if not os.path.exists('./faces'):
                os.makedirs('./faces')
            roi = cv2.resize(roi, (base_dim, base_dim))
            cv2.rectangle(img, (x, y), (x + w, y + h + 5), (0, 255, 0), 10)
            mpimg.imsave('./tmp/temp_box.png', img, cmap=cm.get_cmap('gray'))
            mpimg.imsave('./tmp/temp_resized.png', roi, cmap=cm.get_cmap('gray'))
            # return the ROI with correct shape for prediction
            return roi
    return []


def make_prediction(img: np.ndarray, model: str) -> "dict[str, np.ndarray]":
    if img.shape[-1] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        mpimg.imsave('./tmp/temp_grayscale.png', img, cmap=cm.get_cmap('gray'))
    model = torch.load(model)
    emotions = model.dls.vocab
    _, _, preds = model.predict(img)

    # Make readable byte string for img tag
    _, buffer = cv2.imencode('.jpg', img)
    img64 = base64.b64encode(buffer)

    return dict(zip(emotions, preds.tolist())), img64

