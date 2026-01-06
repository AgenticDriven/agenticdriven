# Validation Criteria

## Overview

This document defines the validation criteria for ADD 1.0 before release. All criteria must be met to proceed from VALIDATE phase to MARKET phase.

## Functional Validation

### FV1: Source Rules
**Criteria**: All 13 principles and 10 phases documented correctly

**Tests**:
```bash
# Check all required files exist
test -f src/rules/principles.md && echo "✅" || echo "❌"
test -f src/rules/phases.md && echo "✅" || echo "❌"
test -f src/rules/versioning.md && echo "✅" || echo "❌"
test -f src/rules/documentation.md && echo "✅" || echo "❌"
test -f src/rules/exit-criteria.md && echo "✅" || echo "❌"
test -f src/rules/git-commits.md && echo "✅" || echo "❌"
test -f src/rules/git-tags.md && echo "✅" || echo "❌"
test -f src/rules/contracts.md && echo "✅" || echo "❌"
test -f src/rules/ai-workflow.md && echo "✅" || echo "❌"

# Verify 13 principles present
grep -c "^\*\*[0-9]\+\." src/rules/principles.md
# Expected: 13

# Verify 10 phases defined
grep -c "^##.*Phase:" src/rules/phases.md || grep -c "^\*\*[A-Z]\+\*\*:" src/rules/exit-criteria.md
# Expected: 10
```

**Success**: All files exist, 13 principles, 10 phases documented

---

### FV2: IDE Config Generation
**Criteria**: Script generates all 6 IDE configurations correctly

**Tests**:
```bash
# Run generator
bash src/rules/generate-ide-configs.sh

# Check output files
test -f src/rules/ide/.cursorrules && echo "✅ Cursor" || echo "❌"
test -f src/rules/ide/.clauderc && echo "✅ Claude" || echo "❌"
test -f src/rules/ide/.windsurfrules && echo "✅ Windsurf" || echo "❌"
test -f src/rules/ide/.github/copilot-instructions.md && echo "✅ Copilot" || echo "❌"
test -f src/rules/ide/.aider.conf.yml && echo "✅ Aider" || echo "❌"
test -f src/rules/ide/.continuerc.json && echo "✅ Continue" || echo "❌"

# Check configs in root
test -f .cursorrules && echo "✅" || echo "❌"
test -f .clauderc && echo "✅" || echo "❌"
test -f .windsurfrules && echo "✅" || echo "❌"

# Verify size constraint (< 600 lines ideal, < 1000 acceptable)
wc -l .cursorrules .clauderc .windsurfrules
```

**Success**: All configs generated, copied to root, size acceptable

---

### FV3: Website Functionality
**Criteria**: Website builds and displays all content correctly

**Tests**:
```bash
# Build website
cd website
npm ci
npm run build

# Check build output
test -d ../_site && echo "✅ Build output exists" || echo "❌"
test -f ../_site/index.html && echo "✅ Index exists" || echo "❌"

# Check build size
SIZE=$(du -sm ../_site | cut -f1)
if [ $SIZE -lt 5 ]; then
  echo "✅ Size OK: ${SIZE}MB"
else
  echo "⚠️  Size large: ${SIZE}MB"
fi

# Manual checks (browser required):
# 1. Open _site/index.html in browser
# 2. Verify hero section displays
# 3. Verify 13 principles visible
# 4. Verify 10 phases visible
# 5. Verify IDE download buttons work
# 6. Check mobile responsiveness
# 7. Test all navigation links
```

**Success**: Build succeeds, size < 5MB, all content displays

---

### FV4: Documentation Completeness
**Criteria**: All required documentation exists and is complete

