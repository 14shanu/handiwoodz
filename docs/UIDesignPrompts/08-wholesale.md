# Wholesale / Bulk Inquiry (`/wholesale`)

## Design Prompt for Stitch AI

Design a wholesale inquiry page for "Handiwoodz" targeting B2B buyers, retailers, and bulk purchasers. The page should communicate bulk capabilities and make it easy to start a conversation.

### Sections

#### 1. Hero Section
- Background: subtle wood texture or workshop image
- Title: "Wholesale & Bulk Orders"
- Subtitle: "Partner with us for large-scale handcrafted wood products"
- CTA: "Get Wholesale Pricing" (scrolls to contact section)

#### 2. Why Wholesale with Us
- 3-4 benefit cards in a row:
  - "Custom Quantities" — minimum orders from 10+ pieces
  - "Bespoke Designs" — your artwork, our craftsmanship
  - "Competitive Pricing" — volume discounts available
  - "Worldwide Shipping" — we deliver globally
- Each card: icon + title + 1-2 line description

#### 3. Product Categories for Bulk
- Brief grid showing categories available for wholesale:
  - Printing Blocks (for textile industry)
  - Logo Blocks (for branding/packaging)
  - Wall Plates (for decor retailers)
  - Pichwai Art (for art galleries)
  - Custom Products (for any requirement)
- Each with a small image and "Explore →" link to catalog

#### 4. How It Works
- 3-step process (horizontal timeline style):
  1. "Share Your Requirements" — tell us what you need
  2. "Receive Your Quote" — we'll respond within 24 hours
  3. "Production & Delivery" — crafted and shipped to you
- Clean, numbered steps with connecting line/arrow

#### 5. Contact / Inquiry Section
- Two options side by side:
  - **Option A: Quick WhatsApp Chat**
    - Large WhatsApp button with pre-filled message
    - "Chat now for instant response"
  - **Option B: Browse & Request Quote**
    - "Browse our catalog and add items to your quote basket"
    - Button: "Browse Catalog →"
- Or: simple contact form (Name, Email, WhatsApp, Brief Requirement)

#### 6. Trust Signals
- Client logos or testimonial quotes (if available)
- "Trusted by X+ businesses worldwide"

### Design Tokens
- Professional but warm — B2B confidence with artisan charm
- Slightly more corporate feel than other pages (but still on-brand)
- Bold headings, clear hierarchy
- Accent color for CTAs (terracotta or forest green)
- Cards: clean white with subtle borders

### Responsive Requirements
- Mobile: Stacked sections, full-width cards, large tap targets for WhatsApp CTA
- Tablet: 2-column benefit cards, side-by-side contact options
- Desktop: Full layout, max-width 1200px, generous spacing

