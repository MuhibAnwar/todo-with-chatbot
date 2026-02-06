from src.core.config import get_session

# This file just exports the get_session dependency
# It's used to avoid circular imports
__all__ = ["get_session"]