# HARD RULE: Test Every Line of Code

## Rule (ABSOLUTE — NO EXCEPTIONS)

**Every line of code written or changed MUST be tested with ALL possible test scenarios before moving forward. Untested code is broken code.**

## Process (After Every Code Change)

1. **Write/modify code**
2. **Identify all test scenarios** — happy path, edge cases, error cases, boundary conditions
3. **Run tests** — execute the code against every identified scenario
4. **Verify output** — confirm expected behavior for each scenario
5. **Fix failures** — if any scenario fails, fix before proceeding
6. **Only then** — move to the next task

## Testing Toolchain (This Project)

| Tool | Purpose |
|------|---------|
| `npm run build` | TypeScript compilation + static generation |
| `npm run lint` | ESLint code quality |
| Jest | Unit test runner |
| React Testing Library | Component testing (DOM-based, user-centric) |
| `@testing-library/user-event` | Simulating real user interactions |

## Mandatory Test Execution (After EVERY Change)
```bash
npm run build    # Zero errors
npm run lint     # Zero warnings
npm run test     # All tests pass
```
All three MUST pass before moving to the next task. No exceptions.

## Industry Standard Testing Principles

### 1. Test Behavior, Not Implementation
- ❌ Don't test internal state variables
- ❌ Don't test component method names
- ✅ Test what the user sees and interacts with
- ✅ Test the output given specific inputs

### 2. Arrange → Act → Assert (AAA Pattern)
```typescript
// Arrange: set up test conditions
render(<Component prop="value" />);

// Act: perform the action
await userEvent.click(screen.getByRole('button'));

// Assert: verify the outcome
expect(screen.getByText('Result')).toBeInTheDocument();
```

### 3. One Assertion Per Concern
- Each test should verify ONE behavior
- Test name should describe the expected behavior
- If a test fails, you should know exactly what broke

### 4. Test Naming Convention
```typescript
describe('ComponentName', () => {
  it('renders the title when provided', () => {});
  it('shows empty state when no items exist', () => {});
  it('calls onSubmit with form data when submitted', () => {});
  it('disables button when form is invalid', () => {});
});
```

### 5. Testing Pyramid
```
        /  E2E  \        ← Few (critical flows only)
       / Integration \    ← Some (API + component)
      /   Unit Tests   \  ← Many (every function/component)
```

## What Must Be Tested (Per File Type)

### Components (`components/**/*.tsx`)
Every component MUST have a co-located test file: `component-name.test.tsx`

| Scenario | Example |
|----------|---------|
| Default render | Renders without crashing with required props |
| All prop variations | Each prop value produces correct output |
| Empty/null props | Optional props missing → graceful fallback |
| User interactions | Click, type, hover → correct state change |
| Conditional rendering | Shows/hides elements based on state |
| Accessibility | Correct ARIA labels, roles, keyboard navigation |
| Edge cases | Long text truncation, empty arrays, special characters |

### Hooks (`lib/hooks/*.ts`)
| Scenario | Example |
|----------|---------|
| Initial state | Returns correct default values |
| State transitions | Actions produce expected state changes |
| Side effects | localStorage reads/writes correctly |
| Cleanup | No memory leaks, event listeners removed |
| Error handling | Invalid inputs handled gracefully |

### Utility Functions (`lib/utils/*.ts`)
| Scenario | Example |
|----------|---------|
| Happy path | Correct output for valid input |
| Edge cases | Empty string, zero, null, undefined |
| Boundary values | Min/max values, array limits |
| Type safety | Wrong types rejected at compile time |
| Error cases | Throws or returns error for invalid input |

### Constants (`lib/constants/*.ts`)
| Scenario | Example |
|----------|---------|
| Defined | All exported values are not undefined |
| Type correct | Values match their TypeScript types |
| No duplicates | Route paths, keys are unique |

## Test Scenarios Checklist (For Every Feature)

- [ ] **Happy path** — normal expected usage works
- [ ] **Empty state** — no data, empty arrays, blank inputs
- [ ] **Error state** — API failure, invalid input, network timeout
- [ ] **Boundary values** — min quantity (1), max file size (10MB), longest text
- [ ] **Null/undefined** — missing optional fields handled gracefully
- [ ] **Multiple items** — works with 1 item, 10 items, 100 items
- [ ] **Rapid actions** — double-click, rapid navigation, concurrent requests
- [ ] **Mobile** — touch targets work, no horizontal scroll, readable text
- [ ] **Accessibility** — screen reader labels, keyboard navigation, focus management

## Test File Structure
```
src/
├── components/
│   └── layout/
│       ├── navbar.tsx
│       ├── navbar.test.tsx        ← co-located test
│       ├── footer.tsx
│       └── footer.test.tsx        ← co-located test
├── lib/
│   ├── hooks/
│   │   ├── use-quote-basket.ts
│   │   └── use-quote-basket.test.ts
│   └── utils/
│       ├── format-whatsapp-url.ts
│       └── format-whatsapp-url.test.ts
```

## Coverage Requirements (MINIMUM)
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+
- Critical paths (quote submission, basket operations): 100%

## What Does NOT Count as Testing

- ❌ "It should work" — not acceptable
- ❌ "The code looks correct" — not acceptable
- ❌ Writing code without running it — not acceptable
- ❌ Testing only the happy path — not acceptable
- ❌ Skipping edge cases because "they're unlikely" — not acceptable
- ❌ Assuming previous code still works after changes — not acceptable (regression)
- ❌ Manual visual check only — must have automated tests
- ❌ Console.log debugging as "testing" — not acceptable
- ❌ Snapshot tests without understanding what they capture — not acceptable

## When to Skip Tests (ONLY these cases)
- Static content pages with no logic (pure markup)
- Third-party library internals (test YOUR integration, not their code)
- Type-only files (TypeScript interfaces/types)
- Configuration files (tailwind.config.ts, next.config.mjs)

## Why

One untested line can break the entire application. Testing every scenario catches bugs at the source — where they're cheapest to fix. Ship confidence, not hope.
