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

# Documentation

Document before, during, after.

## By Phase

**DEFINE**: problem, objectives, scope
**DISCOVER**: requirements, decisions
**DESIGN**: design, architecture, interfaces
**SETUP**: setup, validation-criteria
**BUILD**: build-log
**VALIDATE**: validation-report
**MARKET**: marketing-plan
**LAUNCH**: launch-log
**SUPPORT**: support-log
**EVOLVE**: evolution-plan

## Location

Simple: `docs/` flat
Complex: `docs/active/`, `docs/completed/`, `docs/archived/`

Always at root: `journal.md`, `decisions.md`

Update docs in same commit as code.

# Journal

## File: docs/journal.md

Daily progress log. Most recent at top.

## Format

```markdown
## YYYY-MM-DD
- Phase: PHASE (vX.Y.Z)
- Progress: What completed
- Next: Next steps
```

Multi-agent: Each agent adds section.

# Decisions

## File: docs/decisions.md

Architecture Decision Records (ADRs). Newest at top.

## Format

```markdown
## [Date] - [Title]

**Status**: Accepted | Rejected | Deprecated
**Context**: Problem (2-3 sentences)
**Decision**: What decided (1-2 sentences)
**Consequences**: ✅ Positive, ❌ Negative
**Alternatives**: Options rejected and why
```

## When to Document

Document: Technical choices with multiple options, architectural changes, trade-offs
Skip: Obvious choices, trivial decisions, implementation details

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

## Session Start

1. Check if `ad.yaml` exists
   - No → Auto-initialize (see below)
   - Yes → Continue

2. Read `ad.yaml`: domain, mode, context_files, active_features, agents
3. Read README.md
4. Read all context_files
5. List active features
6. Ask user which feature to work on
7. Read feature `ad.yaml` and context_files
8. Present status

## Auto-Initialization

### Step 1: Analyze Project

```bash
git status  # Check git repo
ls README.md docs/ src/  # Check structure
find . -name "*.md" | wc -l  # Count docs
```

Detect: git status, directories, file count, project type

### Step 2: Ask User

```
AI: "No ad.yaml found. Initialize AD?

    Detected: [project analysis]

    Questions:
    1. Domain? (software | book | marketing | event | product | research | course | game)
    2. Mode? (feature | project)
    3. Detect existing features? (yes | no)
    4. Reorganize markdown files into docs/? (yes | no)
    5. Use multi-agent? (yes | no)

    Answer: "
```

### Step 3: Infer State

**Domain**: Use user answer or infer from structure
**Phase**: Infer from codebase state (DEFINE if minimal, BUILD if substantial code)
**Features**: Analyze src/ subdirectories, git branches
**Agents**: If user wants multi-agent:

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

### Step 4: Reorganize Files (if user said yes)

```bash
mkdir -p docs/active docs/completed docs/planning docs/archived

# Categorize existing .md files by content keywords
# Move to appropriate location (decisions.md, interfaces.md, etc.)
```

### Step 5: Create ad.yaml

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

context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

active_features:
$(for feature in $inferred_features; do
    echo "  - path: \"docs/active/$feature_id\""
    echo "    description: \"$feature_description\""
    echo "    status: \"in-progress\""
done)

completed_features: []

$agents_section

settings:
  auto_commit: true
EOF
```

### Step 6: Create Feature ad.yaml Files

```bash
for feature in $inferred_features; do
    mkdir -p "docs/active/$feature_id"
    cat > "docs/active/$feature_id/ad.yaml" << EOF
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
done
```

### Step 7: Create Initial Docs

```bash
cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - AD Initialization

- Action: Initialized AD for existing project
- Domain: $domain
- Mode: $mode
- Features: $feature_count
- Phase: $inferred_phase

### Next Steps
- Review ad.yaml
- Continue development with AD workflow
EOF

[ ! -f "docs/decisions.md" ] && cat > docs/decisions.md << EOF
# Architecture Decision Records

## $(date +%Y-%m-%d) - Initialize AD Methodology

**Status**: Accepted
**Context**: Project existed without structured methodology.
**Decision**: Adopt Agentic Driven (AD) methodology.
**Consequences**: Structured workflow, feature-driven development, better documentation.
EOF

[ ! -f "docs/conventions.md" ] && cat > docs/conventions.md << EOF
# Project Conventions

## Git Workflow
- Use Conventional Commits
- One feature per branch
- Commit frequently

## Documentation
- All docs in docs/
- Feature docs in docs/active/feature-name/
- Follow AD phase structure
EOF
```

### Step 8: Commit

```bash
git add .
git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation into docs/
- Created $feature_count feature ad.yaml files
- Current phase: $inferred_phase

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 9: Report

```
AI: "✓ AD initialized: $domain ($mode)
    Features: $feature_count
    Agents: $agent_count detected
    Phase: $inferred_phase

    Review ad.yaml and start working"
```

### Special Cases

**No Git**: Prompt to initialize git first
**Very Early Project**: Create minimal ad.yaml with no features
**Mature Project**: Reorganize carefully, preserve structure

## During Work

**Before changes**: Read files, check contracts, verify directory
**After task**: Verify works, update docs, update ad.yaml, update journal.md, commit, update user

### ad.yaml Update Rules

#### NEVER Modify (Root ad.yaml)
- `domain`
- `mode`
- `version`
- `settings` (unless user asks)

#### Allowed (Root ad.yaml)
- Add/update `active_features`
- Move features to `completed_features`
- Add `context_files` (with user permission)

#### ALWAYS Update (Feature ad.yaml)
- Advance phase and version
- Add context_files when creating docs
- Add code_locations when creating code
- Update tasks status

#### Validation
```bash
yq eval ad.yaml > /dev/null 2>&1 || { git restore ad.yaml; exit 1; }
```

## Session End

**Clean**: Commit all completed work, update journal.md, push if ready
**Interrupted**: Commit with `wip:`, update journal noting incomplete work

## Multi-Agent

If agents enabled:
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

