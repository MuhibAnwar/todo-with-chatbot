from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database import get_session
from src.core.security import verify_token, security
from src.models.user import User


async def get_current_user(
    token: str = Depends(security),
    db_session: AsyncSession = Depends(get_session)
) -> User:
    """Dependency to get the current authenticated user"""
    return await verify_token(token.credentials, db_session)