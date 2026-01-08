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
