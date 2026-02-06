from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi import HTTPException, status
from typing import Optional
from src.models.user import User, UserBase
from src.core.security import verify_password, get_password_hash, create_access_token
from sqlmodel import select
from datetime import timedelta
import uuid
import os


# Get the access token expiry from environment variable
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))


class AuthService:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def register_user(self, email: str, password: str) -> User:
        """Register a new user with the provided email and password"""
        # Check if user already exists
        existing_user = await self.get_user_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash the password
        hashed_password = get_password_hash(password)
        
        # Create the new user
        user = User(
            email=email,
            password_hash=hashed_password
        )
        
        # Add to database
        self.db_session.add(user)
        await self.db_session.commit()
        await self.db_session.refresh(user)
        
        return user

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate a user with email and password"""
        user = await self.get_user_by_email(email)
        if not user or not verify_password(password, user.password_hash):
            return None
        return user

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get a user by their email address"""
        statement = select(User).where(User.email == email)
        result = await self.db_session.execute(statement)
        user = result.first()
        return user[0] if user else None

    async def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        """Get a user by their ID"""
        statement = select(User).where(User.id == user_id)
        result = await self.db_session.execute(statement)
        user = result.first()
        return user[0] if user else None

    async def create_access_token_for_user(self, user: User) -> str:
        """Create an access token for the given user"""
        data = {"sub": str(user.id)}
        token = create_access_token(
            data=data,
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return token