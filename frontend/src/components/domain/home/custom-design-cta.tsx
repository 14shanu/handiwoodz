import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { homepageContent } from "@/lib/content";

export default function CustomDesignCta() {
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`;

  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop my-section-gap">
      <div className="bg-primary rounded-2xl overflow-hidden shadow-2xl relative p-12 md:p-24 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="font-display text-headline-lg text-surface-container-lowest">
            {homepageContent.customCta.heading}
          </h2>
          <p className="font-body text-body-lg text-surface-container-highest">
            {homepageContent.customCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href={ROUTES.CUSTOM_DESIGN}
              className="px-10 py-4 bg-secondary text-on-primary rounded-lg font-body text-label-md hover:shadow-xl transition-all active:scale-95"
            >
              {homepageContent.customCta.ctaPrimary}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-surface-container-lowest font-body text-body-md hover:text-secondary-fixed transition-colors"
            >
              {homepageContent.customCta.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
