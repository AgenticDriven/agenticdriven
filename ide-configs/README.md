# IDE Configurations for AD 2.0 Universal

This directory contains configuration files for various IDEs and AI coding tools, adapted to work with AD 2.0 Universal methodology.

---

## Available Configurations

| IDE/Tool | File | Multi-Agent | Setup Difficulty |
|----------|------|-------------|------------------|
| **Cursor** | `.cursorrules` | 🟡 Workarounds | ⭐ Easy |
| **Windsurf** | `.windsurfrules` | ✅ Native (Cascade) | ⭐ Easy |
| **Claude Code** | `claude.md` | ✅ With SDK | ⭐⭐⭐ Advanced |
| **GitHub Copilot** | `.github/copilot-instructions.md` | ❌ No | ⭐ Easy |
| **Continue.dev** | `.continuerc.json` | ❌ No | ⭐⭐ Medium |
| **Aider** | `.aider.conf.yml` | 🟡 Multi-process | ⭐⭐ Medium |

---

## Quick Setup

### For Cursor

```bash
# Copy to project root
cp .cursorrules /path/to/your/project/

# That's it! Cursor will automatically use it
```

**What it does:**
- Instructs Cursor Composer to follow AD 2.0 phases
- Enforces contract-first in BUILD phase
- Validates exit criteria before advancing
- Generates proper commit messages

**Best for:**
- Solo developers
- Small teams (2-3 people)
- Projects where UX is priority
- When you want easiest setup

---

### For Windsurf

```bash
# Copy to project root
cp .windsurfrules /path/to/your/project/

# Windsurf will detect it automatically
```

**What it does:**
- Configures Cascade agents to coordinate via AD 2.0
- Code Agent + Terminal Agent + Review Agent work together
- Automatic multi-agent coordination in BUILD phase
- Contract-first enforcement

**Best for:**
- Multi-step complex tasks
- When you want native multi-agent
- Workflow automation (Flows)
- Teams that want simple multi-agent

---

### For Claude Code (CLI)

```bash
# Copy to project root
cp claude.md /path/to/your/project/

# Use in terminal
claude-code "Implement POST /api/users following contract"
```

**What it does:**
- Guides Claude Code CLI to follow AD 2.0
- Tool use protocol for filesystem, bash, web_search
- Contract-first enforcement
- Multi-agent ready (with Claude Agent SDK)

**Best for:**
- CLI enthusiasts
- Automation and scripting
- CI/CD integration
- Advanced users who want maximum control
- True parallel multi-agent (with SDK)

**For multi-agent parallel:**
```python
# coordinator.py (use Claude Agent SDK)
from claude_agent import Agent, Coordinator

backend = Agent(config_file="claude.md", context_dirs=["src/backend/"])
frontend = Agent(config_file="claude.md", context_dirs=["src/frontend/"])

coord = Coordinator([backend, frontend])
await coord.run_parallel(...)
```

---

### For GitHub Copilot

```bash
# Copy to .github/ directory
mkdir -p /path/to/your/project/.github
cp .github/copilot-instructions.md /path/to/your/project/.github/

# GitHub Copilot will automatically use it
```

**What it does:**
- Configures Copilot Chat, Workspace, and CLI
- Phase-aware suggestions
- Contract compliance checking
- Commit message generation
- Issue → PR workflow with AD 2.0

**Best for:**
- Teams already using GitHub
- Enterprise with compliance needs
- Issue → PR workflow
- When you want GitHub integration

---

### For Continue.dev

```bash
# Copy to .continue/ directory
mkdir -p /path/to/your/project/.continue
cp .continuerc.json /path/to/your/project/.continue/config.json

# Set API keys in environment
export ANTHROPIC_API_KEY="your-key"
export OPENAI_API_KEY="your-key"
```

**What it does:**
- Adds custom slash commands for AD 2.0
  - `/phase` - Show current phase
  - `/contracts` - Show contracts
  - `/implement` - Implement following contract
  - `/validate-contract` - Check compliance
  - `/mock` - Generate mock
  - `/advance` - Check if ready for next phase
- Context providers for AD docs
- Phase-aware autocomplete
- Local model support (Ollama)

**Best for:**
- Privacy-conscious projects (local models)
- Open source enthusiasts
- When you want custom workflows
- Multi-IDE (VSCode + JetBrains)

