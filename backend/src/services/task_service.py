from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi import HTTPException, status
from typing import List, Optional
from src.models.user import Task, TaskBase, User
from sqlmodel import select, update, delete
import uuid


class TaskService:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_task(self, user_id: uuid.UUID, title: str, description: Optional[str] = None) -> Task:
        """Create a new task for the specified user"""
        task = Task(
            title=title,
            description=description,
            user_id=user_id
        )
        
        self.db_session.add(task)
        await self.db_session.commit()
        await self.db_session.refresh(task)
        
        return task

    async def get_tasks_by_user(self, user_id: uuid.UUID) -> List[Task]:
        """Get all tasks for the specified user"""
        statement = select(Task).where(Task.user_id == user_id)
        result = await self.db_session.execute(statement)
        tasks = result.all()
        return [task[0] for task in tasks]  # Extract Task objects from tuples

    async def get_task_by_id(self, task_id: uuid.UUID, user_id: uuid.UUID) -> Optional[Task]:
        """Get a specific task by its ID for the specified user"""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        result = await self.db_session.execute(statement)
        task = result.first()
        return task[0] if task else None

    async def update_task(self, task_id: uuid.UUID, user_id: uuid.UUID, title: Optional[str] = None, 
                         description: Optional[str] = None, completed: Optional[bool] = None) -> Optional[Task]:
        """Update a specific task for the specified user"""
        # First, get the task to ensure it exists and belongs to the user
        task = await self.get_task_by_id(task_id, user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or does not belong to user"
            )
        
        # Prepare update data
        update_data = {}
        if title is not None:
            update_data["title"] = title
        if description is not None:
            update_data["description"] = description
        if completed is not None:
            update_data["completed"] = completed
        
        # Perform the update
        statement = (
            update(Task)
            .where(Task.id == task_id, Task.user_id == user_id)
            .values(**update_data)
        )
        await self.db_session.execute(statement)
        await self.db_session.commit()
        
        # Refresh and return the updated task
        await self.db_session.refresh(task)
        return task

    async def toggle_task_completion(self, task_id: uuid.UUID, user_id: uuid.UUID) -> Optional[Task]:
        """Toggle the completion status of a specific task for the specified user"""
        task = await self.get_task_by_id(task_id, user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or does not belong to user"
            )
        
        # Toggle the completion status
        task.completed = not task.completed
        
        self.db_session.add(task)
        await self.db_session.commit()
        await self.db_session.refresh(task)
        
        return task

    async def delete_task(self, task_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        """Delete a specific task for the specified user"""
        # Check if the task exists and belongs to the user
        task = await self.get_task_by_id(task_id, user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or does not belong to user"
            )
        
        # Delete the task
        statement = delete(Task).where(Task.id == task_id, Task.user_id == user_id)
        result = await self.db_session.execute(statement)
        await self.db_session.commit()
        
        return result.rowcount > 0