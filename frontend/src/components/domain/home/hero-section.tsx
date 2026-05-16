import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { homepageContent } from "@/lib/content";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-body text-label-md rounded-full uppercase tracking-widest">
            {homepageContent.hero.badge}
          </span>
          <h1 className="font-display text-headline-lg-mobile md:text-display text-primary">
            {homepageContent.hero.title}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">
            {homepageContent.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href={ROUTES.CATALOG}
              className="px-8 py-4 bg-secondary text-on-secondary rounded-lg font-body text-label-md shadow-lg hover:bg-primary transition-all active:scale-95"
            >
              {homepageContent.hero.ctaPrimary}
            </Link>
            <Link
              href={ROUTES.CUSTOM_DESIGN}
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-body text-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95"
            >
              {homepageContent.hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
          <div className="absolute inset-0 bg-secondary/5 rounded-2xl transform rotate-3 -z-10" />
          <div className="w-full h-full bg-surface-container-high rounded-xl shadow-xl" />
        </div>
      </div>
    </section>
  );
}
