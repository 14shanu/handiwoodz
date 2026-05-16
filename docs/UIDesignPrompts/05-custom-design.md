# Custom Design Upload (`/custom-design`)

## Design Prompt for Stitch AI

Design a custom design upload page where customers can upload their own artwork/designs and specify production details. This is a key differentiator for Handiwoodz — allowing custom wood carving from customer files.

### Sections

#### 1. Page Header
- Title: "Upload Your Custom Design"
- Subtitle: "Send us your artwork and we'll bring it to life in wood"
- Brief instructions: supported formats, max file size

#### 2. File Upload Zone
- Large drag-and-drop area (dashed border, centered icon)
- Icon: upload cloud or file icon
- Text: "Drag & drop your design files here"
- Subtext: "or click to browse"
- Supported formats badge: "JPG, PNG, PDF, AI, SVG"
- Max size note: "Max 10MB per file"
- Multiple file upload supported
- Upload progress bar per file
- After upload: file thumbnail preview with filename and ✕ remove button

#### 3. Design Detail Cards (one per uploaded file)
- Each uploaded file generates a card with fields:
  - **File preview** (thumbnail on left/top)
  - **Design Name** — text input (e.g., "My Logo Block")
  - **Product Type** — dropdown: Printing Block, Logo Block, Wall Plate, Pichwai, Other
  - **Dimensions** — two inputs side by side: Width × Height + Unit toggle (inch/cm)
  - **Number of Colors** — dropdown: Single Color, Two Colors, Three Colors, Multicolor, Not Sure
  - **Quantity** — number input with +/- (min: 1)
  - **Notes** — textarea (optional): "Any special instructions for this design"
- Cards are stacked vertically
- Each card has a "Remove" button (top-right)

#### 4. Add More Designs
- "+ Add Another Design" button below the cards
- Opens another upload zone or file picker

#### 5. Summary & Submit Section
- Divider
- Summary: "X designs ready for quotation"
- Customer contact form (if not submitting via quote basket):
  - Full Name
  - Email
  - WhatsApp Number
  - Company Name (optional)
  - Additional Notes (textarea)
- Two action buttons:
  - "Add to Quote Basket" (primary) — adds designs to basket for combined submission
  - "Request Custom Quotation" (secondary) — submits just these designs directly
- WhatsApp alternative: "Prefer to discuss? Chat on WhatsApp →"

### Design Tokens
- Upload zone: dashed border (2px), light background, accent color on drag-over
- Design cards: white background, subtle border, comfortable padding (24px)
- Form inputs: consistent height (44px), clear labels above
- File previews: rounded corners, max 80px thumbnail
- Progress bar: accent color (terracotta)

### Responsive Requirements
- Mobile (320px+): Full-width stacked layout, upload zone fills screen width, cards stack vertically
- Tablet (768px+): Design cards can show file preview beside form fields
- Desktop (1024px+): Max-width container (900px), centered. Cards with preview left + fields right
- Dimension inputs: side by side on all breakpoints (they're small)

### Interactions
- Drag over upload zone: border becomes solid, background highlights
- File upload: progress bar animation, checkmark on complete
- Remove file: fade out animation
- Form validation: inline errors below fields on submit attempt
- Success: redirect to quote basket or show confirmation toast

### States
- Empty: just the upload zone with instructions
- Uploading: progress bars visible
- Files uploaded: design cards appear below upload zone
- Error: red border on upload zone if file type/size invalid, error message

---

## Figma Generated Code
<!-- Paste your Stitch AI / Figma generated code below this line -->

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Handiwoodz | Custom Design Upload</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&amp;family=Montserrat:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .grain-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-tertiary-fixed-variant": "#324c3e",
                      "on-background": "#1b1c1a",
                      "surface-dim": "#dbdad6",
                      "inverse-surface": "#30312e",
                      "tertiary-container": "#1f392c",
                      "outline": "#827472",
                      "on-surface-variant": "#504443",
                      "on-secondary-fixed": "#390c00",
                      "on-primary-container": "#bd928f",
                      "primary-container": "#4a2c2a",
                      "on-tertiary": "#ffffff",
                      "surface-tint": "#795553",
                      "secondary": "#984629",
                      "surface-container-lowest": "#ffffff",
                      "on-error": "#ffffff",
                      "tertiary-fixed-dim": "#b0cdbb",
                      "surface-container-high": "#eae8e4",
                      "primary-fixed-dim": "#eabcb8",
                      "error": "#ba1a1a",
                      "on-secondary-container": "#752c11",
                      "secondary-fixed": "#ffdbcf",
                      "surface-variant": "#e4e2de",
                      "error-container": "#ffdad6",
                      "tertiary": "#092317",
                      "on-primary-fixed-variant": "#5f3e3c",
                      "secondary-container": "#fd9572",
                      "outline-variant": "#d4c3c1",
                      "surface-bright": "#fbf9f5",
                      "inverse-primary": "#eabcb8",
                      "on-primary": "#ffffff",
                      "surface": "#fbf9f5",
                      "primary-fixed": "#ffdad7",
                      "on-primary-fixed": "#2e1413",
                      "on-surface": "#1b1c1a",
                      "primary": "#321716",
                      "on-error-container": "#93000a",
                      "surface-container": "#efeeea",
                      "on-tertiary-fixed": "#062014",
                      "on-secondary-fixed-variant": "#793014",
                      "secondary-fixed-dim": "#ffb59c",
                      "on-tertiary-container": "#86a391",
                      "on-secondary": "#ffffff",
                      "surface-container-highest": "#e4e2de",
                      "inverse-on-surface": "#f2f0ed",
                      "background": "#fbf9f5",
                      "tertiary-fixed": "#ccead6",
                      "surface-container-low": "#f5f3ef"
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
                      "headline-lg-mobile": ["EB Garamond"],
                      "body-lg": ["Montserrat"],
                      "headline-md": ["EB Garamond"],
                      "body-md": ["Montserrat"],
                      "headline-lg": ["EB Garamond"],
                      "display": ["EB Garamond"],
                      "label-md": ["Montserrat"],
                      "headline-sm": ["EB Garamond"]
              },
              "fontSize": {
                      "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
                      "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
                      "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
                      "display": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                      "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
              }
            },
          },
        }
      </script>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen relative">
