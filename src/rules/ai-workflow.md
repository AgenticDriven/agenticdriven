# AI Workflow

## Session Start (9 steps)

1. **Git status**: `git status`
2. **Config**: `cat adw.yaml 2>/dev/null` (if exists)
3. **README**: `cat README.md`
4. **Phase**: `git describe --tags --abbrev=0` (latest tag = current phase)
5. **Phase docs**: `cat docs/journal.md` + phase-specific docs
6. **Contracts**: `cat docs/interfaces.md` (if BUILD/VALIDATE)
7. **Recent commits**: `git log -5 --oneline`
8. **Role**: Check adw.yaml for agent context (if multi-agent)
9. **Ask**: Ready to work

## During Work

**Before changes**: Read files, check contracts, verify directory
**After task**: Verify works, update docs, update journal.md, commit, update user

## Session End

**Clean**: Commit all completed work, update journal.md, leave clean workspace, push if ready
**Interrupted**: Commit with `wip:`, update journal noting incomplete work

## Multi-Agent

If adw.yaml has agents:
- Identify your agent ID
- Stay in context directories
- Read contracts before implementing
- Use mocks for dependencies
- Don't touch other agents' files