### Interactions
- WhatsApp button: pulse animation to draw attention
- Benefit cards: subtle hover lift
- Process steps: fade-in sequentially on scroll
- Smooth scroll to contact section from hero CTA

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;family=Montserrat:ital,wght@0,100..900;1,100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed-dim": "#ffb59c",
                    "tertiary-fixed-dim": "#b0cdbb",
                    "background": "#fbf9f5",
                    "on-primary": "#ffffff",
                    "inverse-surface": "#30312e",
                    "secondary-fixed": "#ffdbcf",
                    "on-secondary-container": "#752c11",
                    "error": "#ba1a1a",
                    "primary-container": "#4a2c2a",
                    "on-primary-fixed": "#2e1413",
                    "surface": "#fbf9f5",
                    "primary-fixed": "#ffdad7",
                    "on-secondary-fixed-variant": "#793014",
                    "on-surface-variant": "#504443",
                    "secondary-container": "#fd9572",
                    "on-primary-fixed-variant": "#5f3e3c",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-high": "#eae8e4",
                    "on-tertiary-fixed": "#062014",
                    "surface-bright": "#fbf9f5",
                    "error-container": "#ffdad6",
                    "inverse-on-surface": "#f2f0ed",
                    "on-surface": "#1b1c1a",
                    "tertiary-container": "#1f392c",
                    "inverse-primary": "#eabcb8",
                    "surface-tint": "#795553",
                    "surface-variant": "#e4e2de",
                    "primary": "#321716",
                    "outline": "#827472",
                    "on-primary-container": "#bd928f",
                    "primary-fixed-dim": "#eabcb8",
                    "on-secondary": "#ffffff",
                    "on-error-container": "#93000a",
                    "surface-container": "#efeeea",
                    "on-tertiary-fixed-variant": "#324c3e",
                    "secondary": "#984629",
                    "outline-variant": "#d4c3c1",
                    "tertiary-fixed": "#ccead6",
                    "on-error": "#ffffff",
                    "on-background": "#1b1c1a",
                    "tertiary": "#092317",
                    "on-tertiary-container": "#86a391",
                    "surface-container-low": "#f5f3ef",
                    "on-tertiary": "#ffffff",
                    "on-secondary-fixed": "#390c00",
                    "surface-dim": "#dbdad6",
                    "surface-container-highest": "#e4e2de"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "unit": "8px",
                    "margin-mobile": "20px",
                    "margin-desktop": "64px",
                    "section-gap": "120px",
                    "container-max": "1280px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "headline-md": ["EB Garamond", "serif"],
                    "body-md": ["Montserrat", "sans-serif"],
                    "headline-sm": ["EB Garamond", "serif"],
                    "label-md": ["Montserrat", "sans-serif"],
                    "headline-lg-mobile": ["EB Garamond", "serif"],
                    "headline-lg": ["EB Garamond", "serif"],
                    "display": ["EB Garamond", "serif"],
                    "body-lg": ["Montserrat", "sans-serif"]
            },
            "fontSize": {
                    "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>.wood-texture {
    background-image: linear-gradient(rgba(251, 249, 245, 0.92), rgba(251, 249, 245, 0.92)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuDgi8cv72c0_q207ckqiF8ySbRZu5W9BQrXvKMEL5AcZYBP1Vvw-wKU57dzGT6wxJJ_AFOorC9RItKlJGC4S_hOlT0Yu-sjFRDg_g2JWyM7DzEz1kDNYqAbc08FaVDVcseseI6TM5ZafYKkc7pCMc8PUgLsiXWgpUdS5BrUd8XPECJzIvZ-jHSNVG8Dbsf6msRvSmfdiFT3Y5ez1ukwobJbW6_XrJqWoD9x58BIYxY8S0MnHws2y9ZtzkzmoVxLvmelp9_Wiqj_F74);
    background-size: cover;
    background-position: center
    }
.grain-overlay {
    position: relative
    }
.grain-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBu9QjIB1hweneAS24N-zvuRAMoVh3sEAKzhRJ8FUGo4zHM8hvOv0lssCWm6kOr0QH0sAOvw6yV4MRP2x-fbhoaKG4VYpXFT9aOWVw_cl6hmZd-5Gax6ItI-V5asnID962uXgtETB_ZtW4ZZ2gVCRKbkEZKlOTaBDRdH8QfzVlysgE-7pdZ6alPE8SljUHqspbMi_QzPdDA2qhGpbeA0LgbqIonUZKZRgShpHKJ1Xb0mHvCpWyUsObXDAWWsGJHY4pXn-9_Xtcep3Y);
    opacity: 0.05;
    pointer-events: none;
    z-index: 1
    }</style>
</head>
<body class="bg-background text-on-surface font-body-md overflow-x-hidden grain-overlay">
<!-- TopAppBar Component -->
<nav class="fixed top-0 z-50 w-full bg-background shadow-sm">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-[80px]">
<div class="font-headline-md text-headline-md text-primary tracking-tight">Handiwoodz</div>
<div class="hidden md:flex gap-8 items-center">
<a class="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300" href="#">Collections</a>
<a class="text-secondary font-bold border-b-2 border-secondary pb-1" href="#">Wholesale</a>
<a class="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300" href="#">Materials</a>
<a class="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300" href="#">Our Story</a>
</div>
<div class="flex gap-4 items-center">
<button class="hidden lg:block font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300">Catalog</button>
<button class="bg-secondary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 scale-95 active:scale-90 transition-transform duration-200 ease-out">Inquire Now</button>
</div>
</div>
</nav>
<!-- Hero Section -->
<section class="wood-texture pt-40 pb-24 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop">
<div class="max-w-container-max mx-auto text-center">
<h1 class="font-display text-display text-primary mb-6">Wholesale &amp; Bulk Orders</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                Partner with us for large-scale handcrafted wood products that embody artisan heritage and sustainable luxury. Tailored solutions for boutiques, interior designers, and retail partners.
            </p>
