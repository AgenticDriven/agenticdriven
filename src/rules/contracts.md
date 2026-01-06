# Contracts

## File: docs/interfaces.md

Required for multi-agent. Define specifications before implementation.

## When

**DESIGN (v0.2.x)**: Define all contracts
**BUILD (v0.4.x)**: Implement exactly to spec

## Format

```markdown
## API: POST /api/users

**Input**:
- name: string (1-100)
- email: string (valid)
- password: string (min 8)

**Output**:
- id: integer
- name: string
- email: string
- created_at: timestamp

**Errors**:
- 400: Validation failed
- 409: Email exists
- 500: Server error

**Tests**:
1. Valid input → 201
2. Missing name → 400
3. Duplicate email → 409
```

## Multi-Agent Workflow

**DESIGN**: Define contracts, review, commit
**BUILD**: Read contracts, implement, use mocks for dependencies, test, work in parallel

## Rules

1. Define in DESIGN
2. Implement exactly to spec
3. Use mocks for unimplemented deps
4. Never deviate without updating contract first

## Examples

**Component**:
```markdown
## Component: Button

**Props**:
- label: string
- onClick: () => void
- disabled: boolean (default: false)
- variant: "primary" | "secondary"
```

**Data**:
```markdown
## Table: users

**Fields**:
- id: serial PRIMARY KEY
- email: varchar(255) UNIQUE NOT NULL
- created_at: timestamp DEFAULT now()
```
