# Principles

**1. Agent-Driven**: Humans decide strategy, AI executes
**2. Documentation-First**: Document before, during, after
**3. Phased & Structured**: 10 phases with clear objectives and exit criteria
**4. Validation-Driven**: Validate before building and what's built
**5. Iterative**: Improve within phases, document if going back
**6. Traceable**: Every change in git with clear history
**7. Git-First**: Complete + verify = commit immediately. One commit per completed task.
**8. Standards-First**: Always prefer rigid standards: Conventional Commits, JSON:API, ISO-8601, semver, established patterns
**9. Explicit over Implicit**: No magic numbers/strings, define terms before use, named constants
**10. Single Responsibility**: One component = one purpose. Keep small and focused.
**11. Contract-Driven**: Define specifications in `docs/interfaces.md` before implementation. Implement exactly to spec.
**12. Test-First**: Define success criteria before starting. Validate during work.
**13. Proven Solutions First**: Use established solutions: design patterns, proven frameworks, standard structures

# Phases

## 10 Phases + Release

```
v0.0.x → DEFINE      Define problem, objectives, scope
v0.1.x → DISCOVER    Investigate options, viability
v0.2.x → DESIGN      Design solution, architecture
v0.3.x → SETUP       Prepare tools, environment
v0.4.x → BUILD       Build/create solution
v0.5.x → VALIDATE    Verify quality, testing
v0.6.x → MARKET      Prepare launch materials
v0.7.x → LAUNCH      Deploy, activate, go-live
v0.8.x → SUPPORT     Maintain, fix issues
v0.9.x → EVOLVE      Improve, optimize, grow
v1.0.0 → RELEASE     First stable version
```

## Rules

- Sequential (no skipping)
- Work within phase can be parallel
- Exit criteria required before advancing
- Tag phase completions

# Versioning

Use semantic versioning (semver).

## Pre-release (v0.x.x)

Phase-based versioning: `v0.PHASE.ITERATION`

Phases: 0=DEFINE, 1=DISCOVER, 2=DESIGN, 3=SETUP, 4=BUILD, 5=VALIDATE, 6=MARKET, 7=LAUNCH, 8=SUPPORT, 9=EVOLVE

Examples:
```
v0.0.0  First commit
v0.1.0  Start DISCOVER
v0.4.15 BUILD iteration 15
```

## Release (v1.0.0+)

After completing all phases: `v1.0.0`

Use semver format: vMAJOR.MINOR.PATCH

# Git Commits

## Format
Use Conventional Commits standard

```
<type>: <description>
```

Types: feat, fix, docs, chore, test, refactor, perf, style, ci, build

## Examples
```bash
feat: add user authentication
fix: correct validation
docs: update API docs
chore: update to v0.4.3
```

# Git Tags

Git tags are not required in ADD 1.0. Use commits and version in adw.yaml to track progress.

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

# Documentation

## Principle
Document before, during, after

## Required by Phase
**DEFINE**: problem-statement, objectives, scope
**DISCOVER**: discovery, requirements, decisions
**DESIGN**: design, architecture, interfaces
**SETUP**: setup, validation-criteria
**BUILD**: build-log, changes, issues
**VALIDATE**: validation-report, test-results
**MARKET**: marketing-plan, launch-strategy
**LAUNCH**: launch-log, go-live-report
**SUPPORT**: support-log, hotfixes
**EVOLVE**: evolution-plan, roadmap

## Location

**Simple Projects**: All in `docs/` at root. Use kebab-case filenames. Markdown format.

**Complex Projects**: Use subdirectories:

```
docs/
├── planning/          # Future work, proposals, ideas
├── active/           # Work in progress
│   └── feature-name/  # Current feature/project
│       ├── 00-define/
│       ├── 01-discover/
│       ├── 02-design/
│       └── ...
├── completed/        # Finished features
├── archived/         # Old/deprecated docs
├── reports/          # Standalone reports
├── spikes/           # Research, experiments
├── journal.md        # Always at root
└── decisions.md      # Always at root
```

