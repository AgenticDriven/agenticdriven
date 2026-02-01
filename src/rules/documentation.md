# Documentation

Document before, during, after.

## By Phase

**DEFINE**: problem.md, objectives.md, scope.md
**DISCOVER**: requirements.md, decisions.md
**DESIGN**: design.md, architecture.md, interfaces.md
**SETUP**:
  - docs/setup/environment.md (dev environment config)
  - docs/setup/dependencies.md (versions, requirements)
  - docs/setup/testing.md (test strategy, framework)
  - docs/setup/ci-cd.md (pipeline configuration)
**BUILD**: build-log.md (progress, issues, solutions)
**VALIDATE**: validation-report.md (results, metrics, issues)

## Location

Simple projects: `docs/` flat structure
Complex projects: `docs/active/`, `docs/completed/`, `docs/archived/`

Always at root: `journal.md`, `decisions.md`

## Rules

- Update docs in same commit as code
- Journal updated each session
- Decisions documented with rationale
