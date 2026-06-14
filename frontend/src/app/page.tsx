import { getCategoriesWithProductImages, getFeaturedProducts, getSiteSettings } from "@/lib/api";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { AnimateOnScroll } from "@/components/ui";
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
    getCategoriesWithProductImages(),
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <HeroSection
        heroImage={siteSettings.heroImage}
        heroImageMobile={siteSettings.heroImageMobile}
      />
      <AnimateOnScroll>
        <CategoryCards
          categories={categories}
          fallbackImage={siteSettings.fallbackCategoryImage}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FeaturedProducts
          products={featuredProducts}
          fallbackImage={siteSettings.fallbackProductImage}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CustomDesignCta backgroundImage={siteSettings.ctaBackgroundImage} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <TrustSection />
      </AnimateOnScroll>
    </main>
  );
}
