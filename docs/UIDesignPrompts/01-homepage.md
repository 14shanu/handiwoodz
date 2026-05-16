# Homepage (`/`)

## Design Prompt for Stitch AI

Design a premium, artisan-crafted homepage for "Handiwoodz" — a handcrafted wood products brand (printing blocks, wall plates, pichwai art). The brand is B2B/wholesale focused with an earthy, warm, handmade aesthetic.

### Sections (Top to Bottom)

#### 1. Navigation Bar
- Logo (left): "Handiwoodz" wordmark with a subtle wood grain icon
- Nav links (center): Catalog, Custom Design, Our Story, Wholesale
- Right side: Quote Basket icon with item count badge, WhatsApp icon
- Sticky on scroll
- Mobile: hamburger menu with slide-out drawer

#### 2. Hero Section
- Full-width hero with a large lifestyle image of handcrafted wood products in use
- Overlay text: Brand tagline (e.g., "Handcrafted Wood Art, Made to Order")
- Two CTA buttons: "Browse Catalog" (primary), "Upload Your Design" (secondary/outline)
- Subtle scroll indicator at bottom

#### 3. Featured Products Grid
- Section heading: "Featured Creations"
- 4-8 product cards in a responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- Each card: product image, name, "Add to Quote" button
- "View All Products" link at bottom

#### 4. Category Cards
- Section heading: "Explore by Category"
- 4-6 large cards with category image overlay + category name
- Grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Hover effect: slight zoom on image, overlay darkens

#### 5. Custom Design CTA Banner
- Full-width banner with wood texture background
- Heading: "Have Your Own Design?"
- Subtext: "Upload your artwork and we'll carve it into reality"
- CTA button: "Upload Custom Design"
- Secondary: "Discuss on WhatsApp" with WhatsApp icon

#### 6. Why Choose Us / Trust Section
- 3-4 icon cards in a row
- Examples: "Handcrafted Quality", "Bulk Orders Welcome", "Custom Designs", "Worldwide Shipping"
- Each: icon + short title + one-line description

#### 7. Footer
- 4 columns: About (brief), Quick Links, Contact Info, Social/WhatsApp
- Bottom bar: copyright, privacy policy link
- WhatsApp floating button (fixed bottom-right on all pages)

### Design Tokens
- **Color palette**: Warm earth tones — deep brown, cream/ivory, terracotta accent, forest green accent
- **Typography**: Serif for headings (artisan feel), clean sans-serif for body
- **Spacing**: Generous whitespace, breathable layout
- **Images**: High-quality product photography with natural lighting, wood textures
- **Style**: Premium artisan, not cluttered — think Etsy meets luxury craft brand
- **Border radius**: Subtle rounded corners (8px)
- **Shadows**: Soft, warm shadows (not harsh)

### Responsive Requirements
- Mobile (320px+): Single column, stacked sections, full-width CTAs
- Tablet (768px+): 2-column grids, side-by-side CTAs
- Desktop (1024px+): Full layout with max-width container (1280px)
- Large (1440px+): Centered content, larger hero

