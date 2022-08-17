from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class UserBase(BaseModel):
    user_email: EmailStr


class UserCreate(UserBase):
    user_enc_password: str


class User(BaseModel):
    user_id: int
    user_email: str
    user_register_date: date


    class Config:
        orm_mode = True

# TODO split preds into another class?
#
# class PredictionResults(BaseModel):

class Predict(BaseModel):
    user_id: int
    src: str

class Prediction(BaseModel):
    prediction_id: int
    user_id: int
    prediction_img_path: str
    prediction_angry: float
    prediction_calm: float
    prediction_disgust: float
    prediction_fearful: float
    prediction_happy: float
    prediction_neutral: float
    prediction_sad: float
    prediction_surprised: float
    prediction_true: Optional[str]
    prediction_major: str


    class Config:
        orm_mode = True