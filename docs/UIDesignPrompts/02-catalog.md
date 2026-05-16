# Catalog Page (`/catalog`)

## Design Prompt for Stitch AI

Design a category browsing page for "Handiwoodz" — showing all product categories as a visual grid. This is the entry point to the product catalog.

### Sections (Top to Bottom)

#### 1. Page Header
- Breadcrumb: Home > Catalog
- Page title: "Our Collection"
- Subtitle: "Explore handcrafted wood products by category"

#### 2. Category Grid
- Large visual cards for each category (e.g., Printing Blocks, Wall Plates, Pichwai Art, Logo Blocks, Custom Pieces)
- Each card:
  - Full-bleed category image
  - Category name overlay (bottom, on semi-transparent dark gradient)
  - Subcategory count badge (e.g., "5 collections")
  - Entire card is clickable
- Grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Cards are equal height with aspect ratio maintained

#### 3. Custom Design CTA (inline)
- Small banner between or after categories
- "Don't see what you need? Upload your own design →"
- Links to `/custom-design`

### Design Tokens
- Same earth-tone palette as homepage
- Cards have subtle border and warm shadow on hover
- Generous padding between cards (24px gap)
- Category images should feel curated and high-quality

### Responsive Requirements
- Mobile: Full-width stacked cards with 16px padding
- Tablet: 2-column grid with equal card heights
- Desktop: 3-column grid, max-width 1280px container

### Interactions
- Card hover: image slight zoom (scale 1.03), shadow deepens
- Smooth page transition when clicking into a category

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
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.grain-overlay {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAD_VNSjSkIMBvuYJiXnGz3uAaheNwfIGR7HZyQ4qlc0Bau5jytwDN3kfVB9EzAjiNJLWKUZGqkZ-RFBO51c5VqkKA2JnDKDpTAdBkeDXRSuYGXO1tQgaWfGwgI-hFhWqm91SiqHUSwxPM29tueA3cRc2iw_JUL8oT7P-Az_AUtyaoaz3BJMyi9pVyRwpE5ORnAgGpklArtkzokC3iXRR2TEeW-16RkW5YufMqvS7PRQEiWEUzg0krI4yo5RcH6u5M29T4n8Yp-j5Q);
    opacity: 0.05;
    pointer-events: none
    }
.hover-lift {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), shadow 0.3s ease
    }
.hover-lift:hover {
    transform: translatey(-8px)
    }
.image-zoom-container img {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)
    }
.image-zoom-container:hover img {
    transform: scale(1.05)
    }</style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-tertiary-fixed-variant": "#324c3e",
                      "on-tertiary-fixed": "#062014",
                      "on-error-container": "#93000a",
                      "on-surface": "#1b1c1a",
                      "surface-container-high": "#eae8e4",
                      "surface-container-lowest": "#ffffff",
                      "on-secondary-container": "#752c11",
                      "primary-fixed": "#ffdad7",
                      "surface": "#fbf9f5",
                      "on-tertiary": "#ffffff",
                      "secondary-fixed-dim": "#ffb59c",
                      "primary": "#321716",
                      "on-error": "#ffffff",
                      "secondary-container": "#fd9572",
                      "primary-container": "#4a2c2a",
                      "outline": "#827472",
                      "surface-container-low": "#f5f3ef",
                      "surface-dim": "#dbdad6",
                      "inverse-on-surface": "#f2f0ed",
                      "on-primary-fixed": "#2e1413",
                      "on-primary-container": "#bd928f",
                      "inverse-primary": "#eabcb8",
                      "surface-variant": "#e4e2de",
                      "inverse-surface": "#30312e",
                      "primary-fixed-dim": "#eabcb8",
                      "on-secondary": "#ffffff",
                      "surface-tint": "#795553",
                      "on-background": "#1b1c1a",
                      "secondary": "#984629",
                      "tertiary-fixed": "#ccead6",
                      "on-secondary-fixed-variant": "#793014",
                      "surface-container-highest": "#e4e2de",
                      "tertiary-fixed-dim": "#b0cdbb",
                      "tertiary-container": "#1f392c",
                      "secondary-fixed": "#ffdbcf",
                      "surface-container": "#efeeea",
                      "on-surface-variant": "#504443",
                      "outline-variant": "#d4c3c1",
                      "on-primary": "#ffffff",
                      "background": "#fbf9f5",
                      "error-container": "#ffdad6",
                      "on-secondary-fixed": "#390c00",
                      "on-primary-fixed-variant": "#5f3e3c",
                      "on-tertiary-container": "#86a391",
                      "tertiary": "#092317",
                      "surface-bright": "#fbf9f5",
                      "error": "#ba1a1a"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "section-gap": "120px",
                      "margin-mobile": "20px",
                      "margin-desktop": "64px",
                      "container-max": "1280px",
                      "unit": "8px",
                      "gutter": "24px"
              },
              "fontFamily": {
                      "headline-md": ["EB Garamond"],
                      "headline-lg": ["EB Garamond"],
                      "headline-sm": ["EB Garamond"],
                      "headline-lg-mobile": ["EB Garamond"],
                      "body-md": ["Montserrat"],
                      "label-md": ["Montserrat"],
                      "body-lg": ["Montserrat"],
                      "display": ["EB Garamond"]
              },
              "fontSize": {
                      "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                      "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                      "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                      "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                      "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}]
              }
            },
          },
        }
    </script>
