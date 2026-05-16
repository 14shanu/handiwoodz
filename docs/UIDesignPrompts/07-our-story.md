# Our Story (`/our-story`)

## Design Prompt for Stitch AI

Design a brand story page for "Handiwoodz" — an artisan wood crafting business. This page builds trust and emotional connection with potential buyers. Content is CMS-driven (Strapi single type).

### Sections

#### 1. Hero / Page Header
- Full-width image: workshop/artisan at work (wood carving in progress)
- Overlay title: "Our Story"
- Subtitle: "Crafting tradition, one block at a time"

#### 2. Brand Story Content
- Rich text content area (CMS-driven)
- Alternating layout blocks:
  - Text left + image right
  - Image left + text right
- Content covers: origin story, craftsmanship, tradition, values
- Pull quotes / highlighted text for key statements
- Generous whitespace between sections

#### 3. Craftsmanship Showcase
- Section: "Our Process"
- 3-4 step visual cards (horizontal on desktop, vertical on mobile):
  - Step 1: Design Selection (icon + brief text)
  - Step 2: Wood Preparation (icon + brief text)
  - Step 3: Hand Carving (icon + brief text)
  - Step 4: Quality Check & Delivery (icon + brief text)
- Each step has a small illustration or photo

#### 4. Numbers / Impact (optional)
- Stats row: "X+ Products Crafted", "Y+ Happy Clients", "Z Years of Tradition"
- Clean, large numbers with labels below

#### 5. CTA Section
- "Ready to create something beautiful?"
- Two buttons: "Browse Collection" | "Upload Your Design"

### Design Tokens
- Warm, storytelling feel — more editorial/magazine style
- Large typography for headings (serif font)
- Body text: comfortable reading width (max 680px for text blocks)
- Images: full-bleed or rounded with subtle shadow
- Color: muted earth tones, cream backgrounds, dark brown text
- Spacing: very generous (64px+ between major sections)

### Responsive Requirements
- Mobile: Single column, images full-width, text stacked below
- Tablet: Alternating image/text blocks start side-by-side
- Desktop: Max-width 1100px for content, centered

### Interactions
- Subtle fade-in on scroll for content blocks
- Stats: count-up animation when scrolled into view
- Parallax on hero image (subtle)

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->
<!DOCTYPE html>

<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;family=EB+Garamond:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>.font-display {
    font-family: "EB Garamond", serif
    }
.font-body-md {
    font-family: "Montserrat", sans-serif
    }
.font-label-md {
    font-family: "Montserrat", sans-serif
    }
