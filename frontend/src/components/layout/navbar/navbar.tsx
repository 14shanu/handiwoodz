"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { sharedContent } from "@/lib/content";

const navLinks = [
  { label: sharedContent.nav.catalog, href: ROUTES.CATALOG },
  { label: sharedContent.nav.customDesign, href: ROUTES.CUSTOM_DESIGN },
  { label: sharedContent.nav.ourStory, href: ROUTES.OUR_STORY },
  { label: sharedContent.nav.wholesale, href: ROUTES.WHOLESALE },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`;

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(50,23,22,0.08)]">
      <nav className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container mx-auto">
        <Link
          href={ROUTES.HOME}
          className="font-display text-headline-md text-primary tracking-tight"
        >
          {sharedContent.siteName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-body text-body-md hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.QUOTE_BASKET}
            className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all active:scale-95"
            aria-label="Quote Basket"
          >
            <QuoteBasketIcon />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-on-surface-variant font-body text-body-lg py-2 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function QuoteBasketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217c5.506 0 9.988-4.478 9.988-9.984 0-5.509-4.482-9.996-9.988-9.996zm5.666 14.078c-.239.672-1.39 1.283-1.907 1.324-.462.037-.89.207-3.007-.626-2.553-1.003-4.177-3.592-4.303-3.76-.126-.167-1.03-1.37-1.03-2.613 0-1.242.652-1.856.884-2.11.232-.254.506-.317.675-.317.168 0 .337 0 .484.009.168.009.378-.057.585.45.213.516.724 1.77.788 1.898.063.127.105.275.02.443-.084.168-.126.273-.252.42-.126.147-.265.328-.378.44-.126.127-.258.264-.11.516.147.253.654 1.078 1.404 1.747.964.86 1.778 1.127 2.03 1.253.253.126.4.106.548-.063.147-.168.632-.737.8-.99.169-.254.337-.211.569-.127.232.084 1.467.692 1.718.818.252.126.42.19.483.295.063.105.063.61-.176 1.193z" />
    </svg>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
