import { getCategories, getFeaturedProducts, getSiteSettings } from "@/lib/api";
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
  const [categories, featuredProducts, siteSettings] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <HeroSection
        heroImage={siteSettings.heroImage}
        heroImageMobile={siteSettings.heroImageMobile}
      />
      <CategoryCards
        categories={categories}
        fallbackImage={siteSettings.fallbackCategoryImage}
      />
      <FeaturedProducts
        products={featuredProducts}
        fallbackImage={siteSettings.fallbackProductImage}
      />
      <CustomDesignCta backgroundImage={siteSettings.ctaBackgroundImage} />
      <TrustSection />
    </main>
  );
}
