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

## Rules
- Do NOT add IDE or AI signatures (Co-Authored-By, GitHub Copilot, Claude, etc.)
- Keep commits clean and author-only

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

## Mode: Feature vs Project

**mode: "feature"** (Recommended)
- Each feature has its own mini-cycle through phases
- Features can be at different phases simultaneously
- Example: feature-A in BUILD while feature-B in DESIGN
- More flexible, parallel work possible
- Each feature has `docs/active/feature-name/ad.yaml`

**mode: "project"**
- Entire project advances through phases as one unit
- All work follows the same phase progression
- More structured, sequential approach
- Still uses features, but all features align to project phase
- Features still have their own `docs/active/feature-name/ad.yaml`

**Important**: Both modes use features. The difference is how phases are managed:
- Feature mode: Each feature has independent phase tracking
- Project mode: Features exist but follow project's overall phase

## Feature ad.yaml

Located at `docs/active/feature-name/ad.yaml`:

```yaml
id: "feature-name"
type: "feat"  # feat | fix | spike | refactor | docs | chore
description: "What this feature does"

# Phase tracking (independent in feature mode, follows project in project mode)
phase: "BUILD"
version: "v0.4.2"
status: "in-progress"

# Feature-specific documentation
context_files:
  - "docs/active/feature-name/00-define/problem.md"
  - "docs/active/feature-name/02-design/design.md"

# Code locations for this feature
code_locations:
  - "src/feature-area/"
  - "tests/feature-area/"

# Task tracking (optional)
tasks:
  - description: "Task description"
    status: "done"

# Dependencies (optional)
dependencies:
  - feature: "other-feature"
    reason: "Why needed"
    status: "completed"

agents:
  enabled: false

notes:
  - "Important context"
```

## Feature Types

Different feature types go through different phases:

```
feat:     DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
fix:      DEFINE → VALIDATE
spike:    DEFINE → DISCOVER
refactor: DEFINE → BUILD → VALIDATE
docs:     DEFINE → BUILD
chore:    DEFINE → BUILD
```

## Multi-Agent Configuration

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

Configure agents based on your project's separation of concerns. Each agent works in specific directories and phases.

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

Every session begins with these steps:

1. **Check if `ad.yaml` exists**
   - Not found → Trigger auto-initialization (see below)
   - Found → Continue with normal workflow

2. **Read root `ad.yaml`**
   - Extract: domain, mode, context_files, active_features, agents
   - Understand project configuration

3. **Read README.md**
   - Get project overview and current state

4. **Read all global context_files**
   - Read each file listed in root ad.yaml context_files
   - Build understanding of project standards, decisions, conventions

5. **List active features**
   - Show all features from active_features array
   - Display their current phase, status, description

6. **Ask user which feature to work on**
   - User selects from active features
   - Or user says "new" to create a new feature

7. **Read feature ad.yaml**
   - Load feature-specific configuration
   - Get phase, version, status, context_files, code_locations

8. **Read feature context_files**
   - Load all docs specific to this feature
   - Build complete context for working on this feature

9. **Check multi-agent configuration**
   - If agents enabled, identify which agent is working
   - Load agent-specific context directories
   - Check for blocked agents or dependencies

10. **Present status to user**
    - Show what's been done, what's next
    - Display current phase, blockers, recent progress
    - Ready to start working

## Auto-Initialization

When no `ad.yaml` is found, initialize AD for existing project.

### Step 1: Analyze Project

```bash
# Check git repository
git status

# Check directory structure
ls README.md docs/ src/

# Count documentation files
find . -name "*.md" | wc -l

# Detect project type (optional)
ls package.json requirements.txt Cargo.toml go.mod
```

Detect:
- Git repository status
- Existing directories (docs/, src/, tests/)
- Number of markdown files
- Project type indicators (optional)

### Step 2: Ask User

```
AI: "No ad.yaml found. Initialize AD for this project?

    Detected:
    - Git repository: [yes/no]
    - Structure: [directories found]
    - Documentation: [X markdown files]
    - Type: [detected or unknown]

    Questions:
    1. Domain? (software | book | marketing | event | product | research | course | game)
    2. Mode? (feature | project)
    3. Detect existing features? (yes | no)
    4. Reorganize markdown files into docs/? (yes | no)
    5. Use multi-agent? (yes | no)

    Answer: "
```

