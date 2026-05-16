import { Subcategory } from "@/lib/types";
import { MOCK_SUBCATEGORIES } from "@/lib/data/mock";
import { strapiGet, strapiGetOne, API } from "./strapi";

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  try {
    return await strapiGet<Subcategory>(API.SUBCATEGORIES, {
      "filters[category][slug][$eq]": categorySlug,
      "populate": "*",
    });
  } catch {
    return MOCK_SUBCATEGORIES.filter((sub) => sub.category?.slug === categorySlug);
  }
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | undefined> {
  try {
    return await strapiGetOne<Subcategory>(API.SUBCATEGORIES, {
      "filters[slug][$eq]": slug,
      "populate": "*",
    });
  } catch {
    return MOCK_SUBCATEGORIES.find((sub) => sub.slug === slug);
  }
}
