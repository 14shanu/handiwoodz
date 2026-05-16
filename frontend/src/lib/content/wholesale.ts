export const wholesaleContent = {
  hero: {
    title: "Wholesale & Bulk Orders",
    subtitle:
      "Partner with us for large-scale handcrafted wood products that embody artisan heritage and sustainable luxury.",
    ctaPrimary: "Get Wholesale Pricing",
    ctaSecondary: "Request Samples",
  },

  benefits: {
    heading: "The Artisan Advantage",
    items: [
      { icon: "📦", title: "Custom Quantities", description: "Scalable production runs from boutique batches to large commercial inventory levels." },
      { icon: "✨", title: "Bespoke Designs", description: "Collaborative design services to create exclusive product lines for your brand." },
      { icon: "💰", title: "Competitive Pricing", description: "Tiered wholesale structures ensuring your retail margins remain healthy." },
      { icon: "🌍", title: "Worldwide Shipping", description: "Reliable logistics network delivering handcrafted excellence globally." },
    ],
  },

  process: {
    heading: "Seamless Wholesale Journey",
    steps: [
      { icon: "📝", title: "Share Requirements", description: "Tell us about your project, quantities, and specific design needs." },
      { icon: "📋", title: "Receive Quote", description: "Our team provides a detailed proposal including volume pricing and timelines." },
      { icon: "🚚", title: "Production & Delivery", description: "Master artisans craft your order, followed by secure worldwide shipping." },
    ],
  },

  inquiry: {
    whatsapp: {
      heading: "Urgent Inquiries",
      description: "Connect directly with our wholesale coordinator for immediate assistance.",
      buttonLabel: "Chat now for instant response",
    },
    catalog: {
      heading: "Self-Service Selection",
      description: "Browse our full catalog and add items to your quote basket for bulk pricing.",
      buttonLabel: "Browse Catalog",
    },
  },

  trust: {
    label: "Trusted by 100+ businesses worldwide",
  },
} as const;

export type WholesaleContent = typeof wholesaleContent;
