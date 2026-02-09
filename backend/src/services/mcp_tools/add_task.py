"""
MCP tool for adding a new task.
"""
from typing import Dict, Any
from ...models.user import TaskBase
from ..database import DatabaseService
import logging


# Set up logging
logger = logging.getLogger(__name__)


def add_task(user_id: str, title: str, description: str = None) -> Dict[str, Any]:
    """
    MCP tool to add a new task for a user.

    Args:
        user_id: The ID of the user creating the task
        title: The title of the task
        description: Optional description of the task

    Returns:
        Dictionary containing the created task information
    """
    try:
        # Validate inputs
        if not user_id or not user_id.strip():
            return {
                "success": False,
                "error": "User ID is required and cannot be empty"
            }

        if not title or not title.strip():
            return {
                "success": False,
                "error": "Task title is required and cannot be empty"
            }

        # Create task data object
        task_data = TaskBase(
            title=title.strip(),
            description=description.strip() if description else None,
            completed=False
        )

        # Create the task using the database service
        task = DatabaseService.create_task(user_id, task_data)

        # Log successful task creation
        logger.info(f"Task created successfully: {task.id} for user {user_id}")

        # Return success response with task details
        return {
            "success": True,
            "task": {
                "id": str(task.id),
                "title": task.title,
                "description": task.description,
                "completed": task.completed,
                "created_at": task.created_at.isoformat()
            }
        }
    except Exception as e:
        # Log the error
        logger.error(f"Error creating task for user {user_id}: {str(e)}")

        # Return error response
        return {
            "success": False,
            "error": f"Failed to create task: {str(e)}"
        }