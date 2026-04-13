from .TodoListBase import todolistBase
from pydantic import Field


class TodolistTable(todolistBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
