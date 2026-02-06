from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid


class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False)


class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, nullable=False)
    password_hash: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TaskBase(SQLModel):
    title: str = Field(nullable=False)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)


class Task(SQLModel, table=True):
    __tablename__ = "tasks"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    title: str = Field(nullable=False)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)