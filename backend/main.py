from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas
from datetime import date

# TODO Write missing requests

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
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


@app.post("/users/")
def create_user(
    user: _schemas.User,
    db: _orm.Session = Depends(_services.get_db)
):
    """
        Route for creating user
    """
    response = _services.create_user(db=db, user=user)
    return response


@app.get("/users/{user_id}")
def get_user(
    user_id: int,
    db: _orm.Session = Depends(_services.get_db)
):
    """
        Route for getting a user
    """

    db_user = _services.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="This user does not exist")
    print(db_user)
    return db_user


@app.put("/user/{id}")
def update_user(id: int):
    pass


@app.delete("/user/{id}")
def delete_user(id: int):
    pass


@app.post("/prediction")
def create_prediction():
    pass


@app.get("/prediction/{id}")
def read_prediction(id: int):
    pass


@app.put("/prediction/{id}")
def update_prediction(id: int):
    pass

@app.get("/prediction")
def read_prediction_list():
    pass


@app.get("/users/")
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
        reload=False,
        log_level="debug",
        debug=True,
        workers=1,
        limit_concurrency=1,
        limit_max_requests=1
    )