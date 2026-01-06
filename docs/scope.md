# Scope

## In Scope

### Core Methodology
- ✅ 10 phases: DEFINE, DISCOVER, DESIGN, SETUP, BUILD, VALIDATE, MARKET, LAUNCH, SUPPORT, EVOLVE
- ✅ 13 core principles
- ✅ Phase-based versioning system (v0.PHASE.ITERATION)
- ✅ Exit criteria for each phase
- ✅ Documentation standards
- ✅ Git workflow and tagging strategy

### IDE Integrations
- ✅ Cursor (.cursorrules)
- ✅ Claude Code (.clauderc)
- ✅ Windsurf (.windsurfrules)
- ✅ GitHub Copilot (.github/copilot-instructions.md)
- ✅ Aider (.aider.conf.yml + .aider-rules.md)
- ✅ Continue (.continuerc.json + .continue-rules.md)

### Website
- ✅ Landing page with methodology overview
- ✅ 13 principles display
- ✅ 10 phases documentation
- ✅ IDE configuration downloads
- ✅ Links to books/courses (placeholders)
- ✅ GitHub Pages deployment

### GitHub Standards
- ✅ LICENSE (MIT)
- ✅ README.md
- ✅ CONTRIBUTING.md
- ✅ CODE_OF_CONDUCT.md
- ✅ SECURITY.md
- ✅ Issue templates (bug, feature, docs)
- ✅ Pull request template
- ✅ GitHub Actions CI/CD

### Documentation
- ✅ Complete rules in markdown (src/rules/)
- ✅ Project documentation (docs/)
- ✅ Journal for progress tracking
- ✅ Decisions log (ADRs)
- ✅ Deployment guide

## Out of Scope (for v1.0)

### Not Included
- ❌ Framework/SDK implementation in code
- ❌ CLI tools for automation
- ❌ GUI applications
- ❌ Published books (content TBD)
- ❌ Video courses (content TBD)
- ❌ Plugins/extensions for IDEs
- ❌ Multi-language translations
- ❌ Mobile app
- ❌ SaaS platform
- ❌ Certification program

### Future Versions (v1.1+)
- 🔜 CLI tool for project initialization
- 🔜 Template repositories for different domains
- 🔜 Visual project dashboard
- 🔜 Integration with project management tools
- 🔜 Community examples repository
- 🔜 Detailed tutorials for each phase

## Constraints

### Technical
- Must work with existing git workflows
- Must be compatible with GitHub Pages
- Must support standard markdown
- Must work without external dependencies (methodology itself)
- Website must load in <2 seconds

### Resource
- Solo developer with AI assistance
- Open source (MIT license)
- No budget for infrastructure beyond GitHub free tier
- Timeline: Complete before Q2 2026

### Quality
- All IDE configs under 600 lines
- 100% GitHub community standards compliance
- Mobile-responsive website
- Clear, concise documentation
- Follow own ADD 1.0 methodology

## Boundaries

**What we ARE building**: A methodology documentation project with IDE integrations and website

**What we are NOT building**: Software frameworks, tools, or applications

**Decision Rule**: If it requires code beyond static site generation, it's out of scope for v1.0