.texture-overlay {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCTe20sM96DRmZh0YHOi8QaI4WwcCMQttX8IbkfPLxzoCz2ahgbbu3_w6PqLoq42SejC-yY4mBoPMJMXSrDl_--GCPs0AtYa7PV4dgJno32dlbZZf_ZnDA-HpFjp_9dwdO7ZIH1I8jwFtfGs0kWygJgMidbSrnGebX5Mg2TTy1rHe4i6fNi0cfsFlPvQy6bNqCCLzBXOoIZDrK2qr0GYzqyszFjJBblA1kVZXz5mZ3jVe4rXSuOx1JsABZgV4k-8BUhaxYO_VaI_aY);
    opacity: 0.05;
    pointer-events: none
    }</style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-container": "#4a2c2a",
                        "outline-variant": "#d4c3c1",
                        "on-error": "#ffffff",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-fixed": "#062014",
                        "on-secondary-fixed-variant": "#793014",
                        "on-background": "#1b1c1a",
                        "surface-bright": "#fbf9f5",
                        "surface-variant": "#e4e2de",
                        "on-secondary-fixed": "#390c00",
                        "inverse-surface": "#30312e",
                        "secondary-fixed": "#ffdbcf",
                        "on-secondary": "#ffffff",
                        "on-primary-container": "#bd928f",
                        "primary-fixed": "#ffdad7",
                        "inverse-on-surface": "#f2f0ed",
                        "surface-container-low": "#f5f3ef",
                        "tertiary-fixed": "#ccead6",
                        "tertiary-fixed-dim": "#b0cdbb",
                        "tertiary-container": "#1f392c",
                        "surface-container-high": "#eae8e4",
                        "on-primary": "#ffffff",
                        "surface-tint": "#795553",
                        "on-surface-variant": "#504443",
                        "error": "#ba1a1a",
                        "primary": "#321716",
                        "on-primary-fixed": "#2e1413",
                        "tertiary": "#092317",
                        "surface-container-highest": "#e4e2de",
                        "surface-container": "#efeeea",
                        "secondary": "#984629",
                        "on-tertiary-fixed-variant": "#324c3e",
                        "on-tertiary": "#ffffff",
                        "on-primary-fixed-variant": "#5f3e3c",
                        "surface": "#fbf9f5",
                        "secondary-fixed-dim": "#ffb59c",
                        "on-tertiary-container": "#86a391",
                        "on-surface": "#1b1c1a",
                        "primary-fixed-dim": "#eabcb8",
                        "inverse-primary": "#eabcb8",
                        "secondary-container": "#fd9572",
                        "outline": "#827472",
                        "on-secondary-container": "#752c11",
                        "surface-dim": "#dbdad6",
                        "on-error-container": "#93000a",
                        "error-container": "#ffdad6",
                        "background": "#fbf9f5"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "margin-mobile": "20px",
                        "section-gap": "120px",
                        "gutter": "24px",
                        "margin-desktop": "64px",
                        "unit": "8px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "body-md": ["Montserrat"],
                        "display": ["EB Garamond"],
                        "headline-sm": ["EB Garamond"],
                        "headline-md": ["EB Garamond"],
                        "headline-lg": ["EB Garamond"],
                        "label-md": ["Montserrat"],
                        "headline-lg-mobile": ["EB Garamond"],
                        "body-lg": ["Montserrat"]
                    },
                    "fontSize": {
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background text-on-surface font-body-md overflow-x-hidden">
<div class="fixed inset-0 texture-overlay"></div>
<!-- Navigation Shell (TopNavBar) -->
<header class="bg-surface/90 dark:bg-surface-container/90 backdrop-blur-md text-primary dark:text-primary-fixed-dim docked full-width top-0 sticky z-50 shadow-sm shadow-primary/5">
<nav class="max-w-container-max mx-auto px-margin-desktop py-unit flex justify-between items-center w-full">
<div class="font-display text-headline-sm font-semibold text-primary dark:text-primary-fixed tracking-tight">Handiwoodz</div>
<div class="hidden md:flex gap-gutter items-center">
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" href="#">Catalog</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" href="#">Custom Design</a>
<a class="text-secondary dark:text-secondary-fixed-dim border-b-2 border-secondary dark:border-secondary-fixed-dim pb-1 font-semibold font-label-md text-label-md" href="#">Our Story</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" href="#">Wholesale</a>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-primary hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-300 p-2 rounded-full" data-icon="shopping_basket">shopping_basket</button>
</div>
</nav>
</header>
<main class="relative">
<!-- Section 1: Hero -->
<section class="relative h-[819px] w-full flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img alt="Woodworker's hands carving wood" class="w-full h-full object-cover" data-alt="A close-up, high-detail shot of aged, weathered hands of a master craftsman meticulously carving an intricate pattern into a block of rich, dark walnut wood. Fine wood shavings and dust are caught in the warm, golden side-lighting of a rustic workshop. The atmosphere is quiet, focused, and deeply tactile, emphasizing the connection between the artisan and the natural material." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuTzG1mQf_j0Hpn5BmmQgte4cXUKu417LNhSLAc-w2Mgc2VOrJDgl4u5kGgb2hwDt5FcR2_gk8Cdbb0MmbEth8SYoDM6nOsUi7YpbIgJYT9HoefGnDM9D0ZkhYcfUh2DWysJtDX-2eReQPfSIQ24EaX259290szQ9w_22Dvb2RDvTruef2F8wWw3ODuPlhzZExwU_-YA93GjtGcCibshqRTVdneCE3KOMWLuk3_aOOT6AuA6a8S210f2tC2hBgkoB9OU8RV-VbBdw"/>
<div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
</div>
<div class="relative z-10 text-center text-white px-margin-mobile">
<h1 class="font-display text-display mb-4">Our Story</h1>
<p class="font-body-md text-body-lg max-w-xl mx-auto opacity-90">Crafting tradition, one block at a time</p>
</div>
</section>
<!-- Section 2: Brand Narrative -->
<section class="max-w-[1100px] mx-auto px-margin-mobile py-section-gap space-y-section-gap">
<!-- Narrative Block 1 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
<div class="order-2 md:order-1">
<img alt="Seasoned wood logs" class="w-full aspect-[4/5] object-cover rounded-lg shadow-primary/5 shadow-lg" data-alt="A stack of beautifully seasoned solid wood logs, including teak and sheesham, resting in a sun-drenched outdoor storage area of a woodcarving studio. The natural textures of the bark and the concentric rings of the cut wood are sharply defined. The lighting is soft and natural, reflecting a calm, slow-living philosophy with warm earthy tones of brown and ivory." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj45tuOm2I25DsxiOw_W_HMfQMOF_ILi4e5lXVsVHjltB6B-dxcu8rXwpjI4Qaa-8uotr7AXTT5DYEWKP7HKvwX2F3c8MZjUxNmmsnhwoOlSNNFQExnV7gPnA9vdZn8-Y3ESbLR2q2L8lfMxmo0GaPQjDHH7a_BpXvrqJ_S4AVhxh7E4so9JHSdqIXeeBtPwSKTdqanECHnco1zcdTRvj6eA7c-LKGNRQi6-uGzY2eu2y-FjhuvuHooBNcUZyXZnn5gIN8aSn_TEI"/>
</div>
<div class="order-1 md:order-2 md:pl-margin-desktop">
<span class="font-label-md text-label-md text-secondary mb-4 block uppercase">The Heritage</span>
<h2 class="font-display text-headline-lg mb-6">The Heart of Woodcraft</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Handiwoodz was born in a small coastal workshop with nothing but a single chisel and a profound respect for the living tree. Our journey began with the realization that in an age of mass production, the soul of a piece is found in the time it takes to create it. We preserve the ancient techniques of hand-carving that have been passed down through generations of master woodworkers.</p>
</div>
</div>
<!-- Narrative Block 2 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
<div class="md:pr-margin-desktop">
<span class="font-label-md text-label-md text-secondary mb-4 block uppercase">Our People</span>
<h2 class="font-display text-headline-lg mb-6">Master Artisans</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-8">Our workshop is home to artisans who have spent decades perfecting the art of the cut. These are not just employees; they are the custodians of a dying art form. Each piece reflects their individual touch, a unique signature that no machine can ever replicate.</p>
<blockquote class="border-l-4 border-secondary pl-6 italic">
<p class="font-display text-headline-sm text-primary">"Every stroke of the chisel is a breath of life into the wood."</p>
</blockquote>
</div>
<div>
<img alt="Detailed carving in progress" class="w-full aspect-[4/5] object-cover rounded-lg shadow-primary/5 shadow-lg" data-alt="A macro shot of a craftsman's hands working on a highly intricate floral wood carving. The wood is a warm teak, and the detail is so fine that you can see the texture of the grain. The lighting highlights the depth of the carving, creating a dramatic interplay of light and shadow that feels both premium and grounded in artisan tradition." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwD52URHdmQCIs9-W-AlnWmrHB5e1cvPfm1Z4EgHEGHjUc3zg4TUEiIf7_hm7q5yKmaDzn3HYNSAxlx-DWz271oer0hTiehVbbEy6KRVQ4a196G4Y-RDG_5sT3e7KMuajE7HWE8Ck4o_ZSaz84QZgFwew3n9Nxs1wLF5EJbnCmP8Oi7jruE5Tum6cAxae4WwqWQIP8yp0Jtzhlle3yLu4hRTEnS2wyqt2HRUoOoKAEFQncdzNs8coCrdMtsmGtl_wMc11_JJqkRmc"/>
</div>
</div>
<!-- Narrative Block 3: Values -->
<div class="bg-surface-container-low rounded-xl p-12 md:p-20 text-center shadow-sm">
<div class="max-w-3xl mx-auto">
<span class="font-label-md text-label-md text-secondary mb-4 block uppercase">Commitment</span>
<h2 class="font-display text-headline-lg mb-6">Our Values</h2>
<p class="font-body-md text-body-lg text-on-surface-variant mb-0">We believe in sustainability as a way of life, not a marketing term. Every piece of Sheesham and Teak is ethically sourced from managed forests. Our process is intentionally slow, allowing the wood to season naturally and our artisans to work without the pressure of a clock. This is slow living in physical form.</p>
</div>
</div>
</section>
<!-- Section 3: Our Process -->
<section class="bg-surface-container-highest/30 py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile">
<div class="text-center mb-16">
<h2 class="font-display text-headline-lg">The Journey of a Handiwoodz Piece</h2>
<div class="w-24 h-1 bg-secondary mx-auto mt-6"></div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<!-- Step 1 -->
<div class="bg-surface p-8 rounded-lg shadow-primary/5 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform duration-300">
<span class="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="architecture">architecture</span>
<h3 class="font-display text-headline-sm mb-4">Design Selection</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Digital blueprints meets ancient patterns to create timeless designs.</p>
</div>
<!-- Step 2 -->
<div class="bg-surface p-8 rounded-lg shadow-primary/5 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform duration-300">
<span class="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="forest">forest</span>
<h3 class="font-display text-headline-sm mb-4">Wood Preparation</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Selecting only the finest Sheesham and Teak from sustainable sources.</p>
</div>
<!-- Step 3 -->
<div class="bg-surface p-8 rounded-lg shadow-primary/5 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform duration-300">
<span class="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="construction">construction</span>
<h3 class="font-display text-headline-sm mb-4">Hand Carving</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Patience and precision in every detail carved by our artisans.</p>
</div>
<!-- Step 4 -->
<div class="bg-surface p-8 rounded-lg shadow-primary/5 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform duration-300">
<span class="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="health_and_safety">health_and_safety</span>
<h3 class="font-display text-headline-sm mb-4">Quality &amp; Care</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Finished with natural oils for a lifetime of beauty and use.</p>
</div>
</div>
</div>
</section>
<!-- Section 4: Heritage Stats -->
<section class="max-w-[1100px] mx-auto px-margin-mobile py-section-gap">
<div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
<div class="p-8">
<div class="font-display text-display text-primary mb-2">15,000+</div>
<div class="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase">Blocks Crafted</div>
</div>
<div class="p-8 border-y md:border-y-0 md:border-x border-outline/10">
<div class="font-display text-display text-primary mb-2">40+</div>
<div class="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase">Master Artisans</div>
</div>
<div class="p-8">
<div class="font-display text-display text-primary mb-2">3</div>
<div class="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase">Decades of Heritage</div>
</div>
</div>
</section>
<!-- Section 5: CTA -->
<section class="bg-primary text-on-primary py-section-gap overflow-hidden relative">
<div class="absolute inset-0 opacity-10">
<div class="absolute top-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl -mr-48 -mt-48"></div>
<div class="absolute bottom-0 left-0 w-96 h-96 bg-tertiary-container rounded-full blur-3xl -ml-48 -mb-48"></div>
</div>
<div class="max-w-3xl mx-auto px-margin-mobile text-center relative z-10">
<h2 class="font-display text-headline-lg mb-8 text-surface">Ready to create something beautiful?</h2>
<div class="flex flex-col sm:flex-row gap-4 justify-center">
<button class="bg-secondary text-on-secondary px-10 py-4 rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-all shadow-lg shadow-black/20">
                        Browse Collection
                    </button>
<button class="border border-surface/30 text-surface px-10 py-4 rounded-lg font-label-md text-label-md hover:bg-surface/10 transition-all">
                        Upload Your Design
                    </button>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container w-full rounded-none border-t border-outline/20 dark:border-outline-variant/10 shadow-none">
<div class="w-full py-section-gap px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto">
<div class="md:col-span-1">
<span class="font-display text-headline-md text-surface dark:text-surface-bright mb-4 block">Handiwoodz</span>
<p class="font-body-md text-body-md text-on-primary/70 mb-6">Dedicated to the soul of master craftsmanship.</p>
</div>
<div>
<h4 class="font-display text-headline-sm text-surface mb-6">Shop</h4>
<ul class="space-y-4">
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Block Prints</a></li>
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Furniture</a></li>
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Decor</a></li>
</ul>
</div>
<div>
<h4 class="font-display text-headline-sm text-surface mb-6">Info</h4>
<ul class="space-y-4">
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Privacy Policy</a></li>
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Terms of Service</a></li>
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Shipping &amp; Returns</a></li>
<li><a class="text-on-primary/80 hover:text-surface transition-colors font-label-md" href="#">Contact Us</a></li>
</ul>
</div>
<div>
<h4 class="font-display text-headline-sm text-surface mb-6">Connect</h4>
<div class="flex gap-4">
<span class="material-symbols-outlined cursor-pointer hover:text-secondary-fixed transition-colors" data-icon="share">share</span>
<span class="material-symbols-outlined cursor-pointer hover:text-secondary-fixed transition-colors" data-icon="mail">mail</span>
</div>
</div>
</div>
<div class="max-w-container-max mx-auto px-margin-desktop py-8 border-t border-on-primary/10 text-center md:text-left">
<p class="font-label-md text-label-md text-on-primary/60">© 2024 Handiwoodz. Dedicated to the soul of master craftsmanship.</p>
</div>
</footer>
</body></html>

