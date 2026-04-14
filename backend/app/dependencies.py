from fastapi import HTTPException, status, Depends
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
import jwt
from .tables.UserTable import UserTable
from .config import get_settings
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
from .db import get_session, SessionDep
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer

password_hash = PasswordHash.recommended()
auth = OAuth2PasswordBearer(tokenUrl="login")
settings = get_settings()


def verify_token(token: Annotated[str, Depends(auth)], session: SessionDep):
    print("Token=>", token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,
                             settings.secret_key, algorithms=[
                                 settings.algorithm])
        print("This is the payload", payload)
        username = payload.get("sub")
        if not username:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    user = session.get(UserTable, username)
    if not user:
        raise credentials_exception
    return user


def verify_user_credentials(username: str, password: str):
    session = get_session()
    session = next(session)
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
