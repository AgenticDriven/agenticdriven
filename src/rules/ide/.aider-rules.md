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
├── ad.yaml           # Root configuration (optional but recommended)
├── docs/
│   ├── journal.md
│   ├── decisions.md
│   ├── conventions.md
│   ├── active/       # Feature-driven: one dir per active feature
│   │   ├── feature-1/
│   │   │   ├── ad.yaml      # Feature configuration
│   │   │   ├── 00-define/
│   │   │   ├── 01-discover/
│   │   │   ├── 02-design/
│   │   │   └── 04-build/
│   │   └── feature-2/
│   │       └── ad.yaml
│   ├── completed/    # Finished features
│   ├── planning/     # Future work
│   └── archived/     # Old docs
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

## Feature-Driven Structure (Recommended)

For projects using feature-driven development (mode: feature):

```
project-root/
├── ad.yaml                    # Root config: domain, mode, active_features
├── README.md
├── docs/
│   ├── journal.md            # Global journal (all features)
│   ├── decisions.md          # Global architecture decisions
│   ├── conventions.md        # Global conventions
│   ├── interfaces.md         # Global contracts (if multi-agent)
│   │
│   ├── active/               # Features in progress
│   │   ├── user-auth/
│   │   │   ├── ad.yaml      # Feature config (phase, version, context_files, code_locations)
│   │   │   ├── 00-define/
│   │   │   │   ├── problem.md
│   │   │   │   ├── objectives.md
│   │   │   │   └── scope.md
│   │   │   ├── 01-discover/
│   │   │   │   ├── requirements.md
│   │   │   │   └── decisions.md
│   │   │   ├── 02-design/
│   │   │   │   ├── design.md
│   │   │   │   └── api-contracts.md
│   │   │   └── 04-build/
│   │   │       ├── build-log.md
│   │   │       └── status.md
│   │   │
│   │   ├── api-endpoints/
│   │   │   ├── ad.yaml
│   │   │   └── ...
│   │   │
│   │   └── fix-memory-leak/
│   │       ├── ad.yaml
│   │       ├── 00-define/
│   │       └── 05-validate/
│   │
│   ├── completed/           # Finished features (moved from active/)
│   │   └── initial-setup/
│   │       ├── ad.yaml
│   │       └── ...
│   │
│   ├── planning/            # Future work, proposals
│   └── archived/            # Old/deprecated docs
│
├── src/                     # Code (organized by feature or module)
│   ├── auth/               # Code for user-auth feature
│   ├── api/                # Code for api-endpoints feature
│   └── ...
│
└── tests/                   # Tests (organized by feature)
    ├── auth/               # Tests for user-auth feature
    ├── api/                # Tests for api-endpoints feature
    └── ...
```

### Feature Directory Phases

Each feature in `docs/active/feature-name/` can have phase directories:

- `00-define/` - Problem, objectives, scope
- `01-discover/` - Requirements, research, decisions
- `02-design/` - Design, architecture, contracts
- `03-setup/` - Setup, validation criteria
- `04-build/` - Build log, implementation status
- `05-validate/` - Validation reports, test results
- `06-market/` - Marketing materials (if applicable)
- `07-launch/` - Launch documentation
- `08-support/` - Support logs, hotfixes
- `09-evolve/` - Evolution plans, improvements

**Note**: Not all features use all phases. Feature types:
- `feat`: DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
- `fix`: DEFINE → VALIDATE
- `spike`: DEFINE → DISCOVER
- `refactor`: DEFINE → BUILD → VALIDATE
- `docs`: DEFINE → BUILD
- `chore`: DEFINE → BUILD

## Project-Driven Structure (Classic)

For projects using project-driven development (mode: project):

```
project-root/
├── ad.yaml                # Root config
├── README.md
├── docs/
│   ├── journal.md
│   ├── decisions.md
│   ├── conventions.md
│   ├── 00-define/        # Phase docs at root level
│   ├── 01-discover/
│   ├── 02-design/
│   ├── 03-setup/
│   ├── 04-build/
│   ├── 05-validate/
│   └── ...
├── src/
└── tests/
```

## Organizing docs/ (optional)

Simple projects: keep docs/ flat
Complex projects: use subdirectories

