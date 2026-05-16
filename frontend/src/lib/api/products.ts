import { Product } from "@/lib/types";
import { MOCK_FEATURED_PRODUCTS, MOCK_SUBCATEGORY_PRODUCTS } from "@/lib/data/mock";
import { strapiGet, strapiGetOne, API } from "./strapi";

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await strapiGet<Product>(API.PRODUCTS, {
      "filters[featured][$eq]": "true",
      "populate": "*",
    });
  } catch {
    return MOCK_FEATURED_PRODUCTS;
  }
}

export async function getProductsBySubcategory(subcategorySlug: string): Promise<Product[]> {
  try {
    return await strapiGet<Product>(API.PRODUCTS, {
      "filters[subcategory][slug][$eq]": subcategorySlug,
      "populate": "*",
    });
  } catch {
    return MOCK_SUBCATEGORY_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    return await strapiGetOne<Product>(API.PRODUCTS, {
      "filters[slug][$eq]": slug,
      "populate": "*",
    });
  } catch {
    const all = [...MOCK_FEATURED_PRODUCTS, ...MOCK_SUBCATEGORY_PRODUCTS];
    return all.find((p) => p.slug === slug);
  }
}