**Workflow**:
1. Start feature in `active/feature-name/`
2. Organize by phases: 00-define/, 01-discover/, etc.
3. When feature complete, move to `completed/feature-name/`
4. Old features go to `archived/`

**Always at Root**:
- `journal.md` - Daily progress
- `decisions.md` - Architecture decisions (ADRs)

## Updates
Update docs in same commit as code

# Journal

## File: docs/journal.md

Daily progress log. References other docs for details.

## Format

```markdown
## YYYY-MM-DD

- **Phase**: PHASE (vX.Y.Z)
- **Agent**: Role/name
- **Progress**: What completed (reference docs for details)
- **Decisions**: Key decisions (or reference decisions.md)
- **Blockers**: Issues
- **Next**: Next steps
```

## Example

```markdown
## 2026-01-06

- **Phase**: BUILD (v0.4.3)
- **Agent**: Backend Dev
- **Progress**:
  - POST /api/users done
  - Tests passing (12/12)
  - Details: active/feature-auth.md
- **Decisions**: bcrypt for passwords (see decisions.md)
- **Blockers**: Waiting DB schema approval
- **Next**: GET /api/users/:id

## 2026-01-05

- **Phase**: BUILD (v0.4.2)
- **Agent**: Backend Dev
- **Progress**: Express setup, DB connection, user model
- **Decisions**: PostgreSQL + Sequelize (see decisions.md)
- **Blockers**: None
- **Next**: Start user endpoints
```

## Rules

- Update daily
- Most recent at top
- Reference other docs
- Use actual dates (YYYY-MM-DD)
- Include phase version

## Multi-Agent

Each agent adds section:

```markdown
## 2026-01-06

### Backend
- **Phase**: BUILD (v0.4.3)
- **Progress**: API 3/5 complete

### Frontend
- **Phase**: BUILD (v0.4.3)
- **Progress**: Login form done
```

# Decisions

## File: docs/decisions.md

Architecture Decision Records (ADRs) for important decisions.

## Format

```markdown
## [Date] - [Title]

**Status**: Accepted | Rejected | Deprecated | Superseded

**Context**: Problem description (2-3 sentences)

**Decision**: What we decided (1-2 sentences)

**Consequences**:
✅ Positive outcome
✅ Positive outcome
❌ Negative outcome

**Alternatives**:
- Option 1: Why rejected
- Option 2: Why rejected
```

## Example

```markdown
## 2026-01-06 - Use JSON:API 1.1

**Status**: Accepted

**Context**: Need standardized API format for frontend-backend communication.

**Decision**: Use JSON:API 1.1 for all endpoints.

**Consequences**:
✅ Standardized format
✅ Better tooling
❌ Learning curve

**Alternatives**:
- Custom REST: Too much freedom
- GraphQL: Overkill
```

## When to Document

Document when:
- Technical choice with multiple options
- Architectural change
- Trade-off decision
- Team disagreement resolved

Don't document:
- Obvious choices
- Trivial decisions
- Implementation details

## Rules

1. One file: `docs/decisions.md`
2. Newest at top
3. Include date
4. Be concise
5. Update status if changed

# Contracts

## File: docs/interfaces.md

Required for multi-agent. Define specifications before implementation.

## When

**DESIGN**: Define all contracts
**BUILD**: Implement exactly to spec

## Format

```markdown
## Interface: Name

**Input**: What goes in
**Output**: What comes out
**Errors**: Possible failures
**Validation**: How to verify
```

## Workflow

1. DESIGN: Define contracts, review, commit
2. BUILD: Read contracts, implement, use mocks for unimplemented deps

## Rules

- Define in DESIGN phase
- Implement exactly to spec
- Never deviate without updating contract first
- Use mocks for dependencies not yet implemented

# AI Workflow

## SESSION START - CRITICAL FIRST STEP

