# Documentation

## Principle
Document before, during, after

## Required by Phase
**DEFINE**: problem-statement, objectives, scope
**DISCOVER**: discovery, requirements, decisions
**DESIGN**: design, architecture, interfaces
**SETUP**: setup, validation-criteria
**BUILD**: build-log, changes, issues
**VALIDATE**: validation-report, test-results
**MARKET**: marketing-plan, launch-strategy
**LAUNCH**: launch-log, go-live-report
**SUPPORT**: support-log, hotfixes
**EVOLVE**: evolution-plan, roadmap

## Location

**Simple Projects**: All in `docs/` at root. Use kebab-case filenames. Markdown format.

**Complex Projects**: Use subdirectories:

```
docs/
├── planning/          # Future work, proposals, ideas
├── active/           # Work in progress
│   └── feature-name/  # Current feature/project
│       ├── 00-define/
│       ├── 01-discover/
│       ├── 02-design/
│       └── ...
├── completed/        # Finished features
├── archived/         # Old/deprecated docs
├── reports/          # Standalone reports
├── spikes/           # Research, experiments
├── journal.md        # Always at root
└── decisions.md      # Always at root
```

**Workflow**:
1. Start feature in `active/feature-name/`
2. Organize by phases: 00-define/, 01-discover/, etc.
3. When feature complete, move to `completed/feature-name/`
4. Old features go to `archived/`

**Always at Root**:
- `journal.md` - Daily progress
- `decisions.md` - Architecture decisions (ADRs)

## Updates
Update docs in same commit as code
