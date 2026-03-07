from fastapi import FastAPI, Depends, Query
from typing import Annotated
from sqlmodel import Field, SQLModel, create_engine, Session, select, or_
from fastapi.middleware.cors import CORSMiddleware


class todolistBase(SQLModel):
    title:  str | None = Field(default=None, index=True)
    description: str | None = Field(default=None, index=True)
    time: str | None = Field(default=None, index=True)
    status: bool | None = Field(default=None, index=True)


class todolist(todolistBase, table=True):
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
async def add_task(task: todolistBase, session: SessionDep):
    db_task = todolist.model_validate(task)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.get("/searchTasks", response_model=list[todolist])
async def searchTasks(searchText: str, session: SessionDep):
    if not searchText:
        return []
    statement = select(todolist).where(
        or_(todolist.title.contains(searchText),
            todolist.description.contains(searchText)))
    results = session.exec(statement)
    searchedTasks = results.all()
    print("Searched Tasks=>", searchedTasks)
    return searchedTasks


@app.get("/get_list/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[todolist]:
    lists = session.exec(select(todolist).offset(offset).limit(limit)).all()
    return lists


@app.delete("/delete_list/{id}")
def delete_list(id: int, session: SessionDep):
    list = session.get(todolist, id)
    session.delete(list)
    session.commit()
    return {"ok": True}
