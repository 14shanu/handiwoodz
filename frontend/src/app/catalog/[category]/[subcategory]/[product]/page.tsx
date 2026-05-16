import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsBySubcategory } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { productContent } from "@/lib/content";
import { sharedContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generatePageMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from "@/lib/utils/seo";
import { Breadcrumb } from "@/components/ui";
import ProductInfoPanel from "@/components/domain/catalog/product-info-panel";
import Link from "next/link";

interface ProductPageProps {
  params: {
    category: string;
    subcategory: string;
    product: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.product);
  if (!product) return {};

  const seo = seoContent.templates.product(
    product.name,
    product.shortDescription || "",
    product.sizeOptions || []
  );

  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.CATALOG}/${params.category}/${params.subcategory}/${params.product}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.product);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsBySubcategory(params.subcategory);
  const related = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const breadcrumbItems = [
    { label: sharedContent.breadcrumb.home, href: ROUTES.HOME },
    { label: sharedContent.nav.catalog, href: ROUTES.CATALOG },
    { label: params.category.replace(/-/g, " "), href: `${ROUTES.CATALOG}/${params.category}` },
    { label: params.subcategory.replace(/-/g, " "), href: `${ROUTES.CATALOG}/${params.category}/${params.subcategory}` },
    { label: product.name },
  ];

  return (
    <main className="pt-12 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateProductJsonLd({
            name: product.name,
            description: product.shortDescription || "",
            url: `${seoContent.siteUrl}${ROUTES.CATALOG}/${params.category}/${params.subcategory}/${params.product}`,
            category: params.category.replace(/-/g, " "),
            sizes: product.sizeOptions,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateBreadcrumbJsonLd(
            breadcrumbItems
              .filter((item) => item.href)
              .map((item) => ({ name: item.label, url: `${seoContent.siteUrl}${item.href}` }))
          ),
        }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mt-12">
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-square bg-surface-container-low rounded-lg overflow-hidden">
            <div className="w-full h-full bg-surface-container-high" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/20"
              >
                <div className="w-full h-full bg-surface-container-high" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Panel (Client Component) */}
        <ProductInfoPanel product={product} />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-section-gap">
          <h2 className="font-display text-headline-md text-primary mb-10">
            {productContent.relatedHeading}
          </h2>
          <div className="flex overflow-x-auto pb-8 gap-8 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
            {related.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`${ROUTES.CATALOG}/${params.category}/${params.subcategory}/${relatedProduct.slug}`}
                className="min-w-[280px] group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-surface-container mb-6 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-surface-container-high group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-body text-label-md text-primary mb-1">
                  {relatedProduct.name}
                </h4>
                <p className="text-on-surface-variant/80 font-body text-body-md text-sm">
                  {relatedProduct.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
