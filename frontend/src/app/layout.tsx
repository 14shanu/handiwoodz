import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/lib/constants";
import { sharedContent } from "@/lib/content";
import { seoContent } from "@/lib/content/seo";
import { generateOrganizationJsonLd } from "@/lib/utils/seo";
import { getSiteSettings } from "@/lib/api";
import { Navbar, Footer, WhatsAppFloat } from "@/components/layout";
import { LoadingBar } from "@/components/ui";
import { Toaster } from "sonner";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: seoContent.pages.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: sharedContent.description,
  metadataBase: new URL(seoContent.siteUrl),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${ebGaramond.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateOrganizationJsonLd() }}
        />
        <LoadingBar />
        <Navbar logoUrl={siteSettings.logo?.url} />
        <div className="pt-20">{children}</div>
        <Footer logoUrl={siteSettings.logoDark?.url || siteSettings.logo?.url} />
        <WhatsAppFloat />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
