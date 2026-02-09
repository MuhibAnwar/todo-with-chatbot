from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from sqlalchemy.pool import NullPool
from sqlmodel import SQLModel
from typing import AsyncGenerator
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

# Import models to ensure they're registered with SQLModel metadata
from ..models.user import User, Task  # noqa: F401
from ..models.message import Message  # noqa: F401
from ..models.conversation import Conversation  # noqa: F401

# Use an async-compatible database URL (sqlite+aiosqlite for local development)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./test.db")

engine = create_async_engine(
    DATABASE_URL,
    poolclass=NullPool,  # Use NullPool for async engines
)


async def get_session() -> AsyncGenerator:
    from sqlmodel.ext.asyncio.session import AsyncSession
    async with AsyncSession(engine) as session:
        yield session


async def create_tables():
    """Create all tables in the database"""
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)