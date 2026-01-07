# Principles

**1. Agent-Driven**: Humans decide strategy, AI executes
**2. Documentation-First**: Document before, during, after
**3. Phased & Structured**: 10 phases with clear objectives and exit criteria
**4. Validation-Driven**: Validate before building and what's built
**5. Iterative**: Improve within phases, document if going back
**6. Traceable**: Every change in git with clear history
**7. Git-First**: Complete + verify = commit immediately. One commit per completed task.
**8. Standards-First**: Always prefer rigid standards: Conventional Commits, JSON:API, ISO-8601, semver, established patterns
**9. Explicit over Implicit**: No magic numbers/strings, define terms before use, named constants
**10. Single Responsibility**: One component = one purpose. Keep small and focused.
**11. Contract-Driven**: Define specifications in `docs/interfaces.md` before implementation. Implement exactly to spec.
**12. Test-First**: Define success criteria before starting. Validate during work.
**13. Proven Solutions First**: Use established solutions: design patterns, proven frameworks, standard structures

# Phases

## 10 Phases + Release

```
v0.0.x → DEFINE      Define problem, objectives, scope
v0.1.x → DISCOVER    Investigate options, viability
v0.2.x → DESIGN      Design solution, architecture
v0.3.x → SETUP       Prepare tools, environment
v0.4.x → BUILD       Build/create solution
v0.5.x → VALIDATE    Verify quality, testing
v0.6.x → MARKET      Prepare launch materials
v0.7.x → LAUNCH      Deploy, activate, go-live
v0.8.x → SUPPORT     Maintain, fix issues
v0.9.x → EVOLVE      Improve, optimize, grow
v1.0.0 → RELEASE     First stable version
```

## Rules

- Sequential (no skipping)
- Work within phase can be parallel
- Exit criteria required before advancing
- Tag phase completions

# Versioning

Use semantic versioning (semver).

## Pre-release (v0.x.x)

Phase-based versioning: `v0.PHASE.ITERATION`

Phases: 0=DEFINE, 1=DISCOVER, 2=DESIGN, 3=SETUP, 4=BUILD, 5=VALIDATE, 6=MARKET, 7=LAUNCH, 8=SUPPORT, 9=EVOLVE

Examples:
```
v0.0.0  First commit
v0.1.0  Start DISCOVER
v0.4.15 BUILD iteration 15
```

## Release (v1.0.0+)

After completing all phases: `v1.0.0`

Use semver format: vMAJOR.MINOR.PATCH

# Git Commits

## Format
Use Conventional Commits standard

```
<type>: <description>
```

Types: feat, fix, docs, chore, test, refactor, perf, style, ci, build

## Examples
```bash
feat: add user authentication
fix: correct validation
docs: update API docs
chore: update to v0.4.3
```

# Git Tags

Git tags are not required in ADD 1.0. Use commits and version in adw.yaml to track progress.

# Project Structure

## Standard Layout

```
project-root/
├── README.md
├── adw.yaml          # Optional, multi-agent only
├── docs/
│   ├── journal.md
│   └── ...
├── src/              # Adapt by domain
├── tests/            # Adapt by domain
└── assets/           # Optional
```

## Core Directories

