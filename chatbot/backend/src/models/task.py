from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
import enum


class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)


class Task(TaskBase, table=True):
    """
    Represents a user's todo item with properties that allow for creation, 
    updating, and completion tracking.
    """
    user_id: str = Field(foreign_key="users.id", nullable=False)
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    def __str__(self):
        status = "✓" if self.completed else "○"
        return f"{status} [{self.id}] {self.title}"