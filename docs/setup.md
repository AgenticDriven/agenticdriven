# Setup

## Environment Configuration

### Prerequisites

**Required**:
- Git 2.x+
- Node.js 20.x
- npm (comes with Node.js)
- Text editor or AI IDE

**Optional**:
- Docker (for website development)
- Modern browser (for testing website)

### Repository Setup

**Status**: ✅ Complete

**Configuration**:
```bash
# Repository initialized
git init
git branch -m main

# Remote (when ready)
git remote add origin https://github.com/agenticdriven/add.git
```

**Directory Structure**:
```
/var/add/
├── src/rules/              # Source rules (markdown)
│   ├── principles.md
│   ├── phases.md
│   ├── versioning.md
│   ├── documentation.md
│   ├── exit-criteria.md
│   ├── git-commits.md
│   ├── git-tags.md
│   ├── contracts.md
│   ├── ai-workflow.md
│   ├── generate-ide-configs.sh
│   └── ide/               # Generated IDE configs
├── website/               # React website
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docs/                  # Project documentation
│   ├── problem-statement.md
│   ├── objectives.md
│   ├── scope.md
│   ├── discovery.md
│   ├── requirements.md
│   ├── risks.md
│   ├── design.md
│   ├── architecture.md
│   ├── interfaces.md
│   ├── journal.md
│   └── decisions.md
├── .github/              # GitHub configuration
│   ├── workflows/
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── _site/                # Website build output (gitignored)
├── .cursorrules          # IDE configs (root)
├── .clauderc
├── .windsurfrules
├── .aider.conf.yml
├── .aider-rules.md
├── .continuerc.json
├── .continue-rules.md
├── add.yaml              # Project configuration
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── DEPLOYMENT.md
└── .gitignore
```

**Verification**:
```bash
# Check structure
ls -la

# Verify git
git status
git log --oneline

# Check current phase
cat add.yaml
```

### IDE Configuration Setup

**Status**: ✅ Complete

**Generated Configs**:
- `.cursorrules` - Cursor IDE
- `.clauderc` - Claude Code
- `.windsurfrules` - Windsurf
- `.github/copilot-instructions.md` - GitHub Copilot
- `.aider.conf.yml` + `.aider-rules.md` - Aider
- `.continuerc.json` + `.continue-rules.md` - Continue

**Generation Command**:
```bash
bash src/rules/generate-ide-configs.sh
```

**Verification**:
```bash
# Check generated files
ls -lh src/rules/ide/

# Check files copied to root
ls -la | grep -E '\.(cursorrules|clauderc|windsurfrules|aider|continue)'

# Verify total size < 600 lines per config
wc -l .cursorrules .clauderc .windsurfrules
```

### Website Development Setup

**Status**: ✅ Complete

**With Docker**:
```bash
cd website
docker-compose up
# Visit http://localhost:5173
```

**Without Docker**:
```bash
cd website
npm install
npm run dev
# Visit http://localhost:5173
```

**Build Production**:
```bash
cd website
npm run build
# Output: ../_site/
```

**Verification**:
```bash
# Check dependencies installed
test -d website/node_modules && echo "✅ Dependencies installed" || echo "❌ Run npm install"

# Check build works
cd website && npm run build
test -d ../_site && echo "✅ Build successful" || echo "❌ Build failed"

# Check build size
du -sh ../_site

# Check performance (if browser available)
# lighthouse http://localhost:5173 --only-categories=performance
```

### GitHub Actions Setup

**Status**: ✅ Complete

**Workflow File**: `.github/workflows/deploy.yml`

**Configuration**:
- Trigger: Push to `main` branch
- Node.js: 20.x
- Build: `npm ci && npm run build`
- Deploy: `_site/` to GitHub Pages

**Verification**:
```bash
# Check workflow file exists
test -f .github/workflows/deploy.yml && echo "✅ Workflow configured" || echo "❌ Missing workflow"

# Validate YAML syntax
# yamllint .github/workflows/deploy.yml
```

