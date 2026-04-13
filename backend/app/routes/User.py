from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import APIRouter, Depends
from ..model.Token import Token
from ..dependencies import verify_user_credentials, create_access_token
from ..config import get_settings
from datetime import timedelta
from ..db import SessionDep
settings = get_settings()

router = APIRouter(dependencies=[Depends(verify_user_credentials)])


@router.post("/login")
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    access_token_expires = timedelta(minutes=settings.access_token_expire)
    access_token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")
