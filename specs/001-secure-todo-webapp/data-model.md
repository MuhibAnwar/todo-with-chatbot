# Data Model: Secure Full-Stack Multi-User Todo Web Application

## Overview
This document defines the data models for the secure full-stack multi-user Todo web application, based on the database schema specification.

## Entity: User
Represents a registered user in the system.

### Fields
- **id**: UUID/String (Primary Key, Not Null)
  - Unique identifier for the user
  - Auto-generated upon user creation
- **email**: String (Unique, Not Null)
  - User's email address used for authentication
  - Must be unique across all users
- **password_hash**: String (Not Null)
  - Securely hashed password using industry-standard hashing
  - Never store plain text passwords
- **created_at**: Timestamp (Not Null)
  - Account creation timestamp
  - Auto-set upon user creation

### Relationships
- One-to-many relationship with Task entity (one user can have many tasks)

## Entity: Task
Represents a todo item associated with a user.

### Fields
- **id**: UUID/String (Primary Key, Not Null)
  - Unique identifier for the task
  - Auto-generated upon task creation
- **user_id**: UUID/String (Foreign Key, Not Null)
  - Reference to the owning user
  - Links the task to its owner
- **title**: String (Not Null)
  - Task title or subject
  - Brief description of the task
- **description**: Text (Optional)
  - Detailed task description
  - Can be null if no additional details are needed
- **completed**: Boolean (Not Null, Default: False)
  - Completion status of the task
  - Indicates whether the task has been completed
- **created_at**: Timestamp (Not Null)
  - Task creation timestamp
  - Auto-set upon task creation
- **updated_at**: Timestamp (Optional)
  - Last update timestamp
  - Updated when the task is modified

### Relationships
- Many-to-one relationship with User entity (many tasks belong to one user)

## Validation Rules
- User emails must be unique
- Task title must not be null or empty
- Task user_id must reference a valid user
- Passwords must be securely hashed before storage
- Created timestamps are set automatically upon record creation

## State Transitions
- Task completion status can transition from False to True or True to False
- User account remains active after creation (no deactivation implemented)

## Indexes
- Index on users.email for efficient login lookups
- Index on tasks.user_id for efficient user-specific queries
- Index on tasks.completed for efficient filtering by completion status