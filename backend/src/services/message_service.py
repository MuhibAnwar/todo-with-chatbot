"""
Service for managing messages.
"""
from typing import List
from uuid import UUID
from ..models.message import Message, Role
from ..services.database import DatabaseService


class MessageService:
    """
    Service class to handle message-related operations.
    """

    @staticmethod
    def create_message(
        user_id: str,
        conversation_id: UUID,
        role: Role,
        content: str
    ) -> Message:
        """
        Create a new message in a conversation.

        Args:
            user_id: The ID of the user creating the message
            conversation_id: The ID of the conversation
            role: The role of the message sender (user or assistant)
            content: The content of the message

        Returns:
            The created message object
        """
        return DatabaseService.create_message(user_id, conversation_id, role, content)

    @staticmethod
    def get_messages(user_id: str, conversation_id: UUID) -> List[Message]:
        """
        Get all messages for a specific conversation.

        Args:
            user_id: The ID of the user
            conversation_id: The ID of the conversation

        Returns:
            List of messages in the conversation
        """
        return DatabaseService.get_messages(user_id, conversation_id)

    @staticmethod
    def get_recent_messages(user_id: str, conversation_id: UUID, limit: int = 10) -> List[Message]:
        """
        Get the most recent messages for a specific conversation.

        Args:
            user_id: The ID of the user
            conversation_id: The ID of the conversation
            limit: The maximum number of messages to return

        Returns:
            List of recent messages in the conversation
        """
        all_messages = DatabaseService.get_messages(user_id, conversation_id)
        # Sort by creation time and return the most recent ones
        sorted_messages = sorted(all_messages, key=lambda m: m.created_at, reverse=True)
        return sorted_messages[:limit]