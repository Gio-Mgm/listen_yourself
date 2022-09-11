"""Tests pytest."""
# flake8: noqa
import sys
sys.path.append('../')
from matplotlib import image as mpimg
from backend.predict import make_prediction, detect_face


test_img = mpimg.imread('../deep_learning/data/03/original_size/train/calm/Actor_01_1.jpg')
model = './dp_models/vgg13_bn_16.pkl'


def test_make_prediction():
    assert isinstance(make_prediction(test_img, model), dict)


def test_detect_face():
    assert len(detect_face(test_img)) == 1
