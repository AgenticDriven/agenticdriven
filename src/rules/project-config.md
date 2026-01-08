# Project Config

## ad.yaml (Root)

```yaml
domain: "software"
mode: "feature"
context_files: ["README.md", "docs/decisions.md"]
active_features:
  - path: "docs/active/feature-name"
    description: "Feature description"
    status: "in-progress"
completed_features: []
agents:
  enabled: false
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
  team:
    - id: "agent-id"
      role: "agent-role"
      context_dirs: ["src/area/"]
```
