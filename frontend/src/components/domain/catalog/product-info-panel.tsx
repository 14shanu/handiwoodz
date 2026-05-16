"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@/lib/types";
import { ROUTES } from "@/lib/constants";
import { productContent } from "@/lib/content";
import { WHATSAPP_MESSAGES } from "@/lib/constants/config";
import { useQuoteBasket } from "@/lib/hooks/use-quote-basket";

interface ProductInfoPanelProps {
  product: Product;
}

export default function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const { addCatalogItem } = useQuoteBasket();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.productInquiry(product.name, selectedSize || "not selected")
  )}`;

  const handleDecrement = () => {
    if (quantity > product.minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
      <section>
        <h1 className="font-display text-headline-lg text-primary mb-4">
          {product.name}
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-lg">
          {product.shortDescription}
        </p>
      </section>

      {/* Size Selector */}
      {product.sizeOptions && product.sizeOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-body text-label-md text-primary uppercase">
            {productContent.selectSize}
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-2 rounded-lg font-body text-label-md transition-all ${
                  selectedSize === size
                    ? "border-2 border-secondary bg-secondary/5 text-secondary"
                    : "border border-outline hover:border-secondary text-on-surface-variant"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-4">
        <h3 className="font-body text-label-md text-primary uppercase">
          {productContent.quantity}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-outline rounded-lg bg-surface-container-lowest h-12">
            <button
              onClick={handleDecrement}
              className="px-4 text-primary hover:text-secondary h-full flex items-center"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-12 text-center font-body text-label-md">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-4 text-primary hover:text-secondary h-full flex items-center"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="font-body text-label-md text-on-surface-variant/60">
            {productContent.minimumOrder} {product.minQuantity} {productContent.pieces}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <h3 className="font-body text-label-md text-primary uppercase">
          {productContent.notesLabel}
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-4 px-2 min-h-[100px] font-body text-body-md outline-none resize-none"
          placeholder={productContent.notesPlaceholder}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            if (!selectedSize && product.sizeOptions && product.sizeOptions.length > 0) return;
            addCatalogItem({
              productId: product.id,
              productName: product.name,
              productImage: product.images?.[0]?.url || "",
              selectedSize,
              quantity,
              notes,
            });
            setAdded(true);
            toast.success(`${product.name} added to quote basket`);
            setTimeout(() => setAdded(false), 2000);
          }}
          disabled={!!(product.sizeOptions && product.sizeOptions.length > 0 && !selectedSize)}
          className="w-full bg-secondary text-on-secondary py-5 rounded-lg font-body text-label-md shadow-lg shadow-secondary/10 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {added ? "✓ Added!" : productContent.addToBasket}
        </button>
        <Link
          href={ROUTES.CUSTOM_DESIGN}
          className="w-full border-2 border-primary text-primary py-5 rounded-lg font-body text-label-md hover:bg-primary/5 active:scale-95 transition-all text-center"
        >
          {productContent.customizeDesign}
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-body text-label-md pt-2"
        >
          {productContent.whatsappInquiry}
        </a>
      </div>

      {/* Filter Tags */}
      {product.filters && product.filters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/30">
          {product.filters.map((filter) => (
            <span
              key={`${filter.filterName}-${filter.filterValue}`}
              className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-body text-label-md rounded-full text-xs"
            >
              {filter.filterValue}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