**Question 1 - Domain**: What type of project?
- Adapts AI language to your domain
- Examples: software (code), book (chapters), marketing (campaigns)

**Question 2 - Mode**: How to organize work?
- feature: Each feature has independent phase tracking (recommended)
- project: All work follows same phase progression

**Question 3 - Detect features**: Analyze existing code structure?
- yes: AI analyzes src/ subdirectories, git branches to suggest features
- no: Start with empty active_features, user creates first feature

**Question 4 - Reorganize markdown**: Move scattered .md files into docs/?
- yes: AI categorizes and moves files (decisions, conventions, etc.)
- no: Leave files where they are

**Question 5 - Multi-agent**: Enable multi-agent workflows?
- yes: AI detects significant directories and suggests agent configuration
- no: Single agent workflow

### Step 3: Infer State

Based on project analysis and user answers:

**Infer Domain**:
```python
if user_specified_domain:
    domain = user_answer
elif has_code_structure:
    domain = "software"
elif mostly_markdown_files:
    domain = "book"
else:
    domain = "software"  # safe default
```

**Infer Phase**:
```python
if has_tests_and_passing:
    phase = "VALIDATE"
elif lines_of_code > 1000:
    phase = "BUILD"
elif has_design_docs:
    phase = "DESIGN"
elif has_requirements_docs:
    phase = "DISCOVER"
elif only_has_readme:
    phase = "DEFINE"
else:
    phase = "DEFINE"  # safe default
```

**Infer Features**:
```python
features = []

# Strategy 1: Analyze src/ subdirectories
for subdir in list_dirs("src/"):
    if is_significant(subdir):  # >3 files or >100 lines
        features.append({
            "id": subdir,
            "path": f"docs/active/{subdir}",
            "description": f"{subdir.capitalize()} module"
        })

# Strategy 2: Check git branches
for branch in git_branches():
    if branch.startswith("feature/"):
        name = branch.replace("feature/", "")
        features.append({
            "id": name,
            "path": f"docs/active/{name}",
            "description": f"Feature: {name}"
        })

# Strategy 3: Ask user to confirm detected features
present_features_for_confirmation()
```

**Infer Agents** (if user chose yes):
```python
if user_answer_5 != "a":
    return {"enabled": False}

agents = []

# Detect significant directories
for dir in find_dirs("src/*/", "docs/*/"):
    if is_significant(dir):  # >3 files or >100 lines total
        agents.append({
            "id": to_kebab(dir),
            "role": infer_role(dir),
            "description": f"Works on {dir}",
            "phases": infer_phases(dir),
            "capabilities": infer_capabilities(dir),
            "context_dirs": [dir]
        })

# Only enable if agents detected
if len(agents) == 0:
    return {"enabled": False}

return {
    "enabled": True,
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
for file in $(find . -name "*.md"); do
    # Skip standard files
    [[ "$file" == "./README.md" ]] && continue

    # Read and categorize by content
    if grep -qi "decision" "$file"; then
        mv "$file" docs/decisions.md  # or append
    elif grep -qi "interface\|contract" "$file"; then
        mv "$file" docs/interfaces.md
    # ... more categorization
    fi
done
```

### Step 5: Create Root ad.yaml

```bash
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
$(for f in $detected_features; do
    echo "  - path: \"docs/active/$f\""
    echo "    description: \"$f_description\""
    echo "    status: \"in-progress\""
done)

completed_features: []

agents:
$(if [ "$agents_enabled" = "true" ]; then
    echo "  enabled: true"
    echo "  platform: \"claude-sdk\""
    echo "  default_execution_mode: \"parallel\""
    echo "  default_coordination: \"message-passing\""
    echo "  team:"
    for agent in $detected_agents; do
        echo "    - id: \"$agent_id\""
        echo "      role: \"$agent_role\""
        echo "      context_dirs: [\"$agent_dirs\"]"
    done
else
    echo "  enabled: false"
fi)

settings:
  auto_commit: true
EOF
```