### Step 1: Check if ad.yaml Exists

```bash
if [ ! -f "ad.yaml" ]; then
    echo "⚠️  No ad.yaml found. This project needs to be initialized for AD."
fi
```

**If ad.yaml does NOT exist → Trigger AUTO-INITIALIZATION** (see Auto-Initialization section below)

**If ad.yaml exists → Continue with normal workflow**

### Step 2: Read Project Configuration

```bash
# Read root ad.yaml
cat ad.yaml

# Extract key information
domain=$(yq eval '.domain' ad.yaml)
mode=$(yq eval '.mode' ad.yaml)
```

**Understand**:
- **domain**: Project type (software, book, marketing, etc.) - adapts your language
- **mode**: "project" (complete 10 phases) or "feature" (individual features with mini-cycles)
- **context_files**: Global documents to read (decisions.md, conventions.md, etc.)
- **active_features**: List of features currently in progress

### Step 3: Identify Active Features

```bash
# List active features
yq eval '.active_features[]' ad.yaml

# For each active feature, read its ad.yaml
for feature_path in $(yq eval '.active_features[].path' ad.yaml); do
    cat "$feature_path/ad.yaml"
done
```

**Each feature ad.yaml contains**:
- **id**: Feature identifier
- **type**: feat | fix | spike | refactor | docs | chore
- **phase**: Current phase (DEFINE, DISCOVER, DESIGN, SETUP, BUILD, VALIDATE, etc.)
- **version**: Current version (v0.X.Y)
- **status**: in-progress | blocked | testing | review | completed
- **context_files**: Docs specific to this feature
- **code_locations**: Code directories/files for this feature
- **tasks**: Task list with status
- **agents**: Multi-agent configuration (if enabled)

### Step 4: Read Context Files

```bash
# Global context (from root ad.yaml)
for file in $(yq eval '.context_files[]' ad.yaml); do
    cat "$file"
done

# Feature context (from feature ad.yaml)
# Example: User chose to work on "user-auth"
for file in $(yq eval '.context_files[]' docs/active/user-auth/ad.yaml); do
    cat "$file"
done
```

### Step 5: Check Multi-Agent Configuration

```bash
# Check if agents enabled
agents_enabled=$(yq eval '.agents.enabled' ad.yaml)

if [ "$agents_enabled" = "true" ]; then
    # Read agent configuration
    platform=$(yq eval '.agents.platform' ad.yaml)
    coordination=$(yq eval '.agents.default_coordination' ad.yaml)

    # Read feature-specific agent status
    yq eval '.agents.active[]' docs/active/user-auth/ad.yaml

    # Check for blocked agents
    blocked=$(yq eval '.agents.active[] | select(.status == "blocked")' docs/active/user-auth/ad.yaml)
fi
```

### Step 6: Present Status to User

```
AI: "✓ AD Project Initialized

    Domain: software
    Mode: feature-driven

    Active Features (2):
    1. user-auth (feat) - BUILD phase (v0.4.2) - in-progress
    2. fix-memory-leak (fix) - VALIDATE phase (v0.5.1) - testing

    [If agents enabled]
    Multi-agent: enabled (message-passing coordination)
    - backend-dev: working on JWT implementation
    - frontend-dev: blocked (waiting for API)
    - qa-engineer: writing tests in parallel

    Which feature would you like to work on?
    Or type 'new' to start a new feature."
```

## Session Start (Normal Workflow - after ad.yaml exists)

1. **Git status**: `git status`
2. **Read root ad.yaml**: `cat ad.yaml`
3. **Read README**: `cat README.md`
4. **Read active features**: List all active features and their status
5. **Read global context**: `cat` all files in root context_files[]
6. **Ask user**: Which feature to work on?
7. **Read feature ad.yaml**: `cat docs/active/[chosen-feature]/ad.yaml`
8. **Read feature context**: `cat` all files in feature context_files[]
9. **Check agent status**: If multi-agent, check coordination state
10. **Present status**: Show user what's been done, what's next

