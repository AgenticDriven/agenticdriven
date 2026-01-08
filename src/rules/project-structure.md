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
