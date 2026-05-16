# Quote Basket (`/quote-basket`)

## Design Prompt for Stitch AI

Design a quote basket/review page where customers can see all items they've added (catalog products + custom designs), fill in their contact details, and submit a quotation request. This is the final step before submission — like a checkout page but for quotes.

### Sections

#### 1. Page Header
- Title: "Your Quote Basket"
- Item count: "3 items in your basket"
- "Continue Browsing" link back to catalog

#### 2. Catalog Items Section
- Section heading: "Selected Products" (with count)
- List of items, each row showing:
  - Product thumbnail (60x60px, rounded)
  - Product name
  - Selected size (badge/chip)
  - Quantity (editable inline with +/-)
  - Notes (expandable/collapsible, editable)
  - Remove button (trash icon, right side)
- Each item is a card/row with subtle separator between items
- Empty state: "No catalog items yet. Browse our collection →"

#### 3. Custom Designs Section
- Section heading: "Custom Designs" (with count)
- List of uploaded designs, each showing:
  - File thumbnail/icon (based on file type)
  - Design name
  - Product type badge
  - Dimensions (e.g., "4 × 6 inch")
  - Color count
  - Quantity (editable)
  - Notes (expandable)
  - Remove button
- Empty state: "No custom designs. Upload your artwork →"

#### 4. Basket Summary (Sidebar on desktop, inline on mobile)
- Total items count
- Breakdown: X catalog items, Y custom designs
- Note: "Final pricing will be provided in our quote"
- "Request Quotation" button (disabled until contact form is filled)

#### 5. Customer Contact Form
- Section heading: "Your Contact Details"
- Fields:
  - Full Name* (text input)
  - Email Address* (email input)
  - WhatsApp Number* (tel input with country code hint)
  - Country (text input or dropdown)
  - Company Name (optional, text input)
  - Additional Notes (textarea): "Any general requirements, timeline, or questions"
- All required fields marked with *
- Inline validation on blur

#### 6. Submit Section
- "Request Quotation" button (primary, large, full-width on mobile)
- Subtext: "We'll respond within 24 hours with a detailed quote"
- Alternative: "Or discuss on WhatsApp first →" link
- Terms note: "By submitting, you agree to our terms of service"

#### 7. Empty Basket State (when no items at all)
- Friendly illustration (empty basket/box)
- "Your quote basket is empty"
- Two CTAs: "Browse Catalog" and "Upload Custom Design"

### Design Tokens
- Item cards: white background, subtle border, 16px padding
- Remove button: muted/gray, turns red on hover
- Contact form: clean, spacious, clear labels
- Submit button: large (56px height), accent color, bold text
- Summary card: slightly different background (cream), sticky on desktop
- Quantity controls: compact but touch-friendly (44px targets)

### Responsive Requirements
- Mobile (320px+): Single column, everything stacked. Summary at bottom before submit.
- Tablet (768px+): Items list takes full width, form below
- Desktop (1024px+): Two-column layout — items + form (left 65%) | summary sidebar (right 35%)
- Summary sidebar: sticky on desktop scroll

### Interactions
- Quantity change: instant update, no save button needed
- Remove item: slide-out animation or fade, with brief "Undo" toast
- Form validation: real-time on blur, error messages below fields
- Submit button: loading spinner while submitting
- Success: redirect to confirmation page or show success modal with quote number
- Notes expand/collapse: smooth accordion animation

