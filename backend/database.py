"""database.py: initialize database."""

import os
import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
USER = os.getenv('USER')
PASS = os.getenv('PASS')
DB = os.getenv('DB')

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{USER}:{PASS}@{HOST}/{DB}"

engine = _sql.create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,
    future=True,
    connect_args={"check_same_thread": False}
)

meta = _sql.MetaData()

SessionLocal = _orm.sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

Base = _declarative.declarative_base()