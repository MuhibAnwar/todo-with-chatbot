<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.0.0 (initial creation)
Modified principles: N/A (new constitution)
Added sections: All sections (new constitution)
Removed sections: N/A
Templates requiring updates: ⚠ pending - need to update plan-template.md, spec-template.md, tasks-template.md
Follow-up TODOs: None
-->

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