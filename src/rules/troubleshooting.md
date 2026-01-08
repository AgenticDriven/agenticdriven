# Troubleshooting

## Process

1. Identify: What's failing?
2. Isolate: Where's the problem?
3. Document: What did you try?
4. Solve: Fix it
5. Prevent: Avoid repeat

## Common Issues

- Phase unclear: Check exit criteria, review journal
- Multi-agent conflict: Check context boundaries
- Lost work: Check `git stash list`, `git reflog`
- Git conflicts: Resolve markers, stage, merge
- Contract mismatch: Update code or contract

## Rollback

```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
```

Document issues in `docs/journal.md`. Commit frequently, read contracts, update journal, follow exit criteria.
