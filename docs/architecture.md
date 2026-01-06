# Architecture

## Architectural Decisions

### AD1: Static Site Architecture
**Decision**: Use static site generation, not dynamic web application

**Rationale**:
- No server-side logic needed (methodology is static content)
- Fast performance (pre-rendered HTML)
- Free hosting (GitHub Pages)
- High reliability (no backend to fail)
- Simple deployment (just files)
- CDN benefits automatically

**Alternatives Considered**:
- Dynamic CMS (Rejected: unnecessary complexity)
- Server-rendered app (Rejected: hosting costs, complexity)

**Consequences**:
- ✅ Fast load times
- ✅ Free hosting
- ✅ High reliability
- ❌ No user accounts/personalization (not needed)
- ❌ No dynamic content (not needed)

### AD2: Single Source of Truth
**Decision**: Maintain rules as markdown in `src/rules/`, generate IDE configs from it

**Rationale**:
- DRY principle (don't repeat content across 6 IDE configs)
- Consistency guaranteed (all configs from same source)
- Easy updates (change once, regenerate all)
- Version control friendly (markdown diffs clearly)
- Human readable (can review rules directly)

**Alternatives Considered**:
- Maintain each IDE config separately (Rejected: duplication, inconsistency risk)
- Store in database (Rejected: unnecessary complexity)
- Use JSON/YAML (Rejected: less readable than markdown)

**Consequences**:
- ✅ Single source of truth
- ✅ Easy to maintain
- ✅ Consistency guaranteed
- ❌ Requires generation step (acceptable, automated)

### AD3: React for Website
**Decision**: Use React + Vite, not vanilla HTML or other frameworks

**Rationale**:
- Component reusability (principles list, phases list, etc.)
- Modern development experience
- Vite provides fast builds and dev server
- React is established, well-documented
- Easy to maintain and extend
- Still generates static site (no runtime React needed)

**Alternatives Considered**:
- Vanilla HTML/CSS/JS (Rejected: less maintainable as complexity grows)
- Vue.js (Rejected: no strong advantage over React)
- Next.js (Rejected: overkill for static site)
- Jekyll (Rejected: Ruby dependency, less flexible)
- Svelte (Rejected: less established ecosystem)

**Consequences**:
- ✅ Maintainable component structure
- ✅ Fast development
- ✅ Good tooling
- ❌ Build step required (acceptable, fast with Vite)
- ❌ Node.js dependency (acceptable, widely available)

### AD4: Monorepo Structure
**Decision**: Keep everything in single repository (rules, website, docs, configs)

**Rationale**:
- Simplicity (one repo to manage)
- Atomic commits (rules + configs + website in sync)
- Easy to see full picture
- Versioning consistency
- Single CI/CD pipeline

**Alternatives Considered**:
- Separate repos for website and rules (Rejected: synchronization complexity)
- Separate repo for each IDE config (Rejected: too fragmented)

**Consequences**:
- ✅ Simple management
- ✅ Atomic updates
- ✅ Single version number
- ❌ Slightly larger repo size (negligible)

### AD5: GitHub Pages Deployment
**Decision**: Deploy website to GitHub Pages via GitHub Actions

**Rationale**:
- Free hosting (within generous limits)
- Automatic HTTPS
- Custom domain support
- Reliable infrastructure
- Native GitHub integration
- CI/CD built-in

**Alternatives Considered**:
- Netlify (Rejected: no advantage for static site, another service)
- Vercel (Rejected: same reason)
- Self-hosted (Rejected: maintenance burden, costs)
- AWS S3 + CloudFront (Rejected: complexity, costs)

**Consequences**:
- ✅ Free hosting
- ✅ Reliable
- ✅ Easy deployment
- ✅ HTTPS included
- ❌ GitHub dependency (acceptable, already using GitHub)

### AD6: Phase-Based Versioning
**Decision**: Use v0.PHASE.ITERATION format during development, v1.0.0 for release

**Rationale**:
- Clear project progress indicator
- Aligns with methodology phases
- Makes sense for project lifecycle
- Easy to understand where project is
- Dogfooding (using ADD 1.0 principles)

**Alternatives Considered**:
- Standard semver from start (Rejected: doesn't communicate progress)
- Date-based versioning (Rejected: less meaningful)
- No versioning until release (Rejected: loses progress tracking)

**Consequences**:
- ✅ Clear progress communication
- ✅ Aligns with methodology
- ✅ Dogfooding own approach
- ❌ Non-standard versioning (mitigated by clear documentation)

### AD7: Universal Markdown Format
**Decision**: Use standard markdown, no custom extensions or preprocessing

**Rationale**:
- Maximum compatibility
- Works everywhere (GitHub, editors, viewers)
- No tooling required to read
- Future-proof
- Simple

**Alternatives Considered**:
- MDX (Rejected: adds complexity, not needed)
- Custom markup (Rejected: incompatibility)
- AsciiDoc (Rejected: less widely supported)

**Consequences**:
- ✅ Universal compatibility
- ✅ Simple
- ✅ Future-proof
- ❌ Limited formatting options (acceptable for our needs)

### AD8: No Backend Services
**Decision**: Completely static, no APIs or databases

**Rationale**:
- Methodology doesn't need dynamic data
- Reduces complexity
- Eliminates hosting costs
- No maintenance burden
- Maximum reliability
- Security benefits (no backend to hack)

**Alternatives Considered**:
- Add analytics backend (Rejected: privacy concerns, not needed)
- User accounts (Rejected: not needed for v1.0)
- Comments system (Rejected: use GitHub Discussions instead)

**Consequences**:
- ✅ Simple architecture
- ✅ No hosting costs
- ✅ High reliability
- ✅ No maintenance
- ❌ No user-specific features (not needed for v1.0)

### AD9: MIT License
**Decision**: Use MIT license for open source

**Rationale**:
- Maximum openness
- Permissive (allows commercial use)
- Well-understood
- Simple
- Industry standard
- Encourages adoption

**Alternatives Considered**:
- Apache 2.0 (Rejected: more complex, no benefits here)
- GPL (Rejected: too restrictive for our goals)
- Custom license (Rejected: less clear, legal concerns)

**Consequences**:
- ✅ Maximum adoption potential
- ✅ Clear terms
- ✅ Commercial use allowed
- ❌ No copyleft protection (acceptable, we want maximum spread)

### AD10: Git-First Workflow
**Decision**: Git as the primary coordination mechanism, not external tools

**Rationale**:
- Aligns with Git-First principle
- Dogfooding own methodology
- No additional tools needed
- Universal (developers already use Git)
- Clear history and audit trail
- Enables phase-based versioning

**Alternatives Considered**:
- Jira/Linear for tracking (Rejected: adds tool dependency)
- Notion for docs (Rejected: not version controlled)
- Separate project management tool (Rejected: duplication)

**Consequences**:
- ✅ Dogfooding own approach
- ✅ No tool dependency
- ✅ Clear audit trail
- ❌ Less visual tracking (acceptable, we have journal.md)

## System Boundaries

### In Scope
- Rules and documentation
- IDE configuration generation
- Website presentation
- GitHub repository structure
- Deployment automation

### Out of Scope
- CLI tools for automation
- IDE plugins/extensions
- Backend services
- User accounts
- Analytics platform
- Mobile apps
- Desktop applications

## Technology Stack

### Core
- **Language**: Markdown (rules), JavaScript (website)
- **Runtime**: Node.js 20 (build only)
- **Version Control**: Git
- **Hosting**: GitHub (repo) + GitHub Pages (website)

### Website
- **Framework**: React 18
- **Build Tool**: Vite 4
- **Styling**: Modern CSS (no framework)
- **Deployment**: GitHub Actions

### Development
- **Containerization**: Docker (optional, for development)
- **IDE Support**: Any text editor or AI IDE
- **Package Manager**: npm

### Infrastructure
- **Repository**: GitHub
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **DNS**: Custom domain (agenticdriven.dev)

## Quality Attributes

### Performance
- **Target**: Website loads in < 2 seconds
- **Strategy**: Static site, optimized assets, CDN
- **Monitoring**: Lighthouse CI

### Reliability
- **Target**: 99.9% uptime
- **Strategy**: Static site on GitHub Pages infrastructure
- **Monitoring**: GitHub status page

### Maintainability
- **Target**: Easy to update and extend
- **Strategy**:
  - Single source of truth
  - Component-based website
  - Clear documentation
  - Standard tools

### Usability
- **Target**: Easy to adopt and use
- **Strategy**:
  - Clear documentation
  - Simple download process
  - Mobile-responsive website
  - Multiple IDE support

### Scalability
- **Target**: Supports growing user base without changes
- **Strategy**:
  - Static site (scales automatically)
  - GitHub Pages CDN
  - No backend bottlenecks

### Security
- **Target**: No security vulnerabilities
- **Strategy**:
  - No backend to attack
  - HTTPS enforced
  - Minimal dependencies
  - Regular updates

## Non-Functional Characteristics

### Modifiability
- **High**: Easy to add new rules, update content
- **Medium**: Easy to add new IDE support
- **Low**: Changing core architecture (by design, stable foundation)

### Testability
- **High**: Website can be tested in browsers
- **High**: IDE configs can be tested in real projects
- **Medium**: Rules require human review for quality

### Portability
- **High**: Markdown works everywhere
- **High**: Website is standard HTML/CSS/JS
- **High**: Can migrate from GitHub Pages if needed

## Architecture Validation

**Against Requirements**:
- ✅ FR1: 10 phases → Documented in rules
- ✅ FR2: 13 principles → Documented in rules
- ✅ FR3: Version system → Phase-based versioning
- ✅ FR4: Documentation standards → Documentation.md
- ✅ FR5: Git workflow → Git-first approach
- ✅ FR6: IDE integrations → Generator script
- ✅ FR7: Website → React + Vite + GitHub Pages
- ✅ FR8: Universal applicability → Abstract rules
- ✅ FR9: Examples → Website demonstrates
- ✅ FR10: GitHub standards → All files present

**Against Quality Attributes**:
- ✅ Simplicity → Minimal architecture
- ✅ Flexibility → Markdown-based, adaptable
- ✅ Accessibility → Free, open source, GitHub Pages
- ✅ Maintainability → Single source, clear structure
- ✅ Performance → Static site, < 2s target

**Ready to Build**: Yes, architecture meets all requirements and quality goals.
