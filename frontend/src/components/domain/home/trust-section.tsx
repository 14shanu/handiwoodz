import { homepageContent } from "@/lib/content";

export default function TrustSection() {
  return (
    <section className="py-section-gap bg-surface-container-low/50">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {homepageContent.trust.items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center text-center space-y-4 p-6 group hover:bg-surface-container rounded-xl transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <h4 className="font-display text-headline-sm text-primary">
              {item.title}
            </h4>
            <p className="text-on-surface-variant font-body text-body-md">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