### States
- Empty basket: illustration + CTAs
- Has items, form incomplete: submit button disabled with tooltip
- Has items, form complete: submit button enabled
- Submitting: loading state on button, form disabled
- Success: confirmation with quote number displayed

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&amp;family=Montserrat:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-tint": "#795553",
                        "on-surface-variant": "#504443",
                        "surface-container-highest": "#e4e2de",
                        "on-tertiary-fixed-variant": "#324c3e",
                        "surface": "#fbf9f5",
                        "outline": "#827472",
                        "surface-bright": "#fbf9f5",
                        "primary": "#321716",
                        "on-error-container": "#93000a",
                        "surface-container-lowest": "#ffffff",
                        "secondary": "#984629",
                        "tertiary-fixed-dim": "#b0cdbb",
                        "inverse-primary": "#eabcb8",
                        "error": "#ba1a1a",
                        "tertiary-container": "#1f392c",
                        "on-primary-fixed-variant": "#5f3e3c",
                        "on-secondary-fixed": "#390c00",
                        "on-primary-container": "#bd928f",
                        "inverse-surface": "#30312e",
                        "secondary-fixed-dim": "#ffb59c",
                        "on-secondary-container": "#752c11",
                        "on-secondary": "#ffffff",
                        "surface-dim": "#dbdad6",
                        "on-secondary-fixed-variant": "#793014",
                        "surface-container-low": "#f5f3ef",
                        "secondary-container": "#fd9572",
                        "on-tertiary": "#ffffff",
                        "on-surface": "#1b1c1a",
                        "surface-variant": "#e4e2de",
                        "on-tertiary-container": "#86a391",
                        "tertiary": "#092317",
                        "on-error": "#ffffff",
                        "on-background": "#1b1c1a",
                        "on-primary-fixed": "#2e1413",
                        "surface-container": "#efeeea",
                        "secondary-fixed": "#ffdbcf",
                        "background": "#fbf9f5",
                        "on-tertiary-fixed": "#062014",
                        "primary-fixed-dim": "#eabcb8",
                        "on-primary": "#ffffff",
                        "error-container": "#ffdad6",
                        "outline-variant": "#d4c3c1",
                        "tertiary-fixed": "#ccead6",
                        "surface-container-high": "#eae8e4",
                        "primary-fixed": "#ffdad7",
                        "inverse-on-surface": "#f2f0ed",
                        "primary-container": "#4a2c2a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "container-max": "1280px",
                        "section-gap": "120px",
                        "margin-mobile": "20px",
                        "gutter": "24px",
                        "unit": "8px",
                        "margin-desktop": "64px"
                    },
                    "fontFamily": {
                        "display": ["EB Garamond", "serif"],
                        "body-lg": ["Montserrat", "sans-serif"],
                        "label-md": ["Montserrat", "sans-serif"],
                        "headline-lg": ["EB Garamond", "serif"],
                        "headline-sm": ["EB Garamond", "serif"],
                        "headline-lg-mobile": ["EB Garamond", "serif"],
                        "body-md": ["Montserrat", "sans-serif"],
                        "headline-md": ["EB Garamond", "serif"]
                    },
                    "fontSize": {
                        "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}]
                    }
                },
            },
        }
    </script>
<style>.grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuA6YtOHqeAGenqhKvbQa5uetkP49tEICiOUBuB4HHgFZLD1izTGKkS0WOtOXVbY0jc37aLx9YXe_YItIOjQIuahNeEnIqB4RRz8e56CQbUg9Chy4gmpDC0QvdHqXFnDC2o88QwtOmmrrq1ROk0gFzed3DThs_8H32guAOm6-oWpZcWECskBsB3Wzf-bROeJIXcinHOh70-UHBlnGh_CFP5oFcuTow62irCD5GWme2ITB4c9WcwmCHHBOV-EeboI8XDhF-_QjFOiRQ0)
    }
.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.sticky-sidebar {
    position: sticky;
    top: 2rem
    }</style>
</head>
<body class="bg-surface text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
<div class="grain-overlay"></div>
<!-- Header / TopAppBar -->
<header class="bg-surface dark:bg-surface shadow-sm docked full-width top-0 z-50">
<nav class="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
<a class="font-display text-headline-sm font-bold text-primary dark:text-primary-fixed-dim" href="/">Handiwoodz</a>
<div class="hidden md:flex items-center gap-8">
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300 font-label-md text-label-md" href="#">Catalog</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300 font-label-md text-label-md" href="#">Custom Design</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300 font-label-md text-label-md" href="#">Our Story</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors duration-300 font-label-md text-label-md" href="#">Wholesale</a>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-primary p-2 active:scale-95 duration-200 transition-transform" data-icon="person">person</button>
<button class="material-symbols-outlined text-secondary border-b-2 border-secondary pb-1 p-2 active:scale-95 duration-200 transition-transform" data-icon="shopping_basket">shopping_basket</button>
</div>
</nav>
</header>
<main class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
<!-- Page Title & Header Section -->
<header class="mb-12">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 class="font-display text-headline-lg text-primary mb-2">Your Quote Basket</h1>
<p class="font-body-md text-on-surface-variant">3 items in your basket</p>
</div>
<a class="font-label-md text-label-md text-secondary hover:underline flex items-center gap-2 transition-all" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="arrow_back">arrow_back</span>
                    Continue Browsing
                </a>