**Tests**:
```bash
# Check DEFINE docs
test -f docs/problem-statement.md && echo "✅" || echo "❌"
test -f docs/objectives.md && echo "✅" || echo "❌"
test -f docs/scope.md && echo "✅" || echo "❌"

# Check DISCOVER docs
test -f docs/discovery.md && echo "✅" || echo "❌"
test -f docs/requirements.md && echo "✅" || echo "❌"
test -f docs/risks.md && echo "✅" || echo "❌"

# Check DESIGN docs
test -f docs/design.md && echo "✅" || echo "❌"
test -f docs/architecture.md && echo "✅" || echo "❌"
test -f docs/interfaces.md && echo "✅" || echo "❌"

# Check SETUP docs
test -f docs/setup.md && echo "✅" || echo "❌"
test -f docs/validation-criteria.md && echo "✅" || echo "❌"

# Check always-required docs
test -f docs/journal.md && echo "✅" || echo "❌"
test -f docs/decisions.md && echo "✅" || echo "❌"

# Verify no TODO or FIXME in docs
! grep -r "TODO\|FIXME" docs/ && echo "✅ No TODOs" || echo "⚠️  TODOs found"
```

**Success**: All required docs exist, no TODOs/FIXMEs

---

### FV5: GitHub Standards
**Criteria**: 100% GitHub community standards compliance

**Tests**:
```bash
# Check required files
test -f LICENSE && echo "✅" || echo "❌"
test -f README.md && echo "✅" || echo "❌"
test -f CONTRIBUTING.md && echo "✅" || echo "❌"
test -f CODE_OF_CONDUCT.md && echo "✅" || echo "❌"
test -f SECURITY.md && echo "✅" || echo "❌"
test -d .github/ISSUE_TEMPLATE && echo "✅" || echo "❌"
test -f .github/PULL_REQUEST_TEMPLATE.md && echo "✅" || echo "❌"

# Count issue templates (should be 3)
TEMPLATE_COUNT=$(ls -1 .github/ISSUE_TEMPLATE/*.md 2>/dev/null | wc -l)
if [ $TEMPLATE_COUNT -ge 3 ]; then
  echo "✅ Issue templates: $TEMPLATE_COUNT"
else
  echo "❌ Issue templates: $TEMPLATE_COUNT (need 3)"
fi
```

**Success**: All files exist, 3+ issue templates

---

### FV6: Git Workflow
**Criteria**: Git history follows Conventional Commits

**Tests**:
```bash
# Check commits follow format
git log --oneline -20 | head -10

# Verify conventional commit format (manual review)
# Expected: type(scope): subject format
# Examples: feat:, docs:, chore:, refactor:

# Check no merge commits (single branch)
MERGE_COUNT=$(git log --oneline --merges | wc -l)
if [ $MERGE_COUNT -eq 0 ]; then
  echo "✅ No merge commits"
else
  echo "⚠️  Merge commits: $MERGE_COUNT"
fi

# Verify no tags (per ADR-001)
TAG_COUNT=$(git tag | wc -l)
if [ $TAG_COUNT -eq 0 ]; then
  echo "✅ No tags (correct per ADR-001)"
else
  echo "❌ Tags found: $TAG_COUNT (should be 0)"
fi
```

**Success**: Commits follow format, no merges, no tags

---

## Non-Functional Validation

### NFV1: Performance
**Criteria**: Website loads in < 2 seconds

**Tests**:
```bash
# Build and serve
cd website
npm run build
npx serve ../_site &
SERVER_PID=$!

# Wait for server
sleep 2

# Test with curl (basic check)
time curl -s http://localhost:3000 > /dev/null

# Kill server
kill $SERVER_PID

# Manual test with browser DevTools:
# 1. Open http://localhost:3000
# 2. Open DevTools > Network
# 3. Hard reload (Cmd+Shift+R)
# 4. Check "Load" time < 2s
```

**Success**: Load time < 2 seconds on modern connection

---

### NFV2: Simplicity
**Criteria**: IDE configs concise, documentation clear

**Tests**:
```bash
# Check IDE config size
for file in .cursorrules .clauderc .windsurfrules; do
  LINES=$(wc -l < "$file")
  if [ $LINES -lt 1000 ]; then
    echo "✅ $file: $LINES lines"
  else
    echo "⚠️  $file: $LINES lines (consider reducing)"
  fi
done

# Manual readability check:
# 1. Read each IDE config
# 2. Verify clarity and conciseness
# 3. Ensure no verbose explanations
# 4. Check universal language (not domain-specific)
```

