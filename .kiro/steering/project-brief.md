---
inclusion: always
---

# Project Brief — Handiwoodz

## What is this project?
Handiwoodz is a catalog-led, quotation-based e-commerce website for handcrafted wood products. No cart/checkout — customers browse, add to "quote basket," and submit a quotation request.

## Core Flow
Browse → Select → Add Details → Request Quotation

## Business Model
- B2B/wholesale focused with custom design capabilities
- No online payments in V1 — pricing is manual via owner quotes
- Owner manages quotes through Strapi admin panel

## Key Features
1. Product catalog with categories/subcategories
2. Quote basket (localStorage, no auth)
3. Custom design upload (via Cloudinary)
4. WhatsApp integration (wa.me deep links)
5. Email notifications (Resend.com)
6. Owner dashboard (Strapi admin panel)

## Tech Stack
| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS | Vercel |
| CMS/Backend | Strapi v5 | Render |
| Database | PostgreSQL | Neon |
| File Storage | Cloudinary | Free tier |
| Email | Resend.com | Free tier |
| WhatsApp | wa.me deep links | No cost |

## Architecture Decisions
- App Router (not Pages Router)
- SSG for catalog pages
- No auth in V1
- Strapi admin as owner dashboard
- Cloudinary direct upload (unsigned preset)
- Client-side filtering with URL search params
