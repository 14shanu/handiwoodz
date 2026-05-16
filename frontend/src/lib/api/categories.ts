import { Category } from "@/lib/types";
import { MOCK_CATEGORIES } from "@/lib/data/mock";
import { strapiGet, API } from "./strapi";

export async function getCategories(): Promise<Category[]> {
  try {
    return await strapiGet<Category>(API.CATEGORIES, { "populate": "*" });
  } catch {
    return MOCK_CATEGORIES;
  }
}