</div>
</header>
<!-- Two-Column Layout -->
<div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-gutter items-start">
<!-- Left Column: Basket Items & Form -->
<div class="space-y-section-gap/2 flex flex-col gap-12">
<!-- Catalog Items Section -->
<section>
<h2 class="font-display text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">Selected Products (2)</h2>
<div class="space-y-4">
<!-- Item 1 -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
<img alt="Mandala Floret Block" class="w-full sm:w-32 h-32 object-cover rounded shadow-sm bg-surface-container" data-alt="A macro close-up of a Mandala Floret Block, showing intricate hand-carved floral patterns in dark walnut wood. The lighting is warm and directional, highlighting the texture of the grain and the depth of the carvings. The overall aesthetic is rustic luxury, set against a soft ivory background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlD-ldqjH9PvYE_Mwf6vX82y5YKGq7Ok44-3C4AOSX1MdSHg1ywBveu3yAaP7L7K3QBI7-IWQHOIHvTN4NDFcoio4ZNqq6tRoVoXhg5YqFCZ45aa_YI0sgUiVT-x-jTNRFNvVDq7Inq79Av7juRLEodeayhqUhJBfN18U_h7RJ5_aESoks2z_fdbjoOL22UmZYQWnf2KMKxttALPpHUyvjVzB-ENlBB1zWSD0zlhGuVBb37cpJ5Ce-dKts3Lz6E-42p_HFpfuGQpE"/>
<div class="flex-1 flex flex-col justify-between">
<div class="flex justify-between items-start">
<div>
<h3 class="font-display text-headline-sm text-primary">Mandala Floret Block</h3>
<p class="font-label-md text-label-md text-on-surface-variant mt-1 uppercase tracking-wider">Size: 3x3 inch chip</p>
</div>
<button class="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="close">close</button>
</div>
<div class="flex flex-wrap items-center justify-between mt-4 gap-4">
<div class="flex items-center border border-outline-variant rounded-full overflow-hidden">
<button class="px-3 py-1 hover:bg-surface-container transition-colors text-primary">-</button>
<span class="px-4 font-label-md border-x border-outline-variant">1</span>
<button class="px-3 py-1 hover:bg-surface-container transition-colors text-primary">+</button>
</div>
<button class="text-on-surface-variant font-label-md text-[13px] flex items-center gap-1 hover:text-secondary transition-colors">
<span class="material-symbols-outlined text-[18px]" data-icon="edit_note">edit_note</span>
                                        Edit Notes
                                    </button>
</div>
</div>
</div>
<!-- Item 2 -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
<img alt="Paisley Heritage Block" class="w-full sm:w-32 h-32 object-cover rounded shadow-sm bg-surface-container" data-alt="A top-down view of a Paisley Heritage Block crafted from rich cherry wood, featuring traditional ornate paisley carvings. The wood has a subtle satin finish that catches the soft ambient studio light. The composition is clean and minimalist, emphasizing the fine artisan craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj_1h0N7xVseDOUCFMzceoUCFvwDCWJHfsrjspFhh80CY6cOxD_9eyHCWMcUIogjebisZeP__H88OgLxoJ7NLw-jet5HnzYRt7UznWmvY2_bQ_q1gHs35W-OjLlu3XFNuSyiL_EcdNnDxzEgRlUqL6GD9cnuzrOyhkZ-4tnivceSX90RLJjBO6DLOOkk1aUn2CTpw7l0pQ_E6e1GwSeK-HhOPhaSA8PnDaFfBew__Z55nzX9C_EKOUdiIUZcE2Xj6CtgZxyjdh0f0"/>
<div class="flex-1 flex flex-col justify-between">
<div class="flex justify-between items-start">
<div>
<h3 class="font-display text-headline-sm text-primary">Paisley Heritage Block</h3>
<p class="font-label-md text-label-md text-on-surface-variant mt-1 uppercase tracking-wider">Size: 4x4 inch chip</p>
</div>
<button class="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="close">close</button>
</div>
<div class="flex flex-wrap items-center justify-between mt-4 gap-4">
<div class="flex items-center border border-outline-variant rounded-full overflow-hidden">
<button class="px-3 py-1 hover:bg-surface-container transition-colors text-primary">-</button>
<span class="px-4 font-label-md border-x border-outline-variant">1</span>
<button class="px-3 py-1 hover:bg-surface-container transition-colors text-primary">+</button>
</div>
<button class="text-on-surface-variant font-label-md text-[13px] flex items-center gap-1 hover:text-secondary transition-colors">
<span class="material-symbols-outlined text-[18px]" data-icon="edit_note">edit_note</span>
                                        Edit Notes
                                    </button>
