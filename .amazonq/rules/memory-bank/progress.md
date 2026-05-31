# Project Progress

## Current Status: Backend Live → CI/CD & Infra Migration Next

### Completed
- [x] Developer Requirements Document (V1.0)
- [x] Memory Bank created
- [x] UI Design Prompts (all 8 screens)
- [x] Stitch AI / Figma generated code (visual reference for all pages)
- [x] Next.js 14 project setup (frontend)
- [x] Tailwind CSS configuration (design tokens extracted)
- [x] Content layer (`lib/content/`) — all 8 content files + SEO
- [x] Data layer (`lib/data/mock/` + `lib/api/`) — mock → API abstraction
- [x] Shared layout components (Navbar, Footer, WhatsApp float)
- [x] Reusable UI components (Breadcrumb)
- [x] Homepage implementation (5 sections)
- [x] Catalog page (category grid + CTA)
- [x] Subcategory listing page (product grid)
- [x] Product detail page (gallery + info panel + related)
- [x] Quote basket page (items + form + summary sidebar)
- [x] Custom design upload page (upload zone + design cards)
- [x] Our Story page (narrative + process + stats + CTA)
- [x] Wholesale page (hero + benefits + process + inquiry)
- [x] useQuoteBasket hook (localStorage CRUD)
- [x] Wire "Add to Quote" on product detail → useQuoteBasket
- [x] Wire "Add to Quote" on custom design → useQuoteBasket
- [x] Form validation (Zod schema + QuoteContactForm component)
- [x] Toast notifications (sonner — add to basket, submit success/error)
- [x] Quote submission API call (placeholder, ready for Strapi)
- [x] SEO optimization (generateMetadata, JSON-LD, sitemap, robots)
- [x] 105 unit tests passing (14 test suites)
- [x] Hard rules: coding standards, verify-before-moving, test-every-line, never-read-secrets
- [x] Strapi v5 project setup (backend)
- [x] PostgreSQL database configuration (Railway)
- [x] Content type creation in Strapi (all models)
- [x] Cloudinary plugin setup + file upload integration
- [x] Cloudinary folder-driven catalog sync (auto-creates Categories/Subcategories/Products)
- [x] `cloudinaryPublicId` field on Product (optional, unique, private)
- [x] Catalog sync endpoint (`POST /api/catalog-sync`) with actions: sync, publish-all, delete-products
- [x] Cloudinary media sync (startup + cron)
- [x] On-demand revalidation (frontend `/api/revalidate` + backend lifecycle hook)
- [x] Tag-based caching on all Strapi fetch calls
- [x] 24-hour fallback revalidation
- [x] Bulk import endpoint (`POST /api/bulk-import`)
- [x] Cloudinary sync endpoint (`POST /api/cloudinary-sync`)
- [x] API permissions (public role configuration)
- [x] Connect frontend to Strapi API (swap mock → real in `lib/api/`)
- [x] Deployment (Vercel frontend + Railway backend)

### In Progress
- [ ] Fix catalog sync (delete duplicates, re-run with DB pool fix)
- [ ] Verify all 2100 products correctly linked to subcategories

### Not Started (CI/CD & Infrastructure Migration)
- [ ] Phase 1: CI/CD Pipeline Setup
- [ ] Phase 2: Staging Environment
- [ ] Phase 3: Verify Staging
- [ ] Phase 4: Production Cutover (Railway → Render + Neon)
- [ ] Phase 5: Cleanup

### Not Started (Remaining V1 Features)
- [ ] Lifecycle hooks (quote number generation, email triggers)
- [ ] Email notifications (Resend — customer confirmation + owner alert)

---

## CI/CD & Infrastructure Migration Journey

### Phase 1: CI/CD Pipeline Setup (Zero risk to prod)
**Branch:** `feat/ci-cd-pipeline` off `develop`

1. Create `develop` branch from `main`
2. Create GitHub Actions CI workflow (`ci.yml`):
   - Lint (frontend + backend)
   - Type-check (`tsc --noEmit`)
   - Unit tests (jest)
   - Build check
