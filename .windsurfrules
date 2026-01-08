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
│   ├── active/       # Feature-driven
│   ├── completed/
│   └── archived/
├── src/              # Adapt by domain
└── assets/
```

## Domain-Specific src/

**Software**: backend/, frontend/, shared/
**Book**: chapters/, appendices/, resources/
**Marketing**: campaigns/, content/, analytics/
**Event**: program/, logistics/, promotion/
**Product**: design/, specs/, prototypes/

## Feature-Driven

```
docs/active/feature-name/
├── ad.yaml
├── 00-define/
├── 02-design/
└── 04-build/
```

## Project-Driven

```
docs/
├── 00-define/
├── 02-design/
└── 04-build/
```

Phase directories: 00-define, 01-discover, 02-design, 03-setup, 04-build, 05-validate, 06-market, 07-launch, 08-support, 09-evolve

Standard base: README, ad.yaml, docs/, src/

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

## Format

```markdown
## Interface: Name
**Input**: What goes in
**Output**: What comes out
**Errors**: Possible failures
```

## Workflow

DESIGN: Define contracts, review, commit
BUILD: Read contracts, implement, use mocks for unimplemented deps

Never deviate without updating contract first.

# AI Workflow

## Session Start

1. Check `ad.yaml` exists → No: auto-initialize | Yes: continue
2. Read `ad.yaml`: domain, mode, context_files, active_features, agents
3. Read README.md and all context_files
4. List active features, ask user which one
5. Read feature `ad.yaml` and context_files
6. Present status

## Auto-Initialization

### Analyze Project
```bash
git status; ls README.md docs/ src/; find . -name "*.md" | wc -l
```

### Ask User
```
AI: "No ad.yaml. Initialize AD?

Questions:
1. Domain? (software|book|marketing|event|product|research|course|game)
2. Mode? (feature|project)
3. Detect existing features? (yes|no)
4. Reorganize markdown into docs/? (yes|no)
5. Use multi-agent? (yes|no)"
```

### Infer State
- **Domain**: User answer or infer from structure
- **Phase**: DEFINE (minimal) or BUILD (substantial code)
- **Features**: Analyze src/ subdirectories, git branches
- **Agents**: If user wants multi-agent, detect significant directories

```python
if user_answer_5 != "a":
    return {"enabled": False}

agents = []
for dir in find_dirs("src/*/", "docs/*/"):
    if is_significant(dir):  # >3 files or >100 lines
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

### Reorganize Files (if yes)
```bash
mkdir -p docs/active docs/completed docs/planning docs/archived
# Categorize .md files by keywords → move to appropriate location
```

### Create ad.yaml
```bash
cat > ad.yaml << EOF
domain: "$domain"
mode: "$mode"
context_files: ["README.md", "docs/decisions.md", "docs/conventions.md"]
active_features:
$(for f in $features; do echo "  - path: \"docs/active/$f\""; done)
completed_features: []
$agents_section
settings:
  auto_commit: true
EOF
```

### Create Feature ad.yaml
```bash
for f in $features; do
  mkdir -p "docs/active/$f"
  cat > "docs/active/$f/ad.yaml" << EOF
id: "$f"
type: "feat"
phase: "$phase"
version: "v0.$phase_num.0"
status: "in-progress"
context_files: []
code_locations: []
EOF
done
```

### Create Initial Docs
```bash
cat > docs/journal.md << EOF
# Project Journal
## $(date +%Y-%m-%d) - AD Initialization
- Domain: $domain
- Mode: $mode
- Features: $count
EOF

[ ! -f "docs/decisions.md" ] && echo "# Architecture Decision Records" > docs/decisions.md
[ ! -f "docs/conventions.md" ] && cat > docs/conventions.md << EOF
# Project Conventions
## Git Workflow
- Use Conventional Commits
- One feature per branch
## Documentation
- All docs in docs/
- Feature docs in docs/active/feature-name/
EOF
```

### Commit
```bash
git add .
git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation
- Created $count feature ad.yaml files

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Report
```
AI: "✓ AD initialized: $domain ($mode)
    Features: $count
    Agents: $agent_count detected
    Phase: $phase"
```

### Special Cases
- No Git: Prompt to initialize git first
- Very Early: Create minimal ad.yaml with no features
- Mature: Reorganize carefully

## During Work

**Before changes**: Read files, check contracts
**After task**: Verify, update docs, update ad.yaml, update journal.md, commit

### ad.yaml Update Rules

**NEVER Modify** (Root):
- domain, mode, version, settings (unless user asks)

**Allowed** (Root):
- Add/update active_features
- Move to completed_features
- Add context_files (with permission)

**ALWAYS Update** (Feature):
- Phase and version when advancing
- context_files when creating docs
- code_locations when creating code
- tasks status

**Validation**: `yq eval ad.yaml > /dev/null 2>&1 || { git restore ad.yaml; exit 1; }`

## Session End

**Clean**: Commit all, update journal, push if ready
**Interrupted**: Commit with `wip:`, note incomplete

## Multi-Agent

- Identify your agent ID
- Stay in context directories
- Read contracts before implementing
- Use mocks for dependencies
- Don't touch other agents' files

# Exit Criteria

**DEFINE**: Problem stated, objectives defined, scope documented
**DISCOVER**: Requirements gathered, options researched, feasibility assessed
**DESIGN**: Solution designed, architecture defined, interfaces specified
**SETUP**: Tools configured, environment ready, validation criteria defined
**BUILD**: All components implemented, contracts fulfilled, docs updated
**VALIDATE**: Validation criteria met, quality acceptable, report complete
**MARKET**: Materials created, docs complete, strategy defined
**LAUNCH**: Deployed, monitoring active, no critical issues
**SUPPORT**: Stable, critical issues resolved, feedback collected
**EVOLVE**: Improvements implemented, optimized, roadmap updated

## Validation

Before advancing: Review checklist, verify complete, document exceptions, get approval, commit

Guidelines, not rigid rules. Adapt to project needs.

# Troubleshooting

## Process

1. Identify: What's failing?
2. Isolate: Where's the problem?
3. Document: What did you try?
4. Solve: Fix it
5. Prevent: Avoid repeat

## Common Issues

- Phase unclear: Check exit criteria, review journal
- Multi-agent conflict: Check context boundaries
- Lost work: Check `git stash list`, `git reflog`
- Git conflicts: Resolve markers, stage, merge
- Contract mismatch: Update code or contract

## Rollback

```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
```

Document issues in `docs/journal.md`. Commit frequently, read contracts, update journal, follow exit criteria.

