# Project Progress

## Current Status: Frontend Feature-Complete → Backend Next

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

### Not Started (Backend + Integration)
- [ ] Strapi v5 project setup (backend)
- [ ] PostgreSQL database configuration
- [ ] Content type creation in Strapi (all models defined in memory bank)
- [ ] Lifecycle hooks (quote number generation, email triggers)
- [ ] Cloudinary plugin setup + file upload integration
- [ ] Email notifications (Resend — customer confirmation + owner alert)
- [ ] API permissions (public role configuration)
- [ ] Connect frontend to Strapi API (swap mock → real in `lib/api/`)
- [ ] Deployment (Vercel frontend + Railway backend)

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

## Active Concerns / Open Questions
- Strapi v5 compatibility with plugins (verify before selecting)
- Cloudinary unsigned preset security considerations
- Railway free tier limits for production use
