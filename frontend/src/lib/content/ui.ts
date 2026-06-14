export const uiContent = {
  backToTop: {
    ariaLabel: "Back to top",
  },

  shareButton: {
    label: "Share",
    shareViaWhatsApp: "Share via WhatsApp",
    copyLink: "Copy Link",
    linkCopied: "Link copied!",
  },

  skeleton: {
    loadingAriaLabel: "Loading content",
  },
} as const;

export type UiContent = typeof uiContent;
