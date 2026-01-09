# Interfaces

## Overview

This document defines the contracts and interfaces between ADD 1.0 components. Following the Contract-Driven principle, these specifications must be implemented exactly as defined.

## 1. ad.yaml Configuration Interface

**Purpose**: Project configuration and state tracking

**Location**: `/ad.yaml` (repository root)

**Format**: YAML

**Schema**:
```yaml
domain: string       # Project domain (software, content, marketing, etc.)
phase: string        # Current phase (DEFINE, DISCOVER, DESIGN, etc.)
version: string      # Current version (v0.PHASE.ITERATION or vMAJOR.MINOR.PATCH)
```

**Constraints**:
- `domain`: Any string, describes project type
- `phase`: Must be one of: DEFINE, DISCOVER, DESIGN, SETUP, BUILD, VALIDATE, MARKET, LAUNCH, SUPPORT, EVOLVE, RELEASE
- `version`: Must follow `v0.PHASE.ITERATION` during development or semver after release

**Example**:
```yaml
domain: "software"
phase: "DESIGN"
version: "v0.2.0"
```

**Usage**:
- AI agents read this to understand project state
- Update when transitioning phases
- Track version increments

## 2. Source Rules Interface

**Purpose**: Define methodology rules as single source of truth

**Location**: `/src/rules/*.md`

**Format**: Markdown

**Required Files**:
- `principles.md` - 13 core principles
- `phases.md` - 10 phases overview
- `versioning.md` - Version numbering system
- `documentation.md` - Required docs per phase
- `exit-criteria.md` - Validation checklist
- `git-commits.md` - Commit message format
- `git-tags.md` - Tagging strategy (not required)
- `contracts.md` - Contract-driven development
- `ai-workflow.md` - AI collaboration patterns

**Structure per File**:
```markdown
# Title

## Section 1
Content...

## Section 2
Content...
```

**Constraints**:
- Standard markdown (no extensions)
- Concise (total concatenated < 600 lines ideal)
- No code examples unless necessary
- Universal language (not domain-specific)

**Contract**:
- These files are the source of truth
- IDE configs are generated from these
- Website content derives from these
- Changes here propagate to all consumers

## 3. IDE Config Generation Interface

**Purpose**: Transform source rules into IDE-specific configs

**Location**: `/src/rules/generate-ide-configs.sh`

**Input**: `/src/rules/*.md` files

**Output**: `/src/rules/ide/*` files

**Generated Files**:
- `.cursorrules` - Cursor IDE
- `claude.md` - Claude Code
- `.windsurfrules` - Windsurf
- `.github/copilot-instructions.md` - GitHub Copilot
- `.aider.conf.yml` + `.aider-rules.md` - Aider
- `.continuerc.json` + `.continue-rules.md` - Continue

**Process**:
```
src/rules/*.md → concatenate → IDE config
```

**Format per IDE**:
- Cursor: Single markdown file
- Claude: Single markdown file
- Windsurf: Single markdown file
- Copilot: Single markdown file
- Aider: YAML config + markdown rules
- Continue: JSON config + markdown rules

**Contract**:
- Script must be idempotent (same input = same output)
- All IDEs receive same content (universal rules)
- Generated files include header with source reference
- Must copy to repository root after generation

## 4. Documentation Interface

**Purpose**: Track project progress and decisions

**Location**: `/docs/*.md`

**Format**: Markdown

**Required Files by Phase**:

**DEFINE**:
- `problem-statement.md` - Problem definition
- `objectives.md` - Goals and success criteria
- `scope.md` - In/out scope, constraints

**DISCOVER**:
- `discovery.md` - Research findings
- `requirements.md` - Functional/non-functional requirements
- `risks.md` - Risk analysis

**DESIGN**:
- `design.md` - Solution design
- `architecture.md` - Architecture decisions
- `interfaces.md` - Component contracts

**SETUP**:
- `setup.md` - Environment setup
- `validation-criteria.md` - Test criteria

**BUILD**:
- `build-log.md` - Build progress
- `changes.md` - Change log
- `issues.md` - Issues encountered

**VALIDATE**:
- `test-report.md` - Test results
- `validation-report.md` - Validation outcome

**MARKET**:
- `marketing-plan.md` - Marketing strategy
- `launch-strategy.md` - Launch plan

**LAUNCH**:
- `launch-checklist.md` - Pre-launch checks
- `deployment-log.md` - Deployment record

**SUPPORT**:
- `support-plan.md` - Support strategy
- `feedback.md` - User feedback

**EVOLVE**:
- `roadmap.md` - Future plans
- `improvements.md` - Improvement proposals

**Always Required**:
- `journal.md` - Daily progress log
- `decisions.md` - Architecture Decision Records

**Contract**:
- Must exist before phase completes
- Standard markdown format
- Concise, actionable content
- Version controlled

## 5. Journal Interface

**Purpose**: Track daily progress

**Location**: `/docs/journal.md`

**Format**: Markdown with date-based entries