**docs/**: All documentation, phase docs, journal, decisions, contracts
**src/**: Main content (adapt by domain)
**tests/**: Validation (adapt by domain)
**assets/**: Resources (optional)

## Domain-Specific src/

**Software**: `backend/`, `frontend/`, `shared/`
**Book**: `chapters/`, `appendices/`, `resources/`
**Marketing**: `campaigns/`, `content/`, `analytics/`
**Event**: `program/`, `logistics/`, `promotion/`
**Product**: `design/`, `specs/`, `prototypes/`

## Organizing docs/ (optional)

For complex projects:

```
docs/
├── journal.md        # References other docs
├── decisions.md
├── interfaces.md
├── planning/         # Future work
├── active/           # Current work
├── completed/        # Finished
├── archived/         # Old/deprecated
├── spikes/           # Experiments
└── reports/          # Analysis
```

Use only if needed. Simple projects: keep flat.

## Required Files

**Minimum**: README.md, docs/journal.md, src/

**By Phase**:
- DEFINE: problem-statement, objectives, scope
- DISCOVER: discovery, requirements, decisions
- DESIGN: design, architecture, interfaces (if multi-agent)
- SETUP: setup, validation-criteria
- BUILD: build-log, status (if multi-agent), src/, tests/
- VALIDATE: validation-report, test-results
- MARKET: marketing-plan, launch-strategy
- LAUNCH: launch-log, go-live-report
- SUPPORT: support-log, hotfixes
- EVOLVE: evolution-plan, roadmap

## Initialize

```bash
git init
echo "# My Project" > README.md
mkdir -p docs src tests
touch docs/journal.md
git add .
git commit -m "chore: initialize ADD project"
```

## Rules

1. Standard base: README, docs/, src/, tests/
2. All docs in `docs/`
3. Organize docs/ only if needed
4. Use kebab-case filenames
5. Keep flat when possible

# Project Config

## File: adw.yaml

Optional. Only for multi-agent or domain hint.

## Solo (optional)

```yaml
domain: "software"
```

Most projects don't need this.

## Multi-Agent (required)

```yaml
domain: "software"

agents:
  - id: "backend"
    context: ["src/backend/"]
  - id: "frontend"
    context: ["src/frontend/"]
```

## Fields

**domain**: Project type (software, book, marketing, event) - AI adapts language
**agents**: Context boundaries - which directories each agent works in

# Documentation

## Principle
Document before, during, after

## Required by Phase
**DEFINE**: problem-statement, objectives, scope
**DISCOVER**: discovery, requirements, decisions
**DESIGN**: design, architecture, interfaces
**SETUP**: setup, validation-criteria
**BUILD**: build-log, changes, issues
**VALIDATE**: validation-report, test-results
**MARKET**: marketing-plan, launch-strategy
**LAUNCH**: launch-log, go-live-report
**SUPPORT**: support-log, hotfixes
**EVOLVE**: evolution-plan, roadmap

## Location

**Simple Projects**: All in `docs/` at root. Use kebab-case filenames. Markdown format.

**Complex Projects**: Use subdirectories:

```
docs/
├── planning/          # Future work, proposals, ideas
├── active/           # Work in progress
│   └── feature-name/  # Current feature/project
│       ├── 00-define/
│       ├── 01-discover/
│       ├── 02-design/
│       └── ...
├── completed/        # Finished features
├── archived/         # Old/deprecated docs
├── reports/          # Standalone reports
├── spikes/           # Research, experiments
├── journal.md        # Always at root
└── decisions.md      # Always at root
```

**Workflow**:
1. Start feature in `active/feature-name/`
2. Organize by phases: 00-define/, 01-discover/, etc.
3. When feature complete, move to `completed/feature-name/`
4. Old features go to `archived/`

**Always at Root**:
- `journal.md` - Daily progress
- `decisions.md` - Architecture decisions (ADRs)

## Updates
Update docs in same commit as code

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

# AI Workflow

## Session Start (9 steps)

1. **Git status**: `git status`
2. **Config**: `cat adw.yaml 2>/dev/null` (if exists)
3. **README**: `cat README.md`
4. **Phase**: `git describe --tags --abbrev=0` (latest tag = current phase)
5. **Phase docs**: `cat docs/journal.md` + phase-specific docs
6. **Contracts**: `cat docs/interfaces.md` (if BUILD/VALIDATE)
7. **Recent commits**: `git log -5 --oneline`
8. **Role**: Check adw.yaml for agent context (if multi-agent)
9. **Ask**: Ready to work

## During Work

**Before changes**: Read files, check contracts, verify directory
**After task**: Verify works, update docs, update journal.md, commit, update user

## Session End

**Clean**: Commit all completed work, update journal.md, leave clean workspace, push if ready
**Interrupted**: Commit with `wip:`, update journal noting incomplete work

## Multi-Agent

If adw.yaml has agents:
- Identify your agent ID
- Stay in context directories
- Read contracts before implementing
- Use mocks for dependencies
- Don't touch other agents' files

# Exit Criteria

## By Phase

**DEFINE**: Problem stated, objectives defined, scope documented, constraints identified, success criteria defined
**DISCOVER**: Requirements gathered, options researched, feasibility assessed, decisions documented, risks identified
**DESIGN**: Solution designed, architecture defined, interfaces specified, design approved, ready to build
**SETUP**: Tools configured, environment ready, testing setup, validation criteria defined, team ready
**BUILD**: All components implemented, contracts fulfilled, tests passing, docs updated, code reviewed
**VALIDATE**: All tests passing, coverage met (80%+), performance acceptable, validation report complete, stakeholders approve
**MARKET**: Materials created, docs complete, strategy defined, channels prepared, ready to launch
**LAUNCH**: Deployed, monitoring active, metrics collected, no critical issues, ready for support
**SUPPORT**: Stable period complete, critical bugs resolved, support working, feedback collected, ready to evolve
**EVOLVE**: Improvements implemented, optimized, features added, roadmap updated, lessons documented

## Validation

Before advancing:
1. Review checklist
2. Verify items complete
3. Document exceptions
4. Get approval
5. Commit final work
6. Update to next phase

```bash
git commit -m "docs: complete DESIGN exit criteria"
git commit -m "chore: start SETUP (v0.3.0)"
```

## Flexibility

Guidelines, not rigid rules. Adapt to project needs. Document deviations. Focus on quality.

# Troubleshooting

## Process

1. **Identify**: What's failing?
2. **Isolate**: Where's the problem?
3. **Document**: What did you try?
4. **Solve**: Fix it
5. **Prevent**: Avoid repeat

## Common Issues

**Tests failing**: Read error, run single test, check recent changes, fix code/test
**Build failing**: Check syntax, dependencies, env vars, clear cache
**Git conflicts**: Open file, resolve markers, test, stage, complete merge
**Phase unclear**: Read `/var/add/fases/`, check exit criteria, review journal.md
**Multi-agent conflict**: Check context boundaries, coordinate via git
**Lost work**: Check `git stash list`, `git reflog`, backup branches
**Dependencies**: Delete packages, delete lock file, reinstall fresh
**Contract mismatch**: Read `docs/interfaces.md`, fix code or update contract

## Rollback

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Go back to tag
git checkout v0.4.2
```

## Getting Help

Provide: exact error, what you did, what you expected, what happened, what you tried

## Document

Update `docs/journal.md`:
```markdown
## 2026-01-06
**Issue**: Tests failing
**Cause**: Outdated fixtures
**Solution**: Updated tests/fixtures.js
**Time**: 15 min
```

## Prevention

Commit frequently, write tests, read contracts, update journal, follow exit criteria, respect boundaries