</div>
</div>
</div>
</div>
</section>
<!-- Custom Designs Section -->
<section>
<h2 class="font-display text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">Custom Designs (1)</h2>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
<div class="flex flex-col md:flex-row gap-8">
<div class="w-full md:w-48 aspect-square bg-surface-container flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
<div class="text-center p-4">
<span class="material-symbols-outlined text-outline text-[48px] mb-2" data-icon="branding_watermark">branding_watermark</span>
<p class="text-label-md font-label-md text-outline">Logo Preview</p>
</div>
</div>
<div class="flex-1 space-y-4">
<div class="flex justify-between items-start">
<div>
<span class="inline-block bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[12px] font-label-md uppercase tracking-wider mb-2">Signage &amp; Plaques</span>
<h3 class="font-display text-headline-md text-primary">Corporate Logo Relief</h3>
</div>
<button class="text-error font-label-md text-[13px] flex items-center gap-1 hover:underline">
<span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                                        Remove
                                    </button>
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<p class="text-[12px] uppercase text-on-surface-variant font-label-md">Dimensions</p>
<p class="font-body-md text-primary">8x8 inch</p>
</div>
<div>
<p class="text-[12px] uppercase text-on-surface-variant font-label-md">Quantity</p>
<p class="font-body-md text-primary">5 pieces</p>
</div>
</div>
<div class="bg-surface p-4 rounded-lg border-l-4 border-secondary/30">
<p class="text-[12px] uppercase text-on-surface-variant font-label-md mb-1">Customer Notes</p>
<p class="italic text-body-md text-on-surface-variant">"Requesting a high-relief carving of our tech firm logo on reclaimed oak. Natural finish preferred, no heavy oils."</p>
</div>
</div>
</div>
</div>
</section>
<!-- Customer Contact Form -->
<section class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/20 shadow-sm">
<h2 class="font-display text-headline-md text-primary mb-8">Your Contact Details</h2>
<form class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
<div class="space-y-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">Full Name*</label>
<input class="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none" placeholder="John Doe" type="text"/>
</div>
<div class="space-y-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">Email Address*</label>
<input class="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none" placeholder="john@example.com" type="email"/>
</div>
<div class="space-y-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">WhatsApp Number*</label>
<div class="flex gap-2">
<div class="w-20 bg-transparent border-b border-outline-variant py-2 flex items-center gap-2">
<img alt="US" class="w-4 h-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPgiEpD3rCgbfH8_Z6z282MFQAPHVS8Wla77cD0fq13N1g8-NGRORIMxSvXn0iCSlyDmMnhX8LzN2xLmkGvqTDe89ouRgVzkCZVD6HmkJG2tMTppo5wxaOwVgJUEofrJrZ4bUL3PG97HCKjP-E3ND0UPYU6i88xmuyUd8lACTBvjOnxkI9RF1CiH5Ug3WM-cjG2-CHV8e3SzY3GoJSH7kdrTkCmG9f9aVUOqxDQLcXpeXiKLd2CHcfGF6MdaGkcec7Lj_M5ntZFgs"/>
<span class="text-body-md font-body-md">+1</span>
</div>
<input class="flex-1 bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none" placeholder="123 456 7890" type="tel"/>
</div>
</div>
<div class="space-y-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">Country*</label>
<input class="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none" placeholder="United States" type="text"/>
</div>
<div class="space-y-2 md:col-span-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">Company Name</label>
<input class="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none" placeholder="Optional" type="text"/>
</div>
<div class="space-y-2 md:col-span-2">
<label class="block font-label-md text-on-surface-variant text-[14px]">Additional Notes</label>
<textarea class="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant/60 font-body-md outline-none resize-none" placeholder="Any specific requirements or questions..." rows="4"></textarea>
</div>
</form>
</section>
</div>
<!-- Right Column: Sidebar -->
<aside class="sticky-sidebar">
<div class="bg-surface-container-high rounded-xl p-8 shadow-sm border border-outline-variant/20">
<h2 class="font-display text-headline-sm text-primary mb-6">Basket Summary</h2>
<div class="space-y-4 mb-8">
<div class="flex justify-between items-center">
<span class="font-body-md text-on-surface-variant">Catalog Items</span>
<span class="font-label-md text-primary">2</span>
</div>
<div class="flex justify-between items-center">
<span class="font-body-md text-on-surface-variant">Custom Designs</span>
<span class="font-label-md text-primary">1</span>
</div>
<div class="pt-4 border-t border-outline-variant flex justify-between items-center">
<span class="font-label-md text-primary uppercase">Total Items</span>
<span class="font-display text-headline-sm text-primary">3</span>
</div>
</div>
<div class="bg-primary-container/10 p-4 rounded-lg mb-8">
<div class="flex gap-3">
<span class="material-symbols-outlined text-secondary" data-icon="info">info</span>
<p class="text-body-md text-on-surface-variant leading-tight">Final pricing will be provided in our personalized quote.</p>
</div>
</div>
<button class="w-full h-[56px] bg-secondary text-on-secondary rounded-lg font-label-md text-[16px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md shadow-secondary/20 flex items-center justify-center gap-2">
                        Request Quotation
                    </button>
