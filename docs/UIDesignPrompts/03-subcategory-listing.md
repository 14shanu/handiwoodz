# Subcategory / Product Listing (`/catalog/[category]/[subcategory]`)

## Design Prompt for Stitch AI

Design a product listing page with a filters sidebar for "Handiwoodz". Shows all products within a subcategory with filtering capabilities.

### Sections

#### 1. Page Header
- Breadcrumb: Home > Catalog > [Category] > [Subcategory]
- Page title: Subcategory name (e.g., "Hand Carved Printing Blocks")
- Product count: "24 products"

#### 2. Layout (Two Column on Desktop)

##### Left: Filters Sidebar (Desktop) / Filter Drawer (Mobile)
- **Mobile**: "Filter" button at top → opens bottom sheet/drawer
- **Desktop**: Sticky sidebar (240px wide)
- Filter groups (collapsible accordion):
  - Size (checkbox list: 3x3, 4x4, 6x6, Custom)
  - Wood Type (checkbox: Teak, Sheesham, Mango, etc.)
  - Style (checkbox: Traditional, Modern, Geometric, Floral)
  - Shape (checkbox: Square, Round, Rectangular, Custom)
  - Color Count (checkbox: Single, Two, Three, Multicolor)
  - Craft Type (checkbox: Hand Carved, Machine Assisted)
  - Theme (checkbox: Floral, Animal, Geometric, Religious, Abstract)
- "Clear All" button at top
- Active filter chips shown above product grid

##### Right: Product Grid
- Grid: 2 cols mobile, 3 cols tablet, 3-4 cols desktop
- Sort dropdown (top-right): "Sort by: Featured, Newest, Name A-Z"
- Each product card:
  - Product image (square aspect ratio, object-fit cover)
  - Product name
  - Short description (1 line, truncated)
  - Size options preview (e.g., "3 sizes available")
  - "Add to Quote" button (outline style)
  - Min quantity badge if > 1 (e.g., "Min: 10 pcs")
- Pagination or "Load More" at bottom

#### 3. Empty State
- If no products match filters: friendly illustration + "No products match your filters" + "Clear filters" button

### Design Tokens
- Filter sidebar: light background (cream/off-white), subtle border-right separator
- Product cards: white background, subtle border, warm shadow on hover
- Active filter chips: terracotta/accent color with × to remove
- Consistent card heights within each row

### Responsive Requirements
- Mobile (320px+): Full-width grid (2 cols), filter button opens bottom sheet
- Tablet (768px+): 3-column grid, filter sidebar collapses to top bar
- Desktop (1024px+): Sidebar + 3-col grid side by side
- Large (1440px+): Sidebar + 4-col grid

### Interactions
- Filter changes update URL params and grid instantly (no page reload)
- Product card hover: lift + shadow
- "Add to Quote" button: fills solid on hover, shows checkmark briefly on click
- Smooth scroll to top on pagination change

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->


