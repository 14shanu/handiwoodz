import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { sharedContent } from "@/lib/content";

const collectionsLinks = sharedContent.footer.links.collections.map((link) => ({
  label: link.label,
  href: ROUTES[link.key.toUpperCase().replace(/-/g, "_") as keyof typeof ROUTES] || "#",
}));

const businessLinks = sharedContent.footer.links.business.map((link) => ({
  label: link.label,
  href: ROUTES[link.key.toUpperCase().replace(/-/g, "_") as keyof typeof ROUTES] || "#",
}));

export default function Footer({ logoUrl }: { logoUrl?: string }) {
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`;

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 w-full mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container mx-auto">
        <div className="space-y-4">
          <Link
            href={ROUTES.HOME}
            className="font-display text-headline-sm text-primary block"
          >
            {logoUrl ? (
              <Image src={logoUrl} alt={sharedContent.siteName} width={128} height={32} className="h-8 w-auto" />
            ) : (
              sharedContent.siteName
            )}
          </Link>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            {sharedContent.footer.brandDescription}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-body text-label-md text-primary uppercase tracking-widest">
            {sharedContent.footer.collectionsHeading}
          </h4>
          <ul className="space-y-2">
            {collectionsLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-on-surface-variant font-body text-body-md hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-body text-label-md text-primary uppercase tracking-widest">
            {sharedContent.footer.businessHeading}
          </h4>
          <ul className="space-y-2">
            {businessLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-on-surface-variant font-body text-body-md hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-body text-label-md text-primary uppercase tracking-widest">
            {sharedContent.footer.contactHeading}
          </h4>
          <p className="font-body text-body-md text-on-surface-variant">
            {sharedContent.footer.contactDescription}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary font-body text-label-md hover:text-primary transition-colors"
          >
            <WhatsAppSmallIcon />
            {sharedContent.buttons.chatOnWhatsapp}
          </a>
        </div>
      </div>

      <div className="border-t border-outline-variant/20 px-margin-mobile md:px-margin-desktop py-6 max-w-container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-label-md text-on-surface-variant/60 uppercase tracking-widest">
          © {new Date().getFullYear()} {sharedContent.siteName}. {sharedContent.footer.copyright}
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-on-surface-variant/60 text-label-md hover:text-primary transition-colors">
            {sharedContent.footer.privacyLink}
          </Link>
          <Link href="#" className="text-on-surface-variant/60 text-label-md hover:text-primary transition-colors">
            {sharedContent.footer.termsLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppSmallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217c5.506 0 9.988-4.478 9.988-9.984 0-5.509-4.482-9.996-9.988-9.996zm5.666 14.078c-.239.672-1.39 1.283-1.907 1.324-.462.037-.89.207-3.007-.626-2.553-1.003-4.177-3.592-4.303-3.76-.126-.167-1.03-1.37-1.03-2.613 0-1.242.652-1.856.884-2.11.232-.254.506-.317.675-.317.168 0 .337 0 .484.009.168.009.378-.057.585.45.213.516.724 1.77.788 1.898.063.127.105.275.02.443-.084.168-.126.273-.252.42-.126.147-.265.328-.378.44-.126.127-.258.264-.11.516.147.253.654 1.078 1.404 1.747.964.86 1.778 1.127 2.03 1.253.253.126.4.106.548-.063.147-.168.632-.737.8-.99.169-.254.337-.211.569-.127.232.084 1.467.692 1.718.818.252.126.42.19.483.295.063.105.063.61-.176 1.193z" />
    </svg>
  );
}
