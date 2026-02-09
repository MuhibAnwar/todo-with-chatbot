"""
AI Agent for the Todo Chatbot using OpenAI's API and MCP tools.
"""
from typing import Dict, Any, List
from openai import OpenAI
import json
import os
from ..services.mcp_tools.add_task import add_task
from ..services.mcp_tools.list_tasks import list_tasks
from ..services.mcp_tools.complete_task import complete_task
from ..services.mcp_tools.delete_task import delete_task
from ..services.mcp_tools.update_task import update_task


class TodoAgent:
    """
    AI Agent that handles natural language requests and maps them to appropriate
    MCP tools for task management.
    """
    
    def __init__(self):
        # Initialize OpenAI client
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Define available tools
        self.tools = {
            "add_task": {
                "function": add_task,
                "description": "Add a new task to the user's todo list",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "description": "The user's ID"},
                        "title": {"type": "string", "description": "The title of the task"},
                        "description": {"type": "string", "description": "Optional description of the task"}
                    },
                    "required": ["user_id", "title"]
                }
            },
            "list_tasks": {
                "function": list_tasks,
                "description": "List tasks for the user, optionally filtered by status",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "description": "The user's ID"},
                        "status": {"type": "string", "enum": ["all", "pending", "completed"], "description": "Filter tasks by status"}
                    },
                    "required": ["user_id"]
                }
            },
            "complete_task": {
                "function": complete_task,
                "description": "Mark a task as completed",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "description": "The user's ID"},
                        "task_id": {"type": "string", "description": "The ID of the task to complete"}
                    },
                    "required": ["user_id", "task_id"]
                }
            },
            "delete_task": {
                "function": delete_task,
                "description": "Delete a task",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "description": "The user's ID"},
                        "task_id": {"type": "string", "description": "The ID of the task to delete"}
                    },
                    "required": ["user_id", "task_id"]
                }
            },
            "update_task": {
                "function": update_task,
                "description": "Update an existing task",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "description": "The user's ID"},
                        "task_id": {"type": "string", "description": "The ID of the task to update"},
                        "title": {"type": "string", "description": "New title for the task (optional)"},
                        "description": {"type": "string", "description": "New description for the task (optional)"},
                        "completed": {"type": "boolean", "description": "New completion status for the task (optional)"}
                    },
                    "required": ["user_id", "task_id"]
                }
            }
        }
    
    def process_request(self, user_id: str, message: str, conversation_history: List[Dict[str, str]] = None) -> str:
        """
        Process a natural language request from a user and return an appropriate response.
        
        Args:
            user_id: The ID of the user making the request
            message: The natural language message from the user
            conversation_history: Previous messages in the conversation (for context)
            
        Returns:
            Natural language response to the user
        """
        # Prepare messages for the AI model
        system_prompt = """
        You are a helpful AI assistant that manages a user's todo list. 
        You can add, list, update, complete, and delete tasks.
        Always use the appropriate tools to perform these actions.
        When listing tasks, if the user doesn't specify a status, show all tasks.
        Be concise and friendly in your responses.
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
        ]
        
        # Add conversation history if provided
        if conversation_history:
            for msg in conversation_history:
                messages.append({"role": msg["role"], "content": msg["content"]})
        
        # Add the current user message
        messages.append({"role": "user", "content": message})
        
        try:
            # Call the OpenAI API with function calling
            response = self.client.chat.completions.create(
                model="gpt-4-turbo",  # Using a capable model for function calling
                messages=messages,
                tools=[
                    {
                        "type": "function",
                        "function": {
                            "name": name,
                            "description": tool_info["description"],
                            "parameters": tool_info["parameters"]
                        }
                    }
                    for name, tool_info in self.tools.items()
                ],
                tool_choice="auto"
            )
            
            # Process the response
            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls
            
            if tool_calls:
                # Process tool calls
                tool_results = []
                
                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    # Add user_id to function arguments if not present
                    if "user_id" not in function_args:
                        function_args["user_id"] = user_id
                    
                    # Execute the appropriate function
                    if function_name in self.tools:
                        result = self.tools[function_name]["function"](**function_args)
                        tool_results.append({
                            "tool_call_id": tool_call.id,
                            "role": "tool",
                            "name": function_name,
                            "content": json.dumps(result)
                        })
                
                # Get the final response from the AI with tool results
                final_messages = messages + [response_message] + tool_results
                final_response = self.client.chat.completions.create(
                    model="gpt-4-turbo",
                    messages=final_messages
                )
                
                return final_response.choices[0].message.content
            else:
                # If no tool calls were made, return the AI's direct response
                return response_message.content
                
        except Exception as e:
            # Handle any errors gracefully
            print(f"Error in AI agent: {str(e)}")  # Log error internally
            return "I'm sorry, I encountered an error processing your request. My team has been notified and is looking into the issue. Please try rephrasing your request."
    
    def get_available_tools(self) -> List[str]:
        """
        Get a list of available tools.
        
        Returns:
            List of tool names
        """
        return list(self.tools.keys())