```
docs/
├── journal.md        # References other docs
├── decisions.md
├── interfaces.md
├── conventions.md
├── planning/         # Future work
├── active/           # Current features
├── completed/        # Finished features
├── archived/         # Old/deprecated
├── spikes/           # Experiments
└── reports/          # Analysis
```

Use only if needed. Simple projects: keep flat.

## Required Files

**Minimum**: README.md, ad.yaml, docs/journal.md, src/

**Feature-Driven**:
- Root: ad.yaml, README.md, docs/journal.md, docs/decisions.md, docs/conventions.md
- Per Feature: docs/active/feature-name/ad.yaml + phase docs as needed

**Project-Driven**:
- Root: ad.yaml, README.md, docs/journal.md
- Phase docs as you progress through phases

## Initialize New Project

```bash
# Initialize git
git init

# Create basic structure
echo "# My Project" > README.md
mkdir -p docs src tests

# Create ad.yaml
cat > ad.yaml << EOF
domain: "software"
mode: "feature"
context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"
active_features: []
completed_features: []
agents:
  enabled: false
settings:
  auto_commit: true
  require_tests: true
EOF

# Create docs
mkdir -p docs/active docs/completed docs/planning

cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - Project Initialization

- **Action**: Created project structure
- **Next**: Start first feature
EOF

cat > docs/decisions.md << EOF
# Architecture Decision Records
EOF

cat > docs/conventions.md << EOF
# Project Conventions

## Git Workflow
- Use Conventional Commits
- One feature per branch

## Documentation
- Feature docs in docs/active/feature-name/
- Follow AD phase structure

## Testing
- Write tests for all features
- Aim for 80%+ coverage
EOF

# Initial commit
git add .
git commit -m "chore: initialize AD project"
```

## Initialize Existing Project

If project already exists without ad.yaml, see AI Workflow → Auto-Initialization section.

## Rules

1. Standard base: README, ad.yaml, docs/, src/, tests/
2. All docs in `docs/`
3. Feature-driven: organize docs/active/ by feature
4. Project-driven: organize docs/ by phase
5. Use kebab-case filenames
6. Each feature has its own ad.yaml
7. Keep simple when possible

# Project Config

## File: ad.yaml (Root Configuration)

Optional configuration for project-level settings and feature management.

### Solo Development (Basic)

```yaml
domain: "software"
```

Most solo projects need only this to adapt AI language.

### Feature-Driven Development (Recommended)

```yaml
# Root ad.yaml - Project configuration

domain: "software"          # software | book | marketing | event | product
mode: "feature"            # feature | project

# Global context files (read by all features)
context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

# Active features (links to feature directories)
active_features:
  - path: "docs/active/user-auth"
    description: "JWT authentication system"
    status: "in-progress"    # in-progress | blocked | testing | review

  - path: "docs/active/api-endpoints"
    description: "REST API implementation"
    status: "in-progress"

# Completed features (moved from active)
completed_features:
  - path: "docs/completed/initial-setup"
    completed_at: "2026-01-08"
    description: "Project initialization"

# Agents (optional - for multi-agent workflows)
agents:
  enabled: false

# Settings
settings:
  auto_commit: true
  require_tests: true
```

### Feature ad.yaml (Feature-Specific Configuration)

Each feature has its own `ad.yaml` in `docs/active/feature-name/ad.yaml`:

```yaml
# Feature configuration

id: "user-auth"
type: "feat"                # feat | fix | spike | refactor | docs | chore
description: "JWT-based authentication system"

# Current state
phase: "BUILD"              # DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
version: "v0.4.2"          # v0.PHASE.ITERATION
status: "in-progress"      # in-progress | blocked | testing | review | completed

# Context files specific to this feature
context_files:
  - "docs/active/user-auth/00-define/problem.md"
  - "docs/active/user-auth/02-design/design.md"
  - "docs/active/user-auth/04-build/build-log.md"

# Code locations for this feature
code_locations:
  - "src/auth/"
  - "src/middleware/auth.js"
  - "tests/auth/"

# Tasks
tasks:
  - description: "Define requirements"
    status: "done"
  - description: "Implement JWT generation"
    status: "in-progress"
  - description: "Write tests"
    status: "pending"

# Dependencies
dependencies:
  - feature: "user-model"
    reason: "Needs User model"
    status: "completed"

# Agents (optional)
agents:
  enabled: false

# Notes
notes:
  - "Using bcrypt with 10 salt rounds"
  - "JWT tokens expire after 24 hours"
```

