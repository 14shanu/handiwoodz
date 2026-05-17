# Handiwoodz — Developer Requirement Document
## Version 1.0

---

## 1. System Overview

A catalog-led, quotation-based website with custom design upload and a simple owner-side quote dashboard.

**Core Flow:** Browse → Select → Add Details → Request Quotation

---

## 2. Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS | Vercel (free tier) |
| CMS/Backend | Strapi v5 | Railway ($5 free credit/mo) |
| Database | PostgreSQL | Railway (same project) |
| File Storage | Cloudinary | Free tier |
| Email | Resend.com | Free tier (100/day) |
| WhatsApp | wa.me deep links | No cost |

---

## 3. Data Models (Strapi Content Types)

### 3.1 Category
```
Collection Type: category
Fields:
  - name          : Text (required, unique)
  - slug          : UID (from name)
  - description   : Text (optional)
  - image         : Media (single)
  - subcategories : Relation (has many → Subcategory)
```

### 3.2 Subcategory
```
Collection Type: subcategory
Fields:
  - name       : Text (required)
  - slug       : UID (from name)
  - category   : Relation (belongs to → Category)
  - products   : Relation (has many → Product)
```

### 3.3 Product
```
Collection Type: product
Fields:
  - name            : Text (required)
  - slug            : UID (from name)
  - images          : Media (multiple)
  - shortDescription: Text
  - subcategory     : Relation (belongs to → Subcategory)
  - sizeOptions     : JSON
      Example: ["3x3 inch", "4x4 inch", "6x6 inch", "Custom"]
  - filters         : Component (repeatable → ProductFilter)
  - minQuantity     : Integer (default: 1)
  - featured        : Boolean (default: false)
```

### 3.4 ProductFilter (Component)
```
Component: product.filter
Fields:
  - filterName  : Enumeration [size, style, woodType, colorCount, craftType, shape, theme]
  - filterValue : Text
```

### 3.5 QuoteRequest
```
Collection Type: quote-request
Fields:
  - quoteNumber     : Text (auto-generated, unique)
  - status          : Enumeration [new, under_review, need_more_info, quote_sent, approved, in_production, dispatched, closed]
  - customerName    : Text (required)
  - email           : Email (required)
  - whatsapp        : Text (required)
  - country         : Text
  - companyName     : Text
  - generalNotes    : RichText
  - catalogItems    : Component (repeatable → QuoteItem)
  - customDesigns   : Component (repeatable → CustomDesign)
  - internalNotes   : RichText (private, admin only)
  - quotedAmount    : Decimal
  - leadTime        : Text
  - paymentTerms    : Text
  - shippingNotes   : Text
  - createdAt       : DateTime (auto)
```

### 3.6 QuoteItem (Component)
```
Component: quote.item
Fields:
  - product      : Relation (has one → Product)
  - selectedSize : Text
  - quantity     : Integer (required, min: 1)
  - notes        : Text
```

### 3.7 CustomDesign (Component)
```
Component: quote.custom-design
Fields:
  - file          : Media (single)
  - designName    : Text
  - productType   : Enumeration [printing_block, logo_block, wall_plate, pichwai, other]
  - width         : Decimal
  - height        : Decimal
  - unit          : Enumeration [inch, cm]
  - colorCount    : Enumeration [single, two, three, multicolor, not_sure]
  - quantity      : Integer (required, min: 1)
  - notes         : Text
```

---

## 4. API Endpoints

Strapi auto-generates REST APIs. Key endpoints:

### Public (Frontend consumption)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/categories?populate=*` | List all categories with subcategories |
| GET | `/api/subcategories?filters[category][slug]=$slug&populate=*` | Get subcategory by category |
| GET | `/api/products?filters[subcategory][slug]=$slug&populate=*` | List products in subcategory |
| GET | `/api/products?filters[featured]=true&populate=*` | Featured products for homepage |
| GET | `/api/products/:slug` | Single product detail |
| POST | `/api/quote-requests` | Submit a quotation request |

### Admin (Owner dashboard — Strapi Admin Panel)
Strapi admin panel handles all owner-side CRUD operations out of the box:
- View/filter quote requests
- Update status
- Add internal notes, pricing, lead time
- View uploaded files

---

## 5. Frontend Pages

### 5.1 Home (`/`)
- Hero section with brand story
- Featured products grid (4-8 items)
- Category cards
- CTA: "Request a Quote" / "Upload Your Design"