## AUTO-INITIALIZATION (When ad.yaml Does Not Exist)

### Overview

When ad.yaml is not found, the AI must analyze the existing project and initialize AD structure automatically.

### Step 1: Analyze Project

```bash
echo "Analyzing project structure..."

# Check git repository
git status > /dev/null 2>&1 && echo "✓ Git repository found"

# Check README
[ -f "README.md" ] && echo "✓ README.md found"

# Find markdown files
md_files=$(find . -type f -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" | wc -l)
echo "Found $md_files markdown files"

# Check project structure
[ -d "src" ] && echo "✓ src/ directory exists"
[ -d "tests" ] || [ -d "test" ] && echo "✓ tests/ directory exists"
[ -d "docs" ] && echo "✓ docs/ directory exists"

# Detect language/framework
if [ -f "package.json" ]; then
    project_type="javascript"
elif [ -f "requirements.txt" ] || [ -f "setup.py" ]; then
    project_type="python"
elif [ -f "Cargo.toml" ]; then
    project_type="rust"
elif [ -f "go.mod" ]; then
    project_type="go"
else
    project_type="unknown"
fi

echo "Detected project type: $project_type"
```

### Step 2: Ask User Questions

**CRITICAL: Do NOT assume. Always ask the user.**

```
AI: "I don't see an ad.yaml file. I can initialize AD for this project.

    I've detected:
    - Project type: JavaScript/Node.js
    - Structure: src/, tests/, README.md
    - 15 markdown files scattered across directories
    - Git repository initialized

    To set up AD, I need to know:

    1. What domain is this project?
       a) Software (default for code projects)
       b) Book/Documentation
       c) Marketing
       d) Other

    2. What mode do you want to use?
       a) Feature-driven (recommended - work on individual features)
       b) Project-driven (classic - complete project through all 10 phases)

    3. Are there existing features/modules I should identify?
       a) Yes, analyze the codebase and suggest features
       b) No, start fresh

    4. Should I reorganize existing markdown files into docs/?
       a) Yes, organize them (recommended)
       b) No, leave them as-is

    5. Do you want to use multi-agent workflows?
       a) Yes, I'll configure agents
       b) No, single agent

    Please answer these questions so I can initialize AD properly."
```

### Step 3: Infer Project State

Based on analysis + user answers:

**Infer Domain**:
```python
# Pseudo-code
if user specified domain:
    use user choice
elif has significant code (src/, tests/):
    domain = "software"
elif mostly markdown files:
    domain = "book"
else:
    domain = "software"  # safe default
```

**Infer Phase**:
```python
if has tests and tests passing:
    phase = "VALIDATE"
elif lines of code > 1000:
    phase = "BUILD"
elif has design docs (architecture.md, design.md):
    phase = "DESIGN"
elif has requirements docs:
    phase = "DISCOVER"
elif only has README:
    phase = "DEFINE"
else:
    phase = "DEFINE"  # safe default
```

**Infer Features**:
```python
features = []

# Strategy 1: Analyze src/ subdirectories
if os.path.isdir("src"):
    for subdir in list_dirs("src"):
        if is_significant_module(subdir):  # > 50 lines, not utils/helpers
            features.append({
                "id": subdir,
                "description": f"{subdir.capitalize()} module",
                "code": [f"src/{subdir}/"]
            })

# Strategy 2: Check git branches
for branch in git_branches():
    if branch.startswith("feature/"):
        feature_name = branch.replace("feature/", "")
        features.append({
            "id": feature_name,
            "description": f"Feature: {feature_name}",
            "status": "in-progress"
        })

# Strategy 3: Ask user to confirm
present features to user for confirmation
```

