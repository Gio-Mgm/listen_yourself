"""Schemas used by Pydantic to communicate with the database"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class UserCreate(BaseModel):
    """Schema for user creation."""
    user_email: EmailStr
    user_enc_password: str


class User(BaseModel):
    """Schema of user."""
    user_id: int
    user_email: str
    user_register_date: date

    class Config:  # noqa
        orm_mode = True


class Predict(BaseModel):
    """Schema for Predicting."""
    user_id: int
    src: str


class PredictionCreate(BaseModel):
    user_id: int
    prediction_img: str
    predictions: str
    prediction_true: str
    prediction_major: str


class Prediction(PredictionCreate):
    """Schema for prediction."""
    prediction_id: int

    class Config:   # noqa
        orm_mode = True