<div class="fixed inset-0 grain-overlay z-0"></div>
<!-- Top Navigation Bar -->
<header class="bg-surface/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(50,23,22,0.08)] fixed top-0 w-full z-50">
<nav class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div class="font-display text-headline-md text-primary tracking-tight">Handiwoodz</div>
<div class="hidden md:flex gap-8 items-center">
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Catalog</a>
<a class="text-secondary border-b-2 border-secondary font-semibold" href="#">Custom Design</a>
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Our Story</a>
<a class="text-on-surface-variant font-body-md hover:text-secondary transition-colors duration-300" href="#">Wholesale</a>
</div>
<div class="flex gap-4 items-center">
<button class="material-symbols-outlined text-primary p-2">shopping_basket</button>
<button class="material-symbols-outlined text-primary p-2">chat</button>
</div>
</nav>
</header>
<main class="relative z-10 pt-32 pb-24 px-margin-mobile">
<div class="max-w-[900px] mx-auto">
<!-- Header Section -->
<section class="text-center mb-16">
<h1 class="font-headline-lg text-headline-lg text-primary mb-4">Upload Your Custom Design</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant italic max-w-2xl mx-auto">
                    Translate your vision into heirloom quality. Our master craftsmen will work closely with your digital blueprints to create a physical legacy.
                </p>
