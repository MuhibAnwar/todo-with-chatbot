"""
MCP tool for updating a task.
"""
from typing import Dict, Any
from uuid import UUID
from ...models.user import TaskBase
from ..database import DatabaseService
import logging


# Set up logging
logger = logging.getLogger(__name__)


def update_task(
    user_id: str,
    task_id: str,
    title: str = None,
    description: str = None,
    completed: bool = None
) -> Dict[str, Any]:
    """
    MCP tool to update an existing task.

    Args:
        user_id: The ID of the user who owns the task
        task_id: The ID of the task to update
        title: New title for the task (optional)
        description: New description for the task (optional)
        completed: New completion status for the task (optional)

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

        # Get the existing task to use current values where not updated
        existing_task = DatabaseService.get_task(user_id, uuid_task_id)
        if not existing_task:
            return {
                "success": False,
                "error": f"Task with ID {task_id} not found or does not belong to user {user_id}"
            }

        # Prepare updated values, keeping existing values where not provided
        updated_title = title if title is not None else existing_task.title
        updated_description = description if description is not None else existing_task.description
        updated_completed = completed if completed is not None else existing_task.completed

        # Validate title is not empty
        if not updated_title or not updated_title.strip():
            return {
                "success": False,
                "error": "Task title cannot be empty"
            }

        # Create task data object with updated values
        task_data = TaskBase(
            title=updated_title.strip(),
            description=updated_description.strip() if updated_description else None,
            completed=updated_completed
        )

        # Update the task using the database service
        updated_task = DatabaseService.update_task(user_id, uuid_task_id, task_data)

        if updated_task is None:
            return {
                "success": False,
                "error": f"Failed to update task with ID {task_id}"
            }

        # Log successful task update
        logger.info(f"Task updated successfully: {updated_task.id} for user {user_id}")

        # Return success response with updated task details
        return {
            "success": True,
            "task": {
                "id": str(updated_task.id),
                "title": updated_task.title,
                "description": updated_task.description,
                "completed": updated_task.completed,
                "created_at": updated_task.created_at.isoformat(),
                "updated_at": updated_task.updated_at.isoformat()
            }
        }
    except Exception as e:
        # Log the error
        logger.error(f"Error updating task {task_id} for user {user_id}: {str(e)}")

        # Return error response
        return {
            "success": False,
            "error": f"Failed to update task: {str(e)}"
        }