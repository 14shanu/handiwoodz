# HARD RULE: Coding Standards — Handiwoodz

## Rule (ABSOLUTE — NO EXCEPTIONS)

**Every line of code written for this project MUST follow these standards. Violations are not acceptable — fix before committing.**

## General Principles
- **Separation of Concerns**: Each module/file does ONE thing well
- **Interface-first**: Define contracts (types/schemas) before implementation
- **Fail fast**: Validate inputs at boundaries, not deep inside logic
- **DRY (Don't Repeat Yourself)**: Never duplicate logic — extract, reuse, share
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **KISS (Keep It Simple, Stupid)**: Simplest solution that works — no over-engineering
- **YAGNI (You Aren't Gonna Need It)**: Don't build features/abstractions until actually needed
- **Clean Code**: Code should read like well-written prose — self-documenting, intention-revealing names

## Zero Hardcoding (ABSOLUTE RULE)

### What MUST Be Configurable
- **URLs & endpoints** → environment variables or `lib/constants/`
- **Colors, fonts, spacing** → `tailwind.config.ts` only
- **Labels, text, copy** → constants file or CMS-driven
- **Feature toggles** → `lib/constants/features.ts`
- **Limits & thresholds** (max file size, min quantity, pagination) → constants
- **API keys, secrets** → `.env` files only
- **Business rules** (quote number format, allowed file types) → config objects
- **Breakpoints & layout values** → Tailwind config
- **WhatsApp number, email addresses** → environment variables

### Single File Change Principle
- Changing a color → update ONE file (`tailwind.config.ts`) → entire app updates
- Changing an API URL → update ONE file (`.env` or constants) → all calls update
- Changing a label → update ONE file (constants) → all instances update
- Changing business logic → update ONE service/utility → all consumers update
- If a change requires editing 2+ files for the same concern → refactor immediately

### Configuration Hierarchy
```
.env                    → secrets, URLs, environment-specific values
tailwind.config.ts      → all visual design tokens
lib/content/            → ALL user-facing text (client-editable)
lib/constants/index.ts  → structural constants (routes, limits)
lib/constants/api.ts    → API paths and query params
lib/constants/config.ts → business rules and feature config
lib/data/mock/          → mock data (swapped for API later)
lib/api/                → data fetchers (abstracts source)
```

## Content Separation (ABSOLUTE RULE)

### Principle
**Every piece of user-facing text that a client could reasonably want to change MUST live in `lib/content/` — NEVER inside components, constants, or code.**

### What Goes in `lib/content/` (Client-Editable)
- **Headings & titles** — page titles, section headings
- **Descriptions & body copy** — brand descriptions, subtitles, paragraphs
- **Button labels & CTAs** — "Browse Catalog", "Upload Design", "Add to Quote"
- **Marketing copy** — taglines, value propositions, trust statements
- **Section content** — trust items, process steps, stats/numbers
- **Navigation labels** — "Catalog", "Our Story", "Wholesale"
- **Footer content** — brand description, section headings, copyright text
- **Form labels & placeholders** — "Full Name", "Enter your email..."
- **Error/success messages** — "Quote submitted successfully"
- **Empty states** — "Your basket is empty", "No products found"

### What STAYS in `lib/constants/` (Developer-Only)
- **Routes** — `/catalog`, `/quote-basket` (structural, not content)
- **Limits & thresholds** — max file size, min quantity (business logic)
- **Feature flags** — enable/disable features
- **API paths** — endpoint URLs (technical)
- **Enum values** — filter names, status codes (structural)

### Content File Structure
```
lib/content/
├── homepage.ts      → hero, categories, featured, CTA, trust sections
├── shared.ts        → nav labels, footer, common buttons, tagline
├── catalog.ts       → catalog page headings, filter labels, empty states
├── product.ts       → product detail labels, size selector text
├── quote-basket.ts  → basket page headings, form labels, submit text
├── custom-design.ts → upload page headings, form labels
├── wholesale.ts     → wholesale page content
└── our-story.ts     → brand story content
```

### Rules
1. **Singleton layout components** (Navbar, Footer) → import from `lib/content/` directly
2. **Reusable/data-driven components** → receive data via props
3. **Page-specific sections used once** → can import content directly
4. **Components used across multiple pages** → receive content via props
5. **Page-level server components** fetch data and pass down as props
6. **One content file per page** + one shared file for cross-page content
7. **Typed exports** — every content file exports a typed object
8. **Client handoff** — client edits content files, developer deploys
9. **Future-proof** — same structure maps to Strapi Single Types later

### The Test
> "If a client says 'change this text', can I do it by editing ONE file in `lib/content/` without touching any component?"
>
> If YES → correct architecture.
> If NO → refactor immediately.

### Import vs Props Decision
> - Component exists **once** in the app (Navbar, Footer) → **import** content directly
> - Component is **reusable** with different data → **props** for data, import for fixed labels
> - Component receives **dynamic data** (from API/mock) → always **props**
> - When in doubt → if it's a singleton, import; if it could be reused, props

### Anti-Patterns
- ❌ Text strings inside JSX: `<h1>Welcome to our store</h1>`
- ❌ Content in constants: `HOMEPAGE.HERO_TITLE = "Welcome"`
- ❌ Content in component files: `const HEADING = "Our Products"`
- ❌ Mixed concerns: content + routes + limits in same file
- ✅ Content in `lib/content/`: `export const homepageContent = { hero: { title: "..." } }`
- ✅ Component receives via props: `<Hero title={content.hero.title} />`

## Reusability Standards (MANDATORY)

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
- Used in 2+ places → extract immediately
- File exceeds 150 lines → split into sub-modules
- Function has 3+ responsibilities → break apart
- Component accepts 10+ props → split into composed sub-components
- Logic is conditional on environment → extract to config

## Code Reuse Rules (CRITICAL)

### Industry Standard Patterns
- **Factory pattern** — for creating objects with complex setup (e.g., API client instances)
- **Strategy pattern** — for swappable behaviors (e.g., different notification channels)
- **Observer pattern** — for event-driven side effects (Strapi lifecycle hooks)
- **Adapter pattern** — for wrapping third-party APIs (Cloudinary, Resend) behind a clean interface
- **Repository pattern** — for abstracting data access behind a consistent API

### Before Writing ANY New Code
1. **Search first**: Check if a service, utility, component, or function already exists that does what you need
2. **Extend, don't duplicate**: If existing code does 80% of what you need, extend it with a parameter/option — don't copy-paste and modify
3. **Extract shared logic**: If you find yourself writing similar code in 2+ places, extract it into a shared utility/service immediately

### Frontend Reuse Patterns
- Repeated UI patterns → extract into shared components (`components/ui/`)
- API call patterns (fetch + loading + error) → shared hooks or wrapper in `lib/api/`
- Form validation schemas → shared Zod schemas in `lib/schemas/`
- Layout patterns → reusable layout components, not copy-pasted markup
- Event handlers with similar logic → shared utility functions in `lib/utils/`

### Backend (Strapi) Reuse Patterns
- Shared lifecycle logic → reusable utility functions in `src/utils/`
- Custom controllers that share patterns → base helper functions
- Email templates → reusable template builders
- Validation logic → shared validators in lifecycle hooks

### Anti-Patterns to Avoid
- ❌ Copy-pasting a function and changing one line — use a parameter instead
- ❌ Multiple API call wrappers that differ only in URL — use a generic fetcher
- ❌ Multiple components with identical structure but different data — make it configurable
- ❌ Hardcoded strings/URLs in components — use constants
- ❌ Duplicating Strapi response transforms — use a single normalizer utility
- ❌ Magic numbers/strings anywhere in code — extract to named constants
- ❌ God components (500+ lines doing everything) — decompose
- ❌ Tight coupling between modules — use interfaces/abstractions
- ❌ Business logic in UI components — extract to hooks or services
- ❌ Formatting/transform logic inline — extract to utility functions
- ❌ Repeated conditional rendering patterns — extract to wrapper components
- ❌ Direct third-party SDK usage in components — wrap in adapter/service

## Backend (Strapi v5)

### Structure
- Content types defined via Strapi schema (JSON) — never manual DB changes
- Custom logic in lifecycle hooks (`beforeCreate`, `afterCreate`, etc.)
- Custom controllers only when Strapi defaults aren't enough
- Custom services for complex business logic (e.g., quote number generation, email sending)
- Utilities in `src/utils/` for shared helpers

### Patterns
- Use Strapi's built-in validation (required, unique, min, max) on content type schemas
- Use lifecycle hooks for side effects (auto-generate quote numbers, send emails)
- Use Strapi's plugin system for integrations (Cloudinary, email)
- Keep custom controllers thin — delegate to services
- Use environment variables for all secrets and config (`env()` in Strapi config)

### Database
- PostgreSQL via Strapi's built-in connection (configured in `config/database.js`)
- Never raw SQL — use Strapi's Entity Service API or Query Engine
- Relations defined in content type schemas
- Indexes managed by Strapi automatically

### API Security
- Configure permissions via Strapi's Users & Permissions plugin
- Public role: read-only for categories, subcategories, products; create-only for quote-requests
- Rate limit quote submissions
- Sanitize all inputs via Strapi's built-in sanitization

## Frontend (Next.js 14 / TypeScript)

### Structure (Scalable Folder Architecture)
- Colocate components with their pages when page-specific
- Shared components in `components/ui/` (generic) and `components/domain/` (business)
- All API calls in `lib/api/` — never fetch directly in components
- Types/interfaces in `lib/types/`
- Constants in `lib/constants/` — never hardcode strings/numbers in components
- Hooks in `lib/hooks/` — reusable custom hooks
- Theme config in `tailwind.config.ts`

### Component Rules (CRITICAL)
- **Always build reusable** — every component should accept props for customization
- **Atomic design** — build small primitives first, compose into larger components
- **Never duplicate UI** — if 2+ pages share a pattern, extract it immediately
- **Props over hardcoding** — text, colors, sizes, icons should all be configurable via props
- **Composition over inheritance** — use children/slots, not deep prop chains
- **Max 150 lines per component** — if larger, split into sub-components

### Constants & Configuration
- All user-facing text → `lib/content/` (client-editable content)
- All structural constants → `lib/constants/` (routes, API paths, limits, enums)
- All theme values → `tailwind.config.ts` (colors, spacing, breakpoints)
- All feature flags → `lib/constants/features.ts`
- Never hardcode colors, font sizes, or spacing in components — use Tailwind classes or theme tokens
- Never hardcode user-facing text in components — receive via props from content layer

### Responsive Design (MANDATORY)
- **Mobile-first** — write base styles for mobile, add breakpoints for larger screens
- **All screens** — every component MUST work on: mobile (320px+), tablet (768px+), laptop (1024px+), desktop (1440px+)
- **Orientation** — handle both portrait and landscape
- **Use Tailwind breakpoints** — `sm:`, `md:`, `lg:`, `xl:`, `2xl:` consistently
- **No fixed widths** — use `max-w-*`, `w-full`, percentages, or grid/flex
- **Test at all breakpoints** — never ship without checking mobile view
- **Touch-friendly** — buttons min 44px tap target on mobile

### Theme & Styling
- **Single source of truth** — all theme values in `tailwind.config.ts`
- **CSS variables** — use shadcn's CSS variable system for light/dark mode
- **Configurable from one file** — changing a color in tailwind config should update the entire app
- **No inline styles** — use Tailwind classes exclusively
- **Consistent spacing** — use Tailwind's spacing scale (4, 6, 8, 12, 16, etc.)
- **Dark mode ready** — use `bg-background`, `text-foreground`, etc. (not hardcoded colors)

### Patterns
- Use TypeScript strict mode — no `any` types
- Use server components by default; client components only when needed (interactivity)
- Use React Server Actions or API routes for mutations
- Use Zod for form validation
- Use Next.js Image component with Cloudinary loader for all images

### State
- Server state via React Query / SWR (not local state for API data)
- Quote basket in localStorage via custom hook
- Minimal client state — derive from server data when possible
- No prop drilling beyond 2 levels — use context or composition

## Shared Standards

### Naming
- Files: `kebab-case` (e.g., `quote-basket.tsx`, `api-helpers.ts`)
- TypeScript: `camelCase` for functions/variables, `PascalCase` for types/components
- Constants: `UPPER_SNAKE_CASE`
- Strapi content types: `kebab-case` (e.g., `quote-request`, `custom-design`)

### Environment & Config
- Never commit secrets — use `.env` files (gitignored) + environment variables
- Separate config per environment (dev/staging/prod)
- Use `.env.example` files to document required variables

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Small, focused PRs — one concern per PR
- Keep `main` always deployable

### Performance
- SSG for catalog pages (revalidate on content change)
- Lazy load heavy components (image galleries, file upload zones)
- Next.js Image + Cloudinary transforms for optimized images
- Minimize client-side JavaScript — prefer server components

### Security
- Validate and sanitize all user inputs at API boundary (Strapi handles most)
- Cloudinary unsigned preset restricted to allowed formats/sizes
- CORS restricted to known frontend origins in Strapi config
- No sensitive data in localStorage (quote basket is non-sensitive)

## Code Quality Checklist (Before Every Commit)
- [ ] No hardcoded values — all configurable
- [ ] No duplicated logic — extracted and shared
- [ ] Single responsibility — each file does one thing
- [ ] Proper error handling — no silent failures
- [ ] TypeScript strict — no `any`, no `@ts-ignore`
- [ ] Accessible — semantic HTML, ARIA labels where needed
- [ ] Responsive — tested at all breakpoints
- [ ] Clean imports — no unused imports, sorted alphabetically
- [ ] Meaningful names — variables/functions describe their purpose
- [ ] No console.log in production code — use proper logging or remove