<div class="mt-6 text-center space-y-4">
<p class="text-label-md text-on-surface-variant text-[13px] italic flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span>
                            We'll respond within 24 hours
                        </p>
<div class="h-px bg-outline-variant/40 w-full"></div>
<a class="inline-block text-secondary font-label-md text-[14px] hover:translate-x-1 transition-transform flex items-center justify-center gap-2" href="#">
                            Or discuss on WhatsApp first 
                            <span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</aside>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container-high dark:bg-surface-container-highest w-full mt-section-gap">
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-16 max-w-container-max mx-auto">
<div class="space-y-4">
<h2 class="font-display text-headline-md text-primary dark:text-primary">Handiwoodz</h2>
<p class="text-on-surface-variant font-body-md">Celebrating the art of hand-carved heritage through sustainable artisan wooden block creation.</p>
</div>
<div>
<h3 class="font-label-md text-primary uppercase mb-4">Quick Links</h3>
<ul class="space-y-2">
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Shipping Policy</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Wholesale Terms</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Care Instructions</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Contact Us</a></li>
</ul>
</div>
<div>
<h3 class="font-label-md text-primary uppercase mb-4">Social</h3>
<ul class="space-y-2">
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Instagram</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-colors font-body-md" href="#">Pinterest</a></li>
</ul>
</div>
<div>
<h3 class="font-label-md text-primary uppercase mb-4">Newsletter</h3>
<p class="text-on-surface-variant font-body-md mb-4">Join our artisan circle for first access to new collections.</p>
<div class="flex">
<input class="bg-surface rounded-l-lg border-none px-4 py-2 w-full focus:ring-1 focus:ring-secondary" placeholder="Email Address" type="email"/>
<button class="bg-primary text-on-primary px-4 py-2 rounded-r-lg font-label-md">Join</button>
</div>
</div>
</div>
<div class="px-margin-desktop py-8 border-t border-outline-variant/20 max-w-container-max mx-auto text-center">
<p class="text-on-surface-variant font-body-md text-label-md">© 2024 Handiwoodz Artisan Collective. All rights reserved.</p>
</div>
</footer>
</body></html>