</section>
<!-- File Upload Zone -->
<div class="mb-12">
<label class="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low hover:bg-surface-container hover:border-secondary transition-all cursor-pointer" for="file-upload">
<div class="flex flex-col items-center justify-center pt-5 pb-6">
<span class="material-symbols-outlined text-[48px] text-outline mb-4 group-hover:scale-110 group-hover:text-secondary transition-transform">cloud_upload</span>
<p class="font-headline-sm text-headline-sm text-on-surface mb-2">Drop your blueprints here</p>
<p class="font-label-md text-label-md text-on-surface-variant">JPG, PNG, PDF, AI, SVG (Max 50MB)</p>
</div>
<input class="hidden" id="file-upload" type="file"/>
</label>
</div>
<!-- Design Detail Card (Active Upload State) -->
<section class="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(50,23,22,0.06)] p-8 mb-12 border border-outline-variant/30">
<div class="flex flex-col md:flex-row gap-8">
<!-- Thumbnail Preview -->
<div class="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden bg-surface-container relative">
<img alt="Design Preview" class="w-full h-full object-cover" data-alt="A macro close-up of a sophisticated geometric logo engraved into a rich, dark walnut wood surface. The wood grain is prominent and elegant, illuminated by warm, directional side-lighting that highlights the texture and depth of the engraving. The overall aesthetic is artisanal and premium, emphasizing high-end craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkPSHQwNWvnon4n6D9oXLKomiHPzkkmzQo1BlQwcX10ZyUzMPCoDpRkOcy07Qw51Zn76WfhiRn41-vsrpyE6D7er7XDz1LoGD6_ZP9HgkLMh3VE4hfNrUXaDqYP028N4umiJYfKaHJNJ16b5dqkwLvXfNShsOUo7l8rCvXUUXfbyXOGzgiPKrOVeNK1gGT1PByfn5-kk_gYKe3eEOCgYJHy7hjIU6kzvV0QMUY5we4qM0Ev6ooBCFKoaapdgVv64cJQrrISLI2umc"/>
<div class="absolute top-2 right-2">
<button class="bg-error/10 text-error p-2 rounded-full hover:bg-error hover:text-on-error transition-colors">
<span class="material-symbols-outlined text-sm">close</span>
</button>
</div>
</div>
<!-- Form Inputs -->
<div class="flex-1 space-y-6">
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Design Name</label>
<input class="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" type="text" value="Heritage Logo Block"/>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Product Type</label>
<select class="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md appearance-none">
<option>Signage &amp; Plaques</option>
<option>Furniture Inlay</option>
<option>Custom Keepsake Box</option>
<option>Kitchenware Engraving</option>
</select>
</div>
<div class="flex items-end gap-2">
<div class="flex-1">
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Dimensions (W x H)</label>
<div class="flex gap-2">
<input class="w-1/2 bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" placeholder="W" type="text"/>
<input class="w-1/2 bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" placeholder="H" type="text"/>
</div>
</div>
<div class="flex bg-surface-container p-1 rounded-lg">
<button class="px-2 py-1 text-[10px] font-bold bg-surface-container-lowest rounded shadow-sm">MM</button>
<button class="px-2 py-1 text-[10px] font-bold text-on-surface-variant">IN</button>
</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Number of Colors</label>
<select class="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md appearance-none">
<option>Single Tone (Engraved)</option>
<option>2 Colors (Inlay)</option>
<option>Multi-color Paint Fill</option>
</select>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Quantity</label>
<div class="flex items-center gap-4">
<button class="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full hover:bg-secondary hover:text-white transition-colors">-</button>
<span class="font-body-md">1</span>
<button class="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full hover:bg-secondary hover:text-white transition-colors">+</button>
</div>
</div>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Notes &amp; Special Requirements</label>
<textarea class="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md resize-none" placeholder="Describe the wood type preference or any specific finishing details..." rows="3"></textarea>
</div>
</div>
</div>
</section>
<!-- Summary & Contact Form -->
<section class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/20">
<h2 class="font-headline-sm text-headline-sm text-primary mb-8 text-center md:text-left">Project Contact Information</h2>
<form class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Full Name</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" type="text"/>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Email Address</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" type="email"/>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">WhatsApp / Phone</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 text-body-md font-body-md" type="tel"/>
</div>
</form>
<div class="flex flex-col md:flex-row items-center justify-center gap-4">
<button class="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-lg font-label-md uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                        Add to Quote Basket
                    </button>
<button class="w-full md:w-auto px-10 py-4 border-2 border-secondary text-secondary rounded-lg font-label-md uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                        Request Custom Quotation
                    </button>
</div>
<p class="text-center mt-6 text-on-surface-variant font-body-md opacity-70">
                    Typical response time for custom quotes: 24-48 business hours.
                </p>
</section>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container-low border-t border-outline-variant/30 w-full mt-section-gap">
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
<div class="col-span-1 md:col-span-1">
<div class="font-display text-headline-sm text-primary mb-4">Handiwoodz</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    © 2024 Handiwoodz. Crafted with patience and heritage.
                </p>
</div>
<div>
<h4 class="font-label-md text-label-md text-primary uppercase mb-6">Quick Links</h4>
<ul class="space-y-3">
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">About</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Catalog</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Custom Design</a></li>
</ul>
</div>
<div>
<h4 class="font-label-md text-label-md text-primary uppercase mb-6">Inquiry</h4>
<ul class="space-y-3">
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Wholesale</a></li>
<li><a class="text-on-surface-variant font-body-md hover:text-primary underline transition-all" href="#">Contact</a></li>
</ul>
</div>
<div>
<h4 class="font-label-md text-label-md text-primary uppercase mb-6">Connect</h4>
<div class="flex gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">brand_awareness</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">public</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">mail</button>
</div>
</div>
</div>
</footer>
</body></html>
