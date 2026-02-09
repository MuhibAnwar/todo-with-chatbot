---
id: 001
title: Todo AI Chatbot Constitution
stage: constitution
date: 2026-02-07
surface: agent
model: Qwen
feature: todo-ai-chatbot
branch: main
user: codespace
command: /sp.constitution
labels: [constitution, todo-chatbot, mcp, agentic-dev]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - /workspaces/PHASE-II/chatbot/.specify/memory/constitution.md
tests:
 - /workspaces/PHASE-II/chatbot/.specify/templates/plan-template.md
 - /workspaces/PHASE-II/chatbot/.specify/templates/spec-template.md
 - /workspaces/PHASE-II/chatbot/.specify/templates/tasks-template.md
---

## Prompt

Create a PROJECT CONSTITUTION for Phase III of a Hackathon project titled:
"Todo AI Chatbot using MCP and Agentic Dev Stack".

The constitution MUST strictly follow Spec-Kit Plus standards and will be used as the immutable source of truth for all future phases (spec, plan, tasks, implementation).

Project Summary:
We are building an AI-powered Todo management chatbot that understands natural language and manages tasks via MCP (Model Context Protocol) tools. The system must be stateless at the server level while persisting all conversation and task state in a PostgreSQL database.

Core Architectural Principles:
- Stateless FastAPI backend (no in-memory session state)
- Conversation and task state persisted in database
- AI logic implemented using OpenAI Agents SDK
- Task operations exposed ONLY through MCP tools
- Agent must never modify tasks directly, only via MCP
- MCP tools themselves must also be stateless
- Horizontal scalability and restart safety are mandatory

Technology Stack (Fixed, Non-Negotiable):
Frontend: OpenAI ChatKit
Backend: Python FastAPI
AI Framework: OpenAI Agents SDK
MCP Server: Official MCP SDK
ORM: SQLModel
Database: Neon Serverless PostgreSQL
Authentication: Better Auth

Functional Scope (Basic Level Only):
- Natural language task creation
- Task listing (all / pending / completed)
- Task completion
- Task update (title/description)
- Task deletion
- Conversation continuity across requests
- Friendly confirmations and graceful error handling

Explicit Constraints:
- No manual coding allowed (Claude Code / Qwen only)
- All logic must be generated via Agentic Dev Stack
- One chat endpoint only: POST /api/{user_id}/chat
- No background jobs or queues
- No WebSockets (HTTP only)
- No server-side memory usage for state
- No direct database access by the agent

Data Models (Authoritative):
- Task(user_id, id, title, description, completed, created_at, updated_at)
- Conversation(user_id, id, created_at, updated_at)
- Message(user_id, id, conversation_id, role, content, created_at)

Agent Behavioral Rules:
- Use add_task when user intent is creation
- Use list_tasks when user intent is retrieval
- Use complete_task for completion intent
- Use delete_task for removal intent
- Use update_task for modification intent
- If task identity is ambiguous, list tasks before acting
- Always confirm successful actions in natural language
- Handle missing tasks gracefully without crashing

MCP Tooling Rules:
- MCP is the ONLY bridge between agent and application logic
- Each MCP tool must:
  - Be stateless
  - Validate user_id ownership
  - Persist results to database
  - Return structured JSON responses

Security & Safety:
- User data isolation by user_id
- No cross-user data leakage
- Input validation on all tool parameters
- Graceful failure responses (no stack traces to user)

Deliverable Expectations:
- Constitution must be concise, explicit, and enforceable
- Avoid implementation details (those belong in spec/plan)
- Use clear sections and bullet points
- This document must enable deterministic generation of spec, plan, and tasks

## Response snapshot

# Todo AI Chatbot Constitution

## Core Principles

### I. Statelessness
Server implementations must be stateless with no in-memory session state; All conversation and task state must be persisted in the PostgreSQL database; Horizontal scalability and restart safety are mandatory requirements.

### II. MCP-Only Access
All task operations must be exposed ONLY through MCP tools; The AI agent must never modify tasks directly, only via MCP tools; MCP serves as the ONLY bridge between agent and application logic.

### III. Agentic Development
All logic must be generated via Agentic Dev Stack; No manual coding allowed (Claude Code / Qwen only); This project must be built entirely through AI-assisted development processes.

### IV. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; All MCP tools and API endpoints must have comprehensive test coverage.

### V. Security & Data Isolation
User data must be isolated by user_id; No cross-user data leakage permitted; Input validation required on all tool parameters; Authentication must be handled via Better Auth.

### VI. Simplicity & Minimalism
Start simple, follow YAGNI principles; Only implement basic functionality: task creation, listing, completion, update, and deletion; Avoid feature creep and unnecessary complexity.

## Technology Stack Compliance
All implementations must strictly adhere to the fixed technology stack: Frontend: OpenAI ChatKit; Backend: Python FastAPI; AI Framework: OpenAI Agents SDK; MCP Server: Official MCP SDK; ORM: SQLModel; Database: Neon Serverless PostgreSQL; Authentication: Better Auth.

## Functional Scope Requirements
Implement only the basic functional scope: natural language task creation, task listing (all/pending/completed), task completion, task update (title/description), task deletion, conversation continuity across requests, friendly confirmations and graceful error handling.

## MCP Tooling Standards
Each MCP tool must: be stateless, validate user_id ownership, persist results to database, return structured JSON responses; Tools must follow the behavioral rules: use add_task for creation, list_tasks for retrieval, complete_task for completion, delete_task for removal, update_task for modification; If task identity is ambiguous, list tasks before acting.

## Development Workflow
All development must follow the Spec-Kit Plus methodology with constitution → specification → plan → tasks → implementation flow; All changes must maintain compliance with this constitution; Code reviews must verify constitutional compliance before approval.

## Governance
This constitution serves as the immutable source of truth for all future phases (spec, plan, tasks, implementation); Amendments require formal documentation, approval process, and migration plan; All PRs/reviews must verify compliance with these principles; Version: 1.0.0 | Ratified: 2026-02-07 | Last Amended: 2026-02-07

## Outcome

- ✅ Impact: Created foundational constitution document for Todo AI Chatbot project
- 🧪 Tests: Template files checked for consistency with new constitution
- 📁 Files: Updated constitution.md and verified template alignment
- 🔁 Next prompts: Ready to proceed with specification generation
- 🧠 Reflection: Constitution follows Spec-Kit Plus standards and captures all required project principles

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Generate feature specification based on constitution