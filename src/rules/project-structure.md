# Project Structure

## Standard Layout

```
project-root/
├── README.md
├── ad.yaml           # Root configuration
├── docs/
│   ├── journal.md
│   ├── decisions.md
│   ├── conventions.md
│   ├── active/       # Feature-driven: one dir per active feature
│   ├── completed/    # Finished features
│   ├── planning/     # Future work
│   └── archived/     # Old docs
├── src/              # Adapt by domain
└── assets/           # Optional
```

## Core Directories

- **docs/**: All documentation
- **src/**: Main content (adapt by domain)
- **assets/**: Resources (optional)

## Domain-Specific src/

- **Software**: `backend/`, `frontend/`, `shared/`
- **Book**: `chapters/`, `appendices/`, `resources/`
- **Marketing**: `campaigns/`, `content/`, `analytics/`
- **Event**: `program/`, `logistics/`, `promotion/`
- **Product**: `design/`, `specs/`, `prototypes/`

## Feature-Driven (mode: feature)

```
docs/active/feature-name/
├── ad.yaml           # Feature config
├── 00-define/
├── 01-discover/
├── 02-design/
└── 04-build/
```

Each feature has phase directories as needed. Not all features use all phases.

## Project-Driven (mode: project)

```
docs/
├── journal.md
├── decisions.md
├── conventions.md
├── 00-define/
├── 01-discover/
├── 02-design/
└── ...
```

Phase docs at root level for entire project.

## Phase Directories

- `00-define/` - Problem, objectives, scope
- `01-discover/` - Requirements, research, decisions
- `02-design/` - Design, architecture, contracts
- `03-setup/` - Setup, validation criteria
- `04-build/` - Build log, implementation status
- `05-validate/` - Validation reports
- `06-market/` - Marketing materials
- `07-launch/` - Launch documentation
- `08-support/` - Support logs
- `09-evolve/` - Evolution plans

## Required Files

**Minimum**: README.md, ad.yaml, docs/journal.md, src/

**Feature-Driven**: Root + per-feature ad.yaml
**Project-Driven**: Root + phase docs

## Organizing docs/

Simple: keep flat
Complex: use subdirectories (planning/, active/, completed/, archived/, spikes/, reports/)

## Rules

1. Standard base: README, ad.yaml, docs/, src/
2. All docs in `docs/`
3. Feature-driven: organize by feature
4. Project-driven: organize by phase
5. Use kebab-case filenames
6. Keep simple when possible