<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&amp;family=Montserrat:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#504443",
                    "secondary": "#984629",
                    "primary-fixed": "#ffdad7",
                    "on-primary": "#ffffff",
                    "surface-dim": "#dbdad6",
                    "on-error-container": "#93000a",
                    "outline": "#827472",
                    "secondary-fixed": "#ffdbcf",
                    "inverse-on-surface": "#f2f0ed",
                    "tertiary": "#092317",
                    "surface-container-lowest": "#ffffff",
                    "error-container": "#ffdad6",
                    "surface-container": "#efeeea",
                    "secondary-container": "#fd9572",
                    "tertiary-fixed-dim": "#b0cdbb",
                    "on-surface": "#1b1c1a",
                    "surface-container-highest": "#e4e2de",
                    "on-secondary": "#ffffff",
                    "background": "#fbf9f5",
                    "tertiary-container": "#1f392c",
                    "on-secondary-fixed-variant": "#793014",
                    "surface-container-high": "#eae8e4",
                    "outline-variant": "#d4c3c1",
                    "on-primary-fixed-variant": "#5f3e3c",
                    "surface": "#fbf9f5",
                    "tertiary-fixed": "#ccead6",
                    "secondary-fixed-dim": "#ffb59c",
                    "surface-variant": "#e4e2de",
                    "on-error": "#ffffff",
                    "primary-container": "#4a2c2a",
                    "primary": "#321716",
                    "on-primary-fixed": "#2e1413",
                    "inverse-surface": "#30312e",
                    "surface-bright": "#fbf9f5",
                    "primary-fixed-dim": "#eabcb8",
                    "on-primary-container": "#bd928f",
                    "on-tertiary": "#ffffff",
                    "inverse-primary": "#eabcb8",
                    "on-tertiary-container": "#86a391",
                    "on-secondary-container": "#752c11",
                    "on-tertiary-fixed": "#062014",
                    "surface-tint": "#795553",
                    "surface-container-low": "#f5f3ef",
                    "on-secondary-fixed": "#390c00",
                    "error": "#ba1a1a",
                    "on-background": "#1b1c1a",
                    "on-tertiary-fixed-variant": "#324c3e"
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
                    "section-gap": "120px",
                    "gutter": "24px",
                    "container-max": "1280px",
                    "margin-mobile": "20px"
            },
            "fontFamily": {
                    "headline-sm": ["EB Garamond"],
                    "headline-md": ["EB Garamond"],
                    "label-md": ["Montserrat"],
                    "headline-lg-mobile": ["EB Garamond"],
                    "headline-lg": ["EB Garamond"],
                    "body-md": ["Montserrat"],
                    "body-lg": ["Montserrat"],
                    "display": ["EB Garamond"]
            },
            "fontSize": {
                    "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                    "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}]
            }
          },
        },
      }
    </script>
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24
    }
.grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99;
    opacity: 0.03;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAZlK0LOgCT3pldXvCJWsu0iLyL_Gc4fERhdhPRHqTJmCK90Ct7wEngV6Ev_6-SSYiV5i4Zsy-5JCr1Cj3JgybCA2IEFH-nKN_1Et05gPM9jTJyo-Jw9Ccw-fY54ptAgG6ZN6BMkVsdHy_y7m2ONY_XhOcGMA94wX-3wgYw6JTKMfHMNpv649FzcGWZ4gbIBEjjGwOvpLPLgBUxBCl8X7riX6i4jeutXr2WohWTnotIA_qE8DA0V0qLb3r9MiTm2Io_SFJqrugpf9c)
    }
::-webkit-scrollbar {
    width: 6px
    }
::-webkit-scrollbar-track {
    background: #fbf9f5
    }
::-webkit-scrollbar-thumb {
    background: #d4c3c1;
    border-radius: 10px
    }</style>
</head>
<body class="bg-background text-primary font-body-md selection:bg-secondary/20">
<div class="grain-overlay"></div>
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(50,23,22,0.08)]">
<div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div class="font-display text-headline-md text-primary dark:text-inverse-primary tracking-tight">Handiwoodz</div>
<div class="hidden md:flex items-center space-x-8">
<a class="text-secondary dark:text-secondary-fixed-dim border-b-2 border-secondary font-semibold font-body-md py-1" href="#">Catalog</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300" href="#">Custom Design</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300" href="#">Our Story</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300" href="#">Wholesale</a>
</div>
<div class="flex items-center space-x-6 text-primary">
<button class="material-symbols-outlined hover:text-secondary transition-colors" data-icon="shopping_basket">shopping_basket</button>
<button class="material-symbols-outlined hover:text-secondary transition-colors" data-icon="chat">chat</button>
</div>
</div>
</nav>
<main class="pt-28 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<!-- Breadcrumbs -->
<nav class="mb-8 flex items-center text-sm font-label-md text-on-surface-variant opacity-70">
<a class="hover:text-secondary transition-colors" href="#">Home</a>
<span class="mx-2">/</span>
<a class="hover:text-secondary transition-colors" href="#">Catalog</a>
<span class="mx-2">/</span>
<a class="hover:text-secondary transition-colors" href="#">Printing Blocks</a>
<span class="mx-2">/</span>
<span class="text-primary font-semibold">Hand Carved</span>
</nav>
<!-- Header -->
<div class="mb-12">
<h1 class="font-headline-lg text-headline-lg text-primary mb-2">Hand Carved Printing Blocks</h1>
<p class="font-body-md text-on-surface-variant">24 products meticulously crafted by our master woodworkers.</p>
</div>
<div class="flex flex-col md:flex-row gap-gutter">
<!-- Sidebar Filters -->
<aside class="w-full md:w-[240px] flex-shrink-0">
<div class="sticky top-28 space-y-8">
<div class="flex items-center justify-between border-b border-outline-variant/30 pb-4">
<span class="font-label-md text-primary uppercase tracking-widest">Filters</span>
<button class="text-xs font-label-md text-secondary hover:underline">Clear All</button>
</div>
<!-- Filter Groups -->
<div class="space-y-6">
<!-- Wood Type -->
<details class="group" open="">
<summary class="flex justify-between items-center cursor-pointer list-none font-label-md text-on-surface-variant uppercase text-xs tracking-wider">
                                Wood Type
                                <span class="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 space-y-3 font-body-md text-sm">
