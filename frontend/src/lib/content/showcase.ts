export const showcaseContent = {
  filters: {
    all: "All",
    search: "Search blocks...",
  },

  sort: {
    newest: "Newest",
    featured: "Featured",
    nameAz: "Name A-Z",
  },

  card: {
    addToQuote: "Add to Quote",
    added: "✓ Added!",
    selectSize: "Size",
    quantity: "Qty",
  },

  basket: {
    viewBasket: "View Basket",
    items: "items",
  },

  empty: {
    heading: "No products to showcase yet",
    description: "Products with images will appear here.",
  },
} as const;

export type ShowcaseContent = typeof showcaseContent;
