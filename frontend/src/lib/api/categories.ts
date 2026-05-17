import { Category, StrapiMedia } from "@/lib/types";
import { MOCK_CATEGORIES } from "@/lib/data/mock";
import { strapiGet, API } from "./strapi";

export async function getCategories(): Promise<Category[]> {
  try {
    return await strapiGet<Category>(API.CATEGORIES, { "populate": "*" });
  } catch {
    return MOCK_CATEGORIES;
  }
}

export async function getCategoriesWithProductImages(): Promise<Category[]> {
  try {
    const categories = await strapiGet<Category>(API.CATEGORIES, { "populate": "*" });

    // For each category, fetch a few products with images
    const enriched = await Promise.all(
      categories.map(async (category) => {
        try {
          const products = await strapiGet<{ images?: StrapiMedia[] }>(API.PRODUCTS, {
            "filters[subcategory][category][slug][$eq]": category.slug,
            "filters[images][$notNull]": "true",
            "populate": "images",
            "pagination[limit]": "4",
          });

          const productImages = products
            .flatMap((p) => p.images || [])
            .filter((img) => img?.url)
            .slice(0, 4);

          return { ...category, productImages };
        } catch {
          return category;
        }
      })
    );

    return enriched;
  } catch {
    return MOCK_CATEGORIES;
  }
}
