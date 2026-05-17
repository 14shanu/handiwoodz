import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { sharedContent } from "@/lib/content";
import { catalogContent } from "@/lib/content";

interface ProductCardProps {
  product: Product;
  href: string;
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url;
  const imageAlt = product.images?.[0]?.alternativeText || product.name;

  return (
    <div className="group bg-surface hover:shadow-lg transition-all duration-500 rounded-lg overflow-hidden border border-outline-variant/10">
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-surface-container">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high group-hover:scale-105 transition-transform duration-700" />
          )}
          {product.minQuantity > 1 && (
            <div className="absolute top-3 left-3 bg-tertiary text-on-tertiary font-body text-label-md text-[10px] px-2 py-1 uppercase tracking-wider rounded-sm">
              {catalogContent.listing.minQuantityLabel} {product.minQuantity} pcs
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-col h-full">
          <Link href={href}>
            <h3 className="font-display text-lg text-primary mb-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-on-surface-variant font-body line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
          <div className="mt-auto">
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <p className="font-body text-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">
                {product.sizeOptions.length} {catalogContent.listing.sizesAvailable}
              </p>
            )}
            <Link
              href={href}
              className="w-full border border-primary text-primary font-body text-label-md text-[11px] uppercase tracking-[0.15em] py-3 hover:bg-primary hover:text-on-primary transition-all duration-300 block text-center"
            >
              {sharedContent.buttons.addToQuote}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
