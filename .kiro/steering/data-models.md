---
inclusion: manual
---

# Data Models (Strapi Content Types)

## Collection Types

### Category
- name (Text, required, unique)
- slug (UID from name)
- description (Text, optional)
- image (Media, single)
- subcategories (Relation: has many → Subcategory)

### Subcategory
- name (Text, required)
- slug (UID from name)
- category (Relation: belongs to → Category)
- products (Relation: has many → Product)

### Product
- name (Text, required)
- slug (UID from name)
- images (Media, multiple)
- shortDescription (Text)
- subcategory (Relation: belongs to → Subcategory)
- sizeOptions (JSON) — e.g. `["3x3 inch", "4x4 inch", "6x6 inch", "Custom"]`
- filters (Component, repeatable → ProductFilter)
- minQuantity (Integer, default: 1)
- featured (Boolean, default: false)

### QuoteRequest
- quoteNumber (Text, auto-generated `HW-YYYYMMDD-XXXX`, unique)
- status (Enum: new, under_review, need_more_info, quote_sent, approved, in_production, dispatched, closed)
- customerName (Text, required)
- email (Email, required)
- whatsapp (Text, required)
- country (Text)
- companyName (Text)
- generalNotes (RichText)
- catalogItems (Component, repeatable → QuoteItem)
- customDesigns (Component, repeatable → CustomDesign)
- internalNotes (RichText, private/admin only)
- quotedAmount (Decimal)
- leadTime (Text)
- paymentTerms (Text)
- shippingNotes (Text)

## Components

### ProductFilter (`product.filter`)
- filterName (Enum: size, style, woodType, colorCount, craftType, shape, theme)
- filterValue (Text)

### QuoteItem (`quote.item`)
- product (Relation: has one → Product)
- selectedSize (Text)
- quantity (Integer, required, min: 1)
- notes (Text)

### CustomDesign (`quote.custom-design`)
- file (Media, single)
- designName (Text)
- productType (Enum: printing_block, logo_block, wall_plate, pichwai, other)
- width (Decimal)
- height (Decimal)
- unit (Enum: inch, cm)
- colorCount (Enum: single, two, three, multicolor, not_sure)
- quantity (Integer, required, min: 1)
- notes (Text)