### 5.2 Catalog (`/catalog`)
- Category grid view
- Click → shows subcategories

### 5.3 Subcategory (`/catalog/[category]/[subcategory]`)
- Product grid with filters sidebar
- Filters: size, style, woodType, colorCount, craftType, shape, theme
- Each product card: image, name, "Add to Quote Basket" button

### 5.4 Product Detail (`/catalog/[category]/[subcategory]/[product]`)
- Product images (gallery)
- Name, description
- Size selector (dropdown/chips)
- Quantity input
- "Add to Quote Basket" button
- "Customize This Design" link → goes to upload page
- "Ask on WhatsApp" → wa.me link

### 5.5 Custom Design Upload (`/custom-design`)
- File upload zone (drag & drop, multiple files)
- For each uploaded file, show a design card with fields:
  - Design Name
  - Product Type (dropdown)
  - Width + Height + Unit
  - Number of Colors (dropdown)
  - Quantity
  - Notes
- Customer contact section at bottom
- "Request Custom Quotation" button
- "Discuss on WhatsApp" secondary button

### 5.6 Quote Basket (`/quote-basket`)
- List of added catalog items (image, name, size, quantity, notes, remove button)
- Section for uploaded custom designs (if any via mixed flow)
- Customer contact form:
  - Full Name
  - Email
  - WhatsApp Number
  - Country
  - Company Name (optional)
  - Additional Notes
- "Request Quotation" button

### 5.7 Our Story (`/our-story`)
- Static content page (managed via Strapi single type)

### 5.8 Wholesale / Bulk Inquiry (`/wholesale`)
- Brief info about bulk ordering
- Link to catalog + upload page
- Direct WhatsApp CTA

---

## 6. Frontend State Management

### Quote Basket (Client-side)
Store in `localStorage` — no auth needed for V1.

```typescript
interface QuoteBasketItem {
  productId: number
  productName: string
  productImage: string
  selectedSize: string
  quantity: number
  notes: string
}

interface CustomDesignItem {
  fileUrl: string
  fileName: string
  designName: string
  productType: string
  width: number
  height: number
  unit: 'inch' | 'cm'
  colorCount: string
  quantity: number
  notes: string
}

interface QuoteBasket {
  catalogItems: QuoteBasketItem[]
  customDesigns: CustomDesignItem[]
}
```

---

## 7. File Upload Flow

1. Customer selects file(s) on frontend
2. Frontend uploads to Cloudinary (direct upload via unsigned preset)
3. Cloudinary returns URL
4. URL stored in quote basket state
5. On submission, URLs sent to Strapi with the quote request

**Cloudinary Config:**
- Create unsigned upload preset for customer uploads
- Folder: `handiwoodz/custom-designs/`
- Max file size: 10MB
- Allowed formats: jpg, png, pdf, ai, svg

---

## 8. Quote Number Generation

Format: `HW-YYYYMMDD-XXXX`

Example: `HW-20250115-0042`

Generated server-side in Strapi via lifecycle hook on `quote-request` beforeCreate.

---

## 9. Notifications

### On new quote request:
1. **Email to owner** — via Resend (new quote alert with summary)
2. **Email to customer** — confirmation that quote request was received
3. **Optional:** WhatsApp notification to owner (via wa.me link in email)

### On quote sent:
1. **Email to customer** — with quote details (or PDF attachment)

---

## 10. Owner Dashboard

**Use Strapi Admin Panel directly for V1.**

No custom admin UI needed. Strapi provides:
- List view with filters (by status, date)
- Detail view of each quote request
- Inline editing (status, internal notes, pricing)
- Media preview for uploaded designs

### Custom additions to Strapi Admin:
- Custom view component to display quote summary nicely (optional, V2)
- PDF generation plugin (optional, V2)

---

## 11. WhatsApp Integration

Simple `wa.me` links with pre-filled messages.

```
Product inquiry:
https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in [Product Name] ([Size]). Quote request.

General:
https://wa.me/91XXXXXXXXXX?text=Hi, I'd like to discuss a custom order.
```

---

## 12. SEO & Performance

- Next.js static generation (SSG) for catalog pages
- Dynamic `generateMetadata` for product pages
- Image optimization via Next.js Image + Cloudinary transforms
- Sitemap generation
- Open Graph tags for social sharing

