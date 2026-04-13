from sqlmodel import SQLModel, Field


class UserTable(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str
    email: str