**Infer Agents**:
```python
if user_answer_5 != "a":
    return {"enabled": False}

# Detect significant directories (>3 files or >100 lines total)
agents = []
for dir in find_dirs("src/*/", "docs/*/", "*/"):
    if is_significant(dir):
        agents.append({
            "id": to_kebab(dir),
            "role": infer_role(dir),
            "description": f"Works on {dir}",
            "context_dirs": [dir]
        })

return {
    "enabled": len(agents) > 0,
    "platform": "claude-sdk",
    "default_execution_mode": "parallel",
    "default_coordination": "message-passing",
    "team": agents
}
```

### Step 4: Reorganize Markdown Files (If User Said Yes)

```bash
# Create docs/ structure
mkdir -p docs/active docs/completed docs/planning docs/archived

# Categorize existing .md files
for file in $md_files; do
    # Skip standard files
    [[ "$file" == "./README.md" ]] && continue
    [[ "$file" == "./CONTRIBUTING.md" ]] && continue

    # Read file to categorize
    content=$(cat "$file")

    # Heuristics for categorization
    if echo "$content" | grep -qi "decision"; then
        dest="docs/decisions.md"  # Append to decisions
    elif echo "$content" | grep -qi "interface\\|contract\\|api"; then
        dest="docs/interfaces.md"  # Append to interfaces
    elif echo "$content" | grep -qi "convention\\|style\\|guide"; then
        dest="docs/conventions.md"  # Append to conventions
    elif echo "$content" | grep -qi "todo\\|plan\\|roadmap"; then
        dest="docs/planning/$(basename "$file")"
    else
        dest="docs/active/$(basename "$file")"
    fi

    # Move with git to preserve history
    git mv "$file" "$dest" 2>/dev/null || mv "$file" "$dest"
done
```

### Step 5: Create Root ad.yaml

```bash
# Generate agents from detected structure
agents_section=$(python3 <<EOF
import yaml
agents = inferred_agents  # From Step 3
print(yaml.dump({"agents": agents}, default_flow_style=False))
EOF
)

cat > ad.yaml << EOF
# Auto-generated by AD initialization
# Date: $(date -Iseconds)

domain: "$inferred_domain"
mode: "$user_chosen_mode"

# Global context files
context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

# Active features (auto-detected)
active_features:
$(for feature in $inferred_features; do
    echo "  - path: \"docs/active/$feature_id\""
    echo "    description: \"$feature_description\""
    echo "    status: \"in-progress\""
done)

# Completed features
completed_features: []

$agents_section

# Settings
settings:
  auto_commit: true
  require_tests: true
EOF

echo "✓ Created ad.yaml"
```

### Step 6: Create Feature ad.yaml Files

```bash
# For each detected feature
for feature in $inferred_features; do
    feature_dir="docs/active/$feature_id"
    mkdir -p "$feature_dir"

    cat > "$feature_dir/ad.yaml" << EOF
id: "$feature_id"
type: "feat"
description: "$feature_description"
phase: "$inferred_phase"
version: "v0.$phase_number.0"
status: "in-progress"
context_files: []
code_locations:
$(for code_path in $feature_code_paths; do
    echo "  - \"$code_path\""
done)
tasks: []
agents:
  enabled: false
notes:
  - "Auto-generated during AD initialization"
EOF

    echo "✓ Created $feature_dir/ad.yaml"
done
```

### Step 7: Create Initial Documentation

