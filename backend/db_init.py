import hashlib
import os
from typing import Union
from dotenv import load_dotenv  # noqa

load_dotenv()


def _init_user(mail: str, pwd: str, admin: int = 0) -> "dict[str, Union[str, int]]":
    """Make user' as a user schema for feeding initial database.

    Encryption of password is done here.

    Args:
        mail (str): _description_
        pwd (str): _description_
        admin (int, optional): _description_. Defaults to 0.

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
