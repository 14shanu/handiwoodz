import { getCategories, getFeaturedProducts } from "@/lib/api";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  HeroSection,
  CategoryCards,
  FeaturedProducts,
  CustomDesignCta,
  TrustSection,
} from "@/components/domain/home";

export const metadata = generatePageMetadata({
  title: seoContent.pages.home.title,
  description: seoContent.pages.home.description,
  keywords: seoContent.pages.home.keywords,
  path: "/",
});

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <main>
      <HeroSection />
      <CategoryCards categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <CustomDesignCta />
      <TrustSection />
    </main>
  );
}
