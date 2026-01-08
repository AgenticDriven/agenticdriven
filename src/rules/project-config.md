# Project Config

## File: ad.yaml (Root Configuration)

Optional configuration for project-level settings and feature management.

### Minimal

```yaml
domain: "software"  # software | book | marketing | event | product | research | course | game
```

### Full Example

```yaml
domain: "software"
mode: "feature"  # feature | project

context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

active_features:
  - path: "docs/active/feature-name"
    description: "Feature description"
    status: "in-progress"  # in-progress | blocked | review

completed_features:
  - path: "docs/completed/feature-name"
    completed_at: "2026-01-08"
    description: "What was done"

agents:
  enabled: false

settings:
  auto_commit: true
```

## Feature ad.yaml

Each feature has its own `ad.yaml` in `docs/active/feature-name/ad.yaml`:

```yaml
id: "feature-name"
type: "feat"  # feat | fix | spike | refactor | docs | chore
description: "What this feature does"
phase: "BUILD"
version: "v0.4.2"
status: "in-progress"

context_files:
  - "docs/active/feature-name/00-define/problem.md"
  - "docs/active/feature-name/02-design/design.md"

code_locations:
  - "src/feature/"

tasks:
  - description: "Task description"
    status: "done"  # pending | in-progress | done | blocked

dependencies:
  - feature: "other-feature"
    reason: "Why needed"
    status: "completed"

agents:
  enabled: false

notes:
  - "Important decisions or context"
```

## Fields

### Root ad.yaml

- **domain**: Project type (adapts AI language)
- **mode**: `feature` (individual features) or `project` (10 phases for whole project)
- **context_files**: Global docs read at session start
- **active_features**: Features in progress
- **completed_features**: Finished features
- **agents**: Multi-agent configuration
- **settings**: Project preferences

### Feature ad.yaml

- **id**: Unique identifier (kebab-case)
- **type**: feat | fix | spike | refactor | docs | chore
- **description**: Brief description
- **phase**: Current phase
- **version**: v0.PHASE.ITERATION
- **status**: in-progress | blocked | review | completed
- **context_files**: Docs for this feature
- **code_locations**: Code for this feature
- **tasks**: Task breakdown (optional)
- **dependencies**: What this depends on (optional)
- **agents**: Multi-agent for this feature (optional)
- **notes**: Important context (optional)

## Feature Types

```
feat:     DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
fix:      DEFINE → VALIDATE
spike:    DEFINE → DISCOVER
refactor: DEFINE → BUILD → VALIDATE
docs:     DEFINE → BUILD
chore:    DEFINE → BUILD
```

## Multi-Agent

When `agents.enabled = true`:

```yaml
agents:
  enabled: true
  platform: "claude-sdk"
  default_execution_mode: "parallel"
  default_coordination: "message-passing"

  team:
    - id: "agent-id"
      role: "agent-role"
      description: "What this agent does"
      phases: ["BUILD", "VALIDATE"]
      capabilities: ["capability-1", "capability-2"]
      context_dirs: ["src/area/"]
```

Configure agents based on your project's separation of concerns.
