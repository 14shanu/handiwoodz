const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://handiwoodz.com";

export const seoContent = {
  siteUrl: SITE_URL,
  siteName: "Handiwoodz",
  defaultImage: `${SITE_URL}/og-image.jpg`,
  locale: "en_US",
  twitterHandle: "@handiwoodz",

  pages: {
    home: {
      title: "Handiwoodz | Artisan Handcrafted Wood Art, Made to Order",
      description:
        "Premium handcrafted wood products — printing blocks, wall plates, pichwai art. Custom designs welcome. Bulk orders for businesses worldwide.",
      keywords: [
        "handcrafted wood products",
        "wooden printing blocks",
        "hand carved wood art",
        "custom wood carving",
        "wholesale wood products",
        "artisan woodcraft India",
        "wooden wall plates",
        "pichwai art wood",
      ],
    },
    catalog: {
      title: "Catalog | Handcrafted Wood Product Collections",
      description:
        "Browse our complete collection of handcrafted wood products. Printing blocks, wall plates, pichwai art, logo blocks, and custom carvings.",
      keywords: [
        "wood product catalog",
        "handcrafted collections",
        "printing blocks catalog",
        "wooden art collections",
      ],
    },
    customDesign: {
      title: "Custom Design | Upload Your Artwork for Wood Carving",
      description:
        "Upload your own design and we'll carve it into premium wood. Custom printing blocks, logo blocks, wall plates. Get a quote within 24 hours.",
      keywords: [
        "custom wood carving",
        "upload design wood block",
        "custom printing block",
        "bespoke wood art",
        "custom logo block",
      ],
    },
    quoteBasket: {
      title: "Quote Basket | Review Your Quotation Request",
      description: "Review your selected products and custom designs before submitting your quotation request.",
    },
    ourStory: {
      title: "Our Story | Heritage Woodcraft Since 3 Decades",
      description:
        "Discover the heritage behind Handiwoodz. Master artisans preserving traditional hand-carving techniques with sustainably sourced wood.",
      keywords: [
        "handiwoodz story",
        "artisan woodcraft heritage",
        "traditional wood carving India",
        "sustainable woodcraft",
      ],
    },
    wholesale: {
      title: "Wholesale | Bulk Orders for Handcrafted Wood Products",
      description:
        "Partner with Handiwoodz for wholesale handcrafted wood products. Custom quantities, bespoke designs, competitive pricing, worldwide shipping.",
      keywords: [
        "wholesale wood products",
        "bulk printing blocks",
        "wholesale wooden art",
        "B2B wood products",
        "bulk custom wood carving",
      ],
    },
  },

  templates: {
    category: (name: string) => ({
      title: `${name} | Handcrafted Wood Products`,
      description: `Explore our ${name.toLowerCase()} collection. Handcrafted by master artisans from sustainably sourced wood. Custom sizes available. Bulk orders welcome.`,
    }),
    subcategory: (subcategoryName: string, categoryName: string) => ({
      title: `${subcategoryName} ${categoryName} | Handiwoodz`,
      description: `Browse ${subcategoryName.toLowerCase()} ${categoryName.toLowerCase()}. Hand-carved from premium wood. Multiple sizes available. Request a quote today.`,
    }),
    product: (productName: string, description: string, sizes: string[]) => ({
      title: `${productName} | Handiwoodz`,
      description: `${description} Available in ${sizes.join(", ")}. Request a quote for bulk orders.`,
    }),
  },

  organization: {
    name: "Handiwoodz",
    type: "Organization",
    description:
      "Artisan handcrafted wood products — printing blocks, wall plates, pichwai art, custom carvings.",
    address: {
      country: "IN",
    },
  },
} as const;

export type SeoContent = typeof seoContent;