```bash
# Create docs/journal.md
cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - AD Initialization

- **Action**: Initialized AD for existing project
- **Domain**: $domain
- **Mode**: $mode
- **Detected Features**: $feature_count
- **Current Phase**: $inferred_phase

### Next Steps
- Review auto-generated ad.yaml files
- Fill in missing documentation
- Continue development with AD workflow
EOF

# Create docs/decisions.md (if doesn't exist)
[ ! -f "docs/decisions.md" ] && cat > docs/decisions.md << EOF
# Architecture Decision Records

## $(date +%Y-%m-%d) - Initialize AD Methodology

**Status**: Accepted

**Context**: Project existed without structured methodology.

**Decision**: Adopt Agentic Driven (AD) methodology.

**Consequences**:
✅ Structured workflow with clear phases
✅ Feature-driven development
✅ Better documentation practices
EOF

# Create docs/conventions.md (if doesn't exist)
[ ! -f "docs/conventions.md" ] && cat > docs/conventions.md << EOF
# Project Conventions

## Code Style
[TODO: Document your code style conventions]

## Git Workflow
- Use Conventional Commits
- One feature per branch
- Commit frequently

## Documentation
- All docs in docs/
- Feature docs in docs/active/feature-name/
- Follow AD phase structure

## Testing
- Write tests for all features
- Aim for 80%+ coverage
EOF
```

### Step 8: Commit Initialization

```bash
# Stage everything
git add .

# Commit
git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation into docs/
- Created feature ad.yaml files
- Detected $feature_count active features
- Current inferred phase: $inferred_phase

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✓ Committed AD initialization"
```

### Step 9: Report to User

```
AI: "✓ AD initialized: $domain ($mode)
    Features: $feature_count
    Agents: $agent_count detected
    Phase: $inferred_phase

    Review ad.yaml and start working"
```

### Special Cases

**Project Without Git**:
```
AI: "⚠️  This project is not a git repository.

    AD relies on git for version control.

    Would you like me to initialize git first?"
```

**Very Early Project (Only README)**:
Create minimal ad.yaml with no features, user creates first one.

**Mature Project**: Reorganize carefully, preserve existing structure.

## During Work

**Before changes**: Read files, check contracts, verify directory
**After task**: Verify works, update docs, update ad.yaml, update journal.md, commit, update user

### CRITICAL: ad.yaml Update Rules

#### NEVER Modify These Fields in Root ad.yaml

```bash
# ❌ FORBIDDEN
yq eval '.domain = "..."' -i ad.yaml              # NEVER
yq eval '.mode = "..."' -i ad.yaml                # NEVER
yq eval '.version = "..."' -i ad.yaml             # NEVER
yq eval '.settings = {...}' -i ad.yaml            # Only if user asks
```

#### Allowed Operations on Root ad.yaml

**Adding a New Feature**:
```bash
# ✅ ALLOWED
yq eval '.active_features += [{
  "path": "docs/active/new-feature",
  "description": "Feature description",
  "status": "in-progress"
}]' -i ad.yaml
```

**Updating Feature Status**:
```bash
# ✅ ALLOWED
yq eval '(.active_features[] | select(.path == "docs/active/user-auth") | .status) = "testing"' -i ad.yaml
```

**Completing a Feature**:
```bash
# ✅ ALLOWED
yq eval '.completed_features += [{
  "path": "docs/completed/user-auth",
  "completed_at": "'$(date +%Y-%m-%d)'",
  "description": "JWT authentication"
}]' -i ad.yaml

yq eval 'del(.active_features[] | select(.path == "docs/active/user-auth"))' -i ad.yaml
```

**Adding Global Context File (WITH USER PERMISSION)**:
```bash
# ⚠️ ASK USER FIRST
AI: "I've created docs/architecture.md. Should I add it to the global context_files?"
# Only if user says YES:
yq eval '.context_files += ["docs/architecture.md"]' -i ad.yaml
```

#### ALWAYS Update Feature ad.yaml

**Advancing Phase**:
```bash
# ✅ REQUIRED
yq eval '.phase = "BUILD"' -i docs/active/user-auth/ad.yaml
yq eval '.version = "v0.4.0"' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml
git commit -m "chore(user-auth): advance to BUILD phase (v0.4.0)"
```

**Adding Context File**:
```bash
# ✅ REQUIRED - When you create a new doc
yq eval '.context_files += ["docs/active/user-auth/02-design/design.md"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml docs/active/user-auth/02-design/design.md
git commit -m "docs(user-auth): add design document"
```

