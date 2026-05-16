# Product Detail (`/catalog/[category]/[subcategory]/[product]`)

## Design Prompt for Stitch AI

Design a product detail page for a handcrafted wood product. This page showcases the product and allows customers to configure options before adding to their quote basket.

### Sections

#### 1. Breadcrumb
- Home > Catalog > [Category] > [Subcategory] > [Product Name]

#### 2. Product Layout (Two Column)

##### Left: Image Gallery
- Large main image (square or 4:3 aspect ratio)
- Thumbnail strip below (horizontal scroll on mobile)
- Click thumbnail → swaps main image
- Lightbox on main image click (full-screen gallery view)
- Mobile: swipeable carousel with dot indicators

##### Right: Product Info & Actions
- Product name (large heading)
- Short description (2-3 lines)
- Divider line
- **Size Selector**:
  - Chip/pill buttons for each size option (e.g., "3x3 inch", "4x4 inch", "6x6 inch", "Custom")
  - "Custom" option shows a note: "Specify in notes below"
  - One must be selected before adding to basket
- **Quantity Input**:
  - Number input with +/- buttons
  - Shows minimum quantity (e.g., "Minimum order: 10 pieces")
  - Validation: cannot go below min quantity
- **Notes Field**:
  - Textarea (optional): "Any special requirements?"
  - Placeholder: "e.g., specific wood finish, custom size details..."
- **Action Buttons**:
  - "Add to Quote Basket" (primary, full-width on mobile)
  - "Customize This Design" (secondary/outline) → links to `/custom-design`
- **WhatsApp Quick Inquiry**:
  - "Ask about this product on WhatsApp" link with WhatsApp icon
  - Pre-fills message with product name and selected size

#### 3. Product Details (Below on mobile, tab/accordion on desktop)
- Filter tags displayed as badges (e.g., "Teak", "Hand Carved", "Floral")
- Any additional product information

#### 4. Related Products
- Section: "You May Also Like"
- Horizontal scrollable row of 4-6 product cards from same subcategory
- Same card style as listing page

### Design Tokens
- Gallery: clean white background, subtle border around thumbnails
- Selected size chip: filled with accent color (terracotta)
- Unselected chips: outline style with border
- Quantity input: clean, large touch targets
- Action buttons: generous padding (min 48px height)
- Product info section: comfortable line-height, readable typography

### Responsive Requirements
- Mobile (320px+): Stacked layout — gallery on top, info below. Full-width buttons.
- Tablet (768px+): Two-column layout starts (50/50 split)
- Desktop (1024px+): 55% gallery / 45% info split, sticky info panel on scroll
- Gallery thumbnails: horizontal scroll on mobile, grid on desktop

### Interactions
- Image gallery: smooth transitions between images
- Size chip selection: instant visual feedback
- Quantity +/- buttons: increment with hold-to-repeat
- "Add to Quote" success: brief toast notification "Added to basket!" with basket icon
- Lightbox: swipe gestures on mobile, arrow keys on desktop

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Mandala Floret Block | Heirloom Woods</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&amp;family=EB+Garamond:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>.font-headline-lg {
    font-family: "EB Garamond", serif;
    font-size: 48px;
    line-height: 1.2;
    font-weight: 500
    }
.font-headline-md {
    font-family: "EB Garamond", serif;
    font-size: 32px;
    line-height: 1.3;
    font-weight: 500
    }
.font-headline-sm {
    font-family: "EB Garamond", serif;
    font-size: 24px;
    line-height: 1.4;
    font-weight: 600
    }
.font-body-lg {
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    line-height: 1.6;
    font-weight: 400
    }
.font-body-md {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400
    }
.font-label-md {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: 0.05em
    }
body {
    background-color: #fbf9f5;
    color: #1b1c1a
    }
.grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBKXGrV8HZjq8tFaHXNZN68eMQdmqp5DLeWqgduNDIU8XR2PQjj8RPOtqvmJ60t49VLrW1fqZ6f63OZlMfv7Ysr7QkQHuiKw1YwTa1WWZUB78Cg4nq3HO6Osy1Diq5i-eGBJwdZbB4V1cCLGrlmF0ijVXBtNOgCUq9cM5AKlUWxWbqY5zF0LKKawpK3eysmgBvsifdxNrnYaxVWhFOY2dITm0ss9ZaG_m_o3gTTsP4cdpKRAfyOnXhI9Oe4DilNmPRi4Y1XVZlUAlw)
    }</style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface-variant": "#504443",
                        "error": "#ba1a1a",
                        "surface-bright": "#fbf9f5",
                        "inverse-primary": "#eabcb8",
                        "secondary-container": "#fd9572",
                        "on-tertiary": "#ffffff",
                        "surface-tint": "#795553",
                        "on-secondary-container": "#752c11",
                        "surface-container-low": "#f5f3ef",
                        "on-error": "#ffffff",
                        "background": "#fbf9f5",
                        "on-tertiary-container": "#86a391",
                        "on-primary-container": "#bd928f",
                        "surface-container-highest": "#e4e2de",
                        "on-background": "#1b1c1a",
                        "primary-fixed": "#ffdad7",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary-fixed": "#390c00",
                        "tertiary-fixed-dim": "#b0cdbb",
                        "on-error-container": "#93000a",
                        "surface-container": "#efeeea",
                        "on-primary-fixed": "#2e1413",
                        "secondary-fixed": "#ffdbcf",
                        "on-primary-fixed-variant": "#5f3e3c",
                        "on-secondary": "#ffffff",
                        "secondary-fixed-dim": "#ffb59c",
                        "outline": "#827472",
                        "tertiary": "#092317",
                        "primary-container": "#4a2c2a",
                        "on-primary": "#ffffff",
                        "surface-container-high": "#eae8e4",
                        "surface": "#fbf9f5",
                        "error-container": "#ffdad6",
                        "tertiary-fixed": "#ccead6",
                        "outline-variant": "#d4c3c1",
                        "on-secondary-fixed-variant": "#793014",
                        "inverse-on-surface": "#f2f0ed",
                        "on-surface": "#1b1c1a",
                        "on-tertiary-fixed-variant": "#324c3e",
                        "surface-dim": "#dbdad6",
                        "primary": "#321716",
                        "primary-fixed-dim": "#eabcb8",
                        "secondary": "#984629",
                        "inverse-surface": "#30312e",
                        "surface-variant": "#e4e2de",
                        "on-tertiary-fixed": "#062014",
                        "tertiary-container": "#1f392c"
                    },
                    "spacing": {
                        "margin-desktop": "64px",
                        "section-gap": "120px",
                        "container-max": "1280px",
                        "unit": "8px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    }
                }
            }
        }
    </script>
