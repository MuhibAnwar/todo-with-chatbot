"""
MCP tool for deleting a task.
"""
from typing import Dict, Any
from uuid import UUID
from ..database import DatabaseService
import logging


# Set up logging
logger = logging.getLogger(__name__)


def delete_task(user_id: str, task_id: str) -> Dict[str, Any]:
    """
    MCP tool to delete a task.

    Args:
        user_id: The ID of the user who owns the task
        task_id: The ID of the task to delete

    Returns:
        Dictionary containing the result of the operation
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

        # Attempt to delete the task using the database service
        success = DatabaseService.delete_task(user_id, uuid_task_id)

        if not success:
            return {
                "success": False,
                "error": f"Task with ID {task_id} not found or does not belong to user {user_id}"
            }

        # Log successful task deletion
        logger.info(f"Task deleted successfully: {task_id} for user {user_id}")

        # Return success response
        return {
            "success": True,
            "message": f"Task with ID {task_id} has been successfully deleted"
        }
    except Exception as e:
        # Log the error
        logger.error(f"Error deleting task {task_id} for user {user_id}: {str(e)}")

        # Return error response
        return {
            "success": False,
            "error": f"Failed to delete task: {str(e)}"
        }