<label class="flex items-center gap-3 cursor-pointer group/item">
<input checked="" class="w-4 h-4 border-outline-variant text-secondary focus:ring-secondary/20 rounded-sm" type="checkbox"/>
<span class="group-hover/item:text-secondary transition-colors">Sheesham Wood</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group/item">
<input class="w-4 h-4 border-outline-variant text-secondary focus:ring-secondary/20 rounded-sm" type="checkbox"/>
<span class="group-hover/item:text-secondary transition-colors">Teak Wood</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group/item">
<input class="w-4 h-4 border-outline-variant text-secondary focus:ring-secondary/20 rounded-sm" type="checkbox"/>
<span class="group-hover/item:text-secondary transition-colors">Mango Wood</span>
</label>
</div>
</details>
<!-- Size -->
<details class="group">
<summary class="flex justify-between items-center cursor-pointer list-none font-label-md text-on-surface-variant uppercase text-xs tracking-wider">
                                Size
                                <span class="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 space-y-3 font-body-md text-sm">
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Small (2" - 4")</span>
</label>
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Medium (4" - 6")</span>
</label>
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Large (6" +)</span>
</label>
</div>
</details>
<!-- Theme -->
<details class="group">
<summary class="flex justify-between items-center cursor-pointer list-none font-label-md text-on-surface-variant uppercase text-xs tracking-wider">
                                Theme
                                <span class="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 space-y-3 font-body-md text-sm">
<label class="flex items-center gap-3 cursor-pointer">
<input checked="" class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Floral &amp; Botanical</span>
</label>
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Geometric</span>
</label>
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Tribal Patterns</span>
</label>
</div>
</details>
<!-- Craft Type -->
<details class="group">
<summary class="flex justify-between items-center cursor-pointer list-none font-label-md text-on-surface-variant uppercase text-xs tracking-wider">
                                Craft Type
                                <span class="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 space-y-3 font-body-md text-sm">
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Jaipur Block Printing</span>
</label>
<label class="flex items-center gap-3 cursor-pointer">
<input class="w-4 h-4 border-outline-variant text-secondary rounded-sm" type="checkbox"/>
<span>Sanganeri</span>
</label>
</div>
</details>
</div>
<!-- Promo Card -->
<div class="bg-primary p-6 rounded-lg text-inverse-on-surface relative overflow-hidden group">
<div class="relative z-10">
<h4 class="font-headline-sm text-headline-sm mb-2 leading-tight">Bespoke Engraving</h4>
<p class="text-xs opacity-80 mb-4 font-body-md">Create blocks with your custom logo or pattern.</p>
<a class="text-secondary font-label-md text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors" href="#">Start Design →</a>
</div>
<div class="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
<span class="material-symbols-outlined text-9xl">carpenter</span>
</div>
</div>
</div>
</aside>
<!-- Main Product Area -->
<div class="flex-grow">
<!-- Toolbar -->
<div class="flex flex-wrap items-center justify-between gap-4 mb-8">
<div class="flex flex-wrap items-center gap-2">
<span class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mr-2">Active Filters:</span>
<div class="flex items-center bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-label-md shadow-sm gap-2">
                            Sheesham Wood
                            <span class="material-symbols-outlined text-xs cursor-pointer">close</span>
</div>
<div class="flex items-center bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-label-md shadow-sm gap-2">
                            Floral
                            <span class="material-symbols-outlined text-xs cursor-pointer">close</span>
</div>
</div>
<div class="flex items-center gap-4">
<span class="font-label-md text-xs text-on-surface-variant uppercase">Sort By:</span>
<select class="bg-transparent border-none font-label-md text-xs text-primary focus:ring-0 cursor-pointer pr-8 py-0">
<option>Featured</option>
<option>Newest Arrival</option>
<option>Price: Low to High</option>
<option>Name: A-Z</option>
</select>
</div>
</div>
<!-- Product Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<!-- Product 1 -->
<div class="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg overflow-hidden border border-outline-variant/10">
<div class="relative aspect-square overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A detailed close-up of a hand-carved Sheesham wood printing block featuring intricate floral mandala patterns. The wood has a deep, warm grain with subtle artisan tool marks visible in the carvings. The background is a soft ivory linen, illuminated by warm, directional side-lighting that highlights the depth of the engravings. The overall aesthetic is rustic luxury, reflecting a heritage craftsmanship style with a rich brown and cream color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUpdAozBk9dyqBW7L0XksBvQWjCeI3e2L5bCj_p1obJPCF_QsPuxEo_96m_v79ev0n_J1LpcYU88gcIBjH43fKQvyzJ3kpKf_o_6WY6N75atIMyz7KEwN5SyYUoMJ9Sxh3IcQZa__UkpPxzpMAjNr8gI-ImssAfpeK7YoDn-oAnONC51Ex-Afv4fVKML4xrqhVRwnXzpOeMgM-pgd-30S2rWBQFAlXG9r3dVKiRXU3J5vSWU2VlzvIxV7yNe5_JJ-yKgrU1PHnL08"/>
<div class="absolute top-3 left-3 bg-tertiary text-white font-label-md text-[10px] px-2 py-1 uppercase tracking-wider rounded-sm">
                                Min: 10 pcs
                            </div>
</div>
<div class="p-5">
<div class="flex flex-col h-full">
<h3 class="font-headline-sm text-lg text-primary mb-1">Mandala Floret Block</h3>
<p class="text-xs text-on-surface-variant font-body-md line-clamp-2 mb-3">Traditional circular floret motif hand-carved in seasoned hardwood.</p>
<div class="mt-auto">
<p class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Size: 4.5" Diameter</p>
<button class="w-full border border-primary text-primary font-label-md text-[11px] uppercase tracking-[0.15em] py-3 hover:bg-primary hover:text-white transition-all duration-300">Add to Quote</button>
</div>
</div>
</div>
</div>
<!-- Product 2 -->
<div class="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg overflow-hidden border border-outline-variant/10">
<div class="relative aspect-square overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A masterfully carved teak wood block showing a traditional Indian paisley border pattern. The wood is naturally light and oily, with sharp, precise edges on the relief carving. The scene is set on an artisan's workbench with wood shavings around, in high-key natural lighting that emphasizes the tactile quality of the piece. The photography is clean and minimalist, highlighting the organic texture of the wood against a neutral, warm background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxYYZNUPHAK_084b3ZQUP2DwxbjtWMoLY01VSTsntWmH7075aKHcvJNasK9KMwVP2U_7POOmPRgx9EwC7SmCSA88R--KZyk5zwGzMCC1sVpL76iVyTSexBsrMzRULFuFva06uonsmmGrJMNxdCMlNnI-gB6JqkCii-6CpdaEDNq81LYnxjpDyZPVexzJ98McZi2U8tVpB--L9-g5jdmgdX3qqOcf2hcJjtH9C7l4CuqZ9zm_GzEVl4c2-OyOGzCTPAsg1OPDMNvjM"/>
</div>
<div class="p-5">
<div class="flex flex-col h-full">
<h3 class="font-headline-sm text-lg text-primary mb-1">Paisley Border Unit</h3>
<p class="text-xs text-on-surface-variant font-body-md line-clamp-2 mb-3">Continuous paisley pattern for fabric borders and edging.</p>
<div class="mt-auto">
<p class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Size: 2" x 6"</p>
<button class="w-full border border-primary text-primary font-label-md text-[11px] uppercase tracking-[0.15em] py-3 hover:bg-primary hover:text-white transition-all duration-300">Add to Quote</button>
</div>
</div>
</div>
</div>
<!-- Product 3 -->
<div class="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg overflow-hidden border border-outline-variant/10">
<div class="relative aspect-square overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A collection of small, geometric hand-carved wood blocks arranged asymmetrically on a dark brown wooden surface. Each block features a unique star or diamond pattern. The lighting is moody and dramatic, with a spotlight focus on the center block. The image captures a sense of timeless craftsmanship and high-end artisan quality, using deep earth tones and textured wood grain surfaces to evoke a warm, physical workshop environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvXsk_udZUKWJNAnfN3ZzFsRXygYaPVK_fQIHz1ZZ5kghe82LKLgxyfOw_P19-e2ywPYKbZnsLTRtuHeuipjbW1NxmCQu6EShPQKee5u1PpgcCx5Xg-Z2Hqfyb_NpuLMv8CsJ3Nt8oqrHvDERFmY6bw7Ql7ciu_fD5vFhHd9z8ki4sjiXaa6aiYxhudkcoi5HiKymNBVT5cpxprfqW-gRtyUF-hAl-D_6NrrW1CalhAFxUiMoXRfkVHWddojWf4IgXavoB6plf-MM"/>
<div class="absolute top-3 right-3 bg-secondary text-white font-label-md text-[10px] px-2 py-1 uppercase tracking-wider rounded-sm">
                                Popular
                            </div>
</div>
<div class="p-5">
<div class="flex flex-col h-full">
<h3 class="font-headline-sm text-lg text-primary mb-1">Geometric Tile Set</h3>
<p class="text-xs text-on-surface-variant font-body-md line-clamp-2 mb-3">Set of 3 small blocks with interlocking geometric star patterns.</p>
<div class="mt-auto">
<p class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Size: 3" x 3"</p>
<button class="w-full border border-primary text-primary font-label-md text-[11px] uppercase tracking-[0.15em] py-3 hover:bg-primary hover:text-white transition-all duration-300">Add to Quote</button>
</div>
</div>
</div>
</div>
<!-- Product 4 -->
<div class="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg overflow-hidden border border-outline-variant/10">
<div class="relative aspect-square overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Intricate vine-like botanical engravings on a large, heavy block of Mango wood. The wood has a distinctive grain and light honey hue. The image is taken from a low angle, giving the block a monolithic and architectural feel. Soft, diffused lighting fills the frame, creating a serene and premium atmosphere that focuses on the fine detail of the handmade craft. The color palette is composed of soft creams, warm honey woods, and deep shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sX7PlXnzpeZJNx3W9CgYqBGduhXECUwxESZQr6ojuFRB7CLBArnd1yZzTsCrZKHCHMMFVtq6Mie13ZOUrTEy4Gyedc5OXdOoZ3dgocLQt2XgBlLxI8_DYq-mo3A-MB1azSw1nEdRM62_wW8jmreJpGQu6ZV-0AQQf2lPmkAKBULWlIOZc_KfII83frHugqyChfNd-SML95-VOjbSfBhR2SthaadEm0u_Onot_haESlN_kMYDzvrur8rIj3TDGk2qFhC5Uj8nidg"/>
</div>
<div class="p-5">
<div class="flex flex-col h-full">
<h3 class="font-headline-sm text-lg text-primary mb-1">Botanical Vine Block</h3>
<p class="text-xs text-on-surface-variant font-body-md line-clamp-2 mb-3">Artisan-grade Mango wood block featuring delicate climbing vine details.</p>
<div class="mt-auto">
<p class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Size: 8" x 3"</p>
<button class="w-full border border-primary text-primary font-label-md text-[11px] uppercase tracking-[0.15em] py-3 hover:bg-primary hover:text-white transition-all duration-300">Add to Quote</button>
</div>
</div>
</div>
</div>
<!-- Repeat for more products... for visual balance of the grid request -->
<div class="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg border border-outline-variant/10 p-5 flex flex-col justify-center items-center text-center">
<div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
</div>
<h3 class="font-headline-sm text-lg text-primary mb-2">Need a custom size?</h3>
<p class="text-xs text-on-surface-variant font-body-md mb-6 px-4">Our artisans can scale any pattern to your specific requirements.</p>
<a class="text-secondary font-label-md text-[10px] uppercase tracking-widest border-b border-secondary pb-1" href="#">Inquire Now</a>
</div>
</div>
<!-- Pagination -->
<div class="mt-20 flex items-center justify-center gap-4">
<button class="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<div class="flex items-center gap-2">
<button class="w-12 h-12 rounded-full bg-primary text-white font-label-md">1</button>
<button class="w-12 h-12 rounded-full hover:bg-surface-container-highest transition-colors font-label-md">2</button>
<button class="w-12 h-12 rounded-full hover:bg-surface-container-highest transition-colors font-label-md">3</button>
<span class="px-2">...</span>
<button class="w-12 h-12 rounded-full hover:bg-surface-container-highest transition-colors font-label-md">6</button>
</div>
<button class="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full mt-section-gap bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/30">
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
<div class="col-span-1 md:col-span-1">
<div class="font-display text-headline-sm text-primary dark:text-inverse-primary mb-4">Handiwoodz</div>
<p class="text-on-surface-variant text-sm font-body-md mb-6 leading-relaxed">Dedicated to the preservation of woodcraft heritage, bridging generations of master artisans with modern slow-living.</p>
<div class="flex gap-4">
<a class="material-symbols-outlined text-on-surface-variant hover:text-primary" data-icon="public" href="#">public</a>
<a class="material-symbols-outlined text-on-surface-variant hover:text-primary" data-icon="share" href="#">share</a>
</div>
</div>
<div>
<h5 class="font-label-md text-xs uppercase tracking-[0.2em] mb-6 text-primary">Discover</h5>
<ul class="space-y-4 font-body-md text-sm text-on-surface-variant">
<li><a class="hover:text-primary underline transition-all" href="#">Catalog</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Custom Design</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Wholesale</a></li>
</ul>
</div>
<div>
<h5 class="font-label-md text-xs uppercase tracking-[0.2em] mb-6 text-primary">Company</h5>
<ul class="space-y-4 font-body-md text-sm text-on-surface-variant">
<li><a class="hover:text-primary underline transition-all" href="#">About</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Our Story</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Heritage Craft</a></li>
</ul>
</div>
<div>
<h5 class="font-label-md text-xs uppercase tracking-[0.2em] mb-6 text-primary">Service</h5>
<ul class="space-y-4 font-body-md text-sm text-on-surface-variant">
<li><a class="hover:text-primary underline transition-all" href="#">Contact</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Terms of Service</a></li>
<li><a class="hover:text-primary underline transition-all" href="#">Shipping Policy</a></li>
</ul>
</div>
</div>
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center text-xs font-label-md text-on-surface-variant/60 uppercase tracking-widest">
<p>© 2024 Handiwoodz. Crafted with patience and heritage.</p>
<div class="mt-4 md:mt-0 flex gap-8">
<a href="#">Privacy</a>
<a href="#">Cookies</a>
</div>
</div>
</footer>
</body></html>