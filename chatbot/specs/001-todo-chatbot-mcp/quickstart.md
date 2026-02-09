# Quickstart Guide: Todo AI Chatbot

## Overview
This guide provides a quick introduction to setting up and running the Todo AI Chatbot application locally.

## Prerequisites
- Python 3.11+
- Node.js 18+ (for frontend)
- PostgreSQL (or Neon Serverless PostgreSQL account)
- OpenAI API key
- MCP SDK

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-ai-chatbot
```

### 2. Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables by copying the example:
```bash
cp .env.example .env
```

5. Update the `.env` file with your configuration:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_chatbot
OPENAI_API_KEY=your_openai_api_key
NEON_DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:8000
```

### 3. Database Setup
1. Run database migrations:
```bash
alembic upgrade head
```

2. (Optional) Seed the database with initial data:
```bash
python -m scripts.seed_db
```

### 4. Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_CHATKIT_SERVER_URL=your_chatkit_server_url
```

### 5. Running the Application

#### Backend
From the backend directory:
```bash
uvicorn src.main:app --reload --port 8000
```

#### Frontend
From the frontend directory:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`

## Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL database connection string
- `OPENAI_API_KEY`: OpenAI API key for the AI agent
- `NEON_DATABASE_URL`: Neon Serverless PostgreSQL URL
- `BETTER_AUTH_SECRET`: Secret key for Better Auth
- `BETTER_AUTH_URL`: URL for Better Auth service

### MCP Server Configuration
The MCP server will be initialized automatically when the backend starts. It will register the following tools:
- `add_task`: Creates a new task
- `list_tasks`: Lists tasks for a user
- `complete_task`: Marks a task as completed
- `delete_task`: Deletes a task
- `update_task`: Updates task details

## Usage Examples

### Starting a Conversation
Send a POST request to `/api/{user_id}/chat`:
```bash
curl -X POST http://localhost:8000/api/user123/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_auth_token" \
  -d '{"message": "Add 'buy groceries' to my todo list"}'
```

### Listing Tasks
```bash
curl -X GET http://localhost:8000/api/user123/tasks \
  -H "Authorization: Bearer your_auth_token"
```

### Creating a Task Directly
```bash
curl -X POST http://localhost:8000/api/user123/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_auth_token" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

## Troubleshooting

### Common Issues
1. **Database Connection Errors**: Verify your `DATABASE_URL` is correct and the database is running
2. **Authentication Errors**: Ensure your auth token is valid and the Better Auth service is running
3. **MCP Tools Not Available**: Check that the MCP server started correctly and registered all tools

### Logs
Check the application logs for detailed error information:
- Backend logs: Console output when running uvicorn
- Frontend logs: Browser console

## Development

### Running Tests
Backend tests:
```bash
cd backend
pytest
```

Frontend tests:
```bash
cd frontend
npm run test
```

### Adding New MCP Tools
To add a new MCP tool:
1. Create a new module in `src/services/mcp_tools/`
2. Implement the tool function with proper user_id validation
3. Register the tool in the MCP server initialization

### Updating the Data Model
1. Modify the model classes in `src/models/`
2. Create a new Alembic migration:
```bash
alembic revision --autogenerate -m "Description of changes"
```
3. Review and update the generated migration file
4. Apply the migration:
```bash
alembic upgrade head
```