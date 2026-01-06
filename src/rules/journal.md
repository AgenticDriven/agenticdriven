# Journal

## File: docs/journal.md

Daily progress log. References other docs for details.

## Format

```markdown
## YYYY-MM-DD

- **Phase**: PHASE (vX.Y.Z)
- **Agent**: Role/name
- **Progress**: What completed (reference docs for details)
- **Decisions**: Key decisions (or reference decisions.md)
- **Blockers**: Issues
- **Next**: Next steps
```

## Example

```markdown
## 2026-01-06

- **Phase**: BUILD (v0.4.3)
- **Agent**: Backend Dev
- **Progress**:
  - POST /api/users done
  - Tests passing (12/12)
  - Details: active/feature-auth.md
- **Decisions**: bcrypt for passwords (see decisions.md)
- **Blockers**: Waiting DB schema approval
- **Next**: GET /api/users/:id

## 2026-01-05

- **Phase**: BUILD (v0.4.2)
- **Agent**: Backend Dev
- **Progress**: Express setup, DB connection, user model
- **Decisions**: PostgreSQL + Sequelize (see decisions.md)
- **Blockers**: None
- **Next**: Start user endpoints
```

## Rules

- Update daily
- Most recent at top
- Reference other docs
- Use actual dates (YYYY-MM-DD)
- Include phase version

## Multi-Agent

Each agent adds section:

```markdown
## 2026-01-06

### Backend
- **Phase**: BUILD (v0.4.3)
- **Progress**: API 3/5 complete

### Frontend
- **Phase**: BUILD (v0.4.3)
- **Progress**: Login form done
```
