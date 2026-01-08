# Project Structure

```
project-root/
├── README.md
├── ad.yaml
├── docs/
│   ├── journal.md
│   ├── decisions.md
│   ├── conventions.md
│   ├── active/       # Feature-driven
│   ├── completed/
│   └── archived/
├── src/              # Adapt by domain
└── assets/           # Optional
```

## Domain-Specific src/

**Software**: `backend/`, `frontend/`, `shared/`
**Book**: `chapters/`, `appendices/`, `resources/`
**Marketing**: `campaigns/`, `content/`, `analytics/`
**Event**: `program/`, `logistics/`, `promotion/`
**Product**: `design/`, `specs/`, `prototypes/`

## Feature-Driven (mode: feature)

```
docs/active/feature-name/
├── ad.yaml
├── 00-define/
├── 01-discover/
├── 02-design/
└── 04-build/
```

## Project-Driven (mode: project)

```
docs/
├── 00-define/
├── 01-discover/
├── 02-design/
└── ...
```

## Phase Directories

`00-define/` `01-discover/` `02-design/` `03-setup/` `04-build/` `05-validate/` `06-market/` `07-launch/` `08-support/` `09-evolve/`

## Rules

- Standard base: README, ad.yaml, docs/, src/
- All docs in `docs/`
- Use kebab-case filenames
