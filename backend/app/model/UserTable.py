from pydantic import BaseModel
from sqlmodel import Field


class UserTable(BaseModel):
    username: str = Field(min_length=4)
    password: str = Field(min_length=8)
