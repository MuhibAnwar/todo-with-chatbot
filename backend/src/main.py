from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.api import auth_router, tasks_router
from src.core.config import create_tables
import os
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the database tables on startup
    await create_tables()
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


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}