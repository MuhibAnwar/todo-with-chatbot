# Todo AI Chatbot

An AI-powered todo management system that understands natural language and manages tasks via Model Context Protocol (MCP) tools.

## Features

- Natural language task management (create, list, update, complete, delete)
- Conversation continuity across sessions
- Secure user data isolation
- Stateless architecture with horizontal scalability
- MCP-only access for all task operations

## Tech Stack

- **Frontend**: React with OpenAI ChatKit
- **Backend**: Python FastAPI
- **AI Framework**: OpenAI Agents SDK
- **MCP Server**: Official MCP SDK
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth

## Architecture

The system follows a stateless architecture where:
- Server implementations have no in-memory session state
- All conversation and task state is persisted in PostgreSQL
- All task operations are exposed ONLY through MCP tools
- The AI agent never modifies tasks directly, only via MCP

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (or Neon Serverless PostgreSQL account)
- OpenAI API key

### Backend Setup

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

6. Run database migrations:
```bash
alembic upgrade head
```

7. Start the backend server:
```bash
uvicorn src.main:app --reload --port 8000
```

### Frontend Setup

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

5. Start the frontend development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/{user_id}/chat` - Initiate or continue a conversation with the AI chatbot

## Contributing

This project was built using the Spec-Kit Plus methodology with agentic development. All changes should follow the same methodology:

1. Update the specification if needed
2. Plan the implementation
3. Break into tasks
4. Implement following the tasks

## License

This project is licensed under the MIT License.