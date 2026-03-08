from typing import Annotated
from datetime import datetime, timedelta, timezone
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, FastAPI, HTTPException, status
from sqlmodel import Field, SQLModel, create_engine, Session, select
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

DATABASE_URL = "mysql+pymysql://root:9985@127.0.0.1:3306/test"

SECRET_KEY = "bff17be701d103e15ea318f6029d5ee7de7cceaff35cd67af6aca08da7a663a9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

auth = OAuth2PasswordBearer(tokenUrl="token")

engine = create_engine(DATABASE_URL, echo=True)


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def get_session():
    with Session(engine) as session:
        yield session


def autheticate_user(username: str, password: str, session):
    user = session.get(User, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


class User(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str
    email: str


class UserCreate(BaseModel):
    username: str = Field(min_length=1)
    password: str
    email: str = Field(min_length=1)


SessionDep = Annotated[Session, Depends(get_session)]


@app.post("/sign_up")
def add_new_user(user: UserCreate, session: SessionDep):
    db_user = User(**user.model_dump())
    exists = session.get(User, db_user.username)
    if not exists:
        db_user.password = get_password_hash(db_user.password)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    else:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Username already taken")
    return {"message": "Created"}


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends(OAuth2PasswordRequestForm)], session: SessionDep) -> Token:
    user = autheticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users")
async def get_users_data(token: Annotated[str, Depends(auth)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        return {"message": username}
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP.HTTP_401_UNAUTHORIZED)
    return {"message": "successful"}
