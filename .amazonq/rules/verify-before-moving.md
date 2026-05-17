# HARD RULE: Always Verify Before Moving Forward

## Rule (ABSOLUTE — NO EXCEPTIONS)

**NEVER move to the next step without verifying and testing the current step first.**

## Process (Every Step)
1. **Write code** for the current step
2. **Verify** — run the code, import it, or execute tests to confirm it works
3. **Fix** — if anything fails, fix it before proceeding
4. **Impact check** — verify the change doesn't break any other part of the system
5. **Confirm** — show proof that it works (output, test pass, no errors)
6. **Only then** — move to the next step

## Impact Analysis (Before Every Change)
- **Who consumes this?** — find all files that import/use what you're changing
- **Type contracts** — if you change an interface/prop/schema, update ALL consumers
- **Data flow** — trace the data from source → API → component → UI. A change at any point must be consistent across all points
- **Frontend ↔ Backend contract** — if Strapi schema changes, verify the frontend API layer sends/receives the correct shape
- **Tests still pass?** — if a change breaks tests, either the change is wrong or the tests need updating. Never skip.

## What Counts as Breaking
- Changing a prop name without updating all components that use it
- Changing a Strapi field type without updating the frontend payload
- Changing a content key without updating components that import it
- Changing a route without updating all links that reference it
- Removing an export without checking all imports
- Changing a function signature without updating all callers

## What Counts as Verification
- Models: Import all models, confirm no errors, confirm tables registered
- API routes: Start the server, hit endpoints, confirm responses
- AI pipeline: Run each step with real input, confirm output shape
- Frontend: Run dev server, confirm pages render without errors
- Integration: End-to-end test of the full flow

## What Does NOT Count
- "It should work" — not acceptable
- "The code looks correct" — not acceptable
- Only writing code without running it — not acceptable

## Why
Untested code compounds errors. One broken step breaks everything downstream. Verify early = fix cheap.
