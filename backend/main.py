import os
import hashlib
from sqlite3 import IntegrityError
from typing import Any, Union
from fastapi import Depends, FastAPI, HTTPException, status, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sqlalchemy.orm as _orm
from db_init import get_users
import services as _services
import schemas as _schemas
import database as _database
from models import User
from dotenv import load_dotenv
from deep_learning.functions import detect_face, make_prediction

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

_services.create_database()



for user in get_users():
    _services.create_user(db=_database.SessionLocal() ,user=user)


@app.get("/")
async def main() -> "dict[str,str]":
    return {"message": "Hello World"}


@app.post("/users")
def create_user(
    user: _schemas.UserCreate,
    db: _orm.Session = Depends(_services.get_db)
) -> Union[IntegrityError , User]:
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
    print(db_user)
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
    print(db_user)
    return db_user


@app.put("/user/{id}")
def update_user(id: int):
    pass


@app.delete("/user/{id}")
def delete_user(id: int):
    pass


@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> "dict[str, Any]":
    content = await file.read()
    face = detect_face(content)
    if len(face) == 0:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No face detected !")
    return make_prediction(face)


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