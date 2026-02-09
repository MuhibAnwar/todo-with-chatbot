from sqlmodel import create_engine, Session, select
from typing import List, Optional
from uuid import UUID
from ..models.user import Task, TaskBase
from ..models.conversation import Conversation
from ..models.message import Message, Role
from contextlib import contextmanager
import os


# Database URL - using environment variable or default
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_chatbot.db")

# Create engine
engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    """Initialize the database and create tables."""
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)


@contextmanager
def get_session():
    """Provide a transactional scope around a series of operations."""
    with Session(engine) as session:
        yield session


class DatabaseService:
    """Service class to handle all database operations."""

    @staticmethod
    def create_task(user_id: str, task_data: TaskBase) -> Task:
        """Create a new task for a user."""
        with Session(engine) as session:
            task = Task(
                user_id=user_id,
                title=task_data.title,
                description=task_data.description,
                completed=task_data.completed
            )
            session.add(task)
            session.commit()
            session.refresh(task)
            return task

    @staticmethod
    def get_tasks(user_id: str, status: Optional[str] = None) -> List[Task]:
        """Get all tasks for a user, optionally filtered by status."""
        with Session(engine) as session:
            query = select(Task).where(Task.user_id == user_id)

            if status:
                if status.lower() == "completed":
                    query = query.where(Task.completed == True)
                elif status.lower() == "pending":
                    query = query.where(Task.completed == False)

            tasks = session.exec(query).all()
            return tasks

    @staticmethod
    def get_task(user_id: str, task_id: UUID) -> Optional[Task]:
        """Get a specific task by user_id and task_id."""
        with Session(engine) as session:
            query = select(Task).where(Task.user_id == user_id, Task.id == task_id)
            task = session.exec(query).first()
            return task

    @staticmethod
    def update_task(user_id: str, task_id: UUID, task_data: TaskBase) -> Optional[Task]:
        """Update an existing task."""
        with Session(engine) as session:
            query = select(Task).where(Task.user_id == user_id, Task.id == task_id)
            task = session.exec(query).first()

            if not task:
                return None

            task.title = task_data.title
            task.description = task_data.description
            task.completed = task_data.completed

            session.add(task)
            session.commit()
            session.refresh(task)
            return task

    @staticmethod
    def complete_task(user_id: str, task_id: UUID) -> Optional[Task]:
        """Mark a task as completed."""
        with Session(engine) as session:
            query = select(Task).where(Task.user_id == user_id, Task.id == task_id)
            task = session.exec(query).first()

            if not task:
                return None

            task.completed = True
            session.add(task)
            session.commit()
            session.refresh(task)
            return task

    @staticmethod
    def delete_task(user_id: str, task_id: UUID) -> bool:
        """Delete a task."""
        with Session(engine) as session:
            query = select(Task).where(Task.user_id == user_id, Task.id == task_id)
            task = session.exec(query).first()

            if not task:
                return False

            session.delete(task)
            session.commit()
            return True

    @staticmethod
    def create_conversation(user_id: str) -> Conversation:
        """Create a new conversation for a user."""
        with Session(engine) as session:
            conversation = Conversation(user_id=user_id)
            session.add(conversation)
            session.commit()
            session.refresh(conversation)
            return conversation

    @staticmethod
    def get_conversation(user_id: str, conversation_id: UUID) -> Optional[Conversation]:
        """Get a specific conversation by user_id and conversation_id."""
        with Session(engine) as session:
            query = select(Conversation).where(
                Conversation.user_id == user_id,
                Conversation.id == conversation_id
            )
            conversation = session.exec(query).first()
            return conversation

    @staticmethod
    def get_user_conversations(user_id: str) -> List[Conversation]:
        """Get all conversations for a specific user."""
        with Session(engine) as session:
            query = select(Conversation).where(Conversation.user_id == user_id)
            conversations = session.exec(query).all()
            return conversations

    @staticmethod
    def update_conversation_title(conversation_id: UUID, title: str) -> bool:
        """Update the title of a conversation."""
        with Session(engine) as session:
            query = select(Conversation).where(Conversation.id == conversation_id)
            conversation = session.exec(query).first()

            if not conversation:
                return False

            conversation.title = title
            session.add(conversation)
            session.commit()
            return True

    @staticmethod
    def delete_conversation(user_id: str, conversation_id: UUID) -> bool:
        """Delete a conversation if it belongs to the user."""
        with Session(engine) as session:
            query = select(Conversation).where(
                Conversation.user_id == user_id,
                Conversation.id == conversation_id
            )
            conversation = session.exec(query).first()

            if not conversation:
                return False

            session.delete(conversation)
            session.commit()
            return True

    @staticmethod
    def create_message(
        user_id: str,
        conversation_id: UUID,
        role: Role,
        content: str
    ) -> Message:
        """Create a new message in a conversation."""
        with Session(engine) as session:
            message = Message(
                user_id=user_id,
                conversation_id=conversation_id,
                role=role,
                content=content
            )
            session.add(message)
            session.commit()
            session.refresh(message)
            return message

    @staticmethod
    def get_messages(user_id: str, conversation_id: UUID) -> List[Message]:
        """Get all messages for a specific conversation."""
        with Session(engine) as session:
            query = select(Message).where(
                Message.user_id == user_id,
                Message.conversation_id == conversation_id
            ).order_by(Message.created_at)
            messages = session.exec(query).all()
            return messages