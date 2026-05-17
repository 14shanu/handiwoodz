export const SITE_NAME = "Handiwoodz";

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  SHOWCASE: "/showcase",
  CUSTOM_DESIGN: "/custom-design",
  QUOTE_BASKET: "/quote-basket",
  OUR_STORY: "/our-story",
  WHOLESALE: "/wholesale",
  CONTACT: "#",
  TERMS: "#",
} as const;

export const LIMITS = {
  MAX_FILE_SIZE_MB: 10,
  MIN_QUANTITY: 1,
  ALLOWED_FILE_FORMATS: ["jpg", "png", "pdf", "ai", "svg"],
  QUOTE_RESPONSE_HOURS: 24,
} as const;
