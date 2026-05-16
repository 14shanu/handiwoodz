export const quoteBasketContent = {
  heading: "Your Quote Basket",
  itemsLabel: "items in your basket",
  continueBrowsing: "Continue Browsing",

  catalogSection: {
    heading: "Selected Products",
    emptyState: "No catalog items yet. Browse our collection →",
  },

  customSection: {
    heading: "Custom Designs",
    emptyState: "No custom designs. Upload your artwork →",
  },

  summary: {
    heading: "Basket Summary",
    catalogItems: "Catalog Items",
    customDesigns: "Custom Designs",
    totalItems: "Total Items",
    pricingNote: "Final pricing will be provided in our personalized quote.",
    submitButton: "Request Quotation",
    responseTime: "We'll respond within 24 hours",
    whatsappAlt: "Or discuss on WhatsApp first",
  },

  form: {
    heading: "Your Contact Details",
    fullName: "Full Name",
    email: "Email Address",
    whatsapp: "WhatsApp Number",
    country: "Country",
    companyName: "Company Name",
    companyPlaceholder: "Optional",
    notes: "Additional Notes",
    notesPlaceholder: "Any specific requirements or questions...",
    required: "*",
  },

  emptyBasket: {
    heading: "Your quote basket is empty",
    browseCta: "Browse Catalog",
    uploadCta: "Upload Custom Design",
  },

  editNotes: "Edit Notes",
  removeItem: "Remove",
} as const;

export type QuoteBasketContent = typeof quoteBasketContent;
