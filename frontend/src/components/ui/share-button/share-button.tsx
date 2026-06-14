"use client";

import { useEffect, useRef, useState } from "react";
import { uiContent } from "@/lib/content";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to popover
      }
    }
    setIsOpen((prev) => !prev);
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-body text-on-surface-variant hover:text-primary rounded-md hover:bg-surface-container transition-colors"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {uiContent.shareButton.label}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container rounded-lg shadow-lg border border-outline-variant z-40 overflow-hidden">
          <button
            onClick={handleWhatsAppShare}
            className="w-full px-4 py-3 text-sm font-body text-on-surface hover:bg-surface-container-high transition-colors text-left"
            type="button"
          >
            {uiContent.shareButton.shareViaWhatsApp}
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-3 text-sm font-body text-on-surface hover:bg-surface-container-high transition-colors text-left border-t border-outline-variant"
            type="button"
          >
            {copied
              ? uiContent.shareButton.linkCopied
              : uiContent.shareButton.copyLink}
          </button>
        </div>
      )}
    </div>
  );
}
