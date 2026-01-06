# Troubleshooting

## Process

1. **Identify**: What's failing?
2. **Isolate**: Where's the problem?
3. **Document**: What did you try?
4. **Solve**: Fix it
5. **Prevent**: Avoid repeat

## Common Issues

**Tests failing**: Read error, run single test, check recent changes, fix code/test
**Build failing**: Check syntax, dependencies, env vars, clear cache
**Git conflicts**: Open file, resolve markers, test, stage, complete merge
**Phase unclear**: Read `/var/add/fases/`, check exit criteria, review journal.md
**Multi-agent conflict**: Check context boundaries, coordinate via git
**Lost work**: Check `git stash list`, `git reflog`, backup branches
**Dependencies**: Delete packages, delete lock file, reinstall fresh
**Contract mismatch**: Read `docs/interfaces.md`, fix code or update contract

## Rollback

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Go back to tag
git checkout v0.4.2
```

## Getting Help

Provide: exact error, what you did, what you expected, what happened, what you tried

## Document

Update `docs/journal.md`:
```markdown
## 2026-01-06
**Issue**: Tests failing
**Cause**: Outdated fixtures
**Solution**: Updated tests/fixtures.js
**Time**: 15 min
```

## Prevention

Commit frequently, write tests, read contracts, update journal, follow exit criteria, respect boundaries
