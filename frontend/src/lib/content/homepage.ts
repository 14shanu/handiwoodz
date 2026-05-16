export const homepageContent = {
  hero: {
    badge: "Master Craftsmanship",
    title: "Handcrafted Wood Art, Made to Order",
    subtitle:
      "Bridging the gap between raw natural materials and refined luxury through slow-living, tactile stories, and timeless quality.",
    ctaPrimary: "Browse Catalog",
    ctaSecondary: "Upload Your Design",
  },

  categories: {
    heading: "Explore by Category",
    subtitle:
      "From architectural wall pieces to intricate printing tools, discover our signature collections.",
    viewAll: "View All Categories →",
    exploreLabel: "Explore collection",
  },

  featured: {
    heading: "Featured Creations",
  },

  customCta: {
    heading: "Have Your Own Design?",
    subtitle:
      "We bring your imagination to life. From custom logos to bespoke architectural elements, our master carvers are ready for your project.",
    ctaPrimary: "Upload Custom Design",
    ctaSecondary: "Chat with us on WhatsApp",
  },

  trust: {
    items: [
      {
        icon: "✓",
        title: "Handcrafted Quality",
        description:
          "Every piece is hand-selected and finished by master artisans with decades of heritage experience.",
      },
      {
        icon: "📦",
        title: "Bulk Orders Welcome",
        description:
          "We specialize in wholesale partnerships for hospitality, corporate gifting, and interior design firms.",
      },
      {
        icon: "🎨",
        title: "Custom Designs",
        description:
          "Send us your sketches or blueprints. We provide detailed digital previews before starting the craft.",
      },
      {
        icon: "🌍",
        title: "Worldwide Shipping",
        description:
          "Secure, carbon-neutral shipping to your doorstep, anywhere in the world with premium insurance.",
      },
    ],
  },
} as const;

export type HomepageContent = typeof homepageContent;
