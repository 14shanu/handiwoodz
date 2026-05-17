export const sharedContent = {
  siteName: "Handiwoodz",
  tagline: "Handcrafted Wood Art, Made to Order",
  description:
    "Bridging the gap between raw natural materials and refined luxury through slow-living, tactile stories, and timeless quality.",

  nav: {
    catalog: "Catalog",
    showcase: "Showcase",
    customDesign: "Custom Design",
    ourStory: "Our Story",
    wholesale: "Wholesale",
  },

  buttons: {
    addToQuote: "Add to Quote",
    chatOnWhatsapp: "Chat on WhatsApp",
    browseCatalog: "Browse Catalog",
    uploadDesign: "Upload Your Design",
    viewAll: "View All",
  },

  breadcrumb: {
    home: "Home",
  },

  states: {
    uploading: "Uploading...",
    submitting: "Submitting...",
    networkError: "Network error. Please try again.",
    genericError: "Something went wrong. Please try again.",
    uploadFailed: "Upload failed",
  },

  footer: {
    brandDescription:
      "Preserving the soul of master craftsmanship through sustainably sourced wood and traditional hand-carving techniques.",
    contactHeading: "Contact Us",
    contactDescription: "Visit our studio at the heart of the craft valley.",
    collectionsHeading: "Collections",
    businessHeading: "Business",
    copyright: "Crafted with patience and heritage.",
    privacyLink: "Privacy",
    termsLink: "Terms",
    links: {
      collections: [
        { label: "About", key: "our-story" },
        { label: "Catalog", key: "catalog" },
        { label: "Custom Design", key: "custom-design" },
      ],
      business: [
        { label: "Wholesale", key: "wholesale" },
        { label: "Contact", key: "contact" },
        { label: "Terms of Service", key: "terms" },
      ],
    },
  },
} as const;

export type SharedContent = typeof sharedContent;
