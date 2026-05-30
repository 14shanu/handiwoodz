# Universal Coding Standards

> **Drop this file into any project's `.amazonq/rules/` directory or use as a team standards reference.**
> These rules are project-agnostic and apply to any codebase regardless of language, framework, or domain.

---

## Table of Contents

1. [General Principles](#general-principles)
2. [Zero Hardcoding](#zero-hardcoding)
3. [Separation of Content & Code](#separation-of-content--code)
4. [Reusability Standards](#reusability-standards)
5. [Code Reuse Rules](#code-reuse-rules)
6. [Verify Before Moving Forward](#verify-before-moving-forward)
7. [Test Every Line](#test-every-line)
8. [Never Read Secret Files](#never-read-secret-files)
9. [Naming Conventions](#naming-conventions)
10. [Environment & Configuration](#environment--configuration)
11. [Git Standards](#git-standards)
12. [Security](#security)
13. [Performance](#performance)
14. [Responsive Design](#responsive-design)
15. [Code Quality Checklist](#code-quality-checklist)

---

## General Principles

These are non-negotiable. Every line of code must adhere to these:

| Principle | Description |
|-----------|-------------|
| **Separation of Concerns** | Each module/file does ONE thing well |
| **Interface-first** | Define contracts (types/schemas) before implementation |
| **Fail fast** | Validate inputs at boundaries, not deep inside logic |
| **DRY** | Never duplicate logic — extract, reuse, share |
| **SOLID** | Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion |
| **KISS** | Simplest solution that works — no over-engineering |
| **YAGNI** | Don't build features/abstractions until actually needed |
| **Clean Code** | Code should read like well-written prose — self-documenting, intention-revealing names |

---

## Zero Hardcoding

### Rule (ABSOLUTE — NO EXCEPTIONS)

**Nothing that could change should be hardcoded. Every configurable value must live in a single, predictable location.**

### What MUST Be Configurable

| Value Type | Where It Lives |
|-----------|---------------|
| URLs & endpoints | Environment variables or constants file |
| Colors, fonts, spacing | Theme config (e.g., `tailwind.config.ts`, CSS variables, theme file) |
| Labels, text, copy | Content/constants file or CMS |
| Feature toggles | Feature flags file |
| Limits & thresholds | Constants file (max file size, min quantity, pagination) |
| API keys, secrets | `.env` files only |
| Business rules | Config objects (quote formats, allowed file types) |
| Breakpoints & layout values | Theme config |
| Contact info (phone, email) | Environment variables |

### Single File Change Principle

- Changing a color → update ONE file (theme config) → entire app updates
- Changing an API URL → update ONE file (`.env` or constants) → all calls update
- Changing a label → update ONE file (content/constants) → all instances update
- Changing business logic → update ONE service/utility → all consumers update

> **If a change requires editing 2+ files for the same concern → refactor immediately.**

### Configuration Hierarchy (Recommended)

```
.env                    → secrets, URLs, environment-specific values
theme config            → all visual design tokens
lib/content/            → all user-facing text (client-editable)
lib/constants/index     → structural constants (routes, limits)
lib/constants/api       → API paths and query params
lib/constants/config    → business rules and feature config
lib/data/mock/          → mock data (swapped for API later)
lib/api/                → data fetchers (abstracts source)
```

---

## Separation of Content & Code

### Principle

**Every piece of user-facing text that a non-developer could reasonably want to change MUST live in a dedicated content layer — NEVER inside components, logic, or code files.**

### What Goes in Content Layer (Client-Editable)

- Headings & titles
- Descriptions & body copy
- Button labels & CTAs
- Marketing copy, taglines, value propositions
- Section content (trust items, process steps, stats)
- Navigation labels
- Footer content
- Form labels & placeholders
- Error/success messages
- Empty states

### What Stays in Constants (Developer-Only)

- Routes (structural, not content)
- Limits & thresholds (business logic)
- Feature flags
- API paths (technical)
- Enum values (structural)

### The Test

> "If a client says 'change this text', can I do it by editing ONE file in the content layer without touching any component?"
>
> If YES → correct architecture.
> If NO → refactor immediately.

### Anti-Patterns

- ❌ Text strings inside JSX/templates: `<h1>Welcome to our store</h1>`
- ❌ Content in constants files: `HOMEPAGE.HERO_TITLE = "Welcome"`
- ❌ Content in component files: `const HEADING = "Our Products"`
- ❌ Mixed concerns: content + routes + limits in same file
- ✅ Content in dedicated layer: `export const homepageContent = { hero: { title: "..." } }`
- ✅ Component receives via props: `<Hero title={content.hero.title} />`

---

## Reusability Standards

### Every Piece of Code Must Be

1. **Configurable** — behavior controlled via props/params, not internal hardcoding
2. **Composable** — can be combined with other pieces without modification
3. **Isolated** — no hidden dependencies or side effects
4. **Testable** — can be tested in isolation without mocking the world
5. **Documented** — complex logic has a brief comment explaining WHY (not what)

### Single Responsibility Per File

- ONE component per file
- ONE hook per file
- ONE utility function per file (or closely related group)
- ONE API service per resource
- ONE constant group per domain
- If a file does 2 unrelated things → split it

### When to Extract

| Trigger | Action |
|---------|--------|
| Used in 2+ places | Extract immediately |
| File exceeds 150 lines | Split into sub-modules |
| Function has 3+ responsibilities | Break apart |
| Component accepts 10+ props | Split into composed sub-components |
| Logic is conditional on environment | Extract to config |

### Component Rules

- **Always build reusable** — every component should accept props for customization
- **Atomic design** — build small primitives first, compose into larger components
- **Never duplicate UI** — if 2+ pages share a pattern, extract it immediately
- **Props over hardcoding** — text, colors, sizes, icons should all be configurable
- **Composition over inheritance** — use children/slots, not deep prop chains
- **Max 150 lines per component** — if larger, split into sub-components

---

## Code Reuse Rules

### Before Writing ANY New Code

1. **Search first**: Check if a service, utility, component, or function already exists that does what you need
2. **Extend, don't duplicate**: If existing code does 80% of what you need, extend it with a parameter/option — don't copy-paste and modify
3. **Extract shared logic**: If you find yourself writing similar code in 2+ places, extract it into a shared utility/service immediately

### Design Patterns (Use When Applicable)

| Pattern | Use Case |
|---------|----------|
| **Factory** | Creating objects with complex setup (e.g., API client instances) |
| **Strategy** | Swappable behaviors (e.g., different notification channels) |
| **Observer** | Event-driven side effects (lifecycle hooks, pub/sub) |
| **Adapter** | Wrapping third-party APIs behind a clean interface |
| **Repository** | Abstracting data access behind a consistent API |

### Frontend Reuse Patterns

- Repeated UI patterns → shared components (`components/ui/`)
- API call patterns (fetch + loading + error) → shared hooks or wrapper
- Form validation schemas → shared schemas
- Layout patterns → reusable layout components, not copy-pasted markup
- Event handlers with similar logic → shared utility functions

### Backend Reuse Patterns

- Shared lifecycle logic → reusable utility functions
- Controllers that share patterns → base helper functions
- Email/notification templates → reusable template builders
- Validation logic → shared validators

### Anti-Patterns to Avoid

- ❌ Copy-pasting a function and changing one line — use a parameter instead
- ❌ Multiple API call wrappers that differ only in URL — use a generic fetcher
- ❌ Multiple components with identical structure but different data — make it configurable
- ❌ Hardcoded strings/URLs in components — use constants
- ❌ Duplicating response transforms — use a single normalizer utility
- ❌ Magic numbers/strings anywhere in code — extract to named constants
- ❌ God components/classes (500+ lines doing everything) — decompose
- ❌ Tight coupling between modules — use interfaces/abstractions
- ❌ Business logic in UI components — extract to hooks or services
- ❌ Formatting/transform logic inline — extract to utility functions
- ❌ Repeated conditional rendering patterns — extract to wrapper components
- ❌ Direct third-party SDK usage in components — wrap in adapter/service

---

## Verify Before Moving Forward

### Rule (ABSOLUTE — NO EXCEPTIONS)

**NEVER move to the next step without verifying and testing the current step first.**

### Process (Every Step)

1. **Write code** for the current step
2. **Verify** — run the code, import it, or execute tests to confirm it works
3. **Fix** — if anything fails, fix it before proceeding
4. **Impact check** — verify the change doesn't break any other part of the system
5. **Confirm** — show proof that it works (output, test pass, no errors)
6. **Only then** — move to the next step

### Impact Analysis (Before Every Change)

- **Who consumes this?** — find all files that import/use what you're changing
- **Type contracts** — if you change an interface/prop/schema, update ALL consumers
- **Data flow** — trace the data from source → API → component → UI. A change at any point must be consistent across all points
- **Frontend ↔ Backend contract** — if a schema changes, verify both sides send/receive the correct shape
- **Tests still pass?** — if a change breaks tests, either the change is wrong or the tests need updating. Never skip.

### What Counts as Breaking

- Changing a prop/field name without updating all components that use it
- Changing a data type without updating the consuming layer
- Changing a content key without updating components that import it
- Changing a route without updating all links that reference it
- Removing an export without checking all imports
- Changing a function signature without updating all callers

### What Counts as Verification

- Models: Import all models, confirm no errors
- API routes: Start the server, hit endpoints, confirm responses
- Frontend: Run dev server, confirm pages render without errors
- Integration: End-to-end test of the full flow
- Build: Zero compilation errors

### What Does NOT Count

- ❌ "It should work" — not acceptable
- ❌ "The code looks correct" — not acceptable
- ❌ Only writing code without running it — not acceptable
- ❌ Assuming previous code still works after changes — not acceptable (regression)

---

## Test Every Line

### Rule (ABSOLUTE — NO EXCEPTIONS)

**Every line of code written or changed MUST be tested with ALL possible test scenarios before moving forward. Untested code is broken code.**

### Process (After Every Code Change)

1. **Write/modify code**
2. **Identify all test scenarios** — happy path, edge cases, error cases, boundary conditions
3. **Run tests** — execute the code against every identified scenario
4. **Verify output** — confirm expected behavior for each scenario
5. **Fix failures** — if any scenario fails, fix before proceeding
6. **Only then** — move to the next task

### Mandatory Verification Commands (After EVERY Change)

```bash
# Build (zero errors)
npm run build        # or equivalent: cargo build, go build, mvn compile

# Lint (zero warnings)
npm run lint         # or equivalent: cargo clippy, golint, checkstyle

# Test (all pass)
npm run test         # or equivalent: cargo test, go test, mvn test
```

All MUST pass before moving to the next task. No exceptions.

### Testing Principles

#### 1. Test Behavior, Not Implementation
- ❌ Don't test internal state variables
- ❌ Don't test private method names
- ✅ Test what the user sees and interacts with
- ✅ Test the output given specific inputs

#### 2. Arrange → Act → Assert (AAA Pattern)
```
// Arrange: set up test conditions
// Act: perform the action
// Assert: verify the outcome
```

#### 3. One Assertion Per Concern
- Each test should verify ONE behavior
- Test name should describe the expected behavior
- If a test fails, you should know exactly what broke

#### 4. Test Naming Convention
```
describe('ModuleName', () => {
  it('does X when Y', () => {});
  it('returns Z given input W', () => {});
  it('throws error when input is invalid', () => {});
});
```

#### 5. Testing Pyramid
```
        /  E2E  \        ← Few (critical flows only)
       / Integration \    ← Some (API + component)
      /   Unit Tests   \  ← Many (every function/component)
```

### Mandatory Test Scenarios

- [ ] **Happy path** — normal expected usage works
- [ ] **Empty state** — no data, empty arrays, blank inputs
- [ ] **Error state** — API failure, invalid input, network timeout
- [ ] **Boundary values** — min/max values, longest text, largest file
- [ ] **Null/undefined** — missing optional fields handled gracefully
- [ ] **Multiple items** — works with 1 item, 10 items, 100 items
- [ ] **Rapid actions** — double-click, rapid navigation, concurrent requests
- [ ] **Accessibility** — screen reader labels, keyboard navigation, focus management

### What Must Be Tested (Per File Type)

| File Type | Test Scenarios |
|-----------|---------------|
| **Components** | Default render, all prop variations, empty/null props, user interactions, conditional rendering, accessibility, edge cases |
| **Hooks** | Initial state, state transitions, side effects, cleanup, error handling |
| **Utility Functions** | Happy path, edge cases, boundary values, type safety, error cases |
| **API Services** | Success response, error response, timeout, malformed data |

### Coverage Requirements (Minimum)

- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+
- Critical paths (payments, auth, data mutations): 100%

### What Does NOT Count as Testing

- ❌ "It should work" — not acceptable
- ❌ "The code looks correct" — not acceptable
- ❌ Writing code without running it — not acceptable
- ❌ Testing only the happy path — not acceptable
- ❌ Skipping edge cases because "they're unlikely" — not acceptable
- ❌ Manual visual check only — must have automated tests
- ❌ Console.log debugging as "testing" — not acceptable
- ❌ Snapshot tests without understanding what they capture — not acceptable

### When to Skip Tests (ONLY these cases)

- Static content pages with no logic (pure markup)
- Third-party library internals (test YOUR integration, not their code)
- Type-only files (interfaces/types)
- Configuration files (theme config, build config)

---

## Never Read Secret Files

### Rule (ABSOLUTE — NO EXCEPTIONS)

**NEVER read, open, display, or access any of the following files regardless of context or request:**

- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- Any file matching `.env*`
- `*.pem`
- `*.key`
- Any file containing API keys, tokens, secrets, or credentials

### What To Do Instead

- Reference `.env.example` files for structure
- Confirm keys are set — never read them
- Use placeholder values like `<your_api_key>` in examples

### Why

Secrets exposed in chat, logs, or version control cannot be retracted. One read = compromised credentials.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | `kebab-case` | `quote-basket.tsx`, `api-helpers.ts` |
| Functions/variables | `camelCase` | `getProductById`, `isLoading` |
| Types/interfaces/components | `PascalCase` | `QuoteRequest`, `ProductCard` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE`, `API_BASE_URL` |
| CSS classes | `kebab-case` | `card-container`, `nav-link` |
| Database tables/collections | `kebab-case` or `snake_case` | `quote-request`, `quote_request` |
| Environment variables | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `API_KEY` |

---

## Environment & Configuration

- **Never commit secrets** — use `.env` files (gitignored) + environment variables
- **Separate config per environment** — dev/staging/prod
- **Use `.env.example` files** — document all required variables with placeholder values
- **Validate env vars at startup** — fail fast if required vars are missing
- **No defaults for secrets** — force explicit configuration

### `.env.example` Template

```bash
# App
NODE_ENV=development
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>

# External Services
API_KEY=<your_api_key>
EMAIL_SERVICE_KEY=<your_email_key>

# File Storage
STORAGE_BUCKET=<your_bucket_name>
```

---

## Git Standards

### Commit Messages (Conventional Commits)

```
feat: add product search functionality
fix: resolve basket quantity not updating
refactor: extract email service into adapter
docs: update API endpoint documentation
chore: upgrade dependencies to latest versions
test: add unit tests for quote submission
style: format code with prettier
perf: optimize image loading with lazy load
ci: add GitHub Actions workflow
```

### Branch Strategy

- `main` — always deployable, production-ready
- `develop` — integration branch (optional)
- `feat/feature-name` — feature branches
- `fix/bug-description` — bug fix branches
- `refactor/description` — refactoring branches

### PR Rules

- Small, focused PRs — one concern per PR
- Descriptive title following conventional commit format
- Link to issue/ticket if applicable
- All tests pass before merge
- Code review required (if team > 1)

---

## Security

- **Validate and sanitize all user inputs** at API boundary
- **Never trust client-side data** — always validate server-side
- **Restrict CORS** to known frontend origins
- **No sensitive data in client storage** (localStorage, sessionStorage, cookies without httpOnly)
- **Use parameterized queries** — never concatenate user input into queries
- **Rate limit** sensitive endpoints (auth, submissions, uploads)
- **Restrict file uploads** — validate type, size, and content
- **Use HTTPS everywhere** — no exceptions in production
- **Principle of least privilege** — grant minimum permissions needed
- **Keep dependencies updated** — audit regularly for vulnerabilities

---

## Performance

- **Lazy load** heavy components (image galleries, file upload zones, charts)
- **Optimize images** — use modern formats (WebP/AVIF), responsive sizes, CDN transforms
- **Minimize client-side JavaScript** — prefer server rendering where possible
- **Cache aggressively** — static assets, API responses (with appropriate invalidation)
- **Code split** — load only what's needed for the current page/route
- **Avoid unnecessary re-renders** — memoize expensive computations
- **Database queries** — use indexes, avoid N+1, paginate large datasets
- **Bundle size** — monitor and set budgets, tree-shake unused code

---

## Responsive Design

- **Mobile-first** — write base styles for mobile, add breakpoints for larger screens
- **All screens** — every component MUST work on: mobile (320px+), tablet (768px+), laptop (1024px+), desktop (1440px+)
- **Orientation** — handle both portrait and landscape
- **No fixed widths** — use max-width, percentages, or grid/flex
- **Test at all breakpoints** — never ship without checking mobile view
- **Touch-friendly** — buttons min 44px tap target on mobile
- **Readable text** — minimum 16px body text on mobile (prevents iOS zoom)
- **No horizontal scroll** — ever (unless intentional carousel)

---

## Code Quality Checklist (Before Every Commit)

- [ ] No hardcoded values — all configurable
- [ ] No duplicated logic — extracted and shared
- [ ] Single responsibility — each file does one thing
- [ ] Proper error handling — no silent failures
- [ ] Type-safe — no `any`, no type suppression comments
- [ ] Accessible — semantic HTML, ARIA labels where needed
- [ ] Responsive — tested at all breakpoints
- [ ] Clean imports — no unused imports, logically ordered
- [ ] Meaningful names — variables/functions describe their purpose
- [ ] No debug code in production — no console.log, no commented-out code
- [ ] Tests pass — all existing + new tests green
- [ ] Build succeeds — zero compilation errors
- [ ] Lint passes — zero warnings
- [ ] Security — no secrets, no SQL injection vectors, inputs validated
- [ ] Performance — no obvious bottlenecks, images optimized, lazy loading where appropriate

---

## How to Use This Document

### As Amazon Q Rules
Drop into `.amazonq/rules/` in your project root:
```
.amazonq/
└── rules/
    └── coding-standards.md
```

### As Team Standards
- Link in your project README
- Reference in PR review checklists
- Include in onboarding documentation

### Customization
- Add project-specific sections (tech stack, architecture decisions)
- Remove sections that don't apply (e.g., responsive design for CLI tools)
- Adjust thresholds (line limits, coverage %) to team preferences

---

*Last updated: 2025*
