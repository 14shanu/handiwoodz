import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { wholesaleContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getSiteSettings } from "@/lib/api";

export const metadata: Metadata = generatePageMetadata({
  title: seoContent.pages.wholesale.title,
  description: seoContent.pages.wholesale.description,
  keywords: seoContent.pages.wholesale.keywords,
  path: "/wholesale",
});

export default async function WholesalePage() {
  const siteSettings = await getSiteSettings();
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-surface-container-low pt-16 pb-24 md:pt-24 md:pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
        {siteSettings.wholesaleHeroImage?.url && (
          <>
            <Image
              src={siteSettings.wholesaleHeroImage.url}
              alt={siteSettings.wholesaleHeroImage.alternativeText || "Wholesale"}
              fill
              className="object-cover opacity-10"
              sizes="100vw"
            />
          </>
        )}
        <div className="max-w-container mx-auto text-center relative z-10">
          <h1 className="font-display text-display text-primary mb-6">
            {wholesaleContent.hero.title}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            {wholesaleContent.hero.subtitle}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#inquiry"
              className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-body text-label-md shadow-md hover:opacity-90 transition-all"
            >
              {wholesaleContent.hero.ctaPrimary}
            </a>
            <a
              href="#inquiry"
              className="border border-primary text-primary px-8 py-4 rounded-lg font-body text-label-md hover:bg-primary hover:text-on-primary transition-all"
            >
              {wholesaleContent.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-headline-lg text-primary mb-4">
              {wholesaleContent.benefits.heading}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {wholesaleContent.benefits.items.map((item) => (
              <div
                key={item.title}
                className="bg-surface p-8 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-6 block">{item.icon}</span>
                <h3 className="font-display text-headline-sm text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant font-body text-body-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container">
        <div className="max-w-container mx-auto">
          <h2 className="font-display text-headline-lg text-primary mb-16 text-center">
            {wholesaleContent.process.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {wholesaleContent.process.steps.map((step) => (
              <div key={step.title} className="text-center group">
                <div className="w-24 h-24 bg-background rounded-full border-4 border-secondary flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="font-display text-headline-sm text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant font-body text-body-md max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container mx-auto grid md:grid-cols-2 gap-gutter">
          <div className="bg-surface-container-low p-10 rounded-lg flex flex-col items-center text-center border border-outline-variant">
            <span className="text-4xl mb-6">💬</span>
            <h3 className="font-display text-headline-sm text-primary mb-4">
              {wholesaleContent.inquiry.whatsapp.heading}
            </h3>
            <p className="text-on-surface-variant font-body text-body-md mb-8 max-w-sm">
              {wholesaleContent.inquiry.whatsapp.description}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-lg font-body text-label-md hover:opacity-90 transition-all"
            >
              {wholesaleContent.inquiry.whatsapp.buttonLabel}
            </a>
          </div>

          <div className="bg-surface-container-low p-10 rounded-lg flex flex-col items-center text-center border border-outline-variant">
            <span className="text-4xl mb-6">🛒</span>
            <h3 className="font-display text-headline-sm text-primary mb-4">
              {wholesaleContent.inquiry.catalog.heading}
            </h3>
            <p className="text-on-surface-variant font-body text-body-md mb-8 max-w-sm">
              {wholesaleContent.inquiry.catalog.description}
            </p>
            <Link
              href={ROUTES.CATALOG}
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-body text-label-md hover:bg-secondary hover:text-on-primary transition-all"
            >
              {wholesaleContent.inquiry.catalog.buttonLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop">
        <p className="text-center font-body text-label-md text-on-surface-variant uppercase tracking-widest">
          {wholesaleContent.trust.label}
        </p>
      </section>
    </main>
  );
}
