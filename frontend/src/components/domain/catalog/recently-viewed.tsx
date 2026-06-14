"use client";

import Link from "next/link";
import Image from "next/image";
import { useRecentlyViewed } from "@/lib/hooks/use-recently-viewed";
import { catalogContent } from "@/lib/content";

export default function RecentlyViewed() {
  const { items, isLoaded } = useRecentlyViewed();

  if (!isLoaded || items.length === 0) return null;

  return (
    <section className="py-12 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container mx-auto">
        <h2 className="font-display text-headline-sm text-primary mb-6">
          {catalogContent.recentlyViewed}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/catalog/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`}
              className="flex-shrink-0 w-32 group"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="font-body text-xs text-on-surface truncate">
                {product.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
