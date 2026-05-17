"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, QuoteBasketItem } from "@/lib/types";
import { showcaseContent } from "@/lib/content";

interface GalleryCardProps {
  product: Product;
  isInBasket: boolean;
  onAdd: (item: Omit<QuoteBasketItem, "notes">) => void;
  onOpenSheet: (product: Product) => void;
}

export default function GalleryCard({ product, isInBasket, onAdd, onOpenSheet }: GalleryCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const imageUrl = product.images?.[0]?.url;
  const imageAlt = product.images?.[0]?.alternativeText || product.name;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      productId: product.id,
      productName: product.name,
      productImage: imageUrl || "",
      selectedSize,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleCardClick = () => {
    onOpenSheet(product);
  };

  if (!imageUrl) return null;

  return (
    <div
      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 animate-fade-in"
      onClick={handleCardClick}
    >
      {/* Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        loading="lazy"
      />

      {/* Added badge */}
      {isInBasket && !justAdded && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-secondary rounded-full flex items-center justify-center z-10 shadow-md">
          <span className="text-on-secondary text-xs">✓</span>
        </div>
      )}

      {/* Just added feedback */}
      {justAdded && (
        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center z-20 animate-pulse">
          <span className="text-secondary text-4xl">✓</span>
        </div>
      )}

      {/* Hover overlay (desktop only) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-4">
        <p className="text-white font-display text-sm mb-3 line-clamp-1">
          {product.name}
        </p>

        {/* Size chips */}
        {product.sizeOptions && product.sizeOptions.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.sizeOptions.map((size) => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`px-2 py-0.5 text-[10px] rounded-full transition-all ${
                  selectedSize === size
                    ? "bg-secondary text-white"
                    : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Quantity + Add */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/10 rounded-full">
            <button
              onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
              className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white text-xs"
            >
              −
            </button>
            <span className="text-white text-xs w-5 text-center">{quantity}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
              className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white text-xs"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 py-1.5 bg-secondary text-white text-[11px] font-body rounded-full hover:bg-secondary/90 transition-colors"
          >
            {justAdded ? showcaseContent.card.added : showcaseContent.card.addToQuote}
          </button>
        </div>
      </div>
    </div>
  );
}
