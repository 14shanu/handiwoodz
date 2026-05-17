import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { homepageContent } from "@/lib/content";
import { Category, StrapiMedia } from "@/lib/types";
import { ImageCarousel } from "@/components/ui";

interface CategoryCardsProps {
  categories: Category[];
  fallbackImage?: StrapiMedia;
}

export default function CategoryCards({ categories, fallbackImage }: CategoryCardsProps) {
  return (
    <section className="bg-surface-container-low py-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="font-display text-headline-lg text-primary">
              {homepageContent.categories.heading}
            </h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-lg">
              {homepageContent.categories.subtitle}
            </p>
          </div>
          <Link
            href={ROUTES.CATALOG}
            className="hidden md:flex items-center gap-2 text-secondary font-body text-label-md hover:underline"
          >
            {homepageContent.categories.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {categories.map((category) => {
            const carouselImages = category.productImages || [];
            const hasCarousel = carouselImages.length > 0;
            const staticImage = category.image?.url || fallbackImage?.url;

            return (
              <Link
                key={category.slug}
                href={`${ROUTES.CATALOG}/${category.slug}`}
                className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer"
              >
                {hasCarousel ? (
                  <ImageCarousel
                    images={carouselImages}
                    alt={category.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                ) : staticImage ? (
                  <Image
                    src={staticImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high transition-transform duration-700 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8 z-10">
                  <h3 className="font-display text-headline-sm text-on-primary">
                    {category.name}
                  </h3>
                  <p className="text-on-primary/70 font-body text-body-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {homepageContent.categories.exploreLabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
