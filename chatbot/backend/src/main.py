from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from .api.chat import router as chat_router
from .services.database import create_db_and_tables
from .mcp.server import initialize_mcp_server
import traceback
import logging


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler to initialize and cleanup resources.
    """
    # Startup: Initialize database and MCP server
    print("Initializing database...")
    create_db_and_tables()
    
    print("Initializing MCP server...")
    initialize_mcp_server()
    
    yield  # Application runs here
    
    # Shutdown: Cleanup resources if needed
    print("Shutting down...")


# Create FastAPI app with lifespan
app = FastAPI(
    title="Todo AI Chatbot API",
    description="An AI-powered todo management system using natural language",
    version="1.0.0",
    lifespan=lifespan
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler to catch unhandled exceptions and return user-friendly responses.
    """
    logger.error(f"Unhandled exception: {exc}\nTraceback: {traceback.format_exc()}")
    
    # Return a user-friendly error response
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred. Our team has been notified and is working on resolving the issue."
            }
        }
    )


# Include API routes
app.include_router(chat_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo AI Chatbot API!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}