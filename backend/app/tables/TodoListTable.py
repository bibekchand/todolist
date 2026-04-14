from ..model.TodoListBase import TodoListBase
from sqlmodel import Field


class TodoListTable(TodoListBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
