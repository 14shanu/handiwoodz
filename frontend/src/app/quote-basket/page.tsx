"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants";
import { quoteBasketContent, sharedContent } from "@/lib/content";
import { useQuoteBasket } from "@/lib/hooks/use-quote-basket";
import { submitQuoteRequest } from "@/lib/api";
import { QuoteContactForm } from "@/components/domain/quote";
import { QuoteFormData } from "@/lib/schemas";

export default function QuoteBasketPage() {
  const { basket, isLoaded, totalItems, removeCatalogItem, updateCatalogItemQuantity, removeCustomDesign, clearBasket } = useQuoteBasket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);

  if (!isLoaded) {
    return null;
  }

  if (totalItems === 0) {
    return (
      <main className="pt-12 pb-section-gap">
        <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop text-center py-24">
          <h1 className="font-display text-headline-lg text-primary mb-4">
            {quoteBasketContent.emptyBasket.heading}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href={ROUTES.CATALOG}
              className="px-8 py-4 bg-secondary text-on-secondary rounded-lg font-body text-label-md"
            >
              {quoteBasketContent.emptyBasket.browseCta}
            </Link>
            <Link
              href={ROUTES.CUSTOM_DESIGN}
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-body text-label-md"
            >
              {quoteBasketContent.emptyBasket.uploadCta}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12 pb-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-headline-lg text-primary mb-2">
              {quoteBasketContent.heading}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              {totalItems} {quoteBasketContent.itemsLabel}
            </p>
          </div>
          <Link
            href={ROUTES.CATALOG}
            className="font-body text-label-md text-secondary hover:underline"
          >
            ← {quoteBasketContent.continueBrowsing}
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-gutter items-start">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Catalog Items */}
            <section>
              <h2 className="font-display text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">
                {quoteBasketContent.catalogSection.heading} ({basket.catalogItems.length})
              </h2>
              {basket.catalogItems.length === 0 ? (
                <p className="font-body text-body-md text-on-surface-variant">
                  {quoteBasketContent.catalogSection.emptyState}
                </p>
              ) : (
                <div className="space-y-4">
                  {basket.catalogItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedSize}`}
                      className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row gap-6 shadow-sm"
                    >
                      <div className="relative w-full sm:w-32 h-32 bg-surface-container rounded overflow-hidden">
                        {item.productImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-headline-sm text-primary">
                              {item.productName}
                            </h3>
                            <p className="font-body text-label-md text-on-surface-variant mt-1 uppercase tracking-wider">
                              Size: {item.selectedSize}
                            </p>
                          </div>
                          <button
                            onClick={() => removeCatalogItem(item.productId, item.selectedSize)}
                            className="text-outline hover:text-error transition-colors"
                            aria-label={`Remove ${item.productName}`}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex items-center mt-4 gap-4">
                          <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                            <button
                              onClick={() => updateCatalogItemQuantity(item.productId, item.selectedSize, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 hover:bg-surface-container transition-colors"
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className="px-4 font-body text-label-md border-x border-outline-variant">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCatalogItemQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-surface-container transition-colors"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Custom Designs */}
            <section>
              <h2 className="font-display text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">
                {quoteBasketContent.customSection.heading} ({basket.customDesigns.length})
              </h2>
              {basket.customDesigns.length === 0 ? (
                <p className="font-body text-body-md text-on-surface-variant">
                  {quoteBasketContent.customSection.emptyState}
                </p>
              ) : (
                <div className="space-y-4">
                  {basket.customDesigns.map((item) => (
                    <div
                      key={item.fileUrl}
                      className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display text-headline-sm text-primary">
                            {item.designName}
                          </h3>
                          <p className="font-body text-label-md text-on-surface-variant mt-1">
                            {item.width}×{item.height} {item.unit} · Qty: {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeCustomDesign(item.fileUrl)}
                          className="text-outline hover:text-error transition-colors font-body text-label-md"
                          aria-label={`Remove ${item.designName}`}
                        >
                          {quoteBasketContent.removeItem}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Contact Form */}
            <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/20">
              <h2 className="font-display text-headline-md text-primary mb-8">
                {quoteBasketContent.form.heading}
              </h2>
              <QuoteContactForm
                onValidChange={(data) => setFormData(data)}
                disabled={isSubmitting}
              />
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="sticky top-28">
            <div className="bg-surface-container-high rounded-xl p-8 shadow-sm border border-outline-variant/20">
              <h2 className="font-display text-headline-sm text-primary mb-6">
                {quoteBasketContent.summary.heading}
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-body text-body-md text-on-surface-variant">
                    {quoteBasketContent.summary.catalogItems}
                  </span>
                  <span className="font-body text-label-md text-primary">
                    {basket.catalogItems.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-body-md text-on-surface-variant">
                    {quoteBasketContent.summary.customDesigns}
                  </span>
                  <span className="font-body text-label-md text-primary">
                    {basket.customDesigns.length}
                  </span>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="font-body text-label-md text-primary uppercase">
                    {quoteBasketContent.summary.totalItems}
                  </span>
                  <span className="font-display text-headline-sm text-primary">
                    {totalItems}
                  </span>
                </div>
              </div>
              <div className="bg-primary-container/10 p-4 rounded-lg mb-8">
                <p className="font-body text-body-md text-on-surface-variant leading-tight">
                  {quoteBasketContent.summary.pricingNote}
                </p>
              </div>
              <button
                onClick={async () => {
                  if (!formData) return;
                  setIsSubmitting(true);
                  try {
                    const result = await submitQuoteRequest({
                      ...formData,
                      catalogItems: basket.catalogItems,
                      customDesigns: basket.customDesigns,
                    });
                    if (result.success) {
                      toast.success(`Quote submitted! Your reference: ${result.quoteNumber}`);
                      clearBasket();
                    } else {
                      toast.error(result.error || sharedContent.states.genericError);
                    }
                  } catch {
                    toast.error(sharedContent.states.networkError);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={!formData || isSubmitting}
                className="w-full h-14 bg-secondary text-on-secondary rounded-lg font-body text-label-md uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? sharedContent.states.submitting : quoteBasketContent.summary.submitButton}
              </button>
              <div className="mt-6 text-center space-y-4">
                <p className="font-body text-label-md text-on-surface-variant italic">
                  {quoteBasketContent.summary.responseTime}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