</head>
<body class="font-body-md text-on-surface">
<div class="grain-overlay"></div>
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-sm shadow-sm shadow-primary/5">
<nav class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
<div class="font-headline-sm text-headline-sm text-primary tracking-tight">HEIRLOOM WOODS</div>
<div class="hidden md:flex items-center gap-8">
<a class="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1" href="#">Catalog</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Custom Design</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Our Story</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Wholesale</a>
</div>
<div class="flex items-center gap-6">
<button class="text-on-surface-variant hover:text-secondary transition-all duration-300">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
<button class="text-on-surface-variant hover:text-secondary transition-all duration-300">
<span class="material-symbols-outlined" data-icon="person">person</span>
</button>
</div>
</nav>
</header>
<main class="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<!-- Breadcrumb -->
<nav class="flex mb-12 items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Home</a>
<span class="material-symbols-outlined text-[12px] text-outline-variant">chevron_right</span>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Catalog</a>
<span class="material-symbols-outlined text-[12px] text-outline-variant">chevron_right</span>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Printing Blocks</a>
<span class="material-symbols-outlined text-[12px] text-outline-variant">chevron_right</span>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Hand Carved</a>
<span class="material-symbols-outlined text-[12px] text-outline-variant">chevron_right</span>
<span class="font-label-md text-label-md text-primary">Mandala Floret Block</span>
</nav>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
<!-- Left: Image Gallery -->
<div class="lg:col-span-7 space-y-6">
<div class="aspect-square bg-surface-container-low rounded-lg overflow-hidden group">
<img alt="Mandala Floret Block" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A macro close-up of a hand-carved Mandala Floret Block made of rich, seasoned Sheesham wood. The intricate circular floral motif features deep, clean relief cuts in a complex radial pattern. The wood exhibits a warm, organic grain with subtle light-catching details, set against a soft, creamy minimalist background. The lighting is diffused and natural, highlighting the tactile texture and artisanal quality of the woodcraft." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoUPOQoV70DPLpK7ns1rAM66u3982Tzg8vok1WnS5v_4LibTaxbmWKmeCx_p911HNLWtE87gZTx80Or9CVoaoaxietdlB69-FsCPrEn0UAiWMoEp6R2SqCb6THZPxbM7J7uCrBQLsYOgoNDYEoFjN-mjFvpF7m_Ovl_YPHTfuwd5SfIfBtCKO4fktP2_lN4ZnQtBAk3NXyJCf5F1-Fzs0fyc3f0lR2-VgeisWaQXczAX_W2e_ydQzCsf83fiw12ylO17VTRAlZdts"/>
</div>
<div class="grid grid-cols-3 gap-4">
<div class="aspect-square bg-surface-container-low rounded-lg overflow-hidden border border-secondary/20">
<img alt="Detail Angle" class="w-full h-full object-cover" data-alt="A detailed view of the side profile of a hand-carved wooden printing block, showcasing the depth of the floral relief and the substantial thickness of the seasoned Sheesham wood. The lighting is warm and directional, casting soft shadows that emphasize the carved geometry. The overall aesthetic is rustic yet refined, emphasizing the heritage nature of the printing tool." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP65FbTNVBw7TXXNdxGqHXgge9NwcACL0iGN-1_UiiT9B-jA02aAQgr6XzitTIbgGCZxi6xxvNgBsMKg6YqAMYq5yoGDIvZ0sKiZKwajzWoJRO8nLcGa-lsIMOZxv5zAO4rP4YV1eBKbTa9zTWt-A7RS793Rqm3EIfsjpkFxjBInLnE9H_xYKKF5_gBgfEbyuSXU6LsklX_gby-nYMhGjEpczE-3BMqrp6c4S86rnqdXeoPDpNZxstaZp9xOEFX8Ww4C2L3rGQPZs"/>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
<img alt="Grain Detail" class="w-full h-full object-cover" data-alt="Extreme macro shot focusing on the wood grain of a hand-carved Sheesham block. Tiny fibers and the natural patterns of the dark hardwood are visible, emphasizing the authenticity of the material. The light highlights the polished top surfaces of the relief cuts against the deeper, darker recessed areas of the floret design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXMwyvQfF7KQ92TN3a83ibr5hwyrVhXZ3KM-cmNHHXnwt8Iy2KUpo2WPi_1D2QXT0NV2HmsoVpSnR975sYqOHotr5kzinD8XzR0FROF6Bb5twB8pPaI82oh_lm0TIxOkLFRtem62G7hWH0uzXiFyJ2VwojQ-udpzVnELJUXeYxHYmKeic9L1MFl-9ilWKTbLVU7Ge703r02xXYdeTrwiLlQrjDfBtQEE2U62ru1l5N1B5ZuZAsi1zh1avmw1q09LtpLUqtVVbu9to"/>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
<img alt="Process View" class="w-full h-full object-cover" data-alt="The Mandala Floret Block being held by an artisan's hand, providing a clear sense of scale and tactile utility. The block is covered in a light residue of indigo-colored textile dye, suggesting its practical application in traditional block printing. The setting is a bright, sun-drenched workshop with wooden workbenches and soft natural textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj7P3TxDCCtX5OKc4zGzoSsrgf1nqUmpU49t0eebFndMYFMZL2g_JBIWkQFhdv7f44WdCadV7DyjFWHzszspP94rbH0WKzECveKAxi65k5hIHkgq2WqMbvsuqdwNQA57Yx_AmerK_bDpDHN6gw6TcMZQGEDq9msXybxpJpBa8AH0ZxRfAQW_Ur33t6qLOHtVmbSkigLz_YS8JJ9g1rQXksy3j7gHCu3444ncIyq8EnQdqj5yHLNsWhR8iWFwZcVFYlA6DVyyuW_Ro"/>
</div>
</div>
</div>
<!-- Right: Product Info -->
<div class="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
<section>
<h1 class="font-headline-lg text-headline-lg text-primary mb-4">Mandala Floret Block</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                        A traditional circular floret motif hand-carved in seasoned Sheesham wood. Ideal for textile printing or as a decorative heritage piece.
                    </p>
