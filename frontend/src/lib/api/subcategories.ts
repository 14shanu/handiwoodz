import { Subcategory, StrapiMedia } from "@/lib/types";
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

export async function getSubcategoriesWithProductImages(categorySlug: string): Promise<Subcategory[]> {
  try {
    const subcategories = await strapiGet<Subcategory>(API.SUBCATEGORIES, {
      "filters[category][slug][$eq]": categorySlug,
      "populate": "*",
    });

    const enriched = await Promise.all(
      subcategories.map(async (sub) => {
        try {
          const products = await strapiGet<{ images?: StrapiMedia[] }>(API.PRODUCTS, {
            "filters[subcategory][slug][$eq]": sub.slug,
            "filters[images][$notNull]": "true",
            "populate": "images",
            "pagination[limit]": "4",
          });

          const productImages = products
            .flatMap((p) => p.images || [])
            .filter((img) => img?.url)
            .slice(0, 4);

          return { ...sub, productImages };
        } catch {
          return sub;
        }
      })
    );

    return enriched;
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
