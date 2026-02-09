"""
MCP tool for completing a task.
"""
from typing import Dict, Any
from uuid import UUID
from ..database import DatabaseService
import logging


# Set up logging
logger = logging.getLogger(__name__)


def complete_task(user_id: str, task_id: str) -> Dict[str, Any]:
    """
    MCP tool to mark a task as completed.

    Args:
        user_id: The ID of the user who owns the task
        task_id: The ID of the task to complete

    Returns:
        Dictionary containing the updated task information
    """
    try:
        # Validate inputs
        if not user_id or not user_id.strip():
            return {
                "success": False,
                "error": "User ID is required and cannot be empty"
            }

        if not task_id or not task_id.strip():
            return {
                "success": False,
                "error": "Task ID is required and cannot be empty"
            }

        try:
            uuid_task_id = UUID(task_id)
        except ValueError:
            return {
                "success": False,
                "error": f"Invalid task ID format: {task_id}"
            }

        # Attempt to complete the task using the database service
        task = DatabaseService.complete_task(user_id, uuid_task_id)

        if task is None:
            return {
                "success": False,
                "error": f"Task with ID {task_id} not found or does not belong to user {user_id}"
            }

        # Log successful task completion
        logger.info(f"Task completed successfully: {task.id} for user {user_id}")

        # Return success response with updated task details
        return {
            "success": True,
            "task": {
                "id": str(task.id),
                "title": task.title,
                "description": task.description,
                "completed": task.completed,
                "created_at": task.created_at.isoformat(),
                "updated_at": task.updated_at.isoformat()
            }
        }
    except Exception as e:
        # Log the error
        logger.error(f"Error completing task {task_id} for user {user_id}: {str(e)}")

        # Return error response
        return {
            "success": False,
            "error": f"Failed to complete task: {str(e)}"
        }