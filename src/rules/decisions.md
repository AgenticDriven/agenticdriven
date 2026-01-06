# Decisions

## File: docs/decisions.md

Architecture Decision Records (ADRs) for important decisions.

## Format

```markdown
## [Date] - [Title]

**Status**: Accepted | Rejected | Deprecated | Superseded

**Context**: Problem description (2-3 sentences)

**Decision**: What we decided (1-2 sentences)

**Consequences**:
✅ Positive outcome
✅ Positive outcome
❌ Negative outcome

**Alternatives**:
- Option 1: Why rejected
- Option 2: Why rejected
```

## Example

```markdown
## 2026-01-06 - Use JSON:API 1.1

**Status**: Accepted

**Context**: Need standardized API format for frontend-backend communication.

**Decision**: Use JSON:API 1.1 for all endpoints.

**Consequences**:
✅ Standardized format
✅ Better tooling
❌ Learning curve

**Alternatives**:
- Custom REST: Too much freedom
- GraphQL: Overkill
```

## When to Document

Document when:
- Technical choice with multiple options
- Architectural change
- Trade-off decision
- Team disagreement resolved

Don't document:
- Obvious choices
- Trivial decisions
- Implementation details

## Rules

1. One file: `docs/decisions.md`
2. Newest at top
3. Include date
4. Be concise
5. Update status if changed
