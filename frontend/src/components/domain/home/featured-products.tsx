import Image from "next/image";
import { Product, StrapiMedia } from "@/lib/types";
import { homepageContent } from "@/lib/content";
import { sharedContent } from "@/lib/content";

interface FeaturedProductsProps {
  products: Product[];
  fallbackImage?: StrapiMedia;
}

export default function FeaturedProducts({ products, fallbackImage }: FeaturedProductsProps) {
  return (
    <section className="py-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-headline-lg text-primary">
            {homepageContent.featured.heading}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => {
            const imageUrl = product.images?.[0]?.url || fallbackImage?.url;
            const imageAlt = product.images?.[0]?.alternativeText || product.name;

            return (
              <div
                key={product.id}
                className="group bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-[320px] overflow-hidden rounded-t-lg">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-headline-sm text-primary">
                    {product.name}
                  </h3>
                  <p className="text-secondary font-body text-label-md">
                    {product.shortDescription}
                  </p>
                  <button className="w-full py-3 border border-outline flex items-center justify-center gap-2 font-body text-label-md hover:bg-primary hover:text-on-primary transition-all rounded-lg">
                    {sharedContent.buttons.addToQuote}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
