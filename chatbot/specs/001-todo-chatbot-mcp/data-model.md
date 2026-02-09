# Data Model: Todo AI Chatbot using MCP and Agentic Dev Stack

## Overview
This document defines the data models for the Todo AI Chatbot application, specifying the structure of entities, their relationships, and validation rules based on the feature requirements.

## Entity Definitions

### Task
Represents a user's todo item with properties that allow for creation, updating, and completion tracking.

**Fields**:
- `user_id` (UUID/String): Foreign key linking the task to a specific user; required for data isolation
- `id` (UUID): Unique identifier for the task; primary key
- `title` (String): The task title/description; required, max length 255 characters
- `description` (String): Optional detailed description of the task; max length 1000 characters
- `completed` (Boolean): Status indicating if the task is completed; default false
- `created_at` (DateTime): Timestamp when the task was created; automatically set
- `updated_at` (DateTime): Timestamp when the task was last updated; automatically updated

**Validation Rules**:
- `title` must not be empty
- `user_id` must correspond to an existing user
- `completed` can only be updated via the complete_task MCP tool

**Relationships**:
- Belongs to a single user (identified by user_id)

### Conversation
Represents a conversation thread between a user and the AI assistant, allowing for conversation continuity.

**Fields**:
- `user_id` (UUID/String): Foreign key linking the conversation to a specific user; required for data isolation
- `id` (UUID): Unique identifier for the conversation; primary key
- `created_at` (DateTime): Timestamp when the conversation was started; automatically set
- `updated_at` (DateTime): Timestamp when the conversation was last updated; automatically updated

**Validation Rules**:
- `user_id` must correspond to an existing user
- Each user can have multiple conversations

**Relationships**:
- Belongs to a single user (identified by user_id)
- Has many Messages (linked by conversation_id)

### Message
Represents individual messages in a conversation, storing both user inputs and assistant responses.

**Fields**:
- `user_id` (UUID/String): Foreign key linking the message to a specific user; required for data isolation
- `id` (UUID): Unique identifier for the message; primary key
- `conversation_id` (UUID): Foreign key linking the message to a conversation
- `role` (String): The role of the message sender; either "user" or "assistant"; required
- `content` (Text): The content of the message; required
- `created_at` (DateTime): Timestamp when the message was created; automatically set

**Validation Rules**:
- `user_id` must correspond to an existing user
- `conversation_id` must correspond to an existing conversation for the user
- `role` must be either "user" or "assistant"
- `content` must not be empty

**Relationships**:
- Belongs to a single user (identified by user_id)
- Belongs to a single conversation (identified by conversation_id)

## Database Schema

```sql
-- Tasks table
CREATE TABLE tasks (
    user_id VARCHAR(255) NOT NULL,
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
    user_id VARCHAR(255) NOT NULL,
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
    user_id VARCHAR(255) NOT NULL,
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id),
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
```

## State Transitions

### Task State Transitions
- New task: `completed` = false (default)
- Completed task: `completed` can transition from false to true via complete_task tool
- Task updates: `title` and `description` can be updated via update_task tool while maintaining `completed` status

### Conversation State Transitions
- New conversation: Created when a user initiates a new conversation
- Active conversation: Updated when new messages are added
- Inactive conversation: No automatic expiration, but can be archived by user if needed

## Constraints and Business Rules

1. **User Data Isolation**: All tables include a `user_id` field to ensure data isolation between users. Queries must always filter by `user_id`.

2. **Ownership Validation**: All operations must validate that the authenticated user owns the resources they're accessing.

3. **Timestamp Management**: The `updated_at` field should be automatically updated whenever a record is modified.

4. **Referential Integrity**: Foreign key constraints ensure that messages belong to valid conversations and that all records belong to valid users.

## API Contract Implications

The data model directly influences the API contracts:

- GET /api/{user_id}/conversations - Retrieve all conversations for a user
- GET /api/{user_id}/conversation/{conversation_id}/messages - Retrieve messages for a specific conversation
- POST /api/{user_id}/tasks - Create a new task
- PUT /api/{user_id}/tasks/{task_id}/complete - Mark a task as completed
- PUT /api/{user_id}/tasks/{task_id} - Update task details
- DELETE /api/{user_id}/tasks/{task_id} - Delete a task