import { Subcategory } from "@/lib/types";

export const MOCK_SUBCATEGORIES: Subcategory[] = [
  { id: 1, name: "Hand Carved", slug: "hand-carved", category: { id: 1, name: "Printing Blocks", slug: "printing-blocks" } },
  { id: 2, name: "Machine Assisted", slug: "machine-assisted", category: { id: 1, name: "Printing Blocks", slug: "printing-blocks" } },
  { id: 3, name: "Decorative", slug: "decorative", category: { id: 2, name: "Wall Plates", slug: "wall-plates" } },
];
