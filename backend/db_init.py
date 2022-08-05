import os
from . import Database
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
USER = os.getenv('USER')
PASS = os.getenv('PASS')
DB = os.getenv('DB')

USER_TABLE_NAME = 'user'
USER_TABLE_ARGS = {
    "user_id": "INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY",
    "user_mail": "VARCHAR(50) NOT NULL",
    "user_hashed_password": "VARCHAR(64) NOT NULL",  # sha256 -> 64 hexa chars
    "user_name": "VARCHAR(25)"
}
# TODO FILL DATA
USER_DATA = ""

PREDICTION_TABLE_NAME = 'prediction'
PREDICTION_TABLE_ARGS = {
    "prediction_id": "INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY",
    "prediction_img": "VARCHAR(100) NOT NULL",
    "prediction_true": "VARCHAR(20)",
    "prediction_major": "VARCHAR(20) NOT NULL",
    "prediction_user_id": "INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY",
}
# TODO FILL DATA
PREDICTION_DATA = ""
PREDICTION_FK = "ALTER TABLE prediction ADD FOREIGN KEY (user_id) REFERENCES user(user_id)"

# Init Database object
db = Database(HOST, USER, PASS, DB)
# Connection to the db
conn = db.db_connection()
# Create the database
db.create_database()
# Fill the database with data
db.fill_database(USER_TABLE_NAME, USER_TABLE_ARGS, USER_DATA)
db.fill_database(PREDICTION_TABLE_NAME, PREDICTION_TABLE_ARGS, PREDICTION_DATA)
db.add_foreign_key(PREDICTION_TABLE_NAME, "FK_user_id", USER_TABLE_NAME, "user_id")
# Disconnect databese
db.disconnect_db()
