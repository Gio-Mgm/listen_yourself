"""services.py: Functions for creating queries."""
import database as _database
import schemas as _schemas
import models as _models
import sqlalchemy.orm as _orm
from sqlalchemy import and_
from sqlalchemy.sql import func
from sqlalchemy.exc import IntegrityError


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------- #
# ---- USER QUERIES ---- #
# ---------------------- #


def create_user(db: _orm.Session, user: _schemas.UserCreate):
    """
        query create user
    """
    if type(user) == dict:
        db_user = _models.User(**user)
    else:
        db_user = _models.User(**user.dict())
    db.add(db_user)
    try:
        db.commit()
    except IntegrityError as err:
        db.rollback()
        return err
    db.refresh(db_user)

    return db_user


def get_user(db: _orm.Session, user_id: int):
    """
        query read user
    """

    return db.query(_models.User).filter(_models.User.user_id == user_id).first()


def get_user_by_email(db: _orm.Session, user_email: str):
    """
        query read user
    """

    return db.query(_models.User).filter(_models.User.user_email == user_email).first()


def login(db: _orm.Session, user: _schemas.UserCreate):
    """
        query connection of user
    """
    return db.query(_models.User).filter(and_(_models.User.user_email == user.user_email, _models.User.user_enc_password == user.user_enc_password)).first()



def update_user(db: _orm.Session, user_id: int, email: str, name: str, password: str):
    """
        query update user
    """

    db_user = get_user(db=db, user_id=user_id)
    db_user.user_email = email
    db_user.user_name = name
    db_user.user_enc_password = password
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: _orm.Session, user_id: int):
    """
        query delete user
    """

    db.query(_models.User).filter(_models.User.user_id == user_id).delete()
    db.commit()


# ---------------------------- #
# ---- PREDICTION QUERIES ---- #
# ---------------------------- #


def create_prediction(db: _orm.Session, prediction: _schemas.Prediction, user_id: int):
    """
        query create prediction
    """

    db_prediction = _models.Prediction(**prediction.dict(), user_id=user_id)
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    return db_prediction


def read_prediction(db: _orm.Session, prediction_id: int):
    """
        query read prediction by id
    """

    return db.query(_models.Prediction).filter(_models.Prediction.prediction_id == prediction_id).first()


def read_user_predictions(db: _orm.Session, user_id: int):
    """
        query read all predictions from a user
    """

    return db.query(_models.Prediction).filter(_models.Prediction.user_id == user_id).all()


def read_predictions(db: _orm.Session):
    """
        query read all predictions
    """

    return db.query(_models.Prediction).all()


# TODO Check if it is working
# def update_prediction(db: _orm.Session, prediction_id: int, prediction: _models.Prediction):
def update_prediction(db: _orm.Session, prediction_id: int, predictions: dict):
    """
        query update prediction (after retraining?)
    """

    db_prediction = read_prediction(db=db, prediction_id=prediction_id)
    # db_prediction.major = prediction.major
    # db_prediction.text = prediction.text
    # db_prediction.worry = prediction.worry
    # db_prediction.fear = prediction.fear
    # db_prediction.neutral = prediction.neutral
    # db_prediction.sadness = prediction.sadness
    # db_prediction.hate = prediction.hate
    # db_prediction.fun = prediction.fun
    # db_prediction.happy = prediction.happy
    # db_prediction.love = prediction.love
    # db_prediction.anger = prediction.anger
    # db_prediction.date_last_updated = date.today()
    for key, value in predictions.items():
        db_prediction[key] = value

    db.commit()
    db.refresh(db_prediction)
    return db_prediction


def delete_prediction(db: _orm.Session, prediction_id: int):
    """
        query delete prediction
    """

    db.query(_models.Prediction).filter(_models.Prediction.prediction_id == prediction_id).delete()
    db.commit()

def read_mean(db: _orm.Session, user_id: int, start: str, end: str):
    """
        query read mean of each sentiment
    """

    emotions = [
        "angry",
        "calm",
        "disgust",
        "fearful",
        "happy",
        "neutral",
        "sad",
        "surprised"
    ]

    means = [func.avg(_models.Prediction[emotion]).label(emotion) for emotion in emotions]

    query = db.query(
        *means,
        # func.avg(_models.Prediction.anger).label('anger'),
        # func.avg(_models.Prediction.sadness).label('sadness'),
        # func.avg(_models.Prediction.love).label('love'),
        # func.avg(_models.Prediction.happy).label('happy'),
        # func.avg(_models.Prediction.fear).label('fear'),
        # func.avg(_models.Prediction.worry).label('worry'),
        # func.avg(_models.Prediction.neutral).label('neutral'),
        # func.avg(_models.Prediction.hate).label('hate'),
        # func.avg(_models.Prediction.fun).label('fun')
    ).filter(and_(
        _models.Prediction.date_last_updated >= start,
        _models.Prediction.date_last_updated <= end,
    ))

    if user_id:
        return query.filter(_models.Prediction.user_id == user_id).all()

    return query.all()


# def get_dates(db: _orm.Session, user_id: int):
#     """
#         query get list of dates from posts
#     """

#     return db.query(_models.Post.date_last_updated).filter(_models.Post.user_id == user_id).all()


# def check_predictions_dates(db, start: str, end: str, user_id: int):

#     query = db.query(_models.Prediction).filter(and_(
#         _models.Prediction.date_last_updated >= start,
#         _models.Prediction.date_last_updated <= end,
#     ))

#     if user_id:
#         return query.filter(_models.Prediction.user_id == user_id).count()

#     return query.count()
