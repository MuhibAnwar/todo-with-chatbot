# REST API Endpoints Specification

## API Overview
The system provides a REST API for managing user tasks. All endpoints require authentication via a valid token in the Authorization header.

## Authentication Requirements
All API endpoints require a valid authentication token to be included in the request headers:
```
Authorization: Bearer <token>
```

Requests without valid tokens will receive a 401 Unauthorized response.

## Base URL
```
https://api.example.com/api/{user_id}
```

## Endpoint Specifications

### GET /api/{user_id}/tasks
Retrieve all tasks for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Response**:
- 200 OK: Returns an array of task objects
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to access another user's tasks

**Response Body**:
```json
[
  {
    "id": "task-id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "created_at": "timestamp"
  }
]
```

### POST /api/{user_id}/tasks
Create a new task for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Request Body**:
```json
{
  "title": "Task title",
  "description": "Task description"
}
```

**Response**:
- 201 Created: Task created successfully
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to create tasks for another user

**Response Body**:
```json
{
  "id": "task-id",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "created_at": "timestamp"
}
```

### GET /api/{user_id}/tasks/{id}
Retrieve a specific task for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Response**:
- 200 OK: Returns the task object
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to access another user's task
- 404 Not Found: Task does not exist

**Response Body**:
```json
{
  "id": "task-id",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "created_at": "timestamp"
}
```

### PUT /api/{user_id}/tasks/{id}
Update a specific task for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Request Body**:
```json
{
  "title": "Updated task title",
  "description": "Updated task description"
}
```

**Response**:
- 200 OK: Task updated successfully
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to update another user's task
- 404 Not Found: Task does not exist

**Response Body**:
```json
{
  "id": "task-id",
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": false,
  "created_at": "timestamp"
}
```

### DELETE /api/{user_id}/tasks/{id}
Delete a specific task for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Response**:
- 204 No Content: Task deleted successfully
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to delete another user's task
- 404 Not Found: Task does not exist

### PATCH /api/{user_id}/tasks/{id}/complete
Toggle the completion status of a specific task for the specified user.

**Request Headers**:
- Authorization: Bearer <token>

**Request Body**:
```json
{
  "completed": true
}
```

**Response**:
- 200 OK: Task completion status updated
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: User is attempting to modify another user's task
- 404 Not Found: Task does not exist

**Response Body**:
```json
{
  "id": "task-id",
  "title": "Task title",
  "description": "Task description",
  "completed": true,
  "created_at": "timestamp"
}
```

## Common Error Responses

### 401 Unauthorized
Returned when the request lacks valid authentication credentials.

**Response Body**:
```json
{
  "detail": "Unauthorized"
}
```

### 403 Forbidden
Returned when the user is attempting to access resources they don't own.

**Response Body**:
```json
{
  "detail": "Forbidden"
}
```

### 404 Not Found
Returned when the requested resource does not exist.

**Response Body**:
```json
{
  "detail": "Not found"
}
```

### 400 Bad Request
Returned when the request contains invalid data.

**Response Body**:
```json
{
  "detail": "Bad request"
}
```

## Data Ownership Rules
- All API endpoints must verify that the authenticated user matches the user_id in the URL
- Users can only access, modify, or delete their own tasks
- The system must filter all database queries by the authenticated user ID