"""database.py: initialize database."""

import os
import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
import configparser
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
USER = os.getenv('MYSQL_USER')
PASS = os.getenv('MYSQL_PASSWORD')
DB = os.getenv('MYSQL_DATABASE')
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{USER}:{PASS}@{HOST}/{DB}"
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
