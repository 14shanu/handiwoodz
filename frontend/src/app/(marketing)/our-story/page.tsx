import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { ourStoryContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getSiteSettings } from "@/lib/api";

export const metadata: Metadata = generatePageMetadata({
  title: seoContent.pages.ourStory.title,
  description: seoContent.pages.ourStory.description,
  keywords: seoContent.pages.ourStory.keywords,
  path: "/our-story",
});

export default async function OurStoryPage() {
  const siteSettings = await getSiteSettings();
  const galleryImages = siteSettings.ourStoryGallery || [];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center overflow-hidden">
        {siteSettings.ourStoryHeroImage?.url ? (
          <Image
            src={siteSettings.ourStoryHeroImage.url}
            alt={siteSettings.ourStoryHeroImage.alternativeText || "Our Story"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface-container-high" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-on-primary px-margin-mobile">
          <h1 className="font-display text-display mb-4">
            {ourStoryContent.hero.title}
          </h1>
          <p className="font-body text-body-lg opacity-90">
            {ourStoryContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Narrative Blocks */}
      <section className="max-w-[1100px] mx-auto px-margin-mobile py-section-gap space-y-section-gap">
        {ourStoryContent.narrative.map((block, index) => {
          const galleryImage = galleryImages[index];

          return (
            <div
              key={block.heading}
              className={`grid grid-cols-1 md:grid-cols-2 gap-gutter items-center ${
                index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div className="relative aspect-[4/5] rounded-lg shadow-lg overflow-hidden">
                {galleryImage?.url ? (
                  <Image
                    src={galleryImage.url}
                    alt={galleryImage.alternativeText || block.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high" />
                )}
              </div>
              <div className={index % 2 === 0 ? "md:pl-margin-desktop" : "md:pr-margin-desktop"}>
                <span className="font-body text-label-md text-secondary mb-4 block uppercase">
                  {block.badge}
                </span>
                <h2 className="font-display text-headline-lg text-primary mb-6">
                  {block.heading}
                </h2>
                <p className="font-body text-body-md text-on-surface-variant mb-8">
                  {block.body}
                </p>
                {"quote" in block && block.quote && (
                  <blockquote className="border-l-4 border-secondary pl-6 italic">
                    <p className="font-display text-headline-sm text-primary">
                      &ldquo;{block.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Process */}
      <section className="bg-surface-container-highest/30 py-section-gap">
        <div className="max-w-container mx-auto px-margin-mobile">
          <div className="text-center mb-16">
            <h2 className="font-display text-headline-lg text-primary">
              {ourStoryContent.process.heading}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {ourStoryContent.process.steps.map((step) => (
              <div
                key={step.title}
                className="bg-surface p-8 rounded-lg shadow-sm border border-outline/5 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="text-3xl mb-6 block">{step.icon}</span>
                <h3 className="font-display text-headline-sm text-primary mb-4">
                  {step.title}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1100px] mx-auto px-margin-mobile py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {ourStoryContent.stats.map((stat) => (
            <div key={stat.label} className="p-8">
              <div className="font-display text-display text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-body text-label-md text-on-surface-variant tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-on-primary py-section-gap">
        <div className="max-w-3xl mx-auto px-margin-mobile text-center">
          <h2 className="font-display text-headline-lg mb-8 text-surface">
            {ourStoryContent.cta.heading}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.CATALOG}
              className="bg-secondary text-on-secondary px-10 py-4 rounded-lg font-body text-label-md hover:bg-secondary/90 transition-all shadow-lg"
            >
              {ourStoryContent.cta.primaryButton}
            </Link>
            <Link
              href={ROUTES.CUSTOM_DESIGN}
              className="border border-surface/30 text-surface px-10 py-4 rounded-lg font-body text-label-md hover:bg-surface/10 transition-all"
            >
              {ourStoryContent.cta.secondaryButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