</section>
<!-- Size Selector -->
<div class="space-y-4">
<h3 class="font-label-md text-label-md text-primary">SELECT SIZE</h3>
<div class="flex flex-wrap gap-3">
<button class="px-6 py-2 border-2 border-secondary bg-secondary/5 text-secondary rounded-lg font-label-md text-label-md transition-all">3x3 inch</button>
<button class="px-6 py-2 border border-outline hover:border-secondary transition-all rounded-lg font-label-md text-label-md text-on-surface-variant">4x4 inch</button>
<button class="px-6 py-2 border border-outline hover:border-secondary transition-all rounded-lg font-label-md text-label-md text-on-surface-variant">6x6 inch</button>
<button class="px-6 py-2 border border-outline hover:border-secondary transition-all rounded-lg font-label-md text-label-md text-on-surface-variant">Custom</button>
</div>
</div>
<!-- Quantity and Requirements -->
<div class="space-y-6">
<div class="flex flex-col gap-2">
<h3 class="font-label-md text-label-md text-primary">QUANTITY</h3>
<div class="flex items-center gap-4">
<div class="flex items-center border border-outline rounded-lg bg-surface-container-lowest h-12">
<button class="px-4 text-primary hover:text-secondary h-full flex items-center">
<span class="material-symbols-outlined text-[18px]">remove</span>
</button>
<span class="w-12 text-center font-label-md">10</span>
<button class="px-4 text-primary hover:text-secondary h-full flex items-center">
<span class="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
<span class="font-label-md text-label-md text-on-surface-variant/60">Minimum order: 10 pieces</span>
</div>
</div>
<div class="space-y-4">
<h3 class="font-label-md text-label-md text-primary uppercase">Any special requirements?</h3>
<textarea class="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-4 px-2 min-h-[100px] font-body-md text-body-md outline-none resize-none" placeholder="e.g. Specific wood treatment or logo modifications..."></textarea>
</div>
</div>
<!-- CTAs -->
<div class="flex flex-col gap-4">
<button class="w-full bg-secondary text-white py-5 rounded-lg font-label-md text-label-md shadow-lg shadow-secondary/10 hover:opacity-90 active:scale-95 transition-all">
                        ADD TO QUOTE BASKET
                    </button>
<button class="w-full border-2 border-primary text-primary py-5 rounded-lg font-label-md text-label-md hover:bg-primary/5 active:scale-95 transition-all">
                        CUSTOMIZE THIS DESIGN
                    </button>
