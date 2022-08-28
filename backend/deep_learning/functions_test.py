from matplotlib import image as mpimg
import numpy as np
from tensorflow.keras.models import model_from_json
import cv2
test_img = mpimg.imread('../../deep_learning/data/03/fer_2013/train/fear/PrivateTest_166793.jpg')
test_img = np.expand_dims(np.expand_dims(cv2.resize(test_img, (48, 48)), -1), 0)

print(test_img.shape)


def make_prediction(img: np.ndarray):
    print(img.shape)

    emotions = [
        "angry",
        "calm",
        "disgust",
        "fearful",
        "happy",
        "neutral",
        "sad",
    ]
    # load model
    model_base = "./fer_2013_1.0/model_48x48"
    with open(f'{model_base}.json', 'r') as f:
        loaded_json = f.read()

    model = model_from_json(loaded_json)
    model.load_weights(f'{model_base}.h5')
    return dict(zip(emotions, model.predict(img).tolist()[0]))


def test_make_prediction():
    result = make_prediction(test_img)
    assert isinstance(result)