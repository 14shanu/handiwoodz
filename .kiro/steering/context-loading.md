---
inclusion: always
---

# Context Loading Rules

## When to Consult Memory Bank (Manual Steering Files)

Before starting any implementation task, read the relevant reference files from `.kiro/steering/`:

### Read `data-models.md` when:
- Creating or modifying Strapi content types
- Writing API calls that send/receive data
- Working on form submissions (quote requests)
- Debugging data shape mismatches
- Working on database relations

### Read `api-endpoints.md` when:
- Writing or modifying `lib/api/` fetch functions
- Creating new Strapi controllers or routes
- Debugging API errors or response shapes
- Connecting frontend to backend

### Read `frontend-pages.md` when:
- Creating or modifying page components
- Working on routing or navigation
- Implementing filters or search params
- Adding new pages or changing page structure

### Read `progress.md` when:
- User asks "what's next?" or "what's the status?"
- Starting a new feature to check dependencies
- Planning work order or priorities
- Checking what's already been implemented

## Rule
If a task touches a domain covered by a reference file, read it BEFORE writing any code. Don't guess — check the source of truth.
