# Architecture Decision Records

## ADR-001: Remove Git Tags from ADD 1.0 Methodology

**Date**: 2026-01-06
**Status**: Accepted
**Phase**: DESIGN (v0.2.0)

**Context**:
Initially, the ADD 1.0 methodology included git tagging as part of phase transitions and milestone tracking. Tags were used to mark phase completions (e.g., v0.1.1 for DISCOVER complete) and phase starts (e.g., v0.2.0 for DESIGN start). However, user feedback indicated that git tags added unnecessary complexity without significant value.

**Decision**:
Remove git tags from the ADD 1.0 methodology. Use only:
1. Commits with clear messages (Conventional Commits format)
2. Version tracking in `adw.yaml` file
3. Journal entries for progress tracking

**Rationale**:
- Simplicity: Tags add an extra step without clear benefit
- Commits alone provide sufficient history
- `adw.yaml` version field clearly shows current state
- Journal provides human-readable progress log
- Reduces cognitive overhead for users
- Aligns with "simplicity first" principle

**Consequences**:

Positive:
- ✅ Simpler workflow (one less step per phase)
- ✅ Less git complexity for users
- ✅ Clearer that commits are the primary history mechanism
- ✅ Easier to follow for git beginners

Negative:
- ❌ No quick visual tag list of milestones (mitigated by journal.md)
- ❌ Can't jump to specific phase completion instantly (mitigated by commit messages)

**Implementation**:
- Updated `src/rules/git-tags.md` to state "tags not required"
- Updated `src/rules/exit-criteria.md` to remove tagging step
- Regenerated all IDE configs without tagging references
- Deleted existing tags (v0.0.0, v0.0.1, v0.1.0, v0.1.1, v0.2.0)

**Related**: None (first ADR)

## ADR-002: Auto-Initialize Multi-Agent Configuration Based on Project Structure

**Date**: 2026-01-08
**Status**: Accepted
**Phase**: BUILD (v0.4.x)

**Context**:
During testing of the auto-initialization system, we discovered that the AI was not configuring multi-agent setups even when the project structure clearly indicated multiple specialized areas (e.g., src/rules/, website/, templates/). This was because:
1. The initialization questions didn't ask about multi-agent preferences
2. There was no logic to infer appropriate agents from project structure
3. Step 5 hardcoded `agents: enabled: false` in all cases

For projects with clear separation of concerns (backend, frontend, testing, infrastructure, etc.), a multi-agent setup provides better organization and parallel work capabilities.

**Decision**:
Implement intelligent agent inference during auto-initialization:
1. Add question 5: "Do you want to use multi-agent workflows?" (a=yes, b=no)
2. If user chooses yes (5a), analyze project structure to detect:
   - Backend/API (src/backend/, backend/, api/, server/)
   - Frontend/website (src/frontend/, frontend/, website/, client/)
   - Testing/QA infrastructure (tests/ with >10 test files)
   - DevOps/Infrastructure (infrastructure/, deploy/, .github/workflows/)
3. Generate appropriate agent configurations with context_dirs matching detected areas
4. If no suitable structure detected OR user chooses no (5b), disable agents

**Rationale**:
- Automatic detection reduces manual configuration burden
- Project structure naturally reveals separation of concerns
- Multi-agent setup provides clear boundaries and parallel work
- Context directories help agents stay focused on their domain
- Asking the user first respects their preferences (don't force multi-agent)
- Fallback to single agent ensures it works for all projects

**Consequences**:

Positive:
- ✅ Better default configuration for complex projects
- ✅ Clear agent boundaries from initialization
- ✅ Reduces manual ad.yaml editing
- ✅ Agents automatically get appropriate context directories
- ✅ Scalable pattern (easy to add more detection strategies)

Negative:
- ❌ Inference logic might not detect all project structures (can be improved)
- ❌ User must answer an additional question during initialization

**Implementation**:
- Updated `/var/ad/src/rules/ai-workflow.md`:
  - Added question 5 to Step 2
  - Added "Infer Agents" section to Step 3 with 5 detection strategies
  - Updated Step 5 to conditionally generate agent configuration
- Regenerated all IDE configs (claude.md, .cursorrules, etc.)
- Verified logic appears in generated claude.md at lines 1148 (Infer Agents) and 1268 (conditional generation)

**Example**:
For a typical web application project with src/backend/, src/frontend/, and tests/:
```yaml
agents:
  enabled: true
  platform: "claude-sdk"
  default_execution_mode: "parallel"
  default_coordination: "message-passing"
  team:
    - id: "backend-dev"
      role: "backend-implementation"
      description: "Implements backend services and APIs"
      context_dirs: ["src/backend/"]
    - id: "frontend-dev"
      role: "frontend-implementation"
      description: "Implements user interface and client-side logic"
      context_dirs: ["src/frontend/"]
    - id: "qa-engineer"
      role: "quality-assurance"
      description: "Writes tests and validates quality"
      context_dirs: ["tests/"]
```

**Related**: None

## 2026-01-08 - Initialize AD Methodology

**Status**: Accepted

**Context**: Project existed without structured AD configuration (had old adw.yaml). Needed to adopt new AD 1.0 with feature-driven approach.

**Decision**: Adopt Agentic Driven (AD) 1.0 methodology with feature-driven mode.

**Consequences**:
✅ Structured workflow with clear phases
✅ Feature-driven development (work on individual features)
✅ Better documentation practices with hierarchical ad.yaml
✅ Auto-initialization system for future projects

**Alternatives**:
- Continue with old adw.yaml: Outdated, not feature-driven
- Project-driven mode: Too rigid for this type of project
