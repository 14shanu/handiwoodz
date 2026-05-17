import Image from "next/image";
import { getSiteSettings } from "@/lib/api";
import CustomDesignForm from "@/components/domain/custom-design/custom-design-form";

export default async function CustomDesignPage() {
  const siteSettings = await getSiteSettings();

  return (
    <main>
      {/* Hero Image */}
      {siteSettings.customDesignHeroImage?.url && (
        <section className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <Image
            src={siteSettings.customDesignHeroImage.url}
            alt={siteSettings.customDesignHeroImage.alternativeText || "Custom Design"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-primary/40" />
        </section>
      )}
      <CustomDesignForm />
    </main>
  );
}
