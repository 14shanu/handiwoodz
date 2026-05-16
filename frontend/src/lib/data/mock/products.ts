import { Product } from "@/lib/types";

export const MOCK_FEATURED_PRODUCTS: Product[] = [
  { id: 1, name: "Artisan Walnut Bowl", slug: "artisan-walnut-bowl", shortDescription: "Signature Series", minQuantity: 1, featured: true },
  { id: 2, name: "Oak Keepsake Chest", slug: "oak-keepsake-chest", shortDescription: "Essential Craft", minQuantity: 1, featured: true },
  { id: 3, name: "Teak Heritage Tray", slug: "teak-heritage-tray", shortDescription: "Pattern Collection", minQuantity: 1, featured: true },
  { id: 4, name: "Birch Orbit Lamp", slug: "birch-orbit-lamp", shortDescription: "Modern Heritage", minQuantity: 1, featured: true },
  { id: 5, name: "Custom Pillar Sets", slug: "custom-pillar-sets", shortDescription: "Architectural", minQuantity: 1, featured: true },
  { id: 6, name: "Charred Wall Accents", slug: "charred-wall-accents", shortDescription: "Texture Series", minQuantity: 1, featured: true },
  { id: 7, name: "Executive Desk Suite", slug: "executive-desk-suite", shortDescription: "Bespoke Decor", minQuantity: 1, featured: true },
  { id: 8, name: "Peak Ridge Coasters", slug: "peak-ridge-coasters", shortDescription: "Gifting Series", minQuantity: 1, featured: true },
];

export const MOCK_SUBCATEGORY_PRODUCTS: Product[] = [
  {
    id: 101, name: "Mandala Floret Block", slug: "mandala-floret-block",
    shortDescription: "Traditional circular floret motif hand-carved in seasoned hardwood.",
    sizeOptions: ["3x3 inch", "4x4 inch", "6x6 inch", "Custom"],
    filters: [
      { filterName: "woodType", filterValue: "Sheesham" },
      { filterName: "theme", filterValue: "Floral" },
      { filterName: "shape", filterValue: "Round" },
    ],
    minQuantity: 10, featured: false,
  },
  {
    id: 102, name: "Paisley Border Unit", slug: "paisley-border-unit",
    shortDescription: "Continuous paisley pattern for fabric borders and edging.",
    sizeOptions: ["2x6 inch", "3x8 inch"],
    filters: [
      { filterName: "woodType", filterValue: "Teak" },
      { filterName: "theme", filterValue: "Traditional" },
      { filterName: "shape", filterValue: "Rectangular" },
    ],
    minQuantity: 10, featured: false,
  },
  {
    id: 103, name: "Geometric Tile Set", slug: "geometric-tile-set",
    shortDescription: "Set of 3 small blocks with interlocking geometric star patterns.",
    sizeOptions: ["3x3 inch"],
    filters: [
      { filterName: "woodType", filterValue: "Sheesham" },
      { filterName: "theme", filterValue: "Geometric" },
      { filterName: "shape", filterValue: "Square" },
    ],
    minQuantity: 5, featured: true,
  },
  {
    id: 104, name: "Botanical Vine Block", slug: "botanical-vine-block",
    shortDescription: "Artisan-grade Mango wood block featuring delicate climbing vine details.",
    sizeOptions: ["4x4 inch", "8x3 inch"],
    filters: [
      { filterName: "woodType", filterValue: "Mango" },
      { filterName: "theme", filterValue: "Floral" },
      { filterName: "shape", filterValue: "Rectangular" },
    ],
    minQuantity: 10, featured: false,
  },
];