### Interactions
- Smooth scroll between sections
- Product cards: hover lift effect with shadow
- Category cards: image zoom on hover
- CTA buttons: subtle scale on hover
- Navigation: transparent on hero, solid on scroll

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Handiwoodz | Artisan Handcrafted Wood Art</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&amp;family=Montserrat:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-highest": "#e4e2de",
                        "surface-bright": "#fbf9f5",
                        "primary": "#321716",
                        "inverse-primary": "#eabcb8",
                        "error": "#ba1a1a",
                        "on-surface": "#1b1c1a",
                        "surface-container-lowest": "#ffffff",
                        "secondary-fixed-dim": "#ffb59c",
                        "surface-tint": "#795553",
                        "background": "#fbf9f5",
                        "on-background": "#1b1c1a",
                        "surface-container-low": "#f5f3ef",
                        "on-tertiary-container": "#86a391",
                        "on-tertiary-fixed": "#062014",
                        "on-primary-fixed-variant": "#5f3e3c",
                        "on-tertiary": "#ffffff",
                        "outline-variant": "#d4c3c1",
                        "on-tertiary-fixed-variant": "#324c3e",
                        "surface-container": "#efeeea",
                        "secondary": "#984629",
                        "surface-variant": "#e4e2de",
                        "on-primary-container": "#bd928f",
                        "tertiary-fixed-dim": "#b0cdbb",
                        "inverse-surface": "#30312e",
                        "outline": "#827472",
                        "secondary-container": "#fd9572",
                        "on-secondary": "#ffffff",
                        "primary-fixed-dim": "#eabcb8",
                        "surface-container-high": "#eae8e4",
                        "on-error": "#ffffff",
                        "secondary-fixed": "#ffdbcf",
                        "tertiary-fixed": "#ccead6",
                        "on-primary-fixed": "#2e1413",
                        "surface": "#fbf9f5",
                        "on-surface-variant": "#504443",
                        "inverse-on-surface": "#f2f0ed",
                        "on-error-container": "#93000a",
                        "surface-dim": "#dbdad6",
                        "on-secondary-fixed": "#390c00",
                        "on-secondary-fixed-variant": "#793014",
                        "primary-container": "#4a2c2a",
                        "on-secondary-container": "#752c11",
                        "on-primary": "#ffffff",
                        "tertiary": "#092317",
                        "tertiary-container": "#1f392c",
                        "error-container": "#ffdad6",
                        "primary-fixed": "#ffdad7"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "margin-desktop": "64px",
                        "unit": "8px",
                        "gutter": "24px",
                        "section-gap": "120px",
                        "margin-mobile": "20px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["EB Garamond"],
                        "body-md": ["Montserrat"],
                        "display": ["EB Garamond"],
                        "body-lg": ["Montserrat"],
                        "headline-sm": ["EB Garamond"],
                        "headline-md": ["EB Garamond"],
                        "headline-lg": ["EB Garamond"],
                        "label-md": ["Montserrat"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAkj1zNrZADYp4Wc1BqrdVKG9YRib8iqCj8t-b7U2FYapw2YvGh9uTH1cfP9kqOAmRLzywVmjxD1ZizDBmKVmUqgqV69z98EEb5W2z8s8uGNExz7Y6r3kpfEuTrOtFCCX7lPb6bTwh5QvQV3xwokbccLyqytmEav3Rc6eQ-lhDI9JDuoIouvi8Fgexg_LSdoMqNuuTSkXmbEU8IvN2mIQrM79WXlqhoFpeVbob6isnJ3H27MC5CL_hj8SjTYbWXDTlJsXlDswG4xCU);
    opacity: 0.15
    }
.wood-texture-bg {
    background-image: linear-gradient(rgba(50, 23, 22, 0.8), rgba(50, 23, 22, 0.8)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuA7hepNmJm5QzuaBXP3cLnRnMM-QeffrqHAC6p_oZg9UgKO7h1wYElsfga8h548AlXSgk4SUml_2Tu-WRe2kpjYT6lgVgPKIGKjzmCjxd0z6FGop7fW3A6VmNKTM0CwAeX0go_1ViUIyWrLz0qK8C0zWH22xxSmVA1tC4jZaaaf438yEeVS_RhQ019wV5PMMaGSGFgT43UwVlr8nGvTKByC7iDKbGlXcM-rbg14Fc1Ev6hpHIBoq_atNC46Qr-Mmr6g15J0ZMP0ldQ);
    background-size: cover;
    background-position: center
    }</style>
