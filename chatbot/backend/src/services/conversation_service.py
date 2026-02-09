"""
Service for managing conversations.
"""
from typing import Optional, List
from uuid import UUID
from ..models.conversation import Conversation
from ..services.database import DatabaseService


class ConversationService:
    """
    Service class to handle conversation-related operations.
    """
    
    @staticmethod
    def get_or_create_conversation(user_id: str, conversation_id: Optional[str] = None) -> Conversation:
        """
        Get an existing conversation or create a new one.
        
        Args:
            user_id: The ID of the user
            conversation_id: Optional conversation ID to retrieve
            
        Returns:
            The conversation object
        """
        if conversation_id:
            # Try to get existing conversation
            try:
                uuid_conv_id = UUID(conversation_id)
                conversation = DatabaseService.get_conversation(user_id, uuid_conv_id)
                if not conversation:
                    raise ValueError(f"Conversation with ID {conversation_id} not found")
                return conversation
            except ValueError:
                raise ValueError(f"Invalid conversation ID format: {conversation_id}")
        else:
            # Create a new conversation
            return DatabaseService.create_conversation(user_id)
    
    @staticmethod
    def get_user_conversations(user_id: str) -> List[Conversation]:
        """
        Get all conversations for a specific user.
        
        Args:
            user_id: The ID of the user
            
        Returns:
            List of conversations for the user
        """
        return DatabaseService.get_user_conversations(user_id)
    
    @staticmethod
    def update_conversation_title(conversation_id: UUID, title: str) -> bool:
        """
        Update the title of a conversation.
        
        Args:
            conversation_id: The ID of the conversation to update
            title: The new title for the conversation
            
        Returns:
            True if the update was successful, False otherwise
        """
        return DatabaseService.update_conversation_title(conversation_id, title)
    
    @staticmethod
    def delete_conversation(user_id: str, conversation_id: UUID) -> bool:
        """
        Delete a conversation if it belongs to the user.
        
        Args:
            user_id: The ID of the user
            conversation_id: The ID of the conversation to delete
            
        Returns:
            True if the deletion was successful, False otherwise
        """
        return DatabaseService.delete_conversation(user_id, conversation_id)