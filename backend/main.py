from fastapi import FastAPI, Depends, Query, HTTPException, status
from datetime import datetime, timedelta, timezone
from typing import Annotated
from sqlmodel import Field, SQLModel, create_engine, Session, select, or_
from fastapi.middleware.cors import CORSMiddleware


from pydantic import BaseModel
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

auth = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = "bff17be701d103e15ea318f6029d5ee7de7cceaff35cd67af6aca08da7a663a9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def handleAuthorization(token, session) -> bool:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = session.get(UserTable, username)
    if not user:
        raise credentials_exception
    return True


class UserTable(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str
    email: str


class UserCreate(BaseModel):
    username: str = Field(min_length=1)
    password: str
    email: str | None = Field(min_length=1)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def autheticate_user(username: str, password: str, session):
    print("Authenticating User")
    user = session.get(UserTable, username)
    if not user:
        print("No User")
        return False
    if not password_hash.verify(password, user.password):
        print("Wrong Password")
        return False
    return user


class Token(BaseModel):
    access_token: str
    token_type: str


class todolistBase(SQLModel):
    title:  str | None = Field(default=None, index=True)
    description: str | None = Field(default=None, index=True)
    time: str | None = Field(default=None, index=True)
    status: bool | None = Field(default=None, index=True)


class TodolistTable(todolistBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


DATABASE_URL = "mysql+pymysql://root:9985@127.0.0.1:3306/test"

engine = create_engine(DATABASE_URL, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/addTask", response_model=todolistBase)
async def add_task(task: todolistBase, token: Annotated[str, Depends(auth)], session: SessionDep):
    db_task = TodolistTable.model_validate(task)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.get("/searchTasks", response_model=list[TodolistTable])
async def searchTasks(token: Annotated[str, Depends(auth)], searchText: str, session: SessionDep):
    if handleAuthorization(token, session):
        if not searchText:
            return []
        statement = select(TodolistTable).where(
            or_(TodolistTable.title.contains(searchText),
                TodolistTable.description.contains(searchText)))
        results = session.exec(statement)
        searchedTasks = results.all()
        print("Searched Tasks=>", searchedTasks)
        return searchedTasks


@app.get("/get_list/")
def read_heroes(token:  Annotated[str, Depends(auth)],
                session: SessionDep,
                offset: int = 0,
                limit: Annotated[int, Query(le=100)] = 100,
                ) -> list[TodolistTable]:
    lists = session.exec(
        select(TodolistTable).offset(offset).limit(limit)).all()
    return lists


@app.delete("/delete_list/{id}")
def delete_list(id: int, session: SessionDep):
    list = session.get(TodolistTable, id)
    session.delete(list)
    session.commit()
    return {"ok": True}


@app.post("/sign_up")
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


@app.post("/login")
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    print("Login")
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


@app.get("/get_current_user")
def get_current_user(token: Annotated[str, Depends(auth)], session: SessionDep):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = session.get(UserTable, username)
    if not user:
        raise credentials_exception
    return {"user": user.username, "email": user.email}
