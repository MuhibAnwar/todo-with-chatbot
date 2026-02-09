from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4


class Conversation(SQLModel, table=True):
    """
    Represents a conversation thread between a user and the AI assistant, 
    allowing for conversation continuity.
    """
    user_id: str = Field(nullable=False)
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str | None = Field(default=None, max_length=255)  # Optional title for the conversation
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    def __str__(self):
        return f"Conversation {self.id} for user {self.user_id}"