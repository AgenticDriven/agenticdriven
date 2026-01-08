# Project Config

## ad.yaml (Root)

```yaml
domain: "software"  # software | book | marketing | event | product | research | course | game
mode: "feature"     # feature | project

context_files:
  - "README.md"
  - "docs/decisions.md"

active_features:
  - path: "docs/active/feature-name"
    description: "Feature description"
    status: "in-progress"

completed_features: []

agents:
  enabled: false

settings:
  auto_commit: true
```

## Mode: Feature vs Project

**mode: "feature"** (Recommended)
- Each feature has its own mini-cycle through phases
- Features can be at different phases simultaneously
- Example: feature-A in BUILD while feature-B in DESIGN
- More flexible, parallel work possible
- Each feature has `docs/active/feature-name/ad.yaml`

**mode: "project"**
- Entire project advances through phases as one unit
- All work follows the same phase progression
- More structured, sequential approach
- Still uses features, but all features align to project phase
- Features still have their own `docs/active/feature-name/ad.yaml`

**Important**: Both modes use features. The difference is how phases are managed:
- Feature mode: Each feature has independent phase tracking
- Project mode: Features exist but follow project's overall phase

## Feature ad.yaml

Located at `docs/active/feature-name/ad.yaml`:

```yaml
id: "feature-name"
type: "feat"  # feat | fix | spike | refactor | docs | chore
description: "What this feature does"

# Phase tracking (independent in feature mode, follows project in project mode)
phase: "BUILD"
version: "v0.4.2"
status: "in-progress"

# Feature-specific documentation
context_files:
  - "docs/active/feature-name/00-define/problem.md"
  - "docs/active/feature-name/02-design/design.md"

# Code locations for this feature
code_locations:
  - "src/feature-area/"
  - "tests/feature-area/"

# Task tracking (optional)
tasks:
  - description: "Task description"
    status: "done"

# Dependencies (optional)
dependencies:
  - feature: "other-feature"
    reason: "Why needed"
    status: "completed"

agents:
  enabled: false

notes:
  - "Important context"
```

## Feature Types

Different feature types go through different phases:

```
feat:     DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
fix:      DEFINE → VALIDATE
spike:    DEFINE → DISCOVER
refactor: DEFINE → BUILD → VALIDATE
docs:     DEFINE → BUILD
chore:    DEFINE → BUILD
```

## Multi-Agent Configuration

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

Configure agents based on your project's separation of concerns. Each agent works in specific directories and phases.
