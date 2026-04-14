from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException, status
from typing import Annotated
from fastapi import APIRouter, Depends
from ..model.Token import Token
from ..model.UserCreate import UserCreate
from ..tables.UserTable import UserTable
from ..dependencies import create_access_token, verify_user_credentials
from ..config import get_settings
from datetime import timedelta
from ..db import SessionDep
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()
settings = get_settings()

router = APIRouter(tags=["Authentication"])


@router.post("/login")
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    verify_user_credentials(username=form_data.username,
                            password=form_data.password)
    access_token_expires = timedelta(minutes=settings.access_token_expire)
    access_token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@router.post("/sign_up")
def add_new_user(user: UserCreate, session: SessionDep):
    db_user = UserTable(**user.model_dump())
    exists = session.get(UserTable, db_user.username)
    if not exists:
        db_user.password = password_hash.hash(db_user.password)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    else:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Username already taken")
    return {"message": "Created"}