### Step 6: Create Feature ad.yaml Files

```bash
for feature in $detected_features; do
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
$(for path in $feature_code_paths; do
    echo "  - \"$path\""
done)
tasks: []
agents:
  enabled: false
notes:
  - "Auto-generated during AD initialization"
EOF
done
```

### Step 7: Create Initial Documentation

```bash
# Create journal.md
cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - AD Initialization

- Action: Initialized AD for existing project
- Domain: $domain
- Mode: $mode
- Features: $feature_count detected
- Phase: $inferred_phase

### Next Steps
- Review ad.yaml configuration
- Review detected features
- Start working with AD workflow
EOF

# Create decisions.md (if doesn't exist)
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

# Create conventions.md (if doesn't exist)
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

### Step 8: Commit Initialization

```bash
git add .

git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation into docs/
- Created $feature_count feature ad.yaml files
- Detected $agent_count agents
- Current inferred phase: $inferred_phase

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 9: Report to User

```
AI: "✓ AD initialization complete!

    Configuration:
    - Domain: $domain
    - Mode: $mode
    - Phase: $inferred_phase (inferred)

    Features detected: $feature_count
    $(for f in $features; do echo "    - $f: $f_description"; done)

    Agents detected: $agent_count
    $(for a in $agents; do echo "    - $a: $a_description"; done)

    Next steps:
    - Review ad.yaml and feature configurations
    - Adjust agent assignments if needed
    - Start working on a feature

    What would you like to do?"
```

### Special Cases

**No Git Repository**:
```
AI: "⚠️  This project is not a git repository.
    AD relies on git for version control.
    Would you like me to initialize git first?"
```

**Very Early Project** (only README):
Create minimal ad.yaml with no features, user creates first one.

**Mature Project**:
Reorganize carefully, preserve existing structure, ask before moving files.

## During Work

**Before making changes**:
- Read relevant files
- Check contracts (if multi-agent)
- Verify you're in correct directory

**After completing task**:
- Verify changes work
- Update documentation
- Update ad.yaml (feature or root as needed)
- Update journal.md with progress
- Commit changes with clear message
- Report to user what was done

### ad.yaml Update Rules

**NEVER Modify** (Root ad.yaml):
- `domain` - Never change
- `mode` - Never change
- `version` - Not used at root level
- `settings` - Only if user explicitly asks

**Allowed** (Root ad.yaml):
- Add/update `active_features` array
- Move features to `completed_features`
- Add `context_files` (with user permission)
- Update agent configuration (if user asks)

**ALWAYS Update** (Feature ad.yaml):
- `phase` and `version` when advancing phases
- `context_files` array when creating new docs
- `code_locations` array when creating new code
- `tasks` status when completing tasks
- `status` when feature state changes

**Validation After Every Modification**:
```bash
# Validate YAML syntax
yq eval ad.yaml > /dev/null 2>&1

# If validation fails, restore and report error
if [ $? -ne 0 ]; then
    git restore ad.yaml
    echo "ERROR: Invalid YAML syntax"
    exit 1
fi
```

## Session End

**Clean Exit**:
- Commit all completed work
- Update journal.md with final status
- Leave working tree clean
- Push to remote if ready

**Interrupted Exit**:
- Commit with `wip:` prefix
- Update journal noting incomplete work
- Leave clear notes about what's in progress

## Multi-Agent Workflow

When agents are enabled:

**Identify Your Agent**:
- Check which agent you are from root ad.yaml
- Understand your role, capabilities, context_dirs

**Stay in Context**:
- Only work in your assigned context_dirs
- Don't modify files outside your context
- Respect other agents' boundaries

**Read Contracts First**:
- Check docs/interfaces.md for specifications
- Implement exactly to spec
- Don't deviate without updating contract

**Use Mocks for Dependencies**:
- If another agent's work not ready, use mocks
- Document mock usage in notes
- Replace mocks when real implementation available

**Communicate via Git**:
- Commit frequently with clear messages
- Update journal.md with your progress
- Read journal.md to see other agents' status
- Coordinate handoffs via feature ad.yaml status

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