<a class="flex items-center justify-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md pt-2" href="#">
<svg class="w-5 h-5 fill-current" viewbox="0 0 24 24"><path d="M12.012 2c-5.508 0-9.987 4.479-9.987 9.988 0 1.761.459 3.474 1.33 4.988l-1.412 5.16 5.281-1.385c1.446.788 3.076 1.205 4.739 1.205 5.508 0 9.988-4.479 9.988-9.988 0-5.508-4.479-9.988-9.988-9.988zm4.364 13.334c-.19.534-1.096 1.022-1.503 1.082-.406.061-.758.261-2.618-.466-2.24-.877-3.644-3.14-3.756-3.29-.112-.15-.91-1.208-.91-2.304 0-1.096.572-1.636.776-1.861.203-.225.443-.281.591-.281.148 0 .296.002.425.008.134.006.313-.051.49.375.178.43.609 1.482.661 1.588.052.106.087.23.015.375-.072.145-.108.236-.217.362-.109.127-.23.284-.328.38-.109.106-.223.221-.096.439.127.218.566.932 1.214 1.511.834.743 1.539.972 1.757 1.082.218.109.346.091.474-.055.127-.145.545-.634.691-.852.146-.218.291-.182.49-.109s1.264.597 1.482.706c.218.109.362.163.416.254.054.09.054.526-.136 1.06z"></path></svg>
                        ASK ABOUT THIS PRODUCT ON WHATSAPP
                    </a>
