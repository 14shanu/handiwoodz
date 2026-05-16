# Frontend Pages & Routing

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, featured products, category cards, CTAs |
| `/catalog` | Category grid view |
| `/catalog/[category]/[subcategory]` | Product grid + filters sidebar |
| `/catalog/[category]/[subcategory]/[product]` | Product detail — gallery, size selector, quantity, add to basket |
| `/custom-design` | File upload zone with design detail cards |
| `/quote-basket` | Review items + customer contact form → submit quote |
| `/our-story` | Static content (Strapi single type) |
| `/wholesale` | Bulk inquiry info + WhatsApp CTA |

## State Management

Quote basket stored in `localStorage` — no auth required.

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

## Filtering
- Client-side on subcategory pages using URL search params
- Available filters: size, style, woodType, colorCount, craftType, shape, theme
- Example: `/catalog/printing-blocks/hand-carved?size=4x4&woodType=teak&shape=square`

## SEO
- SSG for catalog pages
- Dynamic `generateMetadata` for product pages
- Next.js Image + Cloudinary transforms
- Sitemap generation
- Open Graph tags