<div class="flex flex-col md:flex-row gap-4 justify-center">
<button class="bg-secondary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md shadow-md hover:opacity-90 transition-all">Get Wholesale Pricing</button>
<button class="border border-primary text-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all">Request Samples</button>
</div>
</div>
</section>
<!-- Why Wholesale with Us -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
<div class="max-w-container-max mx-auto">
<div class="text-center mb-16">
<h2 class="font-headline-lg text-headline-lg text-primary mb-4">The Artisan Advantage</h2>
<div class="w-24 h-1 bg-secondary mx-auto"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div class="bg-white p-8 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow">
<div class="bg-secondary-fixed text-on-secondary-container w-12 h-12 flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined">inventory_2</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-3">Custom Quantities</h3>
<p class="text-on-surface-variant text-body-md">Scalable production runs from boutique batches to large commercial inventory levels.</p>
</div>
<div class="bg-white p-8 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow">
<div class="bg-secondary-fixed text-on-secondary-container w-12 h-12 flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined">auto_fix_high</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-3">Bespoke Designs</h3>
<p class="text-on-surface-variant text-body-md">Collaborative design services to create exclusive product lines for your brand's unique identity.</p>
</div>
<div class="bg-white p-8 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow">
<div class="bg-secondary-fixed text-on-secondary-container w-12 h-12 flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined">payments</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-3">Competitive Pricing</h3>
<p class="text-on-surface-variant text-body-md">Tiered wholesale structures ensuring your retail margins remain healthy and sustainable.</p>
</div>
<div class="bg-white p-8 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow">
<div class="bg-secondary-fixed text-on-secondary-container w-12 h-12 flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined">public</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-3">Worldwide Shipping</h3>
<p class="text-on-surface-variant text-body-md">Reliable logistics network delivering handcrafted excellence to partners across the globe.</p>
</div>
</div>
</div>
</section>
<!-- Wholesale Categories Grid -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop">
<div class="max-w-container-max mx-auto">
<h2 class="font-headline-lg text-headline-lg text-primary mb-12 text-center">Bespoke Categories</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<!-- Printing Blocks -->
<div class="group relative overflow-hidden rounded-lg aspect-[4/5]">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Close up shot of intricate hand-carved wooden printing blocks with traditional floral patterns, lying on a rustic workbench with warm directional lighting. The wood has a deep rich grain and the overall aesthetic is high-end artisan craft." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4OSUPEk02_its5YTV4mzTBCICd5HCWGaNhVcDbR5_XTjuyd69Pu9_l2m9LZPJBF2_r8JQ-LhRJTSfXXBFn353ShGFTriMYsEIe3olbax1NvebXNiXYy7ixuwLl_dvQ2tQvD4bqfkTuOp0t2veY4iPDbU89tsLV2NxZnFMzJVYp3Fzk6JIbIutrCEh1skCLeDN6255Jau3t7nayEbpcDEpP_pv_54AQr8qdEKdZ3oZl_Kzn5kY4-2Ickq5_RBlUlLAK5j-jzkpgrw"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-8">
<h4 class="font-headline-sm text-headline-sm text-on-primary mb-2">Printing Blocks</h4>
<a class="text-on-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all" href="#">
                            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<!-- Logo Blocks -->
<div class="group relative overflow-hidden rounded-lg aspect-[4/5]">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Modern corporate logo laser-engraved onto a high-quality solid walnut wood block, positioned on a minimalist ivory desk. Soft natural side lighting highlights the tactile texture and clean edges of the wood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtxwWSmUP194qidqmTrX_U_WYzdHhDX_dQ8kFC8-pfP-zWlXFhOHDWgs7RC8dLiYrHycKa0Uy87GZPJOuOKw-t1wtICyMLXhP_5CIaPP8rInm9YaTQxphUY7YdtB_Q_chwf06dSVnde4DTHxZhI4ok4JayBiD48uwmqrBowX46nHG8836qFkXqWEAqNt8uo4cGSJ7gNLSC2l8bgdo_-SiMpJf5Q0yiXiRp6rdOKndU20-ijD4hI8NLmt-Bl-YcXTnbIQRkjqxNu7k"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-8">
<h4 class="font-headline-sm text-headline-sm text-on-primary mb-2">Logo Blocks</h4>
<a class="text-on-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all" href="#">
                            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<!-- Wall Plates -->
