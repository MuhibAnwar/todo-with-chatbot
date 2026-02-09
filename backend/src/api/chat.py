"""
API endpoint for the chat functionality.
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from uuid import UUID
import os
from pydantic import BaseModel
from src.models.message import Message, Role
from src.services.database import DatabaseService
from src.agents.todo_agent import TodoAgent
from src.api.deps import get_current_user
from src.services.conversation_service import ConversationService


router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    conversation_id: str
    response: str


from fastapi import Header, HTTPException
from typing import Optional
from jose import JWTError, jwt
import os
from src.core.security import SECRET_KEY, ALGORITHM

async def get_current_user_optional(authorization: Optional[str] = Header(None)):
    """
    Dependency to get the current user from the authorization header, if available.
    Returns None if no valid token is provided.
    """
    if not authorization:
        return None
    
    try:
        # Extract token from "Bearer <token>" format
        if authorization.startswith("Bearer "):
            token = authorization[7:]
        else:
            token = authorization
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_claim = payload.get("sub")
        if user_id_claim:
            return {"user_id": user_id_claim}
    except JWTError:
        # Invalid token, return None to allow guest access
        pass
    
    return None

@router.post("/api/{user_id}/chat", response_model=ChatResponse)
async def chat_endpoint(
    user_id: str,
    request: ChatRequest,
    authorization: Optional[str] = Header(None)
):
    """
    Chat endpoint that processes natural language requests and returns AI responses.

    Args:
        user_id: The ID of the user making the request
        request: The chat request containing the message and optional conversation ID
        authorization: Optional authorization header

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

    # Get current user from token if available
    current_user = await get_current_user_optional(authorization)

    # For guest users (user-123), skip the authentication check
    # In production, you would want to implement proper authentication
    if user_id != "user-123":  # Guest user ID
        # Verify that the authenticated user matches the requested user_id
        if not current_user or current_user["user_id"] != user_id:
            raise HTTPException(status_code=403, detail="Access denied: Cannot access another user's data")

    try:
        # Initialize the AI agent
        try:
            agent = TodoAgent()
        except Exception as e:
            print(f"Error initializing AI agent: {str(e)}")
            # Return a mock response for demo purposes if API key is not set
            return ChatResponse(
                conversation_id="demo-conversation-id",
                response="Hello! I'm your AI assistant. I can help you manage your tasks. For example, you can ask me to add, list, update, or complete tasks. What would you like to do today?"
            )

        # Get or create conversation using the conversation service
        conversation = ConversationService.get_or_create_conversation(
            user_id=user_id,
            conversation_id=request.conversation_id
        )

        # Get conversation history for context
        from src.services.message_service import MessageService
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