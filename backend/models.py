"""Define models for the database."""

from datetime import date
from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Date
import database as _database


class User(_database.Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), unique=True)
    user_enc_password = Column(String(255))
    user_register_date = Column(Date, default=date.today())
    user_is_admin = Column(Integer, default=0)

    predictions = relationship("Prediction", back_populates="owner")


class Prediction(_database.Base):
    __tablename__ = "prediction"

    prediction_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    prediction_img = Column(Text)
    predictions = Column(String(255))
    prediction_true = Column(String(255))
    prediction_major = Column(String(255))

    owner = relationship("User", back_populates="predictions")
