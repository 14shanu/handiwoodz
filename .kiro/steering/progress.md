---
inclusion: manual
---

# Project Progress

## Current Status: Backend Live → CI/CD & Infra Migration Next

### Completed
- Developer Requirements Document (V1.0)
- UI Design Prompts (all 8 screens)
- Next.js 14 project setup (frontend)
- Tailwind CSS configuration
- Content layer (`lib/content/`) — all 8 content files + SEO
- Data layer (`lib/data/mock/` + `lib/api/`)
- Shared layout components (Navbar, Footer, WhatsApp float)
- All pages implemented (Home, Catalog, Subcategory, Product, Quote Basket, Custom Design, Our Story, Wholesale)
- useQuoteBasket hook (localStorage CRUD)
- Form validation (Zod schema)
- Toast notifications (sonner)
- SEO optimization (generateMetadata, JSON-LD, sitemap, robots)
- 105 unit tests passing (14 test suites)
- Strapi v5 project setup (backend)
- PostgreSQL database configuration
- All content types created in Strapi
- Cloudinary plugin + file upload integration
- Cloudinary folder-driven catalog sync
- Bulk import endpoint
- API permissions configured
- Frontend connected to Strapi API
- Deployment (Vercel frontend + Railway backend)

### In Progress
- Fix catalog sync (delete duplicates, re-run)
- Verify all 2100 products correctly linked

### Not Started
- CI/CD Pipeline (GitHub Actions)
- Staging Environment (Render + Neon)
- Production Cutover (Railway → Render + Neon)
- Lifecycle hooks (quote number generation, email triggers)
- Email notifications (Resend)

## Known Decisions
- V1 uses Strapi admin panel as owner dashboard
- No authentication for customers in V1
- No online payments in V1
- Catalog sync creates products as published directly
- Deleted Cloudinary files → product unpublished (not deleted)
- Render free tier kept alive via UptimeRobot ping every 10 min
- Neon DB branching for staging