</head>
<body class="bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
<div class="grain-overlay"></div>
<!-- Navigation Bar -->
<nav class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(50,23,22,0.08)]">
<div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<a class="font-display text-headline-md text-primary tracking-tight" href="#">Handiwoodz</a>
<div class="hidden md:flex items-center gap-8">
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Catalog</a>
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Custom Design</a>
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Our Story</a>
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Wholesale</a>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all active:scale-[0.95]">
<span class="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
</button>
<button class="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all active:scale-[0.95]">
<span class="material-symbols-outlined" data-icon="chat">chat</span>
</button>
<button class="md:hidden p-2 text-primary">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</div>
</nav>
<!-- Hero Section -->
<section class="relative pt-20 overflow-hidden">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row items-center gap-16">
<div class="flex-1 space-y-8">
<span class="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-label-md text-label-md rounded-full uppercase tracking-widest">Master Craftsmanship</span>
<h1 class="font-display text-headline-lg-mobile md:text-display text-primary">Handcrafted Wood Art, Made to Order</h1>
<p class="font-body-lg text-on-surface-variant max-w-xl">Bridging the gap between raw natural materials and refined luxury through slow-living, tactile stories, and timeless quality.</p>
<div class="flex flex-wrap gap-4 pt-4">
<button class="px-8 py-4 bg-secondary text-on-secondary rounded-lg font-label-md shadow-lg hover:bg-primary transition-all active:scale-95">
                        Browse Catalog
                    </button>
<button class="px-8 py-4 border-2 border-primary text-primary rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                        Upload Your Design
                    </button>
</div>
</div>
<div class="flex-1 w-full h-[500px] md:h-[600px] relative">
<div class="absolute inset-0 bg-secondary/5 rounded-2xl transform rotate-3 -z-10"></div>
<img class="w-full h-full object-cover rounded-xl shadow-xl" data-alt="A detailed close-up of an artisan's workbench showcasing high-end mahogany wood carvings and traditional chisels. The scene is bathed in warm, directional light creating soft shadows and highlighting the rich wood grain. The aesthetic is clean and minimalist, set against an ivory background, evoking a sense of heritage and luxury craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH-NiA3b1pU0JdNSfJD8TMCxuCVaINd3Ln8LObu5d8b0MQFxV-n7cfQzzL-uI-nXW73-1MnDn-8eKhY32yBqi2PMw6uDwE06vyHZlILjBzm79ATP8_wWEP6NUSrq7bjj4LUpzA1EIknL4Ito-Z9t6e-mzdsflvgPWRXD5579EECMrCU5A64bhvCy9qDWmlq4AXkARy9mC-Q9dqOeY4D-IN4wsDmuAWWsPpHFteZ3Ved-mC5U0hCWwH-t3QBKKTsQyEgfLfTTrO47g"/>
</div>
</div>
</section>
<!-- Category Cards -->
<section class="bg-surface-container-low py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div class="flex justify-between items-end mb-16">
<div class="space-y-4">
<h2 class="font-display text-headline-lg text-primary">Explore by Category</h2>
<p class="font-body-md text-on-surface-variant max-w-lg">From architectural wall pieces to intricate printing tools, discover our signature collections.</p>
</div>
<button class="hidden md:flex items-center gap-2 text-secondary font-label-md hover:underline">
                    View All Categories <span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter">
