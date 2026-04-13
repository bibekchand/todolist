from pydantic import BaseModel
from sqlmodel import Field


class UserCreate(BaseModel):
    username: str = Field(min_length=1)
    password: str
    email: str | None = Field(min_length=1)