<div class="group relative overflow-hidden rounded-lg aspect-[4/5]">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A curated arrangement of handcrafted wooden wall plates and switch covers installed on a warm cream-colored textured wall. The design is minimalist and sophisticated, emphasizing the natural beauty of the wood grain." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD97pItd9I9LhB8auSQh1oKI9KpUnJYMJgnyRdU2FF8r-IVmRPEgB4kapXkwC5GwTObqdlcJeoQK-BECMopdqB7FWQB2DkHiGyg7u5WwZ5iTK1B0v8U-aXic5Z60kxJ1veGMwCoSJf2S_IlwiO8mGY3--hQYotB0UyQZLg_qwLKvx8VCyIO3RGWqZS8QDS-5eY9g5v6Yr34TLgCmZ7I9HvngTsbQMqyauXTJlZ65hi_hFHLxuuOvpXrxIf0jDt-XU1FRKWawuQRJ4"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-8">
<h4 class="font-headline-sm text-headline-sm text-on-primary mb-2">Wall Plates</h4>
<a class="text-on-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all" href="#">
                            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<!-- Pichwai Art (Double wide on desktop) -->
<div class="group relative overflow-hidden rounded-lg md:col-span-2 aspect-[16/9]">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Exquisite Pichwai art painted on a dark wooden panel, showcasing vibrant traditional Indian motifs of cows and lotus flowers. The lighting is low and moody, focusing on the gold leaf details and rich pigments." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvFsCvwE2jNqyxW1uhvIfrPn64CnCDZ8uoV4d0Emzmbl9eUH75ZlI4ipXpEIbMA8GHvpkwzZ7EP1tE10eFSN8JO4tklgUygFcoKL44WmUJhmW1Br9_HAYl7nMvUBOq612Dwji1yNauPqDkbbfKJIiPvPZ_jgzfaurVTvtsvr0UfqanPIgOdfRV79fuqrbB1tj8zG1gnjs2C8hfLXVva5Zcft700N8BpAZfx_P8aAj_1N3wE0iaelIUFNpYx57C-99F_J_mHIrOb2A"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-10">
<h4 class="font-headline-md text-headline-md text-on-primary mb-2">Pichwai Art Collections</h4>
<p class="text-on-primary/80 max-w-md mb-4">Hand-painted masterpieces on sustainably sourced hardwood panels.</p>
<a class="text-on-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all" href="#">
                            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<!-- Custom Products -->
<div class="group relative overflow-hidden rounded-lg aspect-[4/5]">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A collection of various custom-made wooden objects including bowls, small sculptures, and functional tools, artistically arranged on a bright ivory surface. The lighting is diffuse and high-key, suggesting a premium design studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr0C0X7NZDtFSnQzYUZqWC2uI6MJgjcgt-2tV9BoreJliuq24qE-WWdMUXTYkgwCL15-ZP6yhs_ocSuhN45EyaVeflJBr4hGOdsSb4iQLtHUGJJwAJx_m64OfoU1ir-F-Y6lDAuCXGMW52BBmKhxb1Szl-mH-hN9cr1HElZeGSfpqbyjaIbN_kOB5p20-xXBMQFHkgoT9Wy8yTkjvtm-LKIiF8kTxxP85nzl2_x9DzENAka72MHvT_gY23EPS9AeDkZ_dGmi8AkCI"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-8">
<h4 class="font-headline-sm text-headline-sm text-on-primary mb-2">Custom Products</h4>
<a class="text-on-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all" href="#">
                            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
