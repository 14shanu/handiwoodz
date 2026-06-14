---
inclusion: always
---

# Testing Standards — Handiwoodz

## Rule
Every line of code written or changed MUST be tested before moving forward.

## Process (After Every Code Change)
1. Write/modify code
2. Identify all test scenarios — happy path, edge cases, error cases
3. Run tests — execute against every identified scenario
4. Fix failures before proceeding
5. Only then move to next task

## Mandatory Commands (After EVERY Change)
```bash
npm run build    # Zero errors
npm run lint     # Zero warnings
npm run test     # All tests pass
```

## Testing Principles
- Test behavior, not implementation
- Arrange → Act → Assert pattern
- One assertion per concern
- Test naming: `it('renders the title when provided', () => {})`

## What Must Be Tested

### Components (`components/**/*.tsx`)
- Default render, all prop variations, empty/null props
- User interactions, conditional rendering, accessibility
- Co-located test file: `component-name.test.tsx`

### Hooks (`lib/hooks/*.ts`)
- Initial state, state transitions, side effects, cleanup, error handling

### Utility Functions (`lib/utils/*.ts`)
- Happy path, edge cases, boundary values, error cases

## Coverage Requirements (MINIMUM)
- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+
- Critical paths (quote submission, basket operations): 100%

## When to Skip Tests
- Static content pages with no logic
- Third-party library internals
- Type-only files
- Configuration files