</head>
<body class="bg-surface text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
<div class="fixed inset-0 grain-overlay z-[60]"></div>
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(50,23,22,0.08)]">
<div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<a class="font-display text-headline-md text-primary dark:text-inverse-primary tracking-tight" href="/">Handiwoodz</a>
<nav class="hidden md:flex items-center gap-8">
<a class="text-secondary dark:text-secondary-fixed-dim border-b-2 border-secondary font-semibold font-body-md transition-colors duration-300" href="#">Catalog</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Custom Design</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Our Story</a>
<a class="text-on-surface-variant dark:text-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Wholesale</a>
</nav>
<div class="flex items-center gap-6">
<button class="text-primary hover:text-secondary transition-all active:scale-[0.98]">
<span class="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
</button>
<button class="text-primary hover:text-secondary transition-all active:scale-[0.98]">
<span class="material-symbols-outlined" data-icon="chat">chat</span>
</button>
</div>
</div>
</header>
<main class="pt-32 pb-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<!-- Breadcrumbs & Header -->
<nav class="mb-6">
<ol class="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
<li><a class="hover:text-primary transition-colors" href="/">Home</a></li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-[12px]">chevron_right</span>
<span class="text-primary">Catalog</span>
</li>
</ol>
</nav>
<header class="mb-16">
<h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Our Collection</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Explore handcrafted wood products by category. Each piece is carved from sustainable timber and finished with natural oils, preserving the heritage of master woodworking.</p>
</header>
<!-- Category Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<!-- Printing Blocks -->
<a class="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover-lift image-zoom-container" href="#">
<img alt="Printing Blocks" class="w-full h-full object-cover" data-alt="Close-up of intricate hand-carved wooden printing blocks with traditional floral patterns. The blocks are arranged on a rustic wooden workshop table with warm, directional lighting highlighting the deep wood grain and sharp carving details. The atmosphere is grounded, artisan, and rich in heritage." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKLwsWW7LnFBmBdtaUTvCjla6QVHLawWUsJo4-11XXyKhnP3OtuVbIk-dIJqk6c7FrgtOZZNkUXeDBTp4-apgspa26dn-LvqyaeA09m_MwtY-rriF5exkojHsspRQN2_OxEOrgvmrVjO6ee4uha1b_0a_ufM0zj6mydYPN6KWfeZjXBrlX_BkpLeCqyBi65lOxOK3xbTa6WCxn-dCP98ZV4KyZOFi_UL_sx5QIMhAyi64bG3lzIfJ0cwkSfhH-yN7lV3N23NlDVC8"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 right-0 p-8">
<span class="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-label-md text-white border border-white/20 mb-2">42 ITEMS</span>
<h3 class="font-headline-sm text-headline-sm text-white">Printing Blocks</h3>
</div>
</a>
<!-- Wall Plates -->
<a class="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover-lift image-zoom-container" href="#">
<img alt="Wall Plates" class="w-full h-full object-cover" data-alt="Large circular decorative wooden wall plates with intricate geometric mandalas carved into the surface. They are hung against a textured cream plaster wall in a minimalist, high-end living room. Soft natural sunlight enters from the side, creating long, soft shadows that emphasize the depth of the engravings." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeqoGM1De4NIpgqKgrUrsu2nL7nDcqaDj1tGx5ZGNHJ475ITrBaH2CARuscl2TfuqusTQ2zvMVfy7Rh6zS0b6Uj5cjVGq6qqLRBXZJ11ljnCUXPDlK-wuOJwEg0dJMjy6uCeOFGuVk-mC8IZcK4adpcSE_st4fgQnSP_JcqMdivvoEzzlGtn2tlb2NxxCvmiaxcZWUAj1O-TSQGpWXp86WiQ4Q10K2HT5BWY1F6tw1VXBthTrCrOEZfrtJdgJl7YGEcFOF3gM8e4A"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 right-0 p-8">
<span class="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-label-md text-white border border-white/20 mb-2">18 ITEMS</span>
<h3 class="font-headline-sm text-headline-sm text-white">Wall Plates</h3>
</div>
</a>
<!-- Pichwai Art -->
<a class="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover-lift image-zoom-container" href="#">
<img alt="Pichwai Art" class="w-full h-full object-cover" data-alt="A master artisan meticulously painting a Pichwai artwork onto a dark wooden panel. The scene focuses on the fine brushwork and the vibrant natural pigments being applied to the wood. The setting is a traditional open-air courtyard with dappled sunlight, reflecting a sense of peace and centuries-old craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2qnbrM64GumiqkUPmCM7yWguYtlRpmfroiQvcLXzmG8dJU9OmZ_6GNbn779IOyD_mlHlVbEMZHkx8QMm2Ie-3inmtS4Y3NJIws2MY_06P-_pXjSTUoDLbkW1ttorn5mobCZAMnx-C_c3u59eguYbJdeoDFWNm1yq3kT5YPRbnePrrAkmaHjCGlWljpq5fVvFtQhRIMmrLhITQZFQMpEgJAGU00O_zFX_bUdVMe4zWhb33WoFBu1pYudgl5WiIt2hNG848bSiZcgk"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 right-0 p-8">
<span class="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-label-md text-white border border-white/20 mb-2">12 ITEMS</span>
<h3 class="font-headline-sm text-headline-sm text-white">Pichwai Art</h3>
</div>
</a>
<!-- Logo Blocks -->
<a class="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover-lift image-zoom-container" href="#">
<img alt="Logo Blocks" class="w-full h-full object-cover" data-alt="Solid oak wooden cubes engraved with clean, modern corporate logos. The cubes are arranged in a minimalist, architectural stack on a black marble surface. The lighting is sophisticated and moody, creating high contrast between the polished stone and the tactile, organic texture of the carved wood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4FkhXdlR7SSeb3GLFFCtMYMiL7F7k_OI0YPHHIKe7DR6Jth1CXK6VszwYvZ0IpF2UGF4z3poI-OiZELJhxDqTDF3D4Mp0WP6BW8z2HX78OKc1joKH9_kA_lhfSE-rpO2gLVJIfpM1K_yKdDbKBeG24fa7ECNeedQLjH6JeIIAEialSJyxB6kz2_lL5ZnH9u5NkNTIe0hAUJwN8fJAoSiT7KsifuZYPO9NAp56gFdj7-IXXmHKMt1ytvEAANpU2otC0ecx0cVPRcI"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 right-0 p-8">
<span class="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-label-md text-white border border-white/20 mb-2">24 ITEMS</span>
<h3 class="font-headline-sm text-headline-sm text-white">Logo Blocks</h3>
</div>
</a>
<!-- Custom Pieces -->
<a class="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover-lift image-zoom-container" href="#">
<img alt="Custom Pieces" class="w-full h-full object-cover" data-alt="A collection of unique, sculptural wooden objects in varying stages of completion. One piece shows a complex, organic curve being sanded by hand. The workshop setting is filled with sawdust caught in beams of light, featuring high-end tools and various types of raw hardwood logs in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo7yizE0ozU2pfZYh8Epr532vAc-QMY7CG-bniRrQNIeMhbBsu6aEwwTl9tqmgWGsXIlII-Sx4iHvbzm6e45pAbXXcPbCWF3VNR4bWCgh3SonvJKVrEV1m1mO_QooVFYUENCGJ6yQzyUeGh5zj1cOXmUx5BI6oFUxfpfzX9Lb4JUE2WYaw5EdcXb67DcMYLFMbUVn1K8-V7iMGBPhsV_I8SQ3bxAGm8uBHwRFswNwIdA9BXGnayLMbr3K6VkLqgRWigbawsQtWnGI"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 right-0 p-8">
<span class="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-label-md text-white border border-white/20 mb-2">BESPOKE</span>
<h3 class="font-headline-sm text-headline-sm text-white">Custom Pieces</h3>
</div>
</a>
</div>
<!-- Custom Design CTA -->
<div class="mt-24 relative overflow-hidden bg-primary rounded-lg p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 group">
<div class="absolute inset-0 grain-overlay"></div>
<div class="relative z-10 text-center md:text-left">
<h2 class="font-headline-md text-headline-md text-inverse-primary mb-2">Don't see what you need?</h2>
<p class="font-body-md text-on-primary-container">Our master carvers can bring your specific vision to life with custom dimensions and motifs.</p>
</div>
<a class="relative z-10 flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-lg font-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg active:scale-95 group" href="/custom-design">
                    Upload your own design
                    <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/30 w-full mt-section-gap">
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
<div class="md:col-span-1">
<div class="font-display text-headline-sm text-primary dark:text-inverse-primary mb-4">Handiwoodz</div>
<p class="text-on-surface-variant font-body-md leading-relaxed">Preserving the soul of master craftsmanship through sustainably sourced wood and traditional hand-carving techniques.</p>
</div>
<div class="flex flex-col gap-3">
<span class="text-primary font-label-md uppercase mb-2">Explore</span>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">About</a>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Catalog</a>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Custom Design</a>
</div>
<div class="flex flex-col gap-3">
<span class="text-primary font-label-md uppercase mb-2">Assistance</span>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Wholesale</a>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Contact</a>
<a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
</div>
<div class="flex flex-col gap-3">
<span class="text-primary font-label-md uppercase mb-2">Connect</span>
<div class="flex gap-4">
<a class="text-on-surface-variant hover:text-primary transition-all" href="#">
<span class="material-symbols-outlined">brand_awareness</span>
</a>
<a class="text-on-surface-variant hover:text-primary transition-all" href="#">
<span class="material-symbols-outlined">public</span>
</a>
</div>
<p class="text-on-surface-variant font-body-md mt-4">© 2024 Handiwoodz. Crafted with patience and heritage.</p>
</div>
</div>
</footer>
</body></html>
