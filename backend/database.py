"""database.py: initialize database."""

import os
import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
import services as _services
import database as _database

import hashlib
from typing import Union

from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
USER = os.getenv('MYSQL_USER')
PASS = os.getenv('MYSQL_PASSWORD')
DB = os.getenv('MYSQL_DATABASE')
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{USER}:{PASS}@{HOST}/{DB}"
print(SQLALCHEMY_DATABASE_URL)
engine = _sql.create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,
    future=True
)

meta = _sql.MetaData()

SessionLocal = _orm.sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

Base = _declarative.declarative_base()


def _init_user(mail: str, pwd: str, admin: int = 0) -> "dict[str, Union[str, int]]":
    """creates user respecting to the schema for feeding initial database.

    Encryption of password is done here.

    Args:
        mail (str): email of the user
        pwd (str): password of the user
        admin (int, optional): has admin privilèges. Defaults to 0.

    Returns:
        dict[str, str | int]: user to feed in db
    """
    hashed_pwd = hashlib.sha256(
        str(mail).encode('utf-8') + str(pwd).encode('utf-8')
    ).hexdigest()
    return {
        "user_email": mail,
        "user_enc_password": hashed_pwd,
        "user_is_admin": admin
    }


def get_users() -> list:
    """Generate and get the users to feed in the db.

    Returns:
        list[dict[str, str | int]]: list of users
    """
    base_users = [
        ["user@lambda.com", "password", 0],
        ["user_2@lambda.com", "password_2", 0],
        [os.environ["ADMIN_MAIL"], os.environ["ADMIN_PASS"], 1],
    ]
    users = []
    for base_user in base_users:
        users.append(_init_user(*base_user))
    return users


if __name__ == "__main__":
    _services.create_database()

    for user in get_users():
        _services.create_user(db=_database.SessionLocal(), user=user)

