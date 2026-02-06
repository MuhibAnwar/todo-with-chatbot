from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List
from src.database import get_session
from src.services.task_service import TaskService
from src.models.user import Task, TaskBase
from src.core.security import verify_token
from src.models.user import User
from src.api.deps import get_current_user
import uuid

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[Task])
async def get_tasks(
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Get all tasks for the authenticated user"""
    task_service = TaskService(db_session)
    tasks = await task_service.get_tasks_by_user(user.id)
    return tasks


@router.post("/", response_model=Task)
async def create_task(
    task_data: TaskBase,
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Create a new task for the authenticated user"""
    task_service = TaskService(db_session)
    task = await task_service.create_task(
        user_id=user.id,
        title=task_data.title,
        description=task_data.description
    )
    return task


@router.get("/{task_id}", response_model=Task)
async def get_task(
    task_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Get a specific task for the authenticated user"""
    task_service = TaskService(db_session)
    task = await task_service.get_task_by_id(task_id, user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task


@router.put("/{task_id}", response_model=Task)
async def update_task(
    task_id: uuid.UUID,
    task_data: TaskBase,
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Update a specific task for the authenticated user"""
    task_service = TaskService(db_session)
    updated_task = await task_service.update_task(
        task_id=task_id,
        user_id=user.id,
        title=task_data.title,
        description=task_data.description
    )
    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return updated_task


@router.delete("/{task_id}")
async def delete_task(
    task_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Delete a specific task for the authenticated user"""
    task_service = TaskService(db_session)
    success = await task_service.delete_task(task_id, user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return {"message": "Task deleted successfully"}


@router.patch("/{task_id}/complete")
async def toggle_task_completion(
    task_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_session)
):
    """Toggle the completion status of a specific task for the authenticated user"""
    task_service = TaskService(db_session)
    task = await task_service.toggle_task_completion(task_id, user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return {"completed": task.completed}