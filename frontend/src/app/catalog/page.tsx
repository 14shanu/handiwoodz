import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategoriesWithProductImages, getSiteSettings } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { catalogContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Breadcrumb, ImageCarousel } from "@/components/ui";
import { sharedContent } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: seoContent.pages.catalog.title,
  description: seoContent.pages.catalog.description,
  keywords: seoContent.pages.catalog.keywords,
  path: "/catalog",
});

export default async function CatalogPage() {
  const [categories, siteSettings] = await Promise.all([
    getCategoriesWithProductImages(),
    getSiteSettings(),
  ]);

  const breadcrumbItems = [
    { label: sharedContent.breadcrumb.home, href: ROUTES.HOME },
    { label: sharedContent.nav.catalog },
  ];

  return (
    <main className="pt-12 pb-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-16">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            {catalogContent.heading}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            {catalogContent.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {categories.map((category) => {
            const carouselImages = category.productImages || [];
            const hasCarousel = carouselImages.length > 0;
            const staticImage = category.image?.url || siteSettings.fallbackCategoryImage?.url;

            return (
              <Link
                key={category.slug}
                href={`${ROUTES.CATALOG}/${category.slug}`}
                className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover:-translate-y-2 transition-transform duration-300"
              >
                {hasCarousel ? (
                  <ImageCarousel
                    images={carouselImages}
                    alt={category.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : staticImage ? (
                  <Image
                    src={staticImage}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-600"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high group-hover:scale-105 transition-transform duration-600" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h3 className="font-display text-headline-sm text-on-primary">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-24 relative overflow-hidden bg-primary rounded-lg p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-display text-headline-md text-inverse-primary mb-2">
              {catalogContent.customCta.heading}
            </h2>
            <p className="font-body text-body-md text-on-primary-container">
              {catalogContent.customCta.subtitle}
            </p>
          </div>
          <Link
            href={ROUTES.CUSTOM_DESIGN}
            className="flex items-center gap-3 bg-secondary text-on-primary px-8 py-4 rounded-lg font-body text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg active:scale-95"
          >
            {catalogContent.customCta.buttonLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
