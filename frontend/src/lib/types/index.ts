export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia;
  subcategories?: Subcategory[];
  productImages?: StrapiMedia[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category?: Category;
  products?: Product[];
  productImages?: StrapiMedia[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  images?: StrapiMedia[];
  shortDescription?: string;
  subcategory?: Subcategory;
  sizeOptions?: string[];
  filters?: ProductFilter[];
  minQuantity: number;
  featured: boolean;
}

export interface ProductFilter {
  filterName: FilterName;
  filterValue: string;
}

export type FilterName =
  | "size"
  | "style"
  | "woodType"
  | "colorCount"
  | "craftType"
  | "shape"
  | "theme";

export interface QuoteBasketItem {
  productId: number;
  productName: string;
  productImage: string;
  selectedSize: string;
  quantity: number;
  notes: string;
}

export interface CustomDesignItem {
  fileUrl: string;
  fileName: string;
  designName: string;
  productType: string;
  width: number;
  height: number;
  unit: "inch" | "cm";
  colorCount: string;
  quantity: number;
  notes: string;
}

export interface QuoteBasket {
  catalogItems: QuoteBasketItem[];
  customDesigns: CustomDesignItem[];
}

export interface QuoteRequestPayload {
  customerName: string;
  email: string;
  whatsapp: string;
  country?: string;
  companyName?: string;
  generalNotes?: string;
  catalogItems: QuoteBasketItem[];
  customDesigns: CustomDesignItem[];
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface SiteSettings {
  logo?: StrapiMedia;
  logoDark?: StrapiMedia;
  heroImage?: StrapiMedia;
  heroImageMobile?: StrapiMedia;
  ctaBackgroundImage?: StrapiMedia;
  customDesignHeroImage?: StrapiMedia;
  ourStoryHeroImage?: StrapiMedia;
  ourStoryGallery?: StrapiMedia[];
  wholesaleHeroImage?: StrapiMedia;
  fallbackProductImage?: StrapiMedia;
  fallbackCategoryImage?: StrapiMedia;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
