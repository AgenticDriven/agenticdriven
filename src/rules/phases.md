# Phases

## 6 Phases + Release

```
v0.0.x → DEFINE      Define problem, objectives, scope
v0.1.x → DISCOVER    Investigate options, viability
v0.2.x → DESIGN      Design solution, architecture
v0.3.x → SETUP       Prepare development and validation infrastructure
v0.4.x → BUILD       Build/create solution
v0.5.x → VALIDATE    Verify quality, testing
v1.0.0 → RELEASE     First stable version
```

## Phase Details

### SETUP (v0.3.x)

SETUP prepares the "factory" - the infrastructure needed to build and validate the solution.

**Purpose**: Before writing product code, establish:
- Development environment (dependencies, configs, tooling)
- Test infrastructure (framework configured, first test passing)
- CI pipeline (lint, test, build automation)
- Project structure (scaffolding per DESIGN)
- Context files (ad.yaml with context_files defined)
- Validation criteria (what "done" looks like)

**Key difference from BUILD**:
- SETUP = Build the factory (tools, pipelines, structure)
- BUILD = Use the factory to produce the product (functional code)

## Rules

- Phases are sequential but not rigid - document if going back
- Work within phase can be parallel
- Exit criteria required before advancing
- Tag phase completions (v0.X.0)
