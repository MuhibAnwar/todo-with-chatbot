# Research: Todo AI Chatbot using MCP and Agentic Dev Stack

## Overview
This document captures research findings for the implementation of the Todo AI Chatbot using MCP and Agentic Dev Stack. It addresses technical unknowns and best practices identified during the planning phase.

## Decision: MCP SDK Integration Approach
**Rationale**: The official MCP SDK needs to be integrated to expose task operations as tools that the AI agent can use. The approach will be to create a stateless MCP server that registers specific tools for task operations (add, list, complete, delete, update). Each tool will validate user_id ownership, interact with the database through services, and return structured JSON responses.

**Alternatives considered**: 
- Direct API calls from agent (violates MCP-only access principle)
- Custom tool framework (violates use of official MCP SDK requirement)

## Decision: Database Connection Strategy
**Rationale**: Using SQLModel with Neon Serverless PostgreSQL requires async connections with proper connection pooling. Alembic will be used for migrations. The database session will be created per request and closed after the request completes to maintain statelessness.

**Alternatives considered**:
- In-memory caching (violates statelessness principle)
- Persistent connections per server instance (violates statelessness principle)

## Decision: Authentication and User Isolation
**Rationale**: Better Auth will be integrated to handle user authentication. The user_id will be extracted from the authentication context and propagated to all operations to ensure data isolation. All MCP tools and API endpoints will validate that the requesting user owns the resources they're accessing.

**Alternatives considered**:
- Custom authentication (unnecessary complexity when Better Auth is specified)
- Session-based authentication (violates statelessness principle)

## Decision: Conversation State Management
**Rationale**: Conversations and messages will be stored in the database with a conversation_id linking related messages. The AI agent will retrieve the conversation history from the database before processing each request to maintain context. This ensures statelessness while preserving conversation continuity.

**Alternatives considered**:
- Storing conversation in memory (violates statelessness principle)
- Client-side storage (doesn't provide server-side continuity across requests)

## Decision: Error Handling Strategy
**Rationale**: All errors will be caught and transformed into user-friendly messages that don't expose internal system details. MCP tools will return structured error responses that the agent can interpret. HTTP endpoints will return appropriate status codes with clear error messages.

**Alternatives considered**:
- Propagating raw exceptions to users (violates security principle of not exposing internal errors)
- Generic error messages (doesn't provide enough information for debugging)

## Best Practices Applied
- Async/await patterns for database operations to improve performance
- Dependency injection for service layers to improve testability
- Proper separation of concerns between models, services, and API layers
- Comprehensive logging for observability without exposing sensitive data
- Input validation at all entry points to prevent injection attacks