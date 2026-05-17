import * as XLSX from 'xlsx';
import type { Core } from '@strapi/strapi';

interface CategoryRow {
  name: string;
  description?: string;
  image?: string;
}

interface SubcategoryRow {
  name: string;
  category: string;
}

interface ProductRow {
  name: string;
  subcategory: string;
  shortDescription?: string;
  sizeOptions?: string;
  minQuantity?: number;
  featured?: boolean | string;
  images?: string;
  filters?: string;
}

interface ImportResult {
  categories: { created: number; skipped: number; errors: string[] };
  subcategories: { created: number; skipped: number; errors: string[] };
  products: { created: number; skipped: number; errors: string[] };
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function findMediaFile(
  strapi: Core.Strapi,
  reference: string
): Promise<number | null> {
  if (!reference || !reference.trim()) return null;

  const trimmed = reference.trim();

  if (trimmed.startsWith('http')) {
    const file = await strapi.db.query('plugin::upload.file').findOne({
      where: { url: trimmed },
      select: ['id'],
    });
    if (file) return file.id;
  }

  const hash = trimmed.replace(/\//g, '_');
  const byHash = await strapi.db.query('plugin::upload.file').findOne({
    where: { hash },
    select: ['id'],
  });
  if (byHash) return byHash.id;

  const byName = await strapi.db.query('plugin::upload.file').findOne({
    where: { name: { $contains: trimmed } },
    select: ['id'],
  });
  if (byName) return byName.id;

  return null;
}

function parseFilters(filtersStr: string): Array<{ filterName: "size" | "style" | "woodType" | "colorCount" | "craftType" | "shape" | "theme"; filterValue: string }> {
  if (!filtersStr || !filtersStr.trim()) return [];

  const validNames = ['size', 'style', 'woodType', 'colorCount', 'craftType', 'shape', 'theme'] as const;
  type FilterName = typeof validNames[number];

  return filtersStr.split(',').map((pair) => {
    const [filterName, filterValue] = pair.split(':').map((s) => s.trim());
    return { filterName: filterName as FilterName, filterValue };
  }).filter((f) => f.filterName && f.filterValue && validNames.includes(f.filterName as FilterName));
}

export function parseExcelFile(buffer: Buffer): {
  categories: CategoryRow[];
  subcategories: SubcategoryRow[];
  products: ProductRow[];
} {
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  const parseSheet = <T>(sheetName: string): T[] => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return [];
    return XLSX.utils.sheet_to_json<T>(sheet);
  };

  return {
    categories: parseSheet<CategoryRow>('Categories'),
    subcategories: parseSheet<SubcategoryRow>('Subcategories'),
    products: parseSheet<ProductRow>('Products'),
  };
}

export async function importCatalogData(
  strapi: Core.Strapi,
  data: { categories: CategoryRow[]; subcategories: SubcategoryRow[]; products: ProductRow[] }
): Promise<ImportResult> {
  const result: ImportResult = {
    categories: { created: 0, skipped: 0, errors: [] },
    subcategories: { created: 0, skipped: 0, errors: [] },
    products: { created: 0, skipped: 0, errors: [] },
  };

  // --- CATEGORIES ---
  for (const row of data.categories) {
    if (!row.name) {
      result.categories.errors.push('Row missing required field: name');
      continue;
    }

    const slug = generateSlug(row.name);
    const existing = await strapi.documents('api::category.category').findMany({
      filters: { slug },
      limit: 1,
    });

    if (existing.length > 0) {
      result.categories.skipped++;
      continue;
    }

    try {
      const imageId = row.image ? await findMediaFile(strapi, row.image) : null;

      await strapi.documents('api::category.category').create({
        data: {
          name: row.name.trim(),
          slug,
          description: row.description?.trim() || null,
          ...(imageId && { image: imageId }),
        },
        status: 'published',
      });
      result.categories.created++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.categories.errors.push(`Failed to create category "${row.name}": ${message}`);
    }
  }

  // --- SUBCATEGORIES ---
  for (const row of data.subcategories) {
    if (!row.name || !row.category) {
      result.subcategories.errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
      continue;
    }

    const slug = generateSlug(row.name);
    const existing = await strapi.documents('api::subcategory.subcategory').findMany({
      filters: { slug },
      limit: 1,
    });

    if (existing.length > 0) {
      result.subcategories.skipped++;
      continue;
    }

    const categorySlug = generateSlug(row.category);
    const categories = await strapi.documents('api::category.category').findMany({
      filters: { slug: categorySlug },
      limit: 1,
    });

    if (categories.length === 0) {
      result.subcategories.errors.push(`Category "${row.category}" not found for subcategory "${row.name}"`);
      continue;
    }

    try {
      await strapi.documents('api::subcategory.subcategory').create({
        data: {
          name: row.name.trim(),
          slug,
          category: categories[0].documentId,
        },
        status: 'published',
      });
      result.subcategories.created++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.subcategories.errors.push(`Failed to create subcategory "${row.name}": ${message}`);
    }
  }

  // --- PRODUCTS ---
  for (const row of data.products) {
    if (!row.name || !row.subcategory) {
      result.products.errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
      continue;
    }

    const slug = generateSlug(row.name);
    const existing = await strapi.documents('api::product.product').findMany({
      filters: { slug },
      limit: 1,
    });

    if (existing.length > 0) {
      result.products.skipped++;
      continue;
    }

    const subcategorySlug = generateSlug(row.subcategory);
    const subcategories = await strapi.documents('api::subcategory.subcategory').findMany({
      filters: { slug: subcategorySlug },
      limit: 1,
    });

    if (subcategories.length === 0) {
      result.products.errors.push(`Subcategory "${row.subcategory}" not found for product "${row.name}"`);
      continue;
    }

    try {
      const sizeOptions = row.sizeOptions
        ? row.sizeOptions.split(',').map((s) => s.trim())
        : [];

      const imageIds: number[] = [];
      if (row.images) {
        const imageRefs = row.images.split(',').map((s) => s.trim());
        for (const ref of imageRefs) {
          const id = await findMediaFile(strapi, ref);
          if (id) imageIds.push(id);
        }
      }

      const filters = row.filters ? parseFilters(row.filters) : [];
      const isFeatured = row.featured === true || row.featured === 'true' || row.featured === 'yes';

      await strapi.documents('api::product.product').create({
        data: {
          name: row.name.trim(),
          slug,
          shortDescription: row.shortDescription?.trim() || null,
          subcategory: subcategories[0].documentId,
          sizeOptions: sizeOptions.length > 0 ? sizeOptions : null,
          minQuantity: row.minQuantity || 1,
          featured: isFeatured,
          ...(imageIds.length > 0 && { images: imageIds }),
          ...(filters.length > 0 && { filters }),
        },
        status: 'published',
      });

      result.products.created++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.products.errors.push(`Failed to create product "${row.name}": ${message}`);
    }
  }

  return result;
}
