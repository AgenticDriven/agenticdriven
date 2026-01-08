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

## Feature ad.yaml

```yaml
id: "feature-name"
type: "feat"  # feat | fix | spike | refactor | docs | chore
description: "What this does"
phase: "BUILD"
version: "v0.4.2"
status: "in-progress"
context_files: []
code_locations: []
tasks: []
agents:
  enabled: false
```

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
      context_dirs: ["src/area/"]
```

Configure based on project's separation of concerns.
