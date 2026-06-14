---
inclusion: manual
---

# API Endpoints

## Public (Frontend consumption)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/categories?populate=*` | List all categories with subcategories |
| GET | `/api/subcategories?filters[category][slug]=$slug&populate=*` | Get subcategories by category |
| GET | `/api/products?filters[subcategory][slug]=$slug&populate=*` | List products in subcategory |
| GET | `/api/products?filters[featured]=true&populate=*` | Featured products for homepage |
| GET | `/api/products/:slug` | Single product detail |
| POST | `/api/quote-requests` | Submit a quotation request |

## Admin
Strapi admin panel handles all owner-side CRUD — no custom admin API needed for V1.

## Quote Number Generation
- Format: `HW-YYYYMMDD-XXXX` (e.g. `HW-20250115-0042`)
- Generated server-side via Strapi lifecycle hook on `quote-request` beforeCreate

## Notifications (triggered on quote submission)
1. Email to owner — new quote alert with summary (Resend)
2. Email to customer — confirmation of receipt (Resend)

## File Upload Flow
1. Customer selects file(s) on frontend
2. Frontend uploads directly to Cloudinary (unsigned preset)
3. Cloudinary returns URL
4. URL stored in quote basket state
5. On submission, URLs sent to Strapi with the quote request