## Fields

### Root ad.yaml Fields

**domain** (required): Project type
- Valid values: software, book, marketing, event, product, research, course, game
- Adapts AI language and workflow to your domain

**mode** (required): Work organization
- `feature`: Work on individual features (recommended)
- `project`: Complete all 10 phases for entire project (classic)

**context_files** (optional): Global documentation
- Files read at session start for ALL features
- Examples: README.md, decisions.md, conventions.md, interfaces.md

**active_features** (optional): Features in progress
- `path`: Directory containing feature ad.yaml
- `description`: What the feature does
- `status`: in-progress | blocked | testing | review

**completed_features** (optional): Finished features
- `path`: Where feature was moved after completion
- `completed_at`: ISO date
- `description`: What was completed

**agents** (optional): Multi-agent configuration
- `enabled`: true | false
- When true, configure team, coordination, platform

**settings** (optional): Project preferences
- `auto_commit`: Auto-commit after tasks
- `require_tests`: Tests must pass before advancing

### Feature ad.yaml Fields

**id** (required): Unique feature identifier (kebab-case)

**type** (required): Type of work
- `feat`: New feature (DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE)
- `fix`: Bug fix (DEFINE → VALIDATE)
- `spike`: Research (DEFINE → DISCOVER)
- `refactor`: Code improvement (DEFINE → BUILD → VALIDATE)
- `docs`: Documentation (DEFINE → BUILD)
- `chore`: Maintenance (DEFINE → BUILD)

**description** (required): Brief description

**phase** (required): Current phase (DEFINE, DISCOVER, DESIGN, etc.)

**version** (required): v0.PHASE.ITERATION (e.g., v0.4.2)

**status** (required): in-progress | blocked | testing | review | completed

**context_files** (required): Feature-specific documentation
- Files to read when working on this feature
- Add as you create docs in each phase

**code_locations** (required): Code for this feature
- Directories and files containing implementation
- Add as you write code

**tasks** (optional): Task breakdown
- `description`: What to do
- `status`: pending | in-progress | done | blocked
- `commit`: Git commit hash (optional)

**dependencies** (optional): What this feature depends on
- Other features or external systems

**agents** (optional): Multi-agent config for this feature

**notes** (optional): Important notes and decisions

## Feature Types and Phases

Different types go through different phases:

```
feat:     DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
fix:      DEFINE → VALIDATE
spike:    DEFINE → DISCOVER
refactor: DEFINE → BUILD → VALIDATE
docs:     DEFINE → BUILD
chore:    DEFINE → BUILD
```

## Workflow

### Starting a New Feature

1. User: "I want to add user authentication"
2. AI creates `docs/active/user-auth/ad.yaml`
3. AI adds to root `ad.yaml` active_features
4. AI starts DEFINE phase

### Working on a Feature

1. AI reads root ad.yaml → gets global context
2. AI reads feature ad.yaml → gets feature context
3. AI reads all context_files (global + feature)
4. AI works on feature
5. AI updates feature ad.yaml (phase, version, context_files, code_locations)
6. AI commits changes

### Completing a Feature

1. AI moves feature from active to completed in root ad.yaml
2. AI moves docs from docs/active/ to docs/completed/
3. AI updates completed_features with date
4. AI commits

## Multi-Agent

When agents.enabled = true:

```yaml
# Root ad.yaml
agents:
  enabled: true
  platform: "claude-sdk"              # claude-sdk | windsurf | cursor
  default_execution_mode: "parallel"  # parallel | sequential | hybrid
  default_coordination: "message-passing"  # message-passing | shared-state | pipeline

  team:
    - id: "backend-dev"
      role: "backend-implementation"
      phases: ["BUILD", "VALIDATE"]
      capabilities: ["api", "database"]
      context_dirs: ["src/backend/", "tests/backend/"]

    - id: "frontend-dev"
      role: "frontend-implementation"
      phases: ["BUILD", "VALIDATE"]
      capabilities: ["ui", "components"]
      context_dirs: ["src/frontend/", "tests/frontend/"]
```

