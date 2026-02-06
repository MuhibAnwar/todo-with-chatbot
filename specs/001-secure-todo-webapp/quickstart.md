# Quickstart Guide: Secure Full-Stack Multi-User Todo Web Application

## Overview
This guide provides instructions for setting up and running the secure full-stack multi-user Todo web application locally.

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PHASE-II
```

### 2. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"
JWT_SECRET_KEY="your-super-secret-jwt-key-here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

For the frontend, create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

### 3. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up the database:
```bash
alembic upgrade head
```

Run the backend server:
```bash
uvicorn src.main:app --reload --port 8000
```

### 4. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the frontend development server:
```bash
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend docs: http://localhost:8000/docs

## Running Tests
### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Key Features
1. User registration and authentication
2. Secure JWT-based API access
3. User-specific task management
4. Create, read, update, and delete tasks
5. Toggle task completion status
6. Responsive UI for desktop and mobile

## Troubleshooting
- If you encounter database connection issues, verify your DATABASE_URL is correct
- If authentication fails, ensure JWT_SECRET_KEY is consistent between frontend and backend
- For API errors, check that the backend is running and the API base URL is configured correctly