from sqlmodel import SQLModel, Field


class TodoListBase(SQLModel):
    title:  str | None = Field(default=None, index=True)
    description: str | None = Field(default=None, index=True)
    time: str | None = Field(default=None, index=True)
    status: bool | None = Field(default=None, index=True)
