export const productContent = {
  selectSize: "Select Size",
  quantity: "Quantity",
  minimumOrder: "Minimum order:",
  pieces: "pieces",
  notesLabel: "Any special requirements?",
  notesPlaceholder: "e.g., specific wood finish, custom size details...",
  addToBasket: "Add to Quote Basket",
  customizeDesign: "Customize This Design",
  whatsappInquiry: "Ask about this product on WhatsApp",
  relatedHeading: "You May Also Like",
} as const;

export type ProductContent = typeof productContent;
