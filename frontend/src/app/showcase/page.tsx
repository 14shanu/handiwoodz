import { getCategories } from "@/lib/api";
import { generatePageMetadata } from "@/lib/utils/seo";
import { GalleryGrid } from "@/components/domain/showcase";
import { Product } from "@/lib/types";
import { strapiGet, API } from "@/lib/api/strapi";

export const metadata = generatePageMetadata({
  title: "Showcase | Handiwoodz",
  description: "Browse our complete collection of handcrafted wood products. Visual gallery of printing blocks, wall plates, pichwai art, and more.",
  keywords: ["handcrafted wood", "printing blocks", "gallery", "showcase", "wood art"],
  path: "/showcase",
});

async function getAllProducts(): Promise<Product[]> {
  try {
    return await strapiGet<Product>(API.PRODUCTS, { populate: "*" });
  } catch {
    const { MOCK_FEATURED_PRODUCTS, MOCK_SUBCATEGORY_PRODUCTS } = await import("@/lib/data/mock");
    return [...MOCK_FEATURED_PRODUCTS, ...MOCK_SUBCATEGORY_PRODUCTS];
  }
}

export default async function ShowcasePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return <GalleryGrid products={products} categories={categories} />;
}
