# Project Structure

## Standard Layout

```
project-root/
├── README.md
├── add.yaml          # Optional, multi-agent only
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
