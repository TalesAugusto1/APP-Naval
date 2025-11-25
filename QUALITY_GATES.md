# Quality Gates - Quick Reference 🔒

## 🚦 Active Hooks

| Hook           | When                 | What                       | Time    |
| -------------- | -------------------- | -------------------------- | ------- |
| **pre-commit** | Before commit        | Lint + Format staged files | ~2s     |
| **commit-msg** | After commit message | Validate message format    | instant |
| **pre-push**   | Before push          | Full quality suite         | ~10s    |
| **post-merge** | After pull/merge     | Auto npm install           | varies  |

## ✅ Pre-commit Checklist

**Runs automatically on**: `git commit`

- [x] ESLint all staged `.ts` and `.tsx` files
- [x] Prettier format all staged files
- [x] Auto-fix fixable issues
- [x] Only process staged files (fast!)

**Skip if needed**: `git commit --no-verify`

## 💬 Commit Message Format

### Pattern

```
type(scope?): subject

Example:
feat(schools): add school list screen
```

### Valid Types

```
feat     → New feature
fix      → Bug fix
docs     → Documentation
style    → Code style (formatting, semicolons)
refactor → Code refactoring
perf     → Performance improvement
test     → Adding tests
build    → Build system changes
ci       → CI/CD changes
chore    → Maintenance tasks
revert   → Revert previous commit
```

### Valid Scopes (Mobile App)

```
schools      → Schools module
classes      → Classes module
navigation   → Navigation/routing
state        → State management
ui           → UI components
api          → API/services
storage      → AsyncStorage/persistence
hooks        → Custom hooks
types        → TypeScript types
config       → Configuration
```

### Branch Names

```
<type>-<description>

Examples:
✅ feat-school-list
✅ fix-navigation-crash
✅ hotfix-data-corruption
✅ refactor-state-management

❌ my-branch
❌ new-feature
❌ bugfix
```

## 🚀 Pre-push Checklist

**Runs automatically on**: `git push`

1. **Auto-format** - Applies Prettier to all files
2. **Lint** - Full ESLint check on all files
3. **Type-check** - TypeScript compilation (`tsc --noEmit`)
4. **Tests** - Unit tests (if configured)

**Time**: ~10 seconds for full suite

**Skip if needed**: `git push --no-verify` ⚠️

## 🔧 Manual Commands

### Quick Checks

```bash
npm run quality           # All checks (recommended)
npm run lint              # ESLint only
npm run format:check      # Prettier check
npm run type-check        # TypeScript
```

### Auto-fix

```bash
npm run lint:fix          # Fix lint errors
npm run format            # Format all files
```

## 🎨 Color Themes

Visual distinction across projects:

- 🟣 **API-Casas-Orange**: Magenta (Backend)
- 🔵 **WEB-CasasOrange**: Blue/Cyan (Frontend)
- 🟢 **School-Manager**: Green (Mobile)

## 💡 Pro Tips

### Commit Often

```bash
# Good: Focused commits
git commit -m "feat(schools): add school model"
git commit -m "feat(schools): add school service"
git commit -m "feat(schools): add school list screen"

# Not ideal: One huge commit
git commit -m "feat(schools): add entire schools module"
```

### Use Scope Wisely

```bash
# Specific scope (better for searching)
feat(schools): add validation

# No scope (okay for cross-cutting changes)
chore: update dependencies
```

### Breaking Changes

```bash
feat(api)!: change school model structure

BREAKING CHANGE: School model now requires city field
```

## 🚨 Troubleshooting

### Hooks not running?

```bash
npm run prepare
```

### Lint errors?

```bash
npm run lint:fix
```

### Format issues?

```bash
npm run format
```

### Type errors?

```bash
npm run type-check
```

### Force push (emergency)

```bash
git push --no-verify
# ⚠️ Use with caution!
```

## 📊 Quality Metrics

**This project enforces**:

- ✅ 100% lint-free code
- ✅ 100% properly formatted code
- ✅ 100% type-safe code
- ✅ 100% conventional commits
- ✅ 100% valid branch names

**Result**: Production-ready code quality! 🎯

---

## 🎯 Interview Ready

These quality gates demonstrate:

1. **Professional Standards** - Enterprise-level automation
2. **Code Quality** - Enforced best practices
3. **Team Collaboration** - Consistent conventions
4. **Git Mastery** - Advanced workflows
5. **Attention to Detail** - Comprehensive checks

---

**Quick Access Commands**:

```bash
npm run quality          # Check everything
npm run lint:fix         # Fix lint issues
npm run format           # Format code
npm run type-check       # Check types
git commit --no-verify   # Emergency bypass
git push --no-verify     # Emergency bypass
```

---

**Status**: ✅ All quality gates active  
**Last Updated**: 2025-11-25
