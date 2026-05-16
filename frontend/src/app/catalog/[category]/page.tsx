import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getSubcategoriesByCategory } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { sharedContent, catalogContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Breadcrumb } from "@/components/ui";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return {};

  const seo = seoContent.templates.category(category.name);
  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.CATALOG}/${params.category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const subcategories = await getSubcategoriesByCategory(params.category);

  const breadcrumbItems = [
    { label: sharedContent.breadcrumb.home, href: ROUTES.HOME },
    { label: sharedContent.nav.catalog, href: ROUTES.CATALOG },
    { label: category.name },
  ];

  return (
    <main className="pt-12 pb-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-16">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              {category.description}
            </p>
          )}
        </header>

        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`${ROUTES.CATALOG}/${params.category}/${sub.slug}`}
                className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_4px_20px_-10px_rgba(50,23,22,0.1)] hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-full h-full bg-surface-container-high group-hover:scale-105 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-headline-sm text-on-primary">
                    {sub.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-body text-body-lg text-on-surface-variant">
              {catalogContent.listing.noSubcategories}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