---

### For Aider

```bash
# Copy to project root
cp .aider.conf.yml /path/to/your/project/

# Use in terminal
aider --config .aider.conf.yml
```

**What it does:**
- Configures Aider for AD 2.0
- Architect mode (plan first, then implement)
- Contract-first in BUILD
- Auto-commit with proper messages
- Multi-process coordination guide

**Best for:**
- CLI power users
- Open source projects
- Multi-model flexibility
- Cost-conscious (pay per use)
- Multi-agent via multiple Aider instances

**For multi-agent:**
```bash
# Terminal 1: Backend
aider --read src/backend/ --message "Implement API per contracts"

# Terminal 2: Frontend
aider --read src/frontend/ --message "Implement UI per contracts"

# Coordination via Git
```

---

## Feature Comparison

### Phase Management

| Feature | Cursor | Windsurf | Claude Code | Copilot | Continue | Aider |
|---------|--------|----------|-------------|---------|----------|-------|
| Phase awareness | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Exit criteria validation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Auto phase detection | ✅ | ✅ | ✅ | 🟡 | ✅ | ✅ |
| Phase transition help | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Contract-First (BUILD Phase)

| Feature | Cursor | Windsurf | Claude Code | Copilot | Continue | Aider |
|---------|--------|----------|-------------|---------|----------|-------|
| Auto-read contracts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contract validation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mock generation | 🟡 | 🟡 | ✅ | ✅ | ✅ | ✅ |
| Contract compliance check | 🟡 | ✅ | ✅ | ✅ | ✅ | ✅ |

### Multi-Agent Coordination

| Feature | Cursor | Windsurf | Claude Code | Copilot | Continue | Aider |
|---------|--------|----------|-------------|---------|----------|-------|
| Native multi-agent | ❌ | ✅ Cascade | ✅ SDK | ❌ | ❌ | 🟡 Multi-process |
| Parallel execution | 🟡 | 🟡 | ✅ | ❌ | ❌ | ✅ |
| Inter-agent communication | ❌ | ✅ | ✅ | ❌ | ❌ | 🟡 Git |
| Automatic coordination | ❌ | ✅ | 🟡 | ❌ | ❌ | ❌ |

### Commit Management

| Feature | Cursor | Windsurf | Claude Code | Copilot | Continue | Aider |
|---------|--------|----------|-------------|---------|----------|-------|
| Phase-based commits | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Auto commit messages | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ |
| Git integration | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Prevents cross-phase commits | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ |

---

## Recommended Combinations

### Solo Developer - Best UX
```
Primary: Cursor
Why: Best interface, Composer is powerful
Setup: Copy .cursorrules
```

### Small Team (2-3) - Easy Multi-Agent
```
Primary: Windsurf
Why: Cascade handles coordination automatically
Setup: Copy .windsurfrules
```

### Advanced Team - Maximum Control
```
Primary: Claude Code + Agent SDK
Secondary: Cursor (for UI work)
Why: True parallel, full control
Setup: Copy claude.md + write coordinator.py
```

### Enterprise - GitHub Integration
```
Primary: GitHub Copilot
Secondary: Cursor or Windsurf
Why: GitHub workflow, compliance
Setup: Copy .github/copilot-instructions.md
```

### Open Source - Privacy First
```
Primary: Continue.dev + Ollama
Secondary: Aider
Why: Local models, no vendor lock-in
Setup: Copy .continuerc.json + .aider.conf.yml
```

### Cost-Conscious - Pay per Use
```
Primary: Aider
Secondary: Continue.dev
Why: Pay only for API calls, flexible
Setup: Copy .aider.conf.yml
```

---

## Usage Examples

### Example 1: Start New Project

**With Cursor:**
```bash
# 1. Copy config
cp /var/add/ide-configs/.cursorrules .

# 2. Open in Cursor
cursor .

# 3. Chat with Composer
"Initialize AD 2.0 project for a web application"

# Cursor will:
# - Create add-project.yaml
# - Initialize git
# - Start DISCOVER phase
# - Create docs/ structure
```

**With Claude Code:**
```bash
# 1. Copy config
cp /var/add/ide-configs/claude.md .

# 2. Initialize
claude-code "Initialize AD 2.0 project for web app"

# 3. Start DISCOVER
claude-code "Start DISCOVER phase: research authentication options"
```

