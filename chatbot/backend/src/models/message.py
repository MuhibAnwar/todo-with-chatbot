from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
import enum


class Role(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Message(SQLModel, table=True):
    """
    Represents individual messages in a conversation, storing both user inputs 
    and assistant responses.
    """
    user_id: str = Field(foreign_key="users.id", nullable=False)
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    conversation_id: UUID = Field(foreign_key="conversation.id", nullable=False)
    role: Role = Field(sa_column_kwargs={"check": "role IN ('user', 'assistant')"})
    content: str = Field(min_length=1)
    created_at: datetime = Field(default_factory=datetime.now)
    
    def __str__(self):
        return f"[{self.role.value}] {self.content[:50]}..."