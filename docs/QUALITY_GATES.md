# Quality Gates & Testing Strategy

This document describes the quality gates enforced in the School Manager project to ensure code quality and prevent regressions.

## 🎯 Quality Standards

### Code Coverage Requirements
- **Statements**: 80% minimum (currently: **100%**)
- **Branches**: 70% minimum (currently: **91.66%**)
- **Functions**: 70% minimum (currently: **100%**)
- **Lines**: 80% minimum (currently: **100%**)

### Test Suite
- **260 unit, component, and integration tests**
- All tests must pass before code can be pushed
- Tests run in silent mode during git hooks for speed

## 🚨 Git Hooks - Automated Quality Checks

### Pre-commit Hook
Runs on every commit to ensure code quality:

```bash
✓ Lint staged files (ESLint)
✓ Format staged files (Prettier)
✓ Validate commit message (Conventional Commits)
```

**What it does:**
- Auto-fixes linting issues
- Auto-formats code with Prettier
- Ensures commit messages follow convention
- Only processes staged files for speed

**Time:** ~2-5 seconds

### Pre-push Hook (⭐ MANDATORY QUALITY GATE)
Runs before pushing to remote repository:

```bash
✓ Format check (Prettier)
✓ Linting (ESLint) - BLOCKS push on failure
✓ TypeScript compilation - BLOCKS push on failure  
✓ Unit tests (260 tests) - BLOCKS push on failure
✓ Code coverage analysis - Warning only
```

**What it blocks:**
- ❌ Linting errors
- ❌ TypeScript compilation errors
- ❌ Test failures (any of 260 tests)
- ⚠️ Coverage below thresholds (warning, but doesn't block)

**Time:** ~18-25 seconds

## 📋 Available Scripts

### Quality Check Scripts

```bash
# Quick quality check (lint + format + type + tests)
npm run quality

# Full quality check with coverage
npm run quality:full

# Pre-push simulation
npm run pre-push-check
```

### Testing Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (with coverage, limited workers)
npm run test:ci
```

### Linting Scripts

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Formatting Scripts

```bash
# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

## 🧪 Test Coverage by Module

| Module | Coverage | Tests |
|--------|----------|-------|
| Services (Schools) | 100% | 48 tests |
| Services (Classes) | 100% | 52 tests |
| Store (Schools) | 100% | 38 tests |
| Store (Classes) | 100% | 38 tests |
| Components | 100% | 45 tests |
| Integration | 100% | 39 tests |
| **TOTAL** | **100%** | **260 tests** |

## 🚀 Testing Strategy

### Unit Tests
Test individual functions and services in isolation:
- Services (CRUD operations, validation)
- Store actions and state management
- Utility functions

### Component Tests
Test React components in isolation:
- Rendering with different props
- User interactions (clicks, input)
- Conditional rendering
- Accessibility attributes

### Integration Tests
Test complete user flows:
- Create → Read → Update → Delete cycles
- Navigation flows
- Error handling and recovery
- Search and filter functionality

## 🔧 Bypassing Hooks (Emergency Only)

⚠️ **Use with extreme caution**

```bash
# Skip pre-commit hook
git commit --no-verify

# Skip pre-push hook
git push --no-verify
```

**When to use:**
- Emergency hotfix deployments
- Fixing CI/CD pipeline issues
- With explicit team approval only

## 📊 Quality Metrics Dashboard

After each push, you'll see:

```
✅ Pre-push passed
• Summary: lint ✓ · type-check ✓ · tests ✓ · 18s
• Performance Summary:
  - Total time: 18s
  - Change type: full
  - Quality gates: ALL PASSED
• Code quality: Production-ready 🚀
```

## 🐛 Troubleshooting

### Tests Failing
```bash
# Run tests locally to debug
npm test

# Run specific test file
npm test -- path/to/test.test.ts

# Run with verbose output
npm test -- --verbose
```

### Linting Errors
```bash
# Auto-fix most issues
npm run lint:fix

# Check what would be fixed
npm run lint
```

### TypeScript Errors
```bash
# See detailed type errors
npm run type-check

# Or compile with tsc directly
npx tsc --noEmit
```

### Coverage Below Threshold
```bash
# See detailed coverage report
npm run test:coverage

# Opens HTML coverage report
open coverage/lcov-report/index.html
```

## 📈 Continuous Improvement

Our quality standards evolve over time:

- ✅ **Phase 1 (Complete)**: Setup Jest + Testing Library
- ✅ **Phase 2 (Complete)**: Achieve 80%+ coverage
- ✅ **Phase 3 (Complete)**: Enforce tests in git hooks
- 🔄 **Phase 4 (Ongoing)**: Maintain 100% coverage on new code
- 📋 **Phase 5 (Planned)**: E2E tests with Detox

## 🤝 Contributing

When contributing code:

1. **Write tests first** (TDD approach recommended)
2. **Ensure all tests pass** locally before committing
3. **Run `npm run quality`** before pushing
4. **Maintain coverage** above thresholds
5. **Follow commit conventions** (feat, fix, docs, etc.)

## 📚 Related Documentation

- [Testing Implementation](./HUSKY_IMPLEMENTATION_COMPLETE.md)
- [Husky Setup Guide](./HUSKY_SETUP.md)
- [Implementation Success Report](./IMPLEMENTATION_SUCCESS.md)

---

**Last Updated**: Milestone 07 - Testing Complete  
**Test Count**: 260 tests  
**Coverage**: 100% statements, 91.66% branches, 100% functions, 100% lines
