import type { Metadata } from "next";
import { seoContent } from "@/lib/content/seo";

interface PageSeoOptions {
  title: string;
  description: string;
  keywords?: readonly string[] | string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  path = "",
  image,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${seoContent.siteUrl}${path}`;
  const ogImage = image || seoContent.defaultImage;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seoContent.siteName,
      locale: seoContent.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function generateOrganizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoContent.organization.name,
    description: seoContent.organization.description,
    url: seoContent.siteUrl,
    address: {
      "@type": "PostalAddress",
      addressCountry: seoContent.organization.address.country,
    },
  });
}

export function generateProductJsonLd(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  sizes?: string[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image || seoContent.defaultImage,
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    additionalProperty: product.sizes?.map((size) => ({
      "@type": "PropertyValue",
      name: "Size",
      value: size,
    })),
  });
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