**GitHub Pages Configuration** (after push):
1. Go to repository Settings > Pages
2. Source: GitHub Actions
3. Custom domain (optional): agenticdriven.dev
4. Enforce HTTPS: ✅

### GitHub Community Standards Setup

**Status**: ✅ Complete

**Required Files**:
- ✅ LICENSE (MIT)
- ✅ README.md
- ✅ CONTRIBUTING.md
- ✅ CODE_OF_CONDUCT.md
- ✅ SECURITY.md
- ✅ .github/ISSUE_TEMPLATE/ (3 templates)
- ✅ .github/PULL_REQUEST_TEMPLATE.md

**Verification**:
```bash
# Check all files exist
for file in LICENSE README.md CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md; do
  test -f "$file" && echo "✅ $file" || echo "❌ Missing: $file"
done

# Check templates
test -d .github/ISSUE_TEMPLATE && echo "✅ Issue templates" || echo "❌ Missing templates"
test -f .github/PULL_REQUEST_TEMPLATE.md && echo "✅ PR template" || echo "❌ Missing PR template"
```

### Git Configuration

**Status**: ✅ Complete

**Commit Format**: Conventional Commits
```
<type>(<scope>): <subject>
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Verification**:
```bash
# Check recent commits follow format
git log --oneline -10
```

### Documentation Setup

**Status**: ✅ Complete

**Phase Documentation**:
- ✅ DEFINE: problem-statement.md, objectives.md, scope.md
- ✅ DISCOVER: discovery.md, requirements.md, risks.md
- ✅ DESIGN: design.md, architecture.md, interfaces.md
- ⏳ SETUP: setup.md (this file), validation-criteria.md

**Always Required**:
- ✅ journal.md - Progress tracking
- ✅ decisions.md - ADRs

**Verification**:
```bash
# Check docs exist
ls -1 docs/*.md

# Count docs
echo "Total docs: $(ls -1 docs/*.md | wc -l)"
```

### Version Control Setup

**Status**: ✅ Complete

**Current State**:
- Phase: SETUP
- Version: v0.3.0
- Branch: main
- Commits: Following Conventional Commits
- Tags: Not used (per ADR-001)

**Verification**:
```bash
# Check phase and version
cat add.yaml

# Check commit history
git log --oneline --graph

# Verify no tags (per ADR-001)
git tag
# Should output nothing
```

## Team Setup

**Status**: ✅ Complete (Solo + AI)

**Team Composition**:
- Human: Strategy, decisions, review
- AI (Claude): Implementation, documentation, execution

**Communication**:
- Journal: Progress tracking
- Decisions: ADRs for major choices
- Commits: Implementation history

## Environment Variables

**Not Required**: This project has no secrets or environment-specific configuration.

All configuration is in:
- `add.yaml` - Project state
- `website/package.json` - Dependencies
- `website/vite.config.js` - Build config

## Next Steps

After SETUP complete:
1. ✅ Verify all tools working
2. ✅ Run build successfully
3. ✅ Validate environment ready
4. → Move to BUILD phase
5. → Implement any remaining components
6. → Generate content for website

## Troubleshooting

### npm install fails
```bash
# Clear cache
npm cache clean --force
rm -rf website/node_modules website/package-lock.json
npm install
```

### Docker fails
```bash
# Check Docker running
docker ps

# Rebuild
cd website
docker-compose down
docker-compose up --build
```

### Build fails
```bash
# Check Node version
node --version  # Should be 20.x

# Check dependencies
cd website
npm install
npm run build
```

### Git issues
```bash
# Check status
git status

# Check branch
git branch

# Check remote
git remote -v
```

## Validation Checklist

See `validation-criteria.md` for detailed validation criteria.

**Quick Check**:
- ✅ Git repository initialized
- ✅ Directory structure correct
- ✅ IDE configs generated and in place
- ✅ Website builds successfully
- ✅ GitHub Actions configured
- ✅ Community standards files present
- ✅ Documentation structure complete
- ✅ Team ready (human + AI)
- ✅ No blockers identified

**Status**: Environment ready for BUILD phase
