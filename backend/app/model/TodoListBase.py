from pydantic import SQLModel, Field


class ToDolistBase(SQLModel):
    title:  str | None = Field(default=None, index=True)
    description: str | None = Field(default=None, index=True)
    time: str | None = Field(default=None, index=True)
    status: bool | None = Field(default=None, index=True)
