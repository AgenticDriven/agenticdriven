# Principles

## 7 Core Principles

**1. Agentic-Driven**: AI agent leads execution, human supervises and decides strategy. Clear ownership with human oversight.

**2. Documentation-First**: Document before implementing. Update docs in same commit as code. Maintain journal.md for session continuity.

**3. Context-Aware**: Manage AI context explicitly via ad.yaml context_files. Define what files the agent needs to understand the project.

**4. Contract-Driven**: Define interfaces in docs/interfaces.md before implementation. Code must match spec exactly.

**5. Continuous Validation**: Validate at every step, not just at the end. Test assumptions early. Exit criteria gate phase transitions.

**6. Git-Traceable**: Everything tracked in git. Conventional Commits format. Semantic versioning. Tag phase completions. One commit per completed task.

**7. Standards-First**: Prefer established standards over custom solutions: Conventional Commits, JSON:API, ISO-8601, semver, proven patterns, existing frameworks.
