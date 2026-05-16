# Tech Stack & Architecture

## Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS | Vercel (free tier) |
| CMS/Backend | Strapi v5 | Railway ($5 free credit/mo) |
| Database | PostgreSQL | Railway (same project) |
| File Storage | Cloudinary | Free tier |
| Email | Resend.com | Free tier (100/day) |
| WhatsApp | wa.me deep links | No cost |

## Architecture Decisions
- **App Router** (not Pages Router) — Next.js 14 convention
- **SSG** for catalog pages — performance + SEO
- **No auth in V1** — quote basket is localStorage only
- **Strapi admin panel** as owner dashboard — no custom admin UI
- **Cloudinary direct upload** — unsigned preset, no server proxy needed
- **Client-side filtering** with URL search params on subcategory pages

## Project Structure (Planned)
```
/Handiwoodz
├── /docs                  # Requirements & documentation
├── /frontend              # Next.js 14 app
│   ├── /app               # App Router pages
│   ├── /components        # Reusable UI components
│   ├── /lib               # Utilities, API helpers, types
│   └── /public            # Static assets
└── /backend               # Strapi v5 project
    ├── /src
    │   ├── /api           # Content types & controllers
    │   └── /components    # Strapi components
    └── /config            # Strapi config (database, plugins)
```

## Key Integrations
- **Cloudinary**: Unsigned upload preset, folder `handiwoodz/custom-designs/`, max 10MB, formats: jpg/png/pdf/ai/svg
- **Resend**: Quote confirmation to customer + alert to owner
- **WhatsApp**: Pre-filled wa.me links for product inquiries and custom orders
