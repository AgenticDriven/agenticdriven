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