**Structure**:
```markdown
# Project Journal

## YYYY-MM-DD

### PHASE NAME (vX.Y.Z → vX.Y.Z+1)
- **Agent**: Human + Claude
- **Progress**:
  - Item 1
  - Item 2
  - ...
- **Decisions**: Reference to decisions.md or "None"
- **Blockers**: List or "None"
- **Next**:
  - Next step 1
  - Next step 2
```

**Contract**:
- Update daily when working on project
- One entry per phase completion
- Clear progress items
- Reference decisions if made

## 6. Decisions Interface (ADR)

**Purpose**: Document architecture decisions

**Location**: `/docs/decisions.md`

**Format**: Architecture Decision Records

**Structure**:
```markdown
# Decisions

## ADR-001: Decision Title

**Date**: YYYY-MM-DD
**Status**: Accepted | Rejected | Superseded
**Context**: Why decision was needed
**Decision**: What was decided
**Consequences**: Positive and negative outcomes

## ADR-002: Next Decision
...
```

**Contract**:
- Number decisions sequentially
- Include date, status, context, decision, consequences
- Link from journal.md when decisions made
- Immutable (don't edit old decisions, supersede them)

## 7. Website Build Interface

**Purpose**: Generate static website from source

**Location**: `/website/`

**Input**:
- `src/` - React components
- `public/` - Static assets
- `package.json` - Dependencies
- `vite.config.js` - Build config

**Output**: `/_site/` directory

**Commands**:
```bash
npm install         # Install dependencies
npm run dev        # Development server (localhost:5173)
npm run build      # Production build → _site/
```

**Build Output Structure**:
```
_site/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...
```

**Contract**:
- Build output goes to `_site/` (not `docs/`)
- Static site (HTML/CSS/JS only)
- All assets hashed for cache busting
- Single-page application

## 8. Deployment Interface

**Purpose**: Deploy website to GitHub Pages

**Location**: `.github/workflows/deploy.yml`

**Trigger**: Push to `main` branch

**Process**:
```
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (npm ci)
4. Build website (npm run build)
5. Upload _site/ as artifact
6. Deploy to GitHub Pages
```

**Output**: Live site at `https://agenticdriven.dev`

**Contract**:
- Automatic deployment on push to main
- Build must succeed (exit 0)
- Deploy from `_site/` directory
- HTTPS enforced

## 9. Git Commit Interface

**Purpose**: Track changes with clear history

**Format**: Conventional Commits

**Structure**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code change, no feature/fix
- `test`: Adding tests
- `chore`: Maintenance

**Examples**:
```
feat(website): add IDE download section
docs: update DESIGN phase documentation
refactor: remove git tags from methodology
```

**Contract**:
- Commit after each completed task
- Clear, descriptive messages
- Follow conventional format
- One logical change per commit

## 10. Phase Transition Interface

**Purpose**: Move between phases

**Process**:
1. Verify current phase exit criteria met
2. Update journal.md with phase completion
3. Commit: `git commit -m "docs: complete PHASE exit criteria"`
4. Update `ad.yaml` to next phase
5. Commit: `git commit -m "chore: start NEXTPHASE (vX.Y.0)"`

**Version Changes**:
```
DEFINE    → DISCOVER : v0.0.x → v0.1.0
DISCOVER  → DESIGN   : v0.1.x → v0.2.0
DESIGN    → SETUP    : v0.2.x → v0.3.0
SETUP     → BUILD    : v0.3.x → v0.4.0
BUILD     → VALIDATE : v0.4.x → v0.5.0
VALIDATE  → MARKET   : v0.5.x → v0.6.0
MARKET    → LAUNCH   : v0.6.x → v0.7.0
LAUNCH    → SUPPORT  : v0.7.x → v0.8.0
SUPPORT   → EVOLVE   : v0.8.x → v0.9.0
EVOLVE    → RELEASE  : v0.9.x → v1.0.0
```

**Contract**:
- Exit criteria must be verified
- Journal must be updated
- Version must match phase
- Commits must follow format

## 11. IDE Download Interface

**Purpose**: Provide configs to users

**Location**: Website download section

**Available Downloads**:
- Cursor: `.cursorrules`
- Claude Code: `claude.md`
- Windsurf: `.windsurfrules`
- GitHub Copilot: `copilot-instructions.md`
- Aider: `.aider.conf.yml` + `.aider-rules.md`
- Continue: `.continuerc.json` + `.continue-rules.md`

**Usage**:
1. User visits website
2. Clicks IDE download button
3. Downloads config file(s)
4. Places in project root
5. AI IDE reads config automatically

**Contract**:
- Files available for direct download
- No modification needed
- Works in any project
- Universal rules (not domain-specific)

## Validation Checklist

**Before DESIGN Phase Complete**:
- ✅ All interfaces documented
- ✅ Contracts clearly defined
- ✅ Input/output specified
- ✅ Formats defined
- ✅ Examples provided
- ✅ Constraints listed
- ✅ Ready to implement
