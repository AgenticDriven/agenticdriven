# Contracts

## File: docs/interfaces.md

Required for multi-agent. Define specifications before implementation.

## When

**DESIGN**: Define all contracts
**BUILD**: Implement exactly to spec

## Format

```markdown
## Interface: Name

**Input**: What goes in
**Output**: What comes out
**Errors**: Possible failures
**Validation**: How to verify
```

## Workflow

1. DESIGN: Define contracts, review, commit
2. BUILD: Read contracts, implement, use mocks for unimplemented deps

## Rules

- Define in DESIGN phase
- Implement exactly to spec
- Never deviate without updating contract first
- Use mocks for dependencies not yet implemented
