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

## ADR-002: Enable Multi-Agent Configuration Without Automatic Detection

**Date**: 2026-01-08
**Status**: Accepted
**Phase**: BUILD (v0.4.x)

**Context**:
During testing of the auto-initialization system, we discovered that the AI was not asking about multi-agent preferences, always defaulting to `agents: enabled: false`. Additionally, initial implementations tried to auto-detect agent configurations based on project structure (e.g., detecting backend/, frontend/, tests/), but this was problematic because:
1. AD is a generic methodology for ANY domain (software, books, marketing, events, products, research)
2. Auto-detection for software projects (backend/frontend/QA) doesn't apply to books, marketing campaigns, events, etc.
3. Each domain has different ways to organize work and different agent roles
4. Making assumptions about structure is not generic enough

**Decision**:
Enable multi-agent during auto-initialization WITHOUT automatic detection:
1. Add question 5: "Do you want to use multi-agent workflows?" (a=yes, b=no)
2. If user chooses yes (5a):
   - Enable `agents: enabled: true` with `team: []` empty
   - Add helpful comments showing examples for different domains:
     - Software: backend-dev, frontend-dev, qa-engineer, devops
     - Books: chapter-writers, editor, designer, publisher
     - Marketing: content-creator, designer, analyst, campaign-manager
     - Events: logistics, promotion, program, registration
3. User configures agents manually based on their specific project needs
4. If user chooses no (5b), disable agents

**Rationale**:
- AD must remain domain-agnostic - works for any type of project
- No single detection algorithm works for all domains
- Users know their project structure better than any heuristic
- Providing examples for common domains helps users configure correctly
- Keeps initialization generic and exportable to any project
- Users can always enable/configure agents later if they change their mind

**Consequences**:

Positive:
- ✅ Completely generic - works for any domain
- ✅ No incorrect assumptions about project structure
- ✅ User retains full control over agent configuration
- ✅ Examples guide users without forcing decisions
- ✅ Simple, predictable behavior

Negative:
- ❌ Requires manual configuration if user wants agents
- ❌ User must understand their project structure to configure agents

**Implementation**:
- Updated `/var/ad/src/rules/ai-workflow.md`:
  - Added question 5 to Step 2
  - Simplified "Infer Agents" in Step 3 (just enable/disable, no detection)
  - Updated Step 5 to generate agents section with helpful comments and examples
  - Updated Step 9 report to notify user if agents need configuration
- Regenerated all IDE configs (claude.md, .cursorrules, etc.)

**Example**:
After initialization with multi-agent enabled, user gets this in ad.yaml:
```yaml
# Agents (enabled - configure team based on your project structure)
agents:
  enabled: true
  platform: "claude-sdk"
  default_execution_mode: "parallel"
  default_coordination: "message-passing"

  # Configure your team based on project needs:
  # For software: backend-dev, frontend-dev, qa-engineer, devops
  # For books: chapter-writers, editor, designer, publisher
  # For marketing: content-creator, designer, analyst, campaign-manager
  # For events: logistics, promotion, program, registration
  team: []
```

User then adds their specific agents based on their domain and project structure.

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