**Adding Code Location**:
```bash
# ✅ REQUIRED - When you create new code
yq eval '.code_locations += ["src/auth/"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml src/auth/
git commit -m "feat(user-auth): add authentication service"
```

**Updating Tasks**:
```bash
# ✅ REQUIRED - When completing a task
yq eval '(.tasks[] | select(.description == "Implement login endpoint") | .status) = "done"' -i docs/active/user-auth/ad.yaml
```

#### Validation After Every Modification

```bash
# Check YAML is valid
yq eval ad.yaml > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Invalid YAML!"
  git restore ad.yaml
  exit 1
fi
```

#### Safe Modification Pattern

```bash
# 1. Backup
cp ad.yaml ad.yaml.backup

# 2. Modify
yq eval '[modification]' -i ad.yaml

# 3. Validate
if ! yq eval ad.yaml > /dev/null 2>&1; then
    mv ad.yaml.backup ad.yaml
    # Explain error to user
    exit 1
fi

# 4. Success - remove backup
rm ad.yaml.backup

# 5. Commit
git add ad.yaml
git commit -m "chore: update ad.yaml"
```

#### What to Do on Error

```bash
# 1. Restore the file
git restore ad.yaml

# 2. Explain to user
AI: "I attempted to modify ad.yaml but validation failed.
     The file has been restored.
     Error: [specific error]"

# 3. Ask user what to do
AI: "Would you like me to:
     1. Try a different approach?
     2. Skip this update?"
```

## Session End

**Clean**: Commit all completed work, update journal.md, leave clean workspace, push if ready
**Interrupted**: Commit with `wip:`, update journal noting incomplete work

## Multi-Agent

If ad.yaml has agents enabled:
- Identify your agent ID
- Stay in context directories
- Read contracts before implementing
- Use mocks for dependencies
- Don't touch other agents' files

# Exit Criteria

## By Phase

**DEFINE**: Problem stated, objectives defined, scope documented, constraints identified, success criteria defined
**DISCOVER**: Requirements gathered, options researched, feasibility assessed, decisions documented, risks identified
**DESIGN**: Solution designed, architecture defined, interfaces specified, design approved, ready to build
**SETUP**: Tools configured, environment ready, validation criteria defined, team ready
**BUILD**: All components implemented, contracts fulfilled, docs updated, reviewed
**VALIDATE**: Validation criteria met, quality acceptable, validation report complete, stakeholders approve
**MARKET**: Materials created, docs complete, strategy defined, channels prepared, ready to launch
**LAUNCH**: Deployed, monitoring active, metrics collected, no critical issues, ready for support
**SUPPORT**: Stable period complete, critical issues resolved, support working, feedback collected, ready to evolve
**EVOLVE**: Improvements implemented, optimized, features added, roadmap updated, lessons documented

## Validation

Before advancing:
1. Review checklist
2. Verify items complete
3. Document exceptions
4. Get approval
5. Commit final work
6. Update to next phase

```bash
git commit -m "docs: complete DESIGN exit criteria"
git commit -m "chore: start SETUP (v0.3.0)"
```

## Flexibility

Guidelines, not rigid rules. Adapt to project needs. Document deviations. Focus on quality.

# Troubleshooting

## Process

1. Identify: What's failing?
2. Isolate: Where's the problem?
3. Document: What did you try?
4. Solve: Fix it
5. Prevent: Avoid repeat

## Common Issues

- **Phase unclear**: Check exit criteria, review journal.md
- **Multi-agent conflict**: Check context boundaries, coordinate via git
- **Lost work**: Check `git stash list`, `git reflog`
- **Git conflicts**: Resolve markers, stage, complete merge
- **Contract mismatch**: Read `docs/interfaces.md`, update code or contract

## Rollback

```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
```

## Document

Update `docs/journal.md` with issue, cause, solution.

## Prevention

Commit frequently, read contracts, update journal, follow exit criteria, respect boundaries.

