from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import HTTPBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import Dict
from src.database import get_session
from src.services.auth import AuthService
from pydantic import BaseModel
from src.api.deps import get_current_user
from src.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

class UserRegistration(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


@router.post("/register")
async def register(
    user_data: UserRegistration,
    db_session: AsyncSession = Depends(get_session)
):
    """Register a new user"""
    auth_service = AuthService(db_session)
    user = await auth_service.register_user(
        email=user_data.email,
        password=user_data.password
    )
    return {"message": "User registered successfully", "user_id": str(user.id)}


@router.post("/login")
async def login(
    user_credentials: UserLogin,
    db_session: AsyncSession = Depends(get_session)
):
    """Login a user and return an access token"""
    auth_service = AuthService(db_session)
    user = await auth_service.authenticate_user(user_credentials.email, user_credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = await auth_service.create_access_token_for_user(user)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/logout")
async def logout(user: User = Depends(get_current_user)):
    """Logout a user (client-side token invalidation)"""
    # In a real implementation, you might add the token to a blacklist
    # For now, we just return a success message
    return {"message": "Logged out successfully"}