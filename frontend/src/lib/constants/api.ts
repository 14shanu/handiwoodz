const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const API = {
  BASE_URL: API_BASE_URL,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  SUBCATEGORIES: `${API_BASE_URL}/api/subcategories`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  QUOTE_REQUESTS: `${API_BASE_URL}/api/quote-requests`,
  SITE_SETTINGS: `${API_BASE_URL}/api/site-setting`,
  REVALIDATE: 3600 as const,
} as const;

export const CLOUDINARY = {
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  FOLDER: "handiwoodz/custom-designs",
} as const;
