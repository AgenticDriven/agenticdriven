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
2. Version tracking in `add.yaml` file
3. Journal entries for progress tracking

**Rationale**:
- Simplicity: Tags add an extra step without clear benefit
- Commits alone provide sufficient history
- `add.yaml` version field clearly shows current state
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
