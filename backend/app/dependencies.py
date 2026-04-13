from fastapi import HTTPException, status, Header
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
import jwt
from .tables.UserTable import UserTable
from .config import get_settings
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
from .db import get_session, SessionDep
from typing import Annotated

password_hash = PasswordHash.recommended()

settings = get_settings()


def verify_token(token: Annotated[str, Header()]):
    print("Token=>", token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(settings.token,
                             settings.secret_key, algorithms=[
                                 settings.algorihtm])
        print("This is the payload", payload)
        username = payload.get("sub")
        if not username:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    session = get_session()
    user = session.get(UserTable, username)
    if not user:
        raise credentials_exception


def verify_user_credentials(username: str, password: str, session: SessionDep):
    print("Authenticating User")
    user = session.get(UserTable, username)
    credentials_error = HTTPException(
        status_code=401,
        detail="Invalid username or password"
    )
    if not user:
        raise credentials_error
    if not password_hash.verify(password, user.password):
        raise credentials_error


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt
