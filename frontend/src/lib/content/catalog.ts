export const catalogContent = {
  heading: "Our Collection",
  subtitle:
    "Explore handcrafted wood products by category. Each piece is carved from sustainable timber and finished with natural oils, preserving the heritage of master woodworking.",
  customCta: {
    heading: "Don't see what you need?",
    subtitle:
      "Our master carvers can bring your specific vision to life with custom dimensions and motifs.",
    buttonLabel: "Upload your own design →",
  },
  listing: {
    productsLabel: "products",
    filtersHeading: "Filters",
    clearAll: "Clear All",
    sortLabel: "Sort By:",
    sortOptions: ["Featured", "Newest", "Name A-Z"],
    emptyState: "No products match your filters.",
    clearFilters: "Clear filters",
    minQuantityLabel: "Min:",
    sizesAvailable: "sizes available",
    noSubcategories: "No subcategories found.",
  },
} as const;

export type CatalogContent = typeof catalogContent;
