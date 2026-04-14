from fastapi import Depends, APIRouter, Query, HTTPException
from typing import Annotated
from ..dependencies import verify_token
from ..tables.TodoListTable import TodoListTable
from ..model.TodoListBase import TodoListBase
from fastapi.security import OAuth2PasswordBearer
from ..db import SessionDep
from sqlmodel import select, or_
auth = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter(
    prefix="/task",
    tags=["Tasks"],
    dependencies=[Depends(verify_token)],
    responses={404: {"description": "Not found"}},
)


@router.post("/add", response_model=TodoListBase)
async def add_task(task: TodoListBase, session: SessionDep):
    db_task = TodoListTable.model_validate(task)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/search", response_model=list[TodoListTable])
async def search_tasks(searchText: str, session: SessionDep):
    if not searchText:
        return []
    statement = select(TodoListTable).where(
        or_(TodoListTable.title.contains(searchText),
            TodoListTable.description.contains(searchText)))
    results = session.exec(statement)
    searchedTasks = results.all()
    print("Searched Tasks=>", searchedTasks)
    return searchedTasks


@router.get("/get_user_task")
def get_user_task(token:  Annotated[str, Depends(auth)],
                  session: SessionDep,
                  offset: int = 0,
                  limit: Annotated[int, Query(le=100)] = 100,
                  ) -> list[TodoListTable]:
    lists = session.exec(
        select(TodoListTable).offset(offset).limit(limit)).all()
    return lists


@router.delete("/delete_task/{id}")
def delete_task(id: int, session: SessionDep):
    list = session.get(TodoListTable, id)
    if not list:
        raise HTTPException(status_code=404, detail="item not found")
    else:
        session.delete(list)
        session.commit()
        return {"message": "Deleted"}