---

## 13. Filters Implementation

Filters are applied client-side on the subcategory page using URL search params.

```
/catalog/printing-blocks/hand-carved?size=4x4&woodType=teak&shape=square
```

Product filtering logic runs on the Strapi query level:
```
GET /api/products?filters[subcategory][slug]=hand-carved&filters[filters][filterName]=size&filters[filters][filterValue]=4x4
```

---

## 14. Deployment Checklist

### Railway (Strapi + PostgreSQL)
- [ ] Create project on railway.app
- [ ] Add PostgreSQL plugin (auto-provisions DB)
- [ ] Add web service from Git repo (root directory: /backend)
- [ ] Railway auto-injects DATABASE_URL for linked Postgres
- [ ] Set env vars: CLOUDINARY_*, RESEND_API_KEY, ADMIN_JWT_SECRET, APP_KEYS, JWT_SECRET
- [ ] Deploy

### Cloudinary
- [ ] Create account
- [ ] Create unsigned upload preset
- [ ] Note cloud name + preset name

### Vercel (Frontend)
- [ ] Connect Git repo
- [ ] Set env var: NEXT_PUBLIC_STRAPI_URL, NEXT_PUBLIC_CLOUDINARY_*
- [ ] Deploy

### Resend
- [ ] Create account
- [ ] Verify domain or use free tier with resend.dev
- [ ] Get API key

---

## 15. Version 1 Scope Boundaries

### In Scope:
- Category/subcategory/product catalog
- Product filters
- Quote basket (localStorage)
- Custom design upload
- Quote request submission
- Owner views requests in Strapi admin
- Email notifications (basic)
- WhatsApp links
- Responsive design

### Out of Scope (V2+):
- Online payment
- User accounts / login
- Order tracking for customers
- PDF quote generation
- Automated pricing
- Inventory management
- Multi-language support
- Custom admin dashboard (beyond Strapi)

---

## 16. Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.up.railway.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=handiwoodz-uploads
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host/dbname  # Auto-injected by Railway
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-key
CLOUDINARY_SECRET=your-secret
RESEND_API_KEY=re_xxxxxxxxx
ADMIN_JWT_SECRET=random-secret
APP_KEYS=key1,key2
JWT_SECRET=random-secret
```

---

## 17. Development Workflow

```bash
# Backend
cd backend
npm install
npm run develop    # Strapi dev server on :1337

# Frontend
cd frontend
npm install
npm run dev        # Next.js dev server on :3000
```

---

## 18. Operations Commands

### Cloudinary Sync
Syncs all Cloudinary images into Strapi's media library with proper thumbnails.

```bash
# Normal sync (adds new files, removes deleted, skips existing)
curl -X POST "https://api.handiwoodz.com/api/cloudinary-sync" \
  -H "x-sync-secret: YOUR_SYNC_SECRET"

# Force re-sync (deletes all media records, re-syncs everything with thumbnails)
# Use this if thumbnails are broken or after first deploy
curl -X POST "https://api.handiwoodz.com/api/cloudinary-sync?force=true" \
  -H "x-sync-secret: YOUR_SYNC_SECRET"

# Sync specific folder only
curl -X POST "https://api.handiwoodz.com/api/cloudinary-sync?folder=handiwoodz/products" \
  -H "x-sync-secret: YOUR_SYNC_SECRET"
```

**Note:** Sync runs async in background. Check Railway logs for progress.

**Automatic sync:**
- Runs on every server startup (30s delay)
- Runs daily at 2:00 AM (if `CRON_ENABLED=true`)

### Bulk Import (Excel)

```bash
# Upload via API
curl -X POST "https://api.handiwoodz.com/api/bulk-import" \
  -H "x-sync-secret: YOUR_SYNC_SECRET" \
  -F "file=@your-catalog.xlsx"

# Or use the web UI
https://api.handiwoodz.com/import.html
```

**Excel format:** 3 sheets — `Categories`, `Subcategories`, `Products`
**Template:** Download from `https://api.handiwoodz.com/catalog-template.xlsx`

### Database Backup

```bash
# Export from Railway Postgres
pg_dump "YOUR_RAILWAY_DATABASE_URL" > backup-$(date +%Y%m%d).sql

# Restore to another Postgres
psql "NEW_DATABASE_URL" < backup-20260517.sql
```

---

*Document created: Ready for implementation.*
