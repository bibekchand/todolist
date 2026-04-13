from fastapi import Depends, APIRouter
from ..dependencies import verify_token
from ..tables import TodoListTable
from ..models import TodoListBase
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
async def searchTasks(searchText: str, session: SessionDep):
    if not searchText:
        return []
    statement = select(TodoListTable).where(
        or_(TodoListTable.title.contains(searchText),
            TodoListTable.description.contains(searchText)))
    results = session.exec(statement)
    searchedTasks = results.all()
    print("Searched Tasks=>", searchedTasks)
    return searchedTasks
