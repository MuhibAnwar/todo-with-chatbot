"""
API endpoint for the chat functionality.
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from uuid import UUID
import os
from pydantic import BaseModel
from ...models.message import Message, Role
from ...services.database import DatabaseService, get_session
from ...agents.todo_agent import TodoAgent
from ...services.auth import get_current_user
from ...services.conversation_service import ConversationService


router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    conversation_id: str
    response: str


@router.post("/api/{user_id}/chat", response_model=ChatResponse)
async def chat_endpoint(
    user_id: str,
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Chat endpoint that processes natural language requests and returns AI responses.
    
    Args:
        user_id: The ID of the user making the request
        request: The chat request containing the message and optional conversation ID
        
    Returns:
        ChatResponse containing the conversation ID and AI response
    """
    # Input validation
    if not user_id or not user_id.strip():
        raise HTTPException(status_code=400, detail="User ID is required and cannot be empty")
    
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required and cannot be empty")
    
    if len(request.message.strip()) > 1000:  # Arbitrary limit, adjust as needed
        raise HTTPException(status_code=400, detail="Message is too long")
    
    if request.conversation_id is not None and request.conversation_id.strip():
        # Validate conversation_id format if provided
        try:
            UUID(request.conversation_id)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid conversation ID format")
    
    # Verify that the authenticated user matches the requested user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Cannot access another user's data")
    
    try:
        # Initialize the AI agent
        agent = TodoAgent()
        
        # Get or create conversation using the conversation service
        conversation = ConversationService.get_or_create_conversation(
            user_id=user_id,
            conversation_id=request.conversation_id
        )
        
        # Get conversation history for context
        from ...services.message_service import MessageService
        messages = MessageService.get_messages(user_id, conversation.id)
        conversation_history = []
        for msg in messages:
            conversation_history.append({
                "role": msg.role.value,
                "content": msg.content
            })
        
        # Save the user's message to the conversation
        user_message = DatabaseService.create_message(
            user_id=user_id,
            conversation_id=conversation.id,
            role=Role.USER,
            content=request.message
        )
        
        # Process the request with the AI agent
        ai_response = agent.process_request(
            user_id=user_id,
            message=request.message,
            conversation_history=conversation_history
        )
        
        # Save the AI's response to the conversation
        ai_message = DatabaseService.create_message(
            user_id=user_id,
            conversation_id=conversation.id,
            role=Role.ASSISTANT,
            content=ai_response
        )
        
        # Update the conversation's updated_at timestamp
        # In a real implementation, this would be handled by the database service
        
        # Return the response
        return ChatResponse(
            conversation_id=str(conversation.id),
            response=ai_response
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log the error (in a real app, use proper logging)
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")