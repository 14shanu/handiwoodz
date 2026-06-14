---
inclusion: always
---

# Coding Standards — Handiwoodz

## General Principles
- **Separation of Concerns**: Each module/file does ONE thing well
- **Interface-first**: Define contracts (types/schemas) before implementation
- **Fail fast**: Validate inputs at boundaries, not deep inside logic
- **DRY (Don't Repeat Yourself)**: Never duplicate logic — extract, reuse, share
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **KISS (Keep It Simple, Stupid)**: Simplest solution that works — no over-engineering
- **YAGNI (You Aren't Gonna Need It)**: Don't build features/abstractions until actually needed
- **Clean Code**: Self-documenting, intention-revealing names

## Zero Hardcoding (ABSOLUTE RULE)

### What MUST Be Configurable
- URLs & endpoints → environment variables or `lib/constants/`
- Colors, fonts, spacing → `tailwind.config.ts` only
- Labels, text, copy → `lib/content/` or CMS-driven
- Feature toggles → `lib/constants/features.ts`
- Limits & thresholds → constants
- API keys, secrets → `.env` files only
- Business rules → config objects
- WhatsApp number, email addresses → environment variables

### Single File Change Principle
- Changing a color → update ONE file (`tailwind.config.ts`)
- Changing an API URL → update ONE file (`.env` or constants)
- Changing a label → update ONE file (`lib/content/`)
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

### What Goes in `lib/content/` (Client-Editable)
- Headings, titles, descriptions, body copy
- Button labels & CTAs
- Marketing copy, taglines, value propositions
- Navigation labels, footer content
- Form labels & placeholders
- Error/success messages, empty states

### What STAYS in `lib/constants/` (Developer-Only)
- Routes (structural, not content)
- Limits & thresholds (business logic)
- Feature flags
- API paths (technical)
- Enum values (structural)

### The Test
> "If a client says 'change this text', can I do it by editing ONE file in `lib/content/` without touching any component?"

## Component Rules
- ONE component per file
- Max 150 lines per component — split if larger
- Always build reusable — accept props for customization
- Composition over inheritance — use children/slots
- Singleton layout components → import content directly
- Reusable components → receive data via props

## Frontend (Next.js 14 / TypeScript)
- Use TypeScript strict mode — no `any` types
- Server components by default; client only when needed
- All API calls in `lib/api/` — never fetch in components
- Zod for form validation
- Next.js Image with Cloudinary loader for all images
- Mobile-first responsive design (320px+ to 1440px+)
- Tailwind classes exclusively — no inline styles

## Backend (Strapi v5)
- Content types via Strapi schema (JSON)
- Custom logic in lifecycle hooks
- Keep controllers thin — delegate to services
- Use Entity Service API — never raw SQL
- Environment variables for all secrets

## Naming
- Files: `kebab-case`
- TypeScript: `camelCase` for functions/variables, `PascalCase` for types/components
- Constants: `UPPER_SNAKE_CASE`
- Strapi content types: `kebab-case`
- Git: Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)

## Anti-Patterns
- ❌ Text strings inside JSX
- ❌ Copy-pasting functions — use parameters
- ❌ God components (500+ lines)
- ❌ Business logic in UI components
- ❌ Magic numbers/strings
- ❌ `any` types or `@ts-ignore`
- ❌ console.log in production code