```yaml
# Feature ad.yaml
agents:
  enabled: true
  execution_mode: "parallel"
  coordination_technique: "message-passing"

  active:
    - id: "backend-dev"
      status: "working"
      current_task: "Implement JWT generation"
      context: ["src/auth/"]

    - id: "frontend-dev"
      status: "blocked"
      blocked_by: "backend-dev"
      blocked_reason: "Waiting for API endpoints"
      context: ["src/components/Auth/"]
```

## Templates

See `/templates/root-ad.yaml` and `/templates/feature-ad.yaml` for complete commented templates.

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

## SESSION START - CRITICAL FIRST STEP

### Step 1: Check if ad.yaml Exists

```bash
if [ ! -f "ad.yaml" ]; then
    echo "⚠️  No ad.yaml found. This project needs to be initialized for AD."
fi
```

**If ad.yaml does NOT exist → Trigger AUTO-INITIALIZATION** (see Auto-Initialization section below)

**If ad.yaml exists → Continue with normal workflow**

### Step 2: Read Project Configuration

```bash
# Read root ad.yaml
cat ad.yaml

# Extract key information
domain=$(yq eval '.domain' ad.yaml)
mode=$(yq eval '.mode' ad.yaml)
```

**Understand**:
- **domain**: Project type (software, book, marketing, etc.) - adapts your language
- **mode**: "project" (complete 10 phases) or "feature" (individual features with mini-cycles)
- **context_files**: Global documents to read (decisions.md, conventions.md, etc.)
- **active_features**: List of features currently in progress

### Step 3: Identify Active Features

```bash
# List active features
yq eval '.active_features[]' ad.yaml

# For each active feature, read its ad.yaml
for feature_path in $(yq eval '.active_features[].path' ad.yaml); do
    cat "$feature_path/ad.yaml"
done
```

**Each feature ad.yaml contains**:
- **id**: Feature identifier
- **type**: feat | fix | spike | refactor | docs | chore
- **phase**: Current phase (DEFINE, DISCOVER, DESIGN, SETUP, BUILD, VALIDATE, etc.)
- **version**: Current version (v0.X.Y)
- **status**: in-progress | blocked | testing | review | completed
- **context_files**: Docs specific to this feature
- **code_locations**: Code directories/files for this feature
- **tasks**: Task list with status
- **agents**: Multi-agent configuration (if enabled)

### Step 4: Read Context Files

```bash
# Global context (from root ad.yaml)
for file in $(yq eval '.context_files[]' ad.yaml); do
    cat "$file"
done

# Feature context (from feature ad.yaml)
# Example: User chose to work on "user-auth"
for file in $(yq eval '.context_files[]' docs/active/user-auth/ad.yaml); do
    cat "$file"
done
```

### Step 5: Check Multi-Agent Configuration

```bash
# Check if agents enabled
agents_enabled=$(yq eval '.agents.enabled' ad.yaml)

if [ "$agents_enabled" = "true" ]; then
    # Read agent configuration
    platform=$(yq eval '.agents.platform' ad.yaml)
    coordination=$(yq eval '.agents.default_coordination' ad.yaml)

    # Read feature-specific agent status
    yq eval '.agents.active[]' docs/active/user-auth/ad.yaml

    # Check for blocked agents
    blocked=$(yq eval '.agents.active[] | select(.status == "blocked")' docs/active/user-auth/ad.yaml)
fi
```

### Step 6: Present Status to User

```
AI: "✓ AD Project Initialized

    Domain: software
    Mode: feature-driven

    Active Features (2):
    1. user-auth (feat) - BUILD phase (v0.4.2) - in-progress
    2. fix-memory-leak (fix) - VALIDATE phase (v0.5.1) - testing

    [If agents enabled]
    Multi-agent: enabled (message-passing coordination)
    - backend-dev: working on JWT implementation
    - frontend-dev: blocked (waiting for API)
    - qa-engineer: writing tests in parallel

    Which feature would you like to work on?
    Or type 'new' to start a new feature."
```

## Session Start (Normal Workflow - after ad.yaml exists)

1. **Git status**: `git status`
2. **Read root ad.yaml**: `cat ad.yaml`
3. **Read README**: `cat README.md`
4. **Read active features**: List all active features and their status
5. **Read global context**: `cat` all files in root context_files[]
6. **Ask user**: Which feature to work on?
7. **Read feature ad.yaml**: `cat docs/active/[chosen-feature]/ad.yaml`
8. **Read feature context**: `cat` all files in feature context_files[]
9. **Check agent status**: If multi-agent, check coordination state
10. **Present status**: Show user what's been done, what's next

