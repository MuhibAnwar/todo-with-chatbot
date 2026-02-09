from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.api import auth_router, tasks_router, chat_router
from src.core.config import create_tables
import os
from dotenv import load_dotenv
import asyncio

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the database tables on startup
    try:
        await create_tables()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")
        # Continue anyway to allow the app to start
    yield
    # Cleanup operations would go here on shutdown


app = FastAPI(
    title="Todo API",
    description="Secure Todo API with JWT authentication",
    version="1.0.0",
    lifespan=lifespan
)


# Include routers
app.include_router(auth_router)
app.include_router(tasks_router, prefix="/{user_id}")
app.include_router(chat_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}