**Success**: Configs < 1000 lines, clear and concise

---

### NFV3: Accessibility
**Criteria**: Free, open source, works without paid tools

**Tests**:
```bash
# Verify MIT license
grep -q "MIT License" LICENSE && echo "✅ MIT License" || echo "❌"

# Check no proprietary dependencies
grep -q "private.*true" website/package.json && echo "❌ Private deps" || echo "✅ No private deps"

# Verify GitHub Pages compatible
test -f .github/workflows/deploy.yml && echo "✅ GitHub Actions" || echo "❌"
```

**Success**: MIT license, no private deps, GitHub Pages ready

---

### NFV4: Mobile Responsiveness
**Criteria**: Website works on mobile devices

**Tests** (manual, requires browser):
1. Open website in browser
2. Open DevTools > Device toolbar
3. Test viewports:
   - iPhone SE (375x667)
   - iPad (768x1024)
   - Desktop (1920x1080)
4. Verify:
   - No horizontal scroll
   - Text readable
   - Buttons accessible
   - Navigation works
   - Downloads functional

**Success**: Works on all viewport sizes

---

### NFV5: Universal Applicability
**Criteria**: Methodology applies to any domain

**Tests** (manual review):
```bash
# Check rules for domain-specific language
grep -i "software\|code\|program" src/rules/*.md || echo "✅ No software-specific terms"

# Review examples in rules
# Verify: No code examples unless necessary
# Verify: Examples are universal or from multiple domains
# Verify: Language is abstract enough for any project type
```

**Success**: No domain-specific language, universal examples

---

## Integration Validation

### IV1: End-to-End Workflow
**Criteria**: Complete workflow from rules to deployment works

**Test**:
```bash
# 1. Modify rules
echo "# Test" >> src/rules/principles.md

# 2. Regenerate configs
bash src/rules/generate-ide-configs.sh

# 3. Copy to root
cp src/rules/ide/.cursorrules .

# 4. Build website
cd website && npm run build

# 5. Verify build
test -f ../_site/index.html && echo "✅ E2E workflow" || echo "❌"

# 6. Cleanup
cd ..
git checkout src/rules/principles.md .cursorrules
```

**Success**: Complete workflow executes without errors

---

### IV2: GitHub Actions
**Criteria**: Deployment workflow executes successfully

**Test** (after pushing to GitHub):
1. Push commit to main branch
2. Check Actions tab in GitHub
3. Verify workflow runs
4. Verify deployment succeeds
5. Check website live at agenticdriven.dev

**Success**: Workflow completes, site deployed

---

## Validation Summary

### Critical (Must Pass)
- ✅ FV1: Source Rules
- ✅ FV2: IDE Config Generation
- ✅ FV3: Website Functionality
- ✅ FV4: Documentation Completeness
- ✅ FV5: GitHub Standards
- ✅ FV6: Git Workflow
- ✅ NFV3: Accessibility
- ✅ IV1: End-to-End Workflow

### Important (Should Pass)
- ⏳ NFV1: Performance
- ⏳ NFV2: Simplicity
- ⏳ NFV4: Mobile Responsiveness
- ⏳ NFV5: Universal Applicability
- ⏳ IV2: GitHub Actions

### Nice to Have
- Manual review for clarity
- User feedback (if available)
- Peer review

## Validation Process

**Phase**: VALIDATE (v0.5.x)

**Steps**:
1. Run all automated tests
2. Perform manual checks
3. Document results in test-report.md
4. Fix any failures
5. Retest
6. Create validation-report.md
7. Get approval (self-approval or peer review)
8. Move to MARKET phase

## Acceptance Criteria

**Minimum for MARKET phase**:
- All Critical tests passing
- 80%+ Important tests passing
- No blockers identified
- Validation report complete

**Ready for LAUNCH**:
- All Critical tests passing
- All Important tests passing
- All documentation complete
- Website deployed and tested
- GitHub repository public
