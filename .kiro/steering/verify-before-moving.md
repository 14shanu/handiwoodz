---
inclusion: always
---

# Verify Before Moving Forward

## Rule
NEVER move to the next step without verifying the current step works.

## Process
1. Write code for current step
2. Verify — run it, test it, confirm it works
3. Fix — if anything fails, fix before proceeding
4. Impact check — verify no other parts are broken
5. Only then move to next step

## Impact Analysis (Before Every Change)
- Who consumes this? Find all files that import/use what you're changing
- Type contracts — if you change an interface/prop/schema, update ALL consumers
- Data flow — trace from source → API → component → UI
- Frontend ↔ Backend contract — Strapi schema changes must match frontend API layer
- Tests still pass? If not, either the change or the tests need fixing

## What Counts as Breaking
- Changing a prop name without updating all consumers
- Changing a Strapi field without updating frontend payload
- Changing a content key without updating components
- Changing a route without updating all links
- Removing an export without checking imports
- Changing a function signature without updating callers
