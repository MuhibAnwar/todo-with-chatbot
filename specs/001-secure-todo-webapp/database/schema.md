# Database Schema Specification

## Overview
The database schema defines the structure for storing user accounts and their associated tasks. The design ensures data isolation between users and maintains referential integrity.

## Tables

### Users Table
Stores user account information.

**Table Name**: users

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID/String | PRIMARY KEY, NOT NULL | Unique identifier for the user |
| email | String | UNIQUE, NOT NULL | User's email address |
| password_hash | String | NOT NULL | Securely hashed password |
| created_at | Timestamp | NOT NULL | Account creation timestamp |

### Tasks Table
Stores task information associated with users.

**Table Name**: tasks

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID/String | PRIMARY KEY, NOT NULL | Unique identifier for the task |
| user_id | UUID/String | FOREIGN KEY, NOT NULL | Reference to the owning user |
| title | String | NOT NULL | Task title |
| description | Text | | Detailed task description |
| completed | Boolean | NOT NULL, DEFAULT false | Completion status |
| created_at | Timestamp | NOT NULL | Task creation timestamp |
| updated_at | Timestamp | | Last update timestamp |

## Relationships
- Each user can have zero or more tasks
- Each task belongs to exactly one user
- Foreign key constraint ensures referential integrity between user_id in tasks table and id in users table

## Indexes
- Index on users.email for efficient login lookups
- Index on tasks.user_id for efficient user-specific queries
- Index on tasks.completed for efficient filtering by completion status

## Data Integrity Rules
- User emails must be unique
- Tasks must have an associated user
- Passwords must be securely hashed before storage
- Created timestamps are set automatically upon record creation

## Security Considerations
- Passwords must never be stored in plain text
- User data must be isolated by user ID in all queries
- Access to user data must be validated through authentication tokens

## Constraints
- Users table: email must be unique and not null
- Tasks table: user_id must reference a valid user, title must not be null
- Tasks table: completed defaults to false