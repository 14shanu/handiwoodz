"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Product, Category, QuoteBasketItem } from "@/lib/types";
import { ROUTES } from "@/lib/constants";
import { showcaseContent } from "@/lib/content";
import { useQuoteBasket } from "@/lib/hooks/use-quote-basket";
import GalleryCard from "./gallery-card";

interface GalleryGridProps {
  products: Product[];
  categories: Category[];
}

type SortOption = "newest" | "featured" | "nameAz";

export default function GalleryGrid({ products, categories }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const [sheetSize, setSheetSize] = useState("");
  const [sheetQuantity, setSheetQuantity] = useState(1);

  const { basket, addCatalogItem, removeCatalogItem, totalItems } = useQuoteBasket();

  // Build filter pills from categories + popular filter values
  const filterPills = useMemo(() => {
    const pills: { label: string; value: string; type: "category" | "filter" }[] = [
      { label: showcaseContent.filters.all, value: "all", type: "category" },
    ];

    categories.forEach((cat) => {
      pills.push({ label: cat.name, value: cat.slug, type: "category" });
    });

    // Extract popular filter values from products
    const filterCounts: Record<string, number> = {};
    products.forEach((p) => {
      p.filters?.forEach((f) => {
        const key = f.filterValue;
        filterCounts[key] = (filterCounts[key] || 0) + 1;
      });
    });

    Object.entries(filterCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .forEach(([value]) => {
        pills.push({ label: value, value, type: "filter" });
      });

    return pills;
  }, [categories, products]);

  // Filter + search + sort
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.images && p.images.length > 0);

    // Apply category/filter
    if (activeFilter !== "all") {
      result = result.filter((p) => {
        const matchesCategory = p.subcategory?.category?.slug === activeFilter;
        const matchesFilter = p.filters?.some((f) => f.filterValue === activeFilter);
        return matchesCategory || matchesFilter;
      });
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.filters?.some((f) => f.filterValue.toLowerCase().includes(q))
      );
    }

    // Apply sort
    switch (sortBy) {
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "nameAz":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        break;
    }

    return result;
  }, [products, activeFilter, searchQuery, sortBy]);

  const basketProductIds = useMemo(
    () => new Set(basket.catalogItems.map((item) => item.productId)),
    [basket.catalogItems]
  );

  const handleAdd = useCallback((item: Omit<QuoteBasketItem, "notes">) => {
    addCatalogItem({ ...item, notes: "" });
    toast.success(`${item.productName} added to basket`);
  }, [addCatalogItem]);

  const handleRemove = useCallback((productId: number, productName: string) => {
    removeCatalogItem(productId, "");
    toast.success(`${productName} removed from basket`);
  }, [removeCatalogItem]);

  const handleSheetAdd = () => {
    if (!sheetProduct) return;
    addCatalogItem({
      productId: sheetProduct.id,
      productName: sheetProduct.name,
      productImage: sheetProduct.images?.[0]?.url || "",
      selectedSize: sheetSize,
      quantity: sheetQuantity,
      notes: "",
    });
    toast.success(`${sheetProduct.name} added to basket`);
    setSheetProduct(null);
    setSheetSize("");
    setSheetQuantity(1);
  };

  const openSheet = (product: Product) => {
    // Only on mobile
    if (window.innerWidth >= 768) return;
    setSheetProduct(product);
    setSheetSize(product.sizeOptions?.[0] || "");
    setSheetQuantity(1);
  };

  return (
    <div className="min-h-screen">
      {/* Search + Sort bar */}
      <div className="sticky top-20 z-30 bg-surface border-b border-outline-variant/20 py-4 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container mx-auto flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full md:max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={showcaseContent.filters.search}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-full font-body text-body-md focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-full font-body text-body-md focus:outline-none focus:border-secondary"
          >
            <option value="featured">{showcaseContent.sort.featured}</option>
            <option value="newest">{showcaseContent.sort.newest}</option>
            <option value="nameAz">{showcaseContent.sort.nameAz}</option>
          </select>
        </div>

        {/* Filter pills — inside same sticky container */}
        <div className="max-w-container mx-auto flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {filterPills.map((pill) => (
            <button
              key={pill.value}
              onClick={() => setActiveFilter(pill.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-label-md transition-all ${
                activeFilter === pill.value
                  ? "bg-secondary text-on-secondary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                className="animate-slide-up"
              >
                <GalleryCard
                  product={product}
                  isInBasket={basketProductIds.has(product.id)}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                  onOpenSheet={openSheet}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-display text-headline-sm text-on-surface-variant mb-2">
              {showcaseContent.empty.heading}
            </p>
            <p className="font-body text-body-md text-on-surface-variant/60">
              {showcaseContent.empty.description}
            </p>
          </div>
        )}
      </div>

      {/* Sticky basket pill */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
          <Link
            href={ROUTES.QUOTE_BASKET}
            className="flex items-center gap-3 px-6 py-3 bg-secondary text-on-secondary rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span className="text-sm">🛒</span>
            <span className="font-body text-label-md">
              {totalItems} {showcaseContent.basket.items}
            </span>
            <span className="font-body text-label-md opacity-80">—</span>
            <span className="font-body text-label-md">
              {showcaseContent.basket.viewBasket} →
            </span>
          </Link>
        </div>
      )}

      {/* Mobile bottom sheet */}
      {sheetProduct && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setSheetProduct(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 pb-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-6" />

            <div className="flex gap-4 mb-6">
              {sheetProduct.images?.[0]?.url && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={sheetProduct.images[0].url}
                    alt={sheetProduct.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-headline-sm text-primary">
                  {sheetProduct.name}
                </h3>
                {sheetProduct.shortDescription && (
                  <p className="font-body text-body-md text-on-surface-variant mt-1 line-clamp-2">
                    {sheetProduct.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Size chips */}
            {sheetProduct.sizeOptions && sheetProduct.sizeOptions.length > 0 && (
              <div className="mb-4">
                <p className="font-body text-label-md text-on-surface-variant uppercase mb-2">
                  {showcaseContent.card.selectSize}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sheetProduct.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSheetSize(size)}
                      className={`px-4 py-2 rounded-lg font-body text-label-md transition-all ${
                        sheetSize === size
                          ? "bg-secondary text-on-secondary"
                          : "border border-outline-variant text-on-surface-variant"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-body text-label-md text-on-surface-variant uppercase">
                {showcaseContent.card.quantity}
              </p>
              <div className="flex items-center border border-outline-variant rounded-full">
                <button
                  onClick={() => setSheetQuantity(Math.max(1, sheetQuantity - 1))}
                  className="px-4 py-2 text-primary"
                >
                  −
                </button>
                <span className="px-3 font-body text-label-md">{sheetQuantity}</span>
                <button
                  onClick={() => setSheetQuantity(sheetQuantity + 1)}
                  className="px-4 py-2 text-primary"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add button */}
            <button
              onClick={handleSheetAdd}
              className="w-full py-4 bg-secondary text-on-secondary rounded-lg font-body text-label-md uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
            >
              {showcaseContent.card.addToQuote}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
