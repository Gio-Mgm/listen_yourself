import os
from sqlite3 import IntegrityError
from typing import Any, Union
from fastapi import FastAPI, HTTPException, Response, UploadFile, Depends, File, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas
from models import Prediction, User
from dotenv import load_dotenv
from ai.predict import detect_face, make_prediction

load_dotenv()

import sentry_sdk
sentry_sdk.init(
    dsn=os.environ["DSN"],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0
)


# TODO Write missing requests

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main() -> "dict[str,str]":
    return {"message": "Hello World"}


@app.post("/users")
def create_user(
    user: _schemas.UserCreate,
    db: _orm.Session = Depends(_services.get_db)
) -> Union[IntegrityError, User]:
    """
        Route for creating user
    """
    db_user = _services.get_user_by_email(db, user.user_email)

    if db_user:
        raise HTTPException(status_code=422, detail="Email already registered ! ")
    return _services.create_user(db=db, user=user)


@app.post("/login")
def login(
    user: _schemas.UserCreate,
    db: _orm.Session = Depends(_services.get_db),
) -> User:
    db_user = _services.login(db=db, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Invalid username or password")
    return db_user


@app.get("/user/{user_id}")
def read_user(
    user_id: int,
    db: _orm.Session = Depends(_services.get_db)
) -> User:
    """
        Route for getting a user
    """

    db_user = _services.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, content="This user does not exist")
    return db_user


@app.put("/user/{id}")
def update_user(id: int):
    pass


@app.delete("/user/{id}")
def delete_user(id: int):
    pass


@app.post("/predict/")
def predict(file: UploadFile = File(...)) -> "dict[str, Any]":
    face = detect_face(file)
    if len(face) == 0:
        raise HTTPException(status.HTTP_204_NO_CONTENT, "No face detected !")

    model = './ai/models/vgg13_bn_16.pkl'
    return make_prediction(face, model)


@app.post("/prediction/")
def create_prediction(
    prediction: _schemas.PredictionCreate,
    db: _orm.Session = Depends(_services.get_db)
) -> Prediction:
    return _services.create_prediction(db=db, prediction=prediction)


@app.get("/prediction/{id}")
def read_prediction(id: int):
    pass


@app.put("/prediction/{id}")
def update_prediction(id: int):
    pass

@app.get("/prediction")
def read_predictions_list():
    pass


@app.get("/predictions/{user_id}")
def read_predictions(
    skip: int = 0,
    limit: int = 10,
    db: _orm.Session = Depends(_services.get_db)
):
    """
        Route for getting all stored predictions
    """

    users = _services.get_users(db=db, skip=skip, limit=limit)
    return users


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug",
        debug=True,
        workers=1,
        limit_concurrency=1,
        limit_max_requests=1
    )