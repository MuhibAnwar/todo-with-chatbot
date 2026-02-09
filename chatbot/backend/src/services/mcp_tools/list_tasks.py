"""
MCP tool for listing tasks.
"""
from typing import Dict, Any, List
from uuid import UUID
from ...models.task import Task
from ..database import DatabaseService
import logging


# Set up logging
logger = logging.getLogger(__name__)


def list_tasks(user_id: str, status: str = None) -> Dict[str, Any]:
    """
    MCP tool to list tasks for a user, optionally filtered by status.
    
    Args:
        user_id: The ID of the user whose tasks to list
        status: Optional status filter ('all', 'pending', 'completed')
        
    Returns:
        Dictionary containing the list of tasks
    """
    try:
        # Validate inputs
        if not user_id or not user_id.strip():
            return {
                "success": False,
                "error": "User ID is required and cannot be empty"
            }
        
        # Validate status parameter if provided
        if status and status.lower() not in ["all", "pending", "completed"]:
            return {
                "success": False,
                "error": f"Invalid status filter: {status}. Valid values are 'all', 'pending', 'completed'"
            }
        
        # Get tasks from the database service
        tasks = DatabaseService.get_tasks(user_id, status)
        
        # Format tasks for response
        formatted_tasks = []
        for task in tasks:
            formatted_tasks.append({
                "id": str(task.id),
                "title": task.title,
                "description": task.description,
                "completed": task.completed,
                "created_at": task.created_at.isoformat(),
                "updated_at": task.updated_at.isoformat()
            })
        
        # Log successful task listing
        logger.info(f"Listed {len(formatted_tasks)} tasks for user {user_id}")
        
        # Return success response with tasks
        return {
            "success": True,
            "tasks": formatted_tasks,
            "count": len(formatted_tasks)
        }
    except Exception as e:
        # Log the error
        logger.error(f"Error listing tasks for user {user_id}: {str(e)}")
        
        # Return error response
        return {
            "success": False,
            "error": f"Failed to list tasks: {str(e)}"
        }