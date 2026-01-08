# Troubleshooting

## Process

1. Identify: What's failing?
2. Isolate: Where's the problem?
3. Document: What did you try?
4. Solve: Fix it
5. Prevent: Avoid repeat

## Common Issues

- **Phase unclear**: Check exit criteria, review journal.md
- **Multi-agent conflict**: Check context boundaries, coordinate via git
- **Lost work**: Check `git stash list`, `git reflog`
- **Git conflicts**: Resolve markers, stage, complete merge
- **Contract mismatch**: Read `docs/interfaces.md`, update code or contract

## Rollback

```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
```

## Document

Update `docs/journal.md` with issue, cause, solution.

## Prevention

Commit frequently, read contracts, update journal, follow exit criteria, respect boundaries.