## AUTO-INITIALIZATION (When ad.yaml Does Not Exist)

### Overview

When ad.yaml is not found, the AI must analyze the existing project and initialize AD structure automatically.

### Step 1: Analyze Project

```bash
echo "Analyzing project structure..."

# Check git repository
git status > /dev/null 2>&1 && echo "✓ Git repository found"

# Check README
[ -f "README.md" ] && echo "✓ README.md found"

# Find markdown files
md_files=$(find . -type f -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" | wc -l)
echo "Found $md_files markdown files"

# Check project structure
[ -d "src" ] && echo "✓ src/ directory exists"
[ -d "tests" ] || [ -d "test" ] && echo "✓ tests/ directory exists"
[ -d "docs" ] && echo "✓ docs/ directory exists"

# Detect language/framework
if [ -f "package.json" ]; then
    project_type="javascript"
elif [ -f "requirements.txt" ] || [ -f "setup.py" ]; then
    project_type="python"
elif [ -f "Cargo.toml" ]; then
    project_type="rust"
elif [ -f "go.mod" ]; then
    project_type="go"
else
    project_type="unknown"
fi

echo "Detected project type: $project_type"
```

### Step 2: Ask User Questions

**CRITICAL: Do NOT assume. Always ask the user.**

```
AI: "I don't see an ad.yaml file. I can initialize AD for this project.

    I've detected:
    - Project type: JavaScript/Node.js
    - Structure: src/, tests/, README.md
    - 15 markdown files scattered across directories
    - Git repository initialized

    To set up AD, I need to know:

    1. What domain is this project?
       a) Software (default for code projects)
       b) Book/Documentation
       c) Marketing
       d) Other

    2. What mode do you want to use?
       a) Feature-driven (recommended - work on individual features)
       b) Project-driven (classic - complete project through all 10 phases)

    3. Are there existing features/modules I should identify?
       a) Yes, analyze the codebase and suggest features
       b) No, start fresh

    4. Should I reorganize existing markdown files into docs/?
       a) Yes, organize them (recommended)
       b) No, leave them as-is

    Please answer these questions so I can initialize AD properly."
```

### Step 3: Infer Project State

Based on analysis + user answers:

**Infer Domain**:
```python
# Pseudo-code
if user specified domain:
    use user choice
elif has significant code (src/, tests/):
    domain = "software"
elif mostly markdown files:
    domain = "book"
else:
    domain = "software"  # safe default
```

**Infer Phase**:
```python
if has tests and tests passing:
    phase = "VALIDATE"
elif lines of code > 1000:
    phase = "BUILD"
elif has design docs (architecture.md, design.md):
    phase = "DESIGN"
elif has requirements docs:
    phase = "DISCOVER"
elif only has README:
    phase = "DEFINE"
else:
    phase = "DEFINE"  # safe default
```

**Infer Features**:
```python
features = []

# Strategy 1: Analyze src/ subdirectories
if os.path.isdir("src"):
    for subdir in list_dirs("src"):
        if is_significant_module(subdir):  # > 50 lines, not utils/helpers
            features.append({
                "id": subdir,
                "description": f"{subdir.capitalize()} module",
                "code": [f"src/{subdir}/"]
            })

# Strategy 2: Check git branches
for branch in git_branches():
    if branch.startswith("feature/"):
        feature_name = branch.replace("feature/", "")
        features.append({
            "id": feature_name,
            "description": f"Feature: {feature_name}",
            "status": "in-progress"
        })

# Strategy 3: Ask user to confirm
present features to user for confirmation
```

### Step 4: Reorganize Markdown Files (If User Said Yes)

```bash
# Create docs/ structure
mkdir -p docs/active docs/completed docs/planning docs/archived

# Categorize existing .md files
for file in $md_files; do
    # Skip standard files
    [[ "$file" == "./README.md" ]] && continue
    [[ "$file" == "./CONTRIBUTING.md" ]] && continue

    # Read file to categorize
    content=$(cat "$file")

    # Heuristics for categorization
    if echo "$content" | grep -qi "decision"; then
        dest="docs/decisions.md"  # Append to decisions
    elif echo "$content" | grep -qi "interface\\|contract\\|api"; then
        dest="docs/interfaces.md"  # Append to interfaces
    elif echo "$content" | grep -qi "convention\\|style\\|guide"; then
        dest="docs/conventions.md"  # Append to conventions
    elif echo "$content" | grep -qi "todo\\|plan\\|roadmap"; then
        dest="docs/planning/$(basename "$file")"
    else
        dest="docs/active/$(basename "$file")"
    fi

    # Move with git to preserve history
    git mv "$file" "$dest" 2>/dev/null || mv "$file" "$dest"
done
```

