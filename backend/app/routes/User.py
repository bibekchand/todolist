import jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import APIRouter, Depends
from typing import Annotated
from ..db import SessionDep
from ..config import get_settings
from ..tables.UserTable import UserTable
from ..dependencies import verify_token
settings = get_settings()
router = APIRouter(tags=["User"], dependencies=[Depends(verify_token)])


auth = OAuth2PasswordBearer(tokenUrl="login")


@router.get("/user/me")
def get_user_info(token: Annotated[str, Depends(auth)], session: SessionDep):

    payload = jwt.decode(token,
                         settings.secret_key, algorithms=[
                             settings.algorithm])

    username = payload.get("sub")
    user = session.get(UserTable, username)
    return user
