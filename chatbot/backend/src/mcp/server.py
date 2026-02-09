"""
MCP Server initialization.
"""
from mcp import Server
from .services.mcp_tools.add_task import add_task
from .services.mcp_tools.list_tasks import list_tasks
from .services.mcp_tools.complete_task import complete_task
from .services.mcp_tools.delete_task import delete_task
from .services.mcp_tools.update_task import update_task


def initialize_mcp_server():
    """
    Initialize the MCP server and register all tools.
    """
    print("Setting up MCP server...")
    
    # Create the MCP server instance
    # Note: This is a placeholder implementation as the actual MCP SDK
    # might have a different interface
    server = Server(
        name="todo-chatbot-mcp-server",
        version="1.0.0"
    )
    
    # Register all task management tools with the server
    server.add_tool("add_task", add_task)
    server.add_tool("list_tasks", list_tasks)
    server.add_tool("complete_task", complete_task)
    server.add_tool("delete_task", delete_task)
    server.add_tool("update_task", update_task)
    
    # Start the server
    # Note: Actual MCP SDK may have different startup mechanism
    print("MCP server initialized with tools:")
    print("- add_task")
    print("- list_tasks") 
    print("- complete_task")
    print("- delete_task")
    print("- update_task")
    
    return server