### Step 5: Create Root ad.yaml

```bash
cat > ad.yaml << EOF
# Auto-generated by AD initialization
# Date: $(date -Iseconds)

domain: "$inferred_domain"
mode: "$user_chosen_mode"

# Global context files
context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

# Active features (auto-detected)
active_features:
$(for feature in $inferred_features; do
    echo "  - path: \"docs/active/$feature_id\""
    echo "    description: \"$feature_description\""
    echo "    status: \"in-progress\""
done)

# Completed features
completed_features: []

# Agents (disabled by default)
agents:
  enabled: false

# Settings
settings:
  auto_commit: true
  require_tests: true
EOF

echo "✓ Created ad.yaml"
```

### Step 6: Create Feature ad.yaml Files

```bash
# For each detected feature
for feature in $inferred_features; do
    feature_dir="docs/active/$feature_id"
    mkdir -p "$feature_dir"

    cat > "$feature_dir/ad.yaml" << EOF
id: "$feature_id"
type: "feat"
description: "$feature_description"
phase: "$inferred_phase"
version: "v0.$phase_number.0"
status: "in-progress"
context_files: []
code_locations:
$(for code_path in $feature_code_paths; do
    echo "  - \"$code_path\""
done)
tasks: []
agents:
  enabled: false
notes:
  - "Auto-generated during AD initialization"
EOF

    echo "✓ Created $feature_dir/ad.yaml"
done
```

### Step 7: Create Initial Documentation

```bash
# Create docs/journal.md
cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - AD Initialization

- **Action**: Initialized AD for existing project
- **Domain**: $domain
- **Mode**: $mode
- **Detected Features**: $feature_count
- **Current Phase**: $inferred_phase

### Next Steps
- Review auto-generated ad.yaml files
- Fill in missing documentation
- Continue development with AD workflow
EOF

# Create docs/decisions.md (if doesn't exist)
[ ! -f "docs/decisions.md" ] && cat > docs/decisions.md << EOF
# Architecture Decision Records

## $(date +%Y-%m-%d) - Initialize AD Methodology

**Status**: Accepted

**Context**: Project existed without structured methodology.

**Decision**: Adopt Agentic Driven (AD) methodology.

**Consequences**:
✅ Structured workflow with clear phases
✅ Feature-driven development
✅ Better documentation practices
EOF

# Create docs/conventions.md (if doesn't exist)
[ ! -f "docs/conventions.md" ] && cat > docs/conventions.md << EOF
# Project Conventions

## Code Style
[TODO: Document your code style conventions]

## Git Workflow
- Use Conventional Commits
- One feature per branch
- Commit frequently

## Documentation
- All docs in docs/
- Feature docs in docs/active/feature-name/
- Follow AD phase structure

## Testing
- Write tests for all features
- Aim for 80%+ coverage
EOF
```

### Step 8: Commit Initialization

```bash
# Stage everything
git add .

# Commit
git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation into docs/
- Created feature ad.yaml files
- Detected $feature_count active features
- Current inferred phase: $inferred_phase

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✓ Committed AD initialization"
```

### Step 9: Report to User

```
AI: "✓ AD initialization complete!

    Created:
    - ad.yaml (root configuration)
    - docs/ directory structure
    - $feature_count feature ad.yaml files
    - Initial documentation

    Detected features:
    1. auth (src/auth/) - Authentication system
    2. api (src/api/) - API layer

    Current phase: BUILD (inferred from codebase)

    You can now:
    - Review ad.yaml and feature configurations
    - Continue working with AD workflow
    - Ask me to work on any feature

    Would you like me to:
    a) Show you the generated ad.yaml?
    b) Start working on a specific feature?
    c) Explain the AD workflow?"
```

### Special Cases

**Project Without Git**:
```
AI: "⚠️  This project is not a git repository.

    AD relies on git for version control.

    Would you like me to initialize git first?"
```

