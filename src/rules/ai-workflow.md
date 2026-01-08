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
       a) Yes, suggest agents based on project structure
       b) No, single agent for now

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
def infer_agents(user_wants_agents):
    """
    Configure multi-agent based on user preference.
    Only enabled if user answered 5a (Yes to multi-agent).
    No automatic detection - user configures agents manually after initialization.
    """
    if not user_wants_agents:
        return {"enabled": False}

    # Enable multi-agent with empty team - user will configure based on their project needs
    agents_config = {
        "enabled": True,
        "platform": "claude-sdk",
        "default_execution_mode": "parallel",
        "default_coordination": "message-passing",
        "team": []  # User configures agents manually based on their domain/structure
    }

    return agents_config

# Execute agent inference
inferred_agents = infer_agents(user_answer_5a)
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
# Generate agent configuration based on user preference
if [ "$user_answer_5" = "a" ]; then
    # User wants multi-agent - enable with empty team for manual configuration
    agents_section="# Agents (enabled - configure team based on your project structure)
agents:
  enabled: true
  platform: \"claude-sdk\"                 # claude-sdk | windsurf | cursor
  default_execution_mode: \"parallel\"      # parallel | sequential | hybrid
  default_coordination: \"message-passing\" # message-passing | shared-state | pipeline

  # Configure your team based on project needs:
  # For software: backend-dev, frontend-dev, qa-engineer, devops
  # For books: chapter-writers, editor, designer, publisher
  # For marketing: content-creator, designer, analyst, campaign-manager
  # For events: logistics, promotion, program, registration
  team: []"
else
    # User doesn't want agents
    agents_section="# Agents (disabled)
agents:
  enabled: false"
fi

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
AI: "✓ AD initialization complete!

    Created:
    - ad.yaml (root configuration)
    - docs/ directory structure
    - $feature_count feature ad.yaml files
    - Initial documentation

    Domain: $domain
    Mode: $mode

    [If agents enabled:]
    Multi-agent: Enabled (team: [] - needs configuration)
    ⚠️  You need to configure your team in ad.yaml based on your project:
       - For software: backend-dev, frontend-dev, qa-engineer, devops
       - For books: chapter-writers, editor, designer, publisher
       - For marketing: content-creator, designer, analyst, campaign-manager
       - For events: logistics, promotion, program, registration
       See ad.yaml for examples and structure.

    Detected features ($feature_count):
    1. feature-name (path) - Description
    2. ...

    Current phase: $inferred_phase (inferred from codebase)

    You can now:
    - Review ad.yaml and configure agents (if enabled)
    - Review feature configurations
    - Continue working with AD workflow
    - Ask me to work on any feature

    Would you like me to:
    a) Show you the generated ad.yaml?
    b) Start working on a specific feature?
    c) Explain how to configure multi-agent?"
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