<!-- Category Item -->
<div class="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Intricate wooden printing blocks with traditional patterns resting on a rustic wooden surface. Soft daylight illuminates the textures of the hand-carved details. The mood is calm and artisanal, featuring warm deep brown and ivory tones that align with a premium heritage brand aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBILmT71EaohCsQQ2yO0xe7OKH43QJ4CWOgkyhGvZ26SBSSVLVm9OHjpkCsFPcfH69Mc-zMBZB25gKWE2qFVnjmlGgcVqboG_oxZlNeQSR188Qmzkh3G2rNTEDmuDKuifKC635tn57KVsoDaEazEIsPzhEKZl2gXjTV0rhAGGBxSeAPYNnGk19tMt2EACr7qMjxJaPR4XHBew1eygCmFbuJUJuRcjFOmuJfcz8AIFTgWJZODpesx25lNbeIT6getoEMQEoM-efxdiQ"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
<h3 class="font-headline-sm text-on-primary">Printing Blocks</h3>
<p class="text-on-primary/70 text-body-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Traditional tools of the trade.</p>
</div>
</div>
<!-- Category Item -->
<div class="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Exquisite wooden wall plates featuring hand-painted botanical motifs and intricate carvings. They are displayed against a clean, off-white gallery wall. The lighting is bright and modern, creating a luxury artisan feel with a palette of deep browns and muted natural greens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPR72WlfD-VNGRZO0nJlcLrC5_iPKvKsYxPzlxiLTscRAeoP-Hj7nQtYVwHSQuITTKt0pKX_N79VR6zVF1M8nRghFNiq17ZoK-jSH3rwme2ejNAs--tB-8rjYsKA5JpnXqeNgzF-i8I3blklCm1uHLzAs8K4kqoX5TW9hqtvNHbj0JywRAKKK5BM2ZIbm6XPBkMO-92Uo6gILNOVj1nyeAYLoW9B3N0sVHoHb5ZKLM-gTshxvHb4DlZigmweAH1lFo0QpD6NkLrGE"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
<h3 class="font-headline-sm text-on-primary">Wall Plates</h3>
<p class="text-on-primary/70 text-body-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Art for your walls.</p>
</div>
</div>
<!-- Category Item -->
<div class="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Traditional Pichwai art painted on a dark, polished wood frame. The scene highlights the contrast between the vibrant religious art and the deep, warm tones of the handcrafted wood. Minimalist setting with premium ivory backgrounds and elegant atmospheric lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI922i8qLHH2piXYHlRLi3hJ72YR3-1ER-_NV4HzSE5QbNveWczcz9IwZXL8wdxKGKLfBZP2hxzC4xDyFQ7V2qhDmddA7rWU-RN0GcFctUThEmquapcWQD6HsLE_ve_FoWioex8e-TZzJUfTAdogsFAyaWnRL9vjfdRgRke2nZMenRTKcoe17GmR_SnLH9xMuEAlNYU3Wn8YZhWGueDNY8wUa43KdgiroA8ktlJ0ylhwTJAveaI9W5NCTPKuocIekkkRqW8a7rm24"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
<h3 class="font-headline-sm text-on-primary">Pichwai Art</h3>
<p class="text-on-primary/70 text-body-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Heritage storytelling.</p>
</div>
</div>
<!-- Category Item -->
<div class="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Detailed custom wood carvings of geometric shapes and organic forms. The focus is on the precision and tactile quality of the walnut and oak surfaces. Lighting is soft and natural, emphasizing the professional craftsmanship and premium luxury feel of the material-first design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyYKan8OcNDZGSlLm17WMvgZTawggv4pF1ZhyeS2edYYfHGYe1PeOzfbvA4y6jsYc70TbLsn3WAUfnRoUq6woKXFAnlkxoT-viLAmJfutmieaKIHSz4N-TRo4TchdLyYInEShkVcBksKoDTOtic2nRkObANzlXMjApeS6uDEiFBy9Vp_sdBaI8N-8GJBP2vR3ETEv3S9V8rx7sHGnYaUbhQyuf-179mz4gOQrfvPli0yru3MYn0J_ZaTBxpdmNq_gbqoxhmktrDDo"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
<h3 class="font-headline-sm text-on-primary">Custom Carvings</h3>
<p class="text-on-primary/70 text-body-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Unique bespoke pieces.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Featured Products Grid -->
<section class="py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div class="text-center mb-16 space-y-4">
<h2 class="font-display text-headline-lg text-primary">Featured Creations</h2>
<div class="w-24 h-1 bg-secondary mx-auto"></div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<!-- Product Card Template (8 iterations) -->
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A premium handcrafted walnut wooden bowl with a deep, rich polish. It sits on a minimal ivory pedestal under a soft spotlight that highlights the unique swirling grain patterns. The image communicates luxury and artisan quality through a clean, sophisticated composition and a warm, earthy color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAatZeVShJ8vd7xGGWoyIfK6q06XV3b7ApXX5XiLIbIkOMOlThPnOYR-MQBoXCEQbmOeK1xlRvbHC_b77C_PfXQ745CjM9QwO-yURa9qCa7-12HOlji7Uqy-z2AZOsfvNslZxzz8zjlerNJ0Ru89LieWN4uXZAzXkTi7mubnP_hLQo5UGXudmizq56HD2ODCim1MTZ43AsFbfYYLFsanwl2b_EN_CQMk_rCqDm1DJvSu7E25vWx8wn5Ew6DdWOBG5BgH6m7wvair50"/>
<span class="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 text-label-md rounded font-label-md uppercase">New</span>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Artisan Walnut Bowl</h3>
<p class="text-secondary font-label-md">Signature Series</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg group/btn">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Minimalist solid oak storage box with clean lines and a hidden magnetic latch. The wood has a matte finish, reflecting the slow-living aesthetic. Set against a serene cream background with soft shadows, the scene emphasizes high-end tactile design and natural material beauty." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-tFr6K4OT86zzTm-kwG-MelAJfUdYVXNyK7yeAewrylDU2Qv1r7pIGlMWrw49KGXc3GGIGgJmDp7Nj1y0mjqkC_3ucKKqCSRgG4cc4KO0AvOAWkIqzrFEvG52HEiYy8sE4bp7H4_RqTfxkC-j4ttMhkc8ILKiCQkEZIeS8JDQ1Qk8tEsmlZCkRbUfUqs4TsQ9bz4WXrIpf0R1gMiUX3h7KybthIfmhlDiGZqjVG9D65VB9eLt-GPFc1qTPuB6Pw1Dc2Cz3nM_73Q"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Oak Keepsake Chest</h3>
<p class="text-secondary font-label-md">Essential Craft</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A beautifully carved teak wood tray featuring traditional Indian geometric patterns. The rich reddish-brown wood is presented in a bright, modern setting with soft daylighting. This image highlights the tactile story behind the handmade object, emphasizing premium heritage and slow-living luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZxlp-cQLfhjzIHmttfjvQKq416mTtySVDHXfivuxd_31gO3O74KBJphBRfEbKu4py5XEzniHjX7FmLgA-UkUuyOAEOXiS8eZohb4dlKtq6YXOuw4QKO-v8AJXYR_UiaYXgjwNGfaG4fH5MMmFNJM67VUBTkSUWmTJuuwkK52XY26904zd65zCuwOcJSXMgW01FucaS0QyCHGeZNabh7aHDFwV7w71RWbDX7EKBvL7qq-HjU-jGfpPfaScjkRiG_uChWwY5LxD2-I"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Teak Heritage Tray</h3>
<p class="text-secondary font-label-md">Pattern Collection</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern sculptural wood lamp crafted from light birch wood, casting warm ambient light onto a dark wood table. The design is minimalist and architectural. The aesthetic uses high contrast and soft focus to evoke a feeling of quiet confidence and sophisticated artisan design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuKJyWJ8Jy8RHbPKq7XUL_CanoEDrFIVyFq8XGr-QQSlWzHUfDKIUY05GDWZiGaXP-EP2BZCSU-lw5asXR-NUO6K5Mx90NAI8zYVuQayxB0zFoAOjOWzVCo40Zqglc_otHosn7xtbTLd8ZifTQPRaIvVaAb6gTk_uil1IO_sn6JSX7v6pr0dhaz7ZiO0DvJmuW-zd283e3-tO3HngTUaQf-eKWJYX3aS7JsdNdx5CPdLk__9JarwjfIkUA3Bb_ysJkHTrZF7e9IUU"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Birch Orbit Lamp</h3>
<p class="text-secondary font-label-md">Modern Heritage</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<!-- Repeat with different data for 8 total (Showing 4 for brevity but structure remains) -->
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hand-turned mahogany spindle legs for a custom furniture project, displayed in an organized row. The rich dark wood and polished finish glow under warm studio lighting. The setting is clean and artistic, emphasizing the bulk order and custom design capabilities of a master workshop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLGXuXC_Q2R4svnHTPwYECC3r0qodE39UqpT3Ko08kuJ-TS_tCm3QKj9vABKDyXZY52zsFhtVw6cbvp2rQWvMeSh12zAqvsT8DYERWKqOqtxULlnIKHL2kMKHJe4XmP7ZrutrvroSAxu1D1dBzul_arzkS4Bp66q7vUUHYyzIs9ruGRyY6ez00t8CTcBMQb1cpI5fcmK1ExUhnyucylb7ttASpe-54sxEUPQnPA0u9VEmQh0LB8vuMLs5k6hDKrSfXCdGT9NYYsrU"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Custom Pillar Sets</h3>
<p class="text-secondary font-label-md">Architectural</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Artisanal charred wood wall panels using the Shou Sugi Ban technique. The deep black textures and silver sheen are highlighted by intense side lighting. The design is dramatic and high-end, presented in a minimalist gallery-like space that screams modern luxury and quality craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiOy4g8q3c8j5fSK8dBKpkook22pt418xb-3WZa2osgCj2r48IwAiHWAjym-mvPt1gIYxQJs9h5mQUt8SWou-ihUmlgJmeLWFMi9947VzHMAicce-lYz-6afx14xaHCXh3W1cUJsg92_VMrBcMHWhJnNlScJW3Pt3hcdtSK-wMGSdbxDl9k0X0ayXkuT0IPgR12YTqdxMLlxPjvmtze2RN2_p6M8-uT-hirGdw43Z4DNAExqQRN9AT-x0U6YpeuFPsGc39KeaJ3Zw"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Charred Wall Accents</h3>
<p class="text-secondary font-label-md">Texture Series</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Solid rosewood desk organizer with brass inlay details. The piece is set on a light-colored wood desktop in a bright, airy home office. The mood is professional and serene, showcasing a perfect blend of natural materials and refined, tactile luxury for a modern audience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5PDeehBqRfK4TKK4XDuqbmZLxEOJh5pd5H00bJKzd-Ze7UachC1FppAxOUtsLcCk4tz35KDhwm6vIsOnSnXzTnNFZzpnrMQ5etlokC9pAyje3NSX6pA1QNsh0bmtSZH-4cXwyX2Ljgt2UmRvV5YvvuYUkCAhicIz2MfuzHuE6bVsfEeUL5hq9nyFelKCMHGOF8QKiw56syTpNNPnJHArswC0ye0RlvZP_f0oc4X9vw-xVsEIZiiNsbYJ3uTbMWiFZlOXXkzf5cIA"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Executive Desk Suite</h3>
<p class="text-secondary font-label-md">Bespoke Decor</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
<div class="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<div class="relative h-[320px] overflow-hidden rounded-t-lg">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Handcrafted wood coasters with mountain range laser engravings, presented in a neat leather strap. The setting is rustic yet premium, with warm lighting and a neutral ivory background. This image highlights the brand's commitment to quality over quantity and the tactile story behind handmade objects." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWv6PTMrFPRoOWGiS0A9NtvNuRfVjUAFLf1aVaCPFLfQ25TKzhI3q02D8GroDeTpMn9ImN-JTDMTPU8nAc7UG-xw-D-S6Ii96f_aRXU-QPjpgYMF55W-DfzWE0t4IEVBFZIpV0Jp-LwPTTST2VGCHPn431exMfQ3Q_2nIR6-GfxU50Z37Pw9aN9jwy9gMrUesPZ3eDCGiDr7-WcE6Ut4GNZJwc0QDC4HMV9dYcfIxe4FwdGv_sWP37HlvJkL2B7_qdvxpbsafH-EU"/>
</div>
<div class="p-6 space-y-4">
<h3 class="font-headline-sm text-primary">Peak Ridge Coasters</h3>
<p class="text-secondary font-label-md">Gifting Series</p>
<button class="w-full py-3 border border-outline flex items-center justify-center gap-2 font-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
<span class="material-symbols-outlined text-[18px]" data-icon="add_box">add_box</span> Add to Quote
                        </button>
