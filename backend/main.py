from fastapi import Depends, FastAPI, HTTPException, Response, status, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.responses import JSONResponse, RedirectResponse
import uvicorn
import sqlalchemy.orm as _orm
from deep_learning.functions import detect_face, make_prediction
import services as _services
import schemas as _schemas
from datetime import date
import numpy as np
from PIL import Image
from io import BytesIO
import cv2

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


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.post("/users")
def create_user(
    user: _schemas.UserCreate,
    db: _orm.Session = Depends(_services.get_db)
):
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
):
    db_user = _services.login(db=db, user=user)
    print(db_user)

    if db_user is None:
        raise HTTPException(status_code=404, detail="Invalid username or password")
    return db_user

@app.get("/user/{user_id}")
def read_user(
    user_id: int,
    db: _orm.Session = Depends(_services.get_db)
):
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
async def predict(file: UploadFile = File(...)):
    content =await file.read()
    nparr = np.fromstring(content, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR).astype(np.float32)
    face = detect_face(img)
    print("FACES LEN", len(face))
    if len(face) > 0:
        results = make_prediction(face)
        print("RESULTS", results)
        return results



@app.get("/prediction/{id}")
def read_prediction(id: int):
    pass


@app.put("/prediction/{id}")
def update_prediction(id: int):
    pass

@app.get("/prediction")
def read_prediction_list():
    pass


@app.get("/predictions/{user_id}")
def get_predictions(
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