---

### Example 2: BUILD Phase with Parallel Agents

**With Windsurf (Native):**
```bash
# 1. Copy config
cp /var/add/ide-configs/.windsurfrules .

# 2. Open Windsurf, enable Cascade

# 3. Give complex task
"Implement user authentication with backend API and frontend UI"

# Windsurf Cascade will:
# - Code Agent: Implement backend
# - Code Agent 2: Implement frontend
# - Terminal Agent: Run tests
# - Review Agent: Validate
# All coordinated automatically
```

**With Claude Code + SDK (Maximum Control):**
```bash
# 1. Copy config
cp /var/add/ide-configs/claude.md .

# 2. Create coordinator.py:
cat > coordinator.py << 'EOF'
from claude_agent import Agent, Coordinator
import asyncio

backend = Agent(
    config_file="claude.md",
    context_dirs=["src/backend/", "docs/"]
)

frontend = Agent(
    config_file="claude.md",
    context_dirs=["src/frontend/", "docs/"]
)

coord = Coordinator([backend, frontend])

async def main():
    # Both read contracts
    await coord.load_contracts("docs/interfaces.md")

    # Execute in parallel
    results = await asyncio.gather(
        backend.run("Implement API per contracts"),
        frontend.run("Implement UI per contracts with mocks")
    )

    print("Both agents done!")
    print(results)

asyncio.run(main())
EOF

# 3. Run coordinator
python coordinator.py
```

**With Aider (Multi-Process):**
```bash
# 1. Copy config
cp /var/add/ide-configs/.aider.conf.yml .

# 2. Terminal 1 - Backend
aider --config .aider.conf.yml \
      --read src/backend/ \
      --read docs/interfaces.md \
      --message "Implement all API endpoints per contracts"

# 3. Terminal 2 - Frontend (simultaneous)
aider --config .aider.conf.yml \
      --read src/frontend/ \
      --read docs/interfaces.md \
      --message "Implement UI components per contracts using mocks"

# 4. Both commit to feature branches
# Terminal 1: feature/v0.4.x-backend
# Terminal 2: feature/v0.4.x-frontend

# 5. Merge when both done
git merge feature/v0.4.x-backend
git merge feature/v0.4.x-frontend
npm test  # Integration tests
```

---

### Example 3: Validate Contract Compliance

**With Cursor:**
```
@file docs/interfaces.md
@file src/backend/users.ts

"Does this implementation follow the contract?"

# Cursor will compare and report
```

**With Continue.dev:**
```
/validate-contract POST /api/users

# Continue will read contract, compare code, report
```

**With Copilot:**
```
@workspace is src/backend/users.ts contract-compliant with docs/interfaces.md?

# Copilot will analyze and report
```

---

## Troubleshooting

### Issue: IDE not following contracts

**Solution for all IDEs:**
1. Verify `docs/interfaces.md` exists
2. Explicitly mention it in prompt:
   ```
   "Read docs/interfaces.md for POST /api/users contract,
   then implement EXACTLY as specified"
   ```
3. Check current phase is BUILD (v0.4.x)

---

### Issue: Commits mixing phases

**Solution:**
1. Be explicit about phase:
   ```
   "This is BUILD phase work only.
   Only commit files from src/, not from docs/"
   ```

2. Review git status before commit:
   ```bash
   git status
   # Verify only BUILD-related files staged
   ```

---

### Issue: Multi-agent conflicts (Aider, Claude Code)

**Solution:**
1. Use separate branches:
   ```bash
   # Agent 1
   git checkout -b feature/v0.4.x-backend

   # Agent 2
   git checkout -b feature/v0.4.x-frontend
   ```

2. Coordinate via Git:
   ```bash
   # Agent 1 finishes
   git commit -m "build(api): all endpoints ready"
   git push

   # Agent 2 sees and integrates
   git pull
   git checkout feature/v0.4.x-frontend
   git merge feature/v0.4.x-backend
   ```

3. Use mocks until integration:
   ```typescript
   // Agent 2 uses mock until Agent 1 done
   import { mockAPI } from './api-mock';
   // Later: import { realAPI } from './api-client';
   ```

---

## Advanced: Custom Workflows

### Creating Custom Slash Commands (Continue.dev)