</div>
</div>
</div>
</div>
</section>
<!-- Custom Design Banner -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop my-section-gap">
<div class="wood-texture-bg rounded-2xl overflow-hidden shadow-2xl relative p-12 md:p-24 text-center">
<div class="relative z-10 max-w-2xl mx-auto space-y-8">
<h2 class="font-display text-headline-lg text-surface-container-lowest">Have Your Own Design?</h2>
<p class="font-body-lg text-surface-container-highest">We bring your imagination to life. From custom logos to bespoke architectural elements, our master carvers are ready for your project.</p>
<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
<button class="px-10 py-4 bg-on-secondary-container text-on-primary rounded-lg font-label-md hover:shadow-xl transition-all active:scale-95">
                        Upload Custom Design
                    </button>
<a class="flex items-center gap-3 text-surface-container-lowest font-body-md hover:text-secondary-fixed transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]" data-icon="chat">chat</span>
                        Chat with us on WhatsApp
                    </a>
</div>
</div>
</div>
</section>
<!-- Trust Section -->
<section class="py-section-gap bg-surface-container-low/50">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
<div class="flex flex-col items-center text-center space-y-4 p-6 group hover:bg-surface-container rounded-xl transition-colors">
<div class="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="verified" data-weight="fill">verified</span>
</div>
<h4 class="font-headline-sm text-primary">Handcrafted Quality</h4>
<p class="text-on-surface-variant text-body-md">Every piece is hand-selected and finished by master artisans with decades of heritage experience.</p>
</div>
<div class="flex flex-col items-center text-center space-y-4 p-6 group hover:bg-surface-container rounded-xl transition-colors">
<div class="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="inventory_2" data-weight="fill">inventory_2</span>
</div>
<h4 class="font-headline-sm text-primary">Bulk Orders Welcome</h4>
<p class="text-on-surface-variant text-body-md">We specialize in wholesale partnerships for hospitality, corporate gifting, and interior design firms.</p>
</div>
<div class="flex flex-col items-center text-center space-y-4 p-6 group hover:bg-surface-container rounded-xl transition-colors">
<div class="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="brush" data-weight="fill">brush</span>
</div>
<h4 class="font-headline-sm text-primary">Custom Designs</h4>
<p class="text-on-surface-variant text-body-md">Send us your sketches or blueprints. We provide detailed digital previews before starting the craft.</p>
</div>
<div class="flex flex-col items-center text-center space-y-4 p-6 group hover:bg-surface-container rounded-xl transition-colors">
<div class="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="public" data-weight="fill">public</span>
</div>
<h4 class="font-headline-sm text-primary">Worldwide Shipping</h4>
<p class="text-on-surface-variant text-body-md">Secure, carbon-neutral shipping to your doorstep, anywhere in the world with premium insurance.</p>
</div>
</div>
</section>
<!-- Footer -->
<footer class="bg-surface-container-low border-t border-outline-variant/30 w-full mt-section-gap">
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
<div class="space-y-6">
<h3 class="font-display text-headline-sm text-primary">Handiwoodz</h3>
<p class="font-body-md text-on-surface-variant">© 2024 Handiwoodz. Crafted with patience and heritage. Preserving the tactile soul of artisan woodcraft.</p>
<div class="flex gap-4">
<a class="text-primary hover:text-secondary" href="#"><span class="material-symbols-outlined" data-icon="share">share</span></a>
<a class="text-primary hover:text-secondary" href="#"><span class="material-symbols-outlined" data-icon="language">language</span></a>
</div>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-primary uppercase tracking-widest">Collections</h4>
<ul class="space-y-2">
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">About</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Catalog</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Custom Design</a></li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-primary uppercase tracking-widest">Business</h4>
<ul class="space-y-2">
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Wholesale</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Contact</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Terms of Service</a></li>
</ul>
</div>
<div class="space-y-6">
<h4 class="font-label-md text-primary uppercase tracking-widest">Contact Us</h4>
<p class="font-body-md text-on-surface-variant italic">Visit our studio at the heart of the craft valley.</p>
<p class="font-body-md text-on-surface-variant">support@handiwoodz.com<br/>+91 98765 43210</p>
</div>
</div>
</footer>
<!-- Fixed Floating WhatsApp Button -->
<a class="fixed bottom- unit md:bottom-8 right-8 z-[60] w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all" href="#">
<span class="material-symbols-outlined text-[32px]" data-icon="chat">chat</span>
</a>
</body></html>