3. Set branch protection rules:
   - `main`: Require PR, require CI pass
   - `develop`: Require PR, require CI pass
4. Branch strategy:
   - `main` → Production
   - `develop` → Staging/UAT
   - `feat/*` → Feature branches
   - `fix/*` → Bug fixes
   - `hotfix/*` → Emergency prod fixes (PR directly to main)

### Phase 2: Staging Environment (Zero risk to prod)
**Branch:** `feat/render-neon-migration` off `develop`

1. Sign up: Neon (neon.tech) + Render (render.com)
2. Create Neon database (staging branch)
3. Create Render Strapi instance (staging)
4. Configure Vercel staging (branch deploy from `develop`)
5. Set environment variables on Render + Vercel staging
6. Point staging to Neon staging DB
7. Run catalog sync on staging
8. Set up UptimeRobot ping (every 10 min to prevent Render sleep)

### Phase 3: Verify Staging (Zero risk to prod)
1. Run full catalog sync on staging
2. Verify all 2100 products load correctly with subcategory relations
3. Test revalidation flow (publish product → frontend updates)
4. Test quote submission flow
5. Test UptimeRobot keep-alive (confirm no cold starts)
6. Run for a few days to confirm stability

### Phase 4: Production Cutover (~5 min downtime)
1. Create Neon production database
2. Migrate data: Railway PostgreSQL → Neon (`pg_dump` / `pg_restore`)
3. Create Render production Strapi instance
4. Update DNS: `api.handiwoodz.com` → Render (instead of Railway)
5. Update Vercel env vars: `NEXT_PUBLIC_API_URL` → new Render URL
6. Verify everything works
7. Set up UptimeRobot for production
8. Enable deploy-prod GitHub Actions workflow

### Phase 5: Cleanup
1. Decommission Railway project
2. Remove Railway-specific config
3. Update documentation
4. Finalize branch protection rules
5. Enable all GitHub Actions workflows

---

## Infrastructure Target State

| Component | Staging | Production |
|-----------|---------|------------|
| Frontend | Vercel (auto from `develop`) | Vercel (auto from `main`) |
| Backend | Render free instance | Render free instance |
| Database | Neon branch (`staging`) | Neon main branch |
| Cloudinary | Same account | Same account |
| Domain | auto-generated URL | api.handiwoodz.com |
| Keep-alive | UptimeRobot (10 min) | UptimeRobot (10 min) |
| CI/CD | GitHub Actions | GitHub Actions |
| Monitoring | UptimeRobot | UptimeRobot + Sentry (V2) |

---

## GitHub Actions Workflows

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| `ci.yml` | Push to any branch / PR | Lint + type-check + test + build |
| `deploy-staging.yml` | Merge to `develop` | Deploy to Render staging + health check |
| `deploy-prod.yml` | Merge to `main` | Deploy to Render prod + health check + revalidation |
| `sync-catalog.yml` | Manual (workflow_dispatch) | Trigger catalog sync on staging or prod |

---

## Known Decisions
- V1 uses Strapi admin panel as owner dashboard (no custom admin UI)
- No authentication for customers in V1
- No online payments in V1
- PDF generation is V2 scope
- Custom admin view component is V2 scope
- Content layer uses .ts files (client edits, developer deploys)
- Singleton components import content directly; reusable components use props
- Toast via sonner (lightweight, accessible)
- Form validation via Zod (shared schemas)
- Catalog sync creates products as published directly (no draft review step)
- Deleted Cloudinary files → product unpublished (not deleted)
- New Cloudinary folders → auto-create Category/Subcategory
- On-demand revalidation as primary, 24-hour fallback as safety net
- Render free tier kept alive via UptimeRobot ping every 10 min
- Neon DB branching for staging (mirrors prod structure)

## Active Concerns / Open Questions
- Railway free tier costs ($5/mo credit running out)
- Render cold start if UptimeRobot fails (30-50s first request)
- Neon free tier limits (0.5GB storage — monitor as products grow)
- Strapi v5 compatibility with Render (verify Node.js version)
- Cloudinary API rate limits during bulk sync (300 req/100s)
