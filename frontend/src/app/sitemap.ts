import { MetadataRoute } from "next";
import { getCategories } from "@/lib/api";
import { getProductsBySubcategory } from "@/lib/api";
import { MOCK_SUBCATEGORIES } from "@/lib/data/mock";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://handiwoodz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/custom-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/our-story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/wholesale`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/catalog/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const subcategoryPages: MetadataRoute.Sitemap = MOCK_SUBCATEGORIES.map((sub) => ({
    url: `${SITE_URL}/catalog/${sub.category?.slug}/${sub.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = [];
  for (const sub of MOCK_SUBCATEGORIES) {
    const products = await getProductsBySubcategory(sub.slug);
    for (const product of products) {
      productPages.push({
        url: `${SITE_URL}/catalog/${sub.category?.slug}/${sub.slug}/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages];
}
