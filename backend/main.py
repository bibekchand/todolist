from fastapi import FastAPI, Depends, Query
from typing import Annotated
from sqlmodel import Field, SQLModel, create_engine, Session, select


class todoList(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title:  str = Field(index=True)
    description: str = Field(index=True)
    time: str = Field(index=True)
    status: bool = Field(index=True)


DATABASE_URL = "mysql+pymysql://root:9985@127.0.0.1:3306/test"

engine = create_engine(DATABASE_URL, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/get_data")
async def root():
    return {"message": "Hello world"}


@app.get("/get_some/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[todoList]:
    lists = session.exec(select(todoList).offset(offset).limit(limit)).all()
    return lists
