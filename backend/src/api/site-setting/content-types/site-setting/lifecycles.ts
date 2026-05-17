const IMAGE_GUIDE = `
# 📸 Image Guide — Where Each Image Appears

## logo
**Location:** Navbar (top left) + Footer
**Size:** 200x60px recommended (transparent PNG or SVG)
**What to use:** Your brand logo on transparent background (for light backgrounds)

## logoDark
**Location:** Navbar/Footer when on dark backgrounds (e.g., footer)
**Size:** 200x60px recommended (transparent PNG or SVG)
**What to use:** White/light version of your logo (for dark backgrounds)

## heroImage
**Location:** Homepage → Top hero section (right side)
**Size:** 1200x800px recommended (landscape)
**What to use:** A stunning product showcase, workshop shot, or artisan at work

## heroImageMobile
**Location:** Homepage → Hero section on mobile devices
**Size:** 800x600px recommended
**What to use:** Same as hero but cropped for portrait/mobile view (optional — falls back to heroImage)

## ctaBackgroundImage
**Location:** Homepage → "Have Your Own Design?" section background
**Size:** 1400x600px recommended (wide landscape)
**What to use:** Workshop scene, wood textures, or craft tools — something atmospheric

## customDesignHeroImage
**Location:** Custom Design Upload page → Top decorative area
**Size:** 1200x400px recommended (wide)
**What to use:** Close-up of custom carving work, design sketches, or tools on workbench

## ourStoryHeroImage
**Location:** Our Story page → Top header section
**Size:** 1200x600px recommended
**What to use:** The artisan/founder at work, or the workshop exterior

## ourStoryGallery
**Location:** Our Story page → Photo gallery section (alongside narrative blocks)
**Size:** 800x1000px each (portrait works best)
**What to use:** Upload in this order:
  - Image 1 → "The Heart of Woodcraft" section
  - Image 2 → "Master Artisans" section
  - Image 3 → "Our Values" section
  - Image 4+ → Additional gallery (future use)

## wholesaleHeroImage
**Location:** Wholesale page → Top header section (subtle background)
**Size:** 1200x600px recommended
**What to use:** Bulk products, packaging, or shipping scene

## fallbackProductImage
**Location:** Any product card/page when the product has no image uploaded
**Size:** 600x600px (square)
**What to use:** A neutral wood texture or your logo on a wood background

## fallbackCategoryImage
**Location:** Category cards on homepage/catalog when category has no image
**Size:** 800x1000px (portrait, tall card)
**What to use:** A representative product from that category type, or wood texture

---
💡 **Tips:**
- Use high-quality JPG or WebP for photos
- Use PNG with transparency for logos
- Keep file size under 2MB (Cloudinary will optimize automatically)
- All images are served via Cloudinary CDN — fast worldwide
`;

export default {
  async beforeCreate(event) {
    if (!event.params.data.imageGuide) {
      event.params.data.imageGuide = IMAGE_GUIDE;
    }
  },
};
