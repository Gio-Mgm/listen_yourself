from datetime import date
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Date
import database as _database


class User(_database.Base):
    __tablename__ = "user"

    user_id: Column(Integer, primary_key=True, index=True)
    user_name: Column(String, unique=True)
    user_email: Column(String, unique=True)
    user_enc_password: Column(String)
    user_register_date = Column(Date, default=date.today())

    predictions = relationship("Prediction", back_populates="owner")


class Prediction(_database.Base):
    __tablename__ = "prediction"
    prediction_id: Column(Integer, primary_key=True, index=True)
    user_id: Column(Integer, ForeignKey("user.user_id"))
    prediction_img_path: Column(String, unique=True)
    prediction_angry: Column(Float)
    prediction_calm: Column(Float)
    prediction_disgust: Column(Float)
    prediction_fearful: Column(Float)
    prediction_happy: Column(Float)
    prediction_neutral: Column(Float)
    prediction_sad: Column(Float)
    prediction_surprised: Column(Float)
    prediction_true: Column(String)
    prediction_major: Column(String)

    owner = relationship("User", back_populates="predictions")