<!-- How It Works (Timeline) -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container">
<div class="max-w-container-max mx-auto">
<h2 class="font-headline-lg text-headline-lg text-primary mb-16 text-center">Seamless Wholesale Journey</h2>
<div class="relative flex flex-col md:flex-row justify-between items-start gap-12">
<!-- Line -->
<div class="hidden md:block absolute top-12 left-0 w-full h-px bg-outline-variant z-0"></div>
<div class="relative z-10 flex-1 text-center group">
<div class="w-24 h-24 bg-background rounded-full border-4 border-secondary flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-105">
<span class="material-symbols-outlined text-secondary text-4xl">edit_note</span>
</div>
<h5 class="font-headline-sm text-headline-sm text-primary mb-3">Share Requirements</h5>
<p class="text-on-surface-variant max-w-xs mx-auto">Tell us about your project, quantities, and specific design needs via our inquiry form.</p>
</div>
<div class="relative z-10 flex-1 text-center group">
<div class="w-24 h-24 bg-background rounded-full border-4 border-secondary flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-105">
<span class="material-symbols-outlined text-secondary text-4xl">request_quote</span>
</div>
<h5 class="font-headline-sm text-headline-sm text-primary mb-3">Receive Quote</h5>
<p class="text-on-surface-variant max-w-xs mx-auto">Our team provides a detailed proposal including volume pricing and delivery timelines.</p>
</div>
<div class="relative z-10 flex-1 text-center group">
<div class="w-24 h-24 bg-background rounded-full border-4 border-secondary flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-105">
<span class="material-symbols-outlined text-secondary text-4xl">local_shipping</span>
</div>
<h5 class="font-headline-sm text-headline-sm text-primary mb-3">Production &amp; Delivery</h5>
<p class="text-on-surface-variant max-w-xs mx-auto">Master artisans begin crafting your order, followed by secure tracked worldwide shipping.</p>
</div>
</div>
</div>
</section>
<!-- Inquiry Section (Dual Paths) -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop">
<div class="max-w-container-max mx-auto grid md:grid-cols-2 gap-gutter">
<!-- Path Left: Instant Response -->
<div class="bg-surface-container-low p-10 rounded-lg flex flex-col items-center text-center border border-outline-variant">
<div class="w-16 h-16 bg-[#25D366]/10 text-[#25D366] flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined text-3xl">chat</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-4">Urgent Inquiries</h3>
<p class="text-on-surface-variant mb-8 max-w-sm">Connect directly with our wholesale coordinator for immediate assistance and rapid quotes.</p>
<button class="bg-[#25D366] text-white px-8 py-4 rounded-lg font-label-md text-label-md flex items-center gap-3 hover:opacity-90 transition-all">
                    Chat now for instant response
                </button>
</div>
<!-- Path Right: Catalog Browse -->
<div class="bg-surface-container-low p-10 rounded-lg flex flex-col items-center text-center border border-outline-variant">
<div class="w-16 h-16 bg-secondary/10 text-secondary flex items-center justify-center rounded-full mb-6">
<span class="material-symbols-outlined text-3xl">shopping_basket</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-4">Self-Service Selection</h3>
<p class="text-on-surface-variant mb-8 max-w-sm">Browse our full catalog and add items to your quote basket to receive a custom bulk price list.</p>
<button class="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-secondary hover:text-white transition-all">
                    Browse Catalog
                </button>
</div>
</div>
</section>
<!-- Trust Signals -->
<section class="pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden">
<div class="max-w-container-max mx-auto">
<p class="text-center font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-10">Trusted by 100+ businesses worldwide</p>
<div class="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
<div class="h-8 md:h-12 w-32 bg-on-surface-variant rounded flex items-center justify-center text-background font-headline-sm italic">LUMIÈRE</div>
<div class="h-8 md:h-12 w-32 bg-on-surface-variant rounded flex items-center justify-center text-background font-headline-sm italic">ETHOS</div>
<div class="h-8 md:h-12 w-32 bg-on-surface-variant rounded flex items-center justify-center text-background font-headline-sm italic">OAK &amp; IRON</div>
<div class="h-8 md:h-12 w-32 bg-on-surface-variant rounded flex items-center justify-center text-background font-headline-sm italic">VERDANT</div>
<div class="h-8 md:h-12 w-32 bg-on-surface-variant rounded flex items-center justify-center text-background font-headline-sm italic">VENEER</div>
</div>
</div>
</section>
<!-- Footer Component -->
<footer class="bg-surface-container py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter">
<div class="flex flex-col items-center md:items-start">
<div class="font-headline-sm text-headline-sm text-primary mb-2">Handiwoodz</div>
<div class="font-label-md text-label-md text-on-surface-variant">© 2024 Handiwoodz. Handcrafted Excellence.</div>
</div>
<div class="flex gap-8">
<a class="text-on-surface-variant hover:text-secondary underline decoration-1 underline-offset-4 transition-opacity duration-300" href="#">Sustainability</a>
<a class="text-primary font-bold" href="#">Wholesale Terms</a>
<a class="text-on-surface-variant hover:text-secondary underline decoration-1 underline-offset-4 transition-opacity duration-300" href="#">Shipping Policy</a>
<a class="text-on-surface-variant hover:text-secondary underline decoration-1 underline-offset-4 transition-opacity duration-300" href="#">Contact</a>
</div>
</div>
</footer>
</body></html>

