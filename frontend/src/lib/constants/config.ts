export const PRODUCT_TYPES = [
  { value: "printing_block", label: "Printing Block" },
  { value: "logo_block", label: "Logo Block" },
  { value: "wall_plate", label: "Wall Plate" },
  { value: "pichwai", label: "Pichwai" },
  { value: "other", label: "Other" },
] as const;

export const COLOR_COUNT_OPTIONS = [
  { value: "single", label: "Single Color" },
  { value: "two", label: "Two Colors" },
  { value: "three", label: "Three Colors" },
  { value: "multicolor", label: "Multicolor" },
  { value: "not_sure", label: "Not Sure" },
] as const;

export const UNIT_OPTIONS = [
  { value: "inch", label: "Inch" },
  { value: "cm", label: "CM" },
] as const;

export const FILTER_NAMES = [
  "size",
  "style",
  "woodType",
  "colorCount",
  "craftType",
  "shape",
  "theme",
] as const;

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const WHATSAPP_MESSAGES = {
  productInquiry: (productName: string, size: string) =>
    `Hi, I'm interested in ${productName} (${size}). Quote request.`,
  general: "Hi, I'd like to discuss a custom order.",
  wholesale: "Hi, I'm interested in wholesale/bulk ordering.",
} as const;