Edit `.continuerc.json`:
```json
{
  "slashCommands": [
    {
      "name": "my-custom-command",
      "description": "Does something custom",
      "prompt": "Your custom prompt here..."
    }
  ]
}
```

### Creating Windsurf Flows

Create `.windsurf/flows/add-phase-transition.yaml`:
```yaml
name: "AD Phase Transition"
trigger: "manual"
steps:
  - agent: "reasoning"
    action: "validate_exit_criteria"
  - agent: "terminal"
    action: "git_tag_version"
  - agent: "code"
    action: "update_version_files"
  - agent: "terminal"
    action: "commit_and_push"
```

---

## Best Practices

### 1. Always Read Docs First
Every session, make IDE read:
- `add-project.yaml`
- `docs/discovery.md`
- `docs/design.md`
- `docs/interfaces.md` (if BUILD phase)

### 2. Explicit Phase Mention
When prompting, mention phase:
```
"This is DESIGN phase. Create interface contracts for user service."
```

### 3. Contract Compliance
In BUILD, always reference contract:
```
"Implement POST /api/users following the contract from docs/interfaces.md EXACTLY"
```

### 4. Incremental Commits
Commit often:
```bash
git commit -m "build(api): implement POST /api/users (contract compliant)"
git commit -m "build(api): implement GET /api/users/:id (contract compliant)"
# Not: one big commit with everything
```

### 5. Update Journal
Keep `docs/journal.md` current:
```markdown
## 2026-01-06
- Phase: BUILD (v0.4.5)
- Agent: Backend Developer
- Completed: POST /api/users, GET /api/users/:id
- Next: PUT /api/users/:id
```

---

## Migration from AD 1.0 Configs

If you have AD 1.0 `.cursorrules`:

1. **Backup old config:**
   ```bash
   mv .cursorrules .cursorrules.v1.backup
   ```

2. **Copy new AD 2.0 config:**
   ```bash
   cp /var/add/ide-configs/.cursorrules .
   ```

3. **Update project structure:**
   ```bash
   # Old phases → New phases
   v0.0.x CONFIG   → v0.1.x DISCOVER
   v0.1.x PROJECT  → v0.2.x DESIGN
   v0.2.x TESTS    → v0.3.x PREPARE
   v0.3.x DATA     →
   v0.4.x CODE     → v0.4.x BUILD (merged)
   v0.5.x DEVOPS   →
   v0.6.x PUBLIC   →
   ```

4. **See full migration guide:**
   `/var/add/MIGRACION-1.0-A-2.0.md`

---

## Resources

### Documentation
- **AD 2.0 Universal**: `/var/add/AD-UNIVERSAL.md`
- **Multi-Agent Coordination**: `/var/add/agentes/COORDINACION-PARALELA.md`
- **Advanced Techniques**: `/var/add/agentes/TECNICAS-AVANZADAS-MULTI-AGENTE.md`
- **Framework Design**: `/var/add/FRAMEWORK-DESIGN.md`
- **Migration Guide**: `/var/add/MIGRACION-1.0-A-2.0.md`
- **Gaps & Improvements**: `/var/add/GAPS-Y-MEJORAS.md`

### Tools Documentation
- **Cursor**: https://docs.cursor.com
- **Windsurf**: https://docs.windsurf.com
- **Claude Code**: https://docs.anthropic.com/claude/docs/agents
- **GitHub Copilot**: https://docs.github.com/copilot
- **Continue.dev**: https://continue.dev/docs
- **Aider**: https://aider.chat/docs

### Community
- **GitHub**: https://github.com/add-framework/add-framework
- **Website**: https://agenticdriven.dev/2.0
- **Issues**: https://github.com/add-framework/add-framework/issues

---

## Contributing

Found a better way to configure an IDE for AD 2.0?

1. Fork the repo
2. Improve the config
3. Test thoroughly
4. Submit PR

We appreciate:
- Better prompts
- Additional slash commands
- Improved workflows
- IDE-specific optimizations

---

**Version**: 2.0.0
**Last Updated**: 2026-01-06
**Maintained by**: AgentDriven Community

**Status**: ✅ Production Ready

All configs tested with:
- AD 2.0 Universal methodology
- Multi-agent coordination
- Contract-first pattern
- Phase-based workflow