</div>
</div>
</div>
<!-- You May Also Like Section -->
<section class="mt-section-gap">
<h2 class="font-headline-md text-headline-md text-primary mb-10">You May Also Like</h2>
<div class="flex overflow-x-auto pb-8 gap-8 scrollbar-hide -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
<!-- Related Product 1 -->
<div class="min-w-[280px] group cursor-pointer">
<div class="aspect-[4/5] bg-surface-container mb-6 rounded-lg overflow-hidden">
<img alt="Paisley Block" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A hand-carved Paisley-style wooden block for printing, placed on a sunlit wooden table. The intricate 'Kalka' teardrop motif is shown in high detail, with fine cross-hatching marks within the wood. The background is soft-focus, showing a glimpse of a traditional textile workshop with warm earth tones and professional artisans in the distance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDndrx2JY83BJMhWDXM_vMebEENGm5oEb0x4BmQRkPU1j2vJGnIQrmOgc_rOCa9slrg1SODbob4i6b10g6-vYx_kLybghCDIHeRINXb8-XAA1zAaLIU8nXn_E1d0i8_7sZAmrmqqduabXI-WJXu10a7sHlFD6GAQBlVRHg9XIqemAH2vRCVJ3jjNRZEHvBcpGe_gxozyToBLN1B1KarQARvIT57sMVy1DmeitaASZZELgMUpOEiPRdCNfLQYY0eq207FBQfIMEYwFU"/>
</div>
<h4 class="font-label-md text-label-md text-primary mb-1">Paisley Heritage Block</h4>
<p class="text-on-surface-variant/80 font-body-md text-sm">Seasoned Teak Wood</p>
</div>
<!-- Related Product 2 -->
<div class="min-w-[280px] group cursor-pointer">
<div class="aspect-[4/5] bg-surface-container mb-6 rounded-lg overflow-hidden">
<img alt="Geometric Star" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A collection of small geometric star-shaped wood blocks arranged artistically. Each block is carved with precision, showing clean lines and sharp corners characteristic of high-quality Sheesham woodcraft. The scene is illuminated by soft, side-lit photography that creates a sense of depth and highlights the natural warmth of the brown wood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC1mv8VFPWbmOm7cn6p6MRXighAurfmpbEvMiXv2DH04FZlaq8cuW_53WJpx7VYoJo_TsmGGUUR9B_a3SnZAs5ppmStwLRI0aj6ggtwaVC0SYuo7ZtpODQeStT0CNmzKBjGch-QOYnSqZXyPrrBsHdqLwiukTnOdFLD4vj9TDn9vhIRklcX1bDmek5g8JAhsMsi8eQIp8FIz5uP4ymhF4SRoo0rwrKzq-AjDHLlYztcim6Xpew7PwsKNBcxTeUGOtclBLZbW6TETk"/>
</div>
<h4 class="font-label-md text-label-md text-primary mb-1">Geometric Star Set</h4>
<p class="text-on-surface-variant/80 font-body-md text-sm">Sheesham Wood</p>
</div>
<!-- Related Product 3 -->
<div class="min-w-[280px] group cursor-pointer">
<div class="aspect-[4/5] bg-surface-container mb-6 rounded-lg overflow-hidden">
<img alt="Vine Border" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A large, ornate border-printing wood block featuring a cascading vine pattern with small stylized flowers. The block is long and narrow, resting on a roll of undyed cotton fabric. The visual style is minimalist and high-end, focusing on the contrast between the dark, detailed wood and the light, natural fiber of the cloth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSx3dlv-l2W3zi6BXsoHI4Apo64uGi3_UxZScyTuHv8HcQdp1qgzyQnydv49cM3XillSHwXcR6VOU_aGLk-J2SkuDbmE03qDGOBonAK7x54WVBYPF4RyiSmDDNaRalE_afbxQgxidz_lrqx688qeqzDYkFceGsFxLazCWLakxmLuwYtjsrLkEUbmM6X2CqBEVukk6qi9F340ro2bvZEKfmI86gVgl-eNJf3qggNybcv5aBdMN1f73Dj84pFNup1W7ex8LXb9kn7CM"/>
</div>
<h4 class="font-label-md text-label-md text-primary mb-1">Vine Border Relief</h4>
<p class="text-on-surface-variant/80 font-body-md text-sm">Antique Finish Oak</p>
</div>
<!-- Related Product 4 -->
<div class="min-w-[280px] group cursor-pointer">
<div class="aspect-[4/5] bg-surface-container mb-6 rounded-lg overflow-hidden">
<img alt="Lotus Motif" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A master artisan's workbench featuring several half-finished lotus motif wood blocks and carving chisels. The main focus is a beautifully finished lotus block with deep, concentric leaf patterns. The atmosphere is quiet and focused, emphasizing the slow-living, artisanal spirit of the craft." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-d4LPtu0yKVyszU0P8n1hVD1DLPD_h7CUe-tGYsoDwR2PIJrAsv3n0q0eTGb-0Jo3XMuiimMkYGhDjT4U1NhIFpvNZbcK3ZGzlWS578TFULgDPLFXYSri6-4Ss47G7tkMoxqQEP5VexHCFLLCkdLUpVXidrmQL8E71M0BKQ_AHFz-Hpsgd1MtNEQ59GhXVsjn-XgWz-cIPPr58ate_ZfpV0c03ioX_v3WAJmLOAKLAIo60bcbqTz9G2eVi2Nf0qXOQZu59VycZ7g"/>
</div>
<h4 class="font-label-md text-label-md text-primary mb-1">Lotus Bloom Block</h4>
<p class="text-on-surface-variant/80 font-body-md text-sm">Premium Rosewood</p>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container w-full border-t border-outline-variant/20">
<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
<div class="col-span-2 md:col-span-1">
<div class="font-headline-sm text-headline-sm text-primary mb-4">HEIRLOOM WOODS</div>
<p class="font-body-md text-on-surface-variant/80 max-w-[240px]">Crafting legacy through the timeless art of wood carving and traditional printing techniques.</p>
</div>
<div class="flex flex-col gap-3">
<span class="font-label-md text-label-md text-primary mb-2">SHOP</span>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Catalog</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Wholesale</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Custom Design</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Care Guide</a>
</div>
<div class="flex flex-col gap-3">
<span class="font-label-md text-label-md text-primary mb-2">COMPANY</span>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Our Story</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Sustainability</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Us</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
</div>
<div class="flex flex-col gap-3">
<span class="font-label-md text-label-md text-primary mb-2">SUPPORT</span>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping &amp; Returns</a>
<a class="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">FAQ</a>
<div class="flex gap-4 mt-2">
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-70">share</span>
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-70">mail</span>
</div>
</div>
</div>
<div class="px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto border-t border-outline-variant/10 text-center">
<p class="font-label-md text-xs text-on-surface-variant/60 uppercase tracking-widest">© 2024 Heirloom Woods Artisan Collective. Crafted with intention.</p>
</div>
</footer>
</body></html>

