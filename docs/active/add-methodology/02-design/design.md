# Design

## Solution Overview

ADD 1.0 is a **documentation-driven methodology** delivered through:
1. **Source Rules** - Core methodology in markdown files
2. **IDE Configurations** - Generated configs for AI IDEs
3. **Website** - Public-facing documentation and downloads
4. **GitHub Repository** - Central hub for source and distribution

## Architecture Layers

```
┌─────────────────────────────────────────────────┐
│                    Users                        │
└─────────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ Website │   │   IDE   │   │ GitHub  │
    │ (View)  │   │ Configs │   │  Repo   │
    └─────────┘   └─────────┘   └─────────┘
          │             │             │
          └─────────────┼─────────────┘
                        ▼
              ┌──────────────────┐
              │  Source Rules    │
              │  (src/rules/)    │
              └──────────────────┘
                        │
              ┌──────────────────┐
              │  13 Principles   │
              │    10 Phases     │
              │  Documentation   │
              │   Git Workflow   │
              └──────────────────┘
```

## Core Components

### 1. Source Rules (src/rules/)
**Purpose**: Single source of truth for ADD 1.0 methodology

**Files**:
- `principles.md` - 13 core principles
- `phases.md` - 10 phases overview
- `versioning.md` - Phase-based versioning system
- `documentation.md` - Required docs per phase
- `exit-criteria.md` - Validation checklist per phase
- `git-commits.md` - Conventional commits standard
- `git-tags.md` - Tagging strategy
- `contracts.md` - Contract-driven development
- `ai-workflow.md` - AI collaboration patterns

**Design Decisions**:
- Markdown format (universal, readable, versionable)
- Modular files (single responsibility per file)
- Concise content (< 600 lines total when concatenated)
- No code, only methodology rules

### 2. IDE Configuration Generator (src/rules/generate-ide-configs.sh)
**Purpose**: Generate IDE-specific config files from source rules

**Process**:
```bash
Source Rules (*.md) → Concatenate → IDE Configs (.cursorrules, .clauderc, etc.)
```

**Supported IDEs**:
- Cursor → `.cursorrules`
- Claude Code → `.clauderc`
- Windsurf → `.windsurfrules`
- GitHub Copilot → `.github/copilot-instructions.md`
- Aider → `.aider.conf.yml` + `.aider-rules.md`
- Continue → `.continuerc.json` + `.continue-rules.md`

**Design Decisions**:
- Single script generates all configs
- Same content for all IDEs (universal approach)
- Configs placed in repository root (expected location)
- Regenerate whenever rules change

### 3. Website (website/)
**Purpose**: Public-facing documentation and resource hub

**Technology Stack**:
- React 18
- Vite (build tool)
- Modern CSS (no framework)
- Static site generation

**Structure**:
```
website/
├── src/
│   ├── App.jsx        # Main component
│   ├── App.css        # Styles
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── package.json       # Dependencies
├── vite.config.js     # Build config
└── Dockerfile         # Dev environment
```

**Features**:
- Hero section with ADD 1.0 overview
- 13 principles display
- 10 phases documentation
- IDE configuration downloads
- Resources section (books/courses)
- Mobile-responsive design
- Performance optimized (< 2s load)

**Build Output**: `_site/` directory (separate from project docs/)

**Design Decisions**:
- Static site (no backend, fast, free hosting)
- Single-page application (simple navigation)
- GitHub Pages deployment (reliable, free)
- React for maintainability and component reuse

### 4. Documentation (docs/)
**Purpose**: Project documentation (not website content)

**Files by Phase**:
- **DEFINE**: problem-statement.md, objectives.md, scope.md
- **DISCOVER**: discovery.md, requirements.md, risks.md
- **DESIGN**: design.md, architecture.md, interfaces.md
- **SETUP**: setup.md, validation-criteria.md
- **BUILD**: build-log.md, changes.md, issues.md
- **VALIDATE**: test-report.md, validation-report.md
- **MARKET**: marketing-plan.md, launch-strategy.md
- **LAUNCH**: launch-checklist.md, deployment-log.md
- **SUPPORT**: support-plan.md, feedback.md
- **EVOLVE**: roadmap.md, improvements.md

**Always Present**:
- journal.md - Daily progress log
- decisions.md - Architecture Decision Records (ADRs)

**Design Decisions**:
- Markdown format (readable, versionable)
- Phase-based organization
- Dogfooding (using ADD 1.0 to build ADD 1.0)

### 5. GitHub Repository
**Purpose**: Central hub, version control, distribution

**Key Files**:
- `README.md` - Project overview and quickstart
- `LICENSE` - MIT license
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community standards
- `SECURITY.md` - Security policy
- `DEPLOYMENT.md` - Deployment instructions
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `.github/ISSUE_TEMPLATE/` - Issue templates
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template

**Branches**:
- `main` - Stable branch, deploys to production

**Tags**:
- Phase-based: v0.0.x, v0.1.x, ..., v0.9.x
- Release: v1.0.0

**Design Decisions**:
- Single branch workflow (simplicity)
- Phase-based versioning (aligns with methodology)
- GitHub Actions for automation
- 100% community standards compliance

## Data Flow

### 1. Development Flow
```
1. Edit src/rules/*.md
2. Run generate-ide-configs.sh
3. Test IDE configs
4. Commit changes
5. Push to GitHub
6. GitHub Actions deploys website
```

### 2. User Flow
```
1. Visit agenticdriven.dev
2. Learn methodology
3. Download IDE config
4. Place in project root
5. Start using ADD 1.0
```

### 3. Update Flow
```
1. User provides feedback
2. Log in decisions.md
3. Update src/rules/*.md
4. Regenerate IDE configs
5. Rebuild website
6. Deploy update
7. Version bump
```

## Design Principles Applied

**1. Single Responsibility**
- Each markdown file has one purpose
- Each component has one job
- Clear separation of concerns

**2. Documentation-First**
- Rules are documentation
- Website documents methodology
- Project docs track progress

**3. Standards-First**
- Markdown for content
- Conventional Commits
- Semantic versioning
- MIT license
- React best practices

**4. Explicit over Implicit**
- Clear file structure
- Named directories
- Obvious relationships

**5. Proven Solutions**
- React (established framework)
- Vite (proven build tool)
- GitHub Pages (reliable hosting)
- GitHub Actions (standard CI/CD)

## Validation Strategy

**Rules Validation**:
- Total concatenated length < 600 lines
- All principles present
- All phases documented
- Exit criteria for each phase

**Website Validation**:
- Load time < 2 seconds
- Mobile responsive
- All links functional
- IDE downloads working

**IDE Configs Validation**:
- Generated successfully
- Correct format for each IDE
- Content matches source rules
- Usable in real projects

**Documentation Validation**:
- All required docs present
- Following ADD 1.0 methodology
- Git history clear
- Journal up to date

## Deployment Strategy

**GitHub Actions Workflow**:
```yaml
Trigger: Push to main
Steps:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build website (npm run build)
  5. Deploy to GitHub Pages
```

**Domain Configuration**:
- Custom domain: agenticdriven.dev
- DNS: A records to GitHub Pages IPs
- HTTPS enforced

## Success Criteria

**Design Complete When**:
- ✅ All components defined
- ✅ Architecture documented
- ✅ Interfaces specified
- ✅ Data flows clear
- ✅ Validation strategy defined
- ✅ Deployment strategy defined
- ✅ Ready to implement

**Quality Metrics**:
- Clarity: All components understandable
- Completeness: All aspects covered
- Feasibility: Implementation clear
- Alignment: Matches requirements
