import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubcategoryBySlug, getProductsBySubcategory } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { catalogContent } from "@/lib/content";
import { sharedContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Breadcrumb } from "@/components/ui";
import { ProductCard } from "@/components/domain/catalog";

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  if (!subcategory) return {};

  const seo = seoContent.templates.subcategory(
    subcategory.name,
    subcategory.category?.name || params.category
  );

  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.CATALOG}/${params.category}/${params.subcategory}`,
  });
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);

  if (!subcategory) {
    notFound();
  }

  const products = await getProductsBySubcategory(params.subcategory);

  const breadcrumbItems = [
    { label: sharedContent.breadcrumb.home, href: ROUTES.HOME },
    { label: sharedContent.nav.catalog, href: ROUTES.CATALOG },
    { label: subcategory.category?.name || params.category, href: `${ROUTES.CATALOG}/${params.category}` },
    { label: subcategory.name },
  ];

  return (
    <main className="pt-12 pb-section-gap">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-12">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
            {subcategory.name}
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            {products.length} {catalogContent.listing.productsLabel}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`${ROUTES.CATALOG}/${params.category}/${params.subcategory}/${product.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-body text-body-lg text-on-surface-variant">
              {catalogContent.listing.emptyState}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