**Very Early Project (Only README)**:
Create minimal ad.yaml with no features, user creates first one.

**Mature Project**: Reorganize carefully, preserve existing structure.

## During Work

**Before changes**: Read files, check contracts, verify directory
**After task**: Verify works, update docs, update ad.yaml, update journal.md, commit, update user

### CRITICAL: ad.yaml Update Rules

#### NEVER Modify These Fields in Root ad.yaml

```bash
# ❌ FORBIDDEN
yq eval '.domain = "..."' -i ad.yaml              # NEVER
yq eval '.mode = "..."' -i ad.yaml                # NEVER
yq eval '.version = "..."' -i ad.yaml             # NEVER
yq eval '.settings = {...}' -i ad.yaml            # Only if user asks
```

#### Allowed Operations on Root ad.yaml

**Adding a New Feature**:
```bash
# ✅ ALLOWED
yq eval '.active_features += [{
  "path": "docs/active/new-feature",
  "description": "Feature description",
  "status": "in-progress"
}]' -i ad.yaml
```

**Updating Feature Status**:
```bash
# ✅ ALLOWED
yq eval '(.active_features[] | select(.path == "docs/active/user-auth") | .status) = "testing"' -i ad.yaml
```

**Completing a Feature**:
```bash
# ✅ ALLOWED
yq eval '.completed_features += [{
  "path": "docs/completed/user-auth",
  "completed_at": "'$(date +%Y-%m-%d)'",
  "description": "JWT authentication"
}]' -i ad.yaml

yq eval 'del(.active_features[] | select(.path == "docs/active/user-auth"))' -i ad.yaml
```

**Adding Global Context File (WITH USER PERMISSION)**:
```bash
# ⚠️ ASK USER FIRST
AI: "I've created docs/architecture.md. Should I add it to the global context_files?"
# Only if user says YES:
yq eval '.context_files += ["docs/architecture.md"]' -i ad.yaml
```

#### ALWAYS Update Feature ad.yaml

**Advancing Phase**:
```bash
# ✅ REQUIRED
yq eval '.phase = "BUILD"' -i docs/active/user-auth/ad.yaml
yq eval '.version = "v0.4.0"' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml
git commit -m "chore(user-auth): advance to BUILD phase (v0.4.0)"
```

**Adding Context File**:
```bash
# ✅ REQUIRED - When you create a new doc
yq eval '.context_files += ["docs/active/user-auth/02-design/design.md"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml docs/active/user-auth/02-design/design.md
git commit -m "docs(user-auth): add design document"
```

**Adding Code Location**:
```bash
# ✅ REQUIRED - When you create new code
yq eval '.code_locations += ["src/auth/"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml src/auth/
git commit -m "feat(user-auth): add authentication service"
```

**Updating Tasks**:
```bash
# ✅ REQUIRED - When completing a task
yq eval '(.tasks[] | select(.description == "Implement login endpoint") | .status) = "done"' -i docs/active/user-auth/ad.yaml
```

#### Validation After Every Modification

```bash
# Check YAML is valid
yq eval ad.yaml > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Invalid YAML!"
  git restore ad.yaml
  exit 1
fi
```

#### Safe Modification Pattern

```bash
# 1. Backup
cp ad.yaml ad.yaml.backup

# 2. Modify
yq eval '[modification]' -i ad.yaml

# 3. Validate
if ! yq eval ad.yaml > /dev/null 2>&1; then
    mv ad.yaml.backup ad.yaml
    # Explain error to user
    exit 1
fi

# 4. Success - remove backup
rm ad.yaml.backup

# 5. Commit
git add ad.yaml
git commit -m "chore: update ad.yaml"
```

#### What to Do on Error

```bash
# 1. Restore the file
git restore ad.yaml

# 2. Explain to user
AI: "I attempted to modify ad.yaml but validation failed.
     The file has been restored.
     Error: [specific error]"

# 3. Ask user what to do
AI: "Would you like me to:
     1. Try a different approach?
     2. Skip this update?"
```

## Session End

**Clean**: Commit all completed work, update journal.md, leave clean workspace, push if ready
**Interrupted**: Commit with `wip:`, update journal noting incomplete work

## Multi-Agent

If ad.yaml has agents enabled:
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

