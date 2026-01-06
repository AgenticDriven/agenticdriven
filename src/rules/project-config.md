# Project Config

## File: add.yaml

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
