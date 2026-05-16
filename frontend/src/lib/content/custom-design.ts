export const customDesignContent = {
  heading: "Upload Your Custom Design",
  subtitle:
    "Translate your vision into heirloom quality. Our master craftsmen will work closely with your digital blueprints to create a physical legacy.",

  upload: {
    dropText: "Drop your design files here",
    browseText: "or click to browse",
    formats: "JPG, PNG, PDF, AI, SVG",
    maxSize: "Max 10MB per file",
  },

  designCard: {
    designName: "Design Name",
    productType: "Product Type",
    dimensions: "Dimensions (W × H)",
    colorCount: "Number of Colors",
    quantity: "Quantity",
    notes: "Notes & Special Requirements",
    notesPlaceholder: "Describe the wood type preference or any specific finishing details...",
    remove: "Remove",
  },

  contact: {
    heading: "Project Contact Information",
    fullName: "Full Name",
    email: "Email Address",
    whatsapp: "WhatsApp / Phone",
  },

  actions: {
    addToBasket: "Add to Quote Basket",
    requestQuotation: "Request Custom Quotation",
    responseTime: "Typical response time for custom quotes: 24-48 business hours.",
  },
} as const;

export type CustomDesignContent = typeof customDesignContent;
