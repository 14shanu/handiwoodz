import { v2 as cloudinary } from 'cloudinary';
import type { Core } from '@strapi/strapi';

interface CloudinaryFolder {
  name: string;
  path: string;
}

interface CloudinaryFile {
  public_id: string;
  secure_url: string;
  format: string;
  width?: number;
  height?: number;
}

interface CatalogSyncResult {
  categories: { created: number; skipped: number };
  subcategories: { created: number; skipped: number };
  products: { created: number; skipped: number; unpublished: number };
  errors: string[];
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanFolderName(folderName: string): string {
  return folderName
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanProductName(publicId: string, subcategoryName: string): string {
  const filename = publicId.split('/').pop() || publicId;

  // Remove Cloudinary hash suffix (last _xxxxxx)
  const withoutHash = filename.replace(/_[a-z0-9]{6}$/, '');

  // Remove trailing numbers (the sequential ID)
  const withoutNumber = withoutHash.replace(/[-_]?\d+$/, '');

  // Replace separators with spaces
  const cleaned = withoutNumber.replace(/[-_]+/g, ' ').trim();

  // If cleaning leaves nothing meaningful, use subcategory name
  if (!cleaned || cleaned.length < 3) {
    return subcategoryName;
  }

  // Title case
  return cleaned
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function detectSizeFromFolder(folderName: string): string[] {
  const lower = folderName.toLowerCase();

  if (lower.includes('3_3') || lower.includes('3x3')) return ['3x3 inch'];
  if (lower.includes('6_2') || lower.includes('6x2')) return ['6x2 inch'];
  if (lower.includes('6_4') || lower.includes('6x4')) return ['6x4 inch'];
  if (lower.includes('6_6') || lower.includes('6x6')) return ['6x6 inch'];
  if (lower.includes('4 inch') || lower.includes('4_inch')) return ['4x4 inch'];
  if (lower.includes('6 inch') || lower.includes('6_inch')) return ['6x6 inch'];

  return [];
}

async function getRootFolders(): Promise<CloudinaryFolder[]> {
  const result = await cloudinary.api.root_folders();
  return result.folders;
}

async function getSubFolders(parentPath: string): Promise<CloudinaryFolder[]> {
  try {
    const result = await cloudinary.api.sub_folders(parentPath);
    return result.folders;
  } catch {
    return [];
  }
}

async function getFilesInFolder(folder: string): Promise<CloudinaryFile[]> {
  const allFiles: CloudinaryFile[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.search
      .expression(`folder="${folder}"`)
      .max_results(500)
      .next_cursor(nextCursor || '')
      .execute();

    allFiles.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return allFiles;
}

async function findOrCreateCategory(
  strapi: Core.Strapi,
  name: string
): Promise<string> {
  const slug = generateSlug(name);
  const existing = await strapi.documents('api::category.category').findMany({
    filters: { slug },
    limit: 1,
  });

  if (existing.length > 0) {
    return existing[0].documentId;
  }

  const created = await strapi.documents('api::category.category').create({
    data: { name, slug, description: '' },
    status: 'published',
  });

  return created.documentId;
}

async function findOrCreateSubcategory(
  strapi: Core.Strapi,
  name: string,
  categoryDocumentId: string
): Promise<string> {
  const slug = generateSlug(name);
  const existing = await strapi.documents('api::subcategory.subcategory').findMany({
    filters: { slug },
    limit: 1,
  });

  if (existing.length > 0) {
    return existing[0].documentId;
  }

  const created = await strapi.documents('api::subcategory.subcategory').create({
    data: { name, slug, category: categoryDocumentId },
    status: 'published',
  });

  return created.documentId;
}

async function findMediaByPublicId(
  strapi: Core.Strapi,
  publicId: string
): Promise<number | null> {
  const hash = publicId.replace(/\//g, '_');

  const file = await strapi.db.query('plugin::upload.file').findOne({
    where: { hash },
    select: ['id'],
  });

  return file?.id || null;
}

export async function syncCatalogFromCloudinary(
  strapi: Core.Strapi
): Promise<CatalogSyncResult> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const result: CatalogSyncResult = {
    categories: { created: 0, skipped: 0 },
    subcategories: { created: 0, skipped: 0 },
    products: { created: 0, skipped: 0, unpublished: 0 },
    errors: [],
  };

  // Step 1: Get folder structure
  const rootFolders = await getRootFolders();

  // Track all cloudinaryPublicIds found in Cloudinary (for unpublish detection)
  const activePublicIds = new Set<string>();

  for (const categoryFolder of rootFolders) {
    const categoryName = cleanFolderName(categoryFolder.name);
    const categorySlug = generateSlug(categoryName);

    // Skip non-product folders (like "samples" or system folders)
    if (categorySlug === 'main-sample' || categorySlug === '') continue;

    // Find or create Category
    let categoryDocumentId: string;
    const existingCat = await strapi.documents('api::category.category').findMany({
      filters: { slug: categorySlug },
      limit: 1,
    });

    if (existingCat.length > 0) {
      categoryDocumentId = existingCat[0].documentId;
      result.categories.skipped++;
    } else {
      try {
        const created = await strapi.documents('api::category.category').create({
          data: { name: categoryName, slug: categorySlug, description: '' },
          status: 'published',
        });
        categoryDocumentId = created.documentId;
        result.categories.created++;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        result.errors.push(`Category "${categoryName}": ${msg}`);
        continue;
      }
    }

    // Step 2: Get subcategories (subfolders)
    const subFolders = await getSubFolders(categoryFolder.path);

    for (const subFolder of subFolders) {
      const subcategoryName = cleanFolderName(subFolder.name);
      const subcategorySlug = generateSlug(subcategoryName);

      // Find or create Subcategory
      let subcategoryDocumentId: string;
      const existingSub = await strapi.documents('api::subcategory.subcategory').findMany({
        filters: { slug: subcategorySlug },
        limit: 1,
      });

      if (existingSub.length > 0) {
        subcategoryDocumentId = existingSub[0].documentId;
        result.subcategories.skipped++;
      } else {
        try {
          const created = await strapi.documents('api::subcategory.subcategory').create({
            data: { name: subcategoryName, slug: subcategorySlug, category: categoryDocumentId },
            status: 'published',
          });
          subcategoryDocumentId = created.documentId;
          result.subcategories.created++;
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          result.errors.push(`Subcategory "${subcategoryName}": ${msg}`);
          continue;
        }
      }

      // Step 3: Get files in this subfolder → Products
      const files = await getFilesInFolder(subFolder.path);
      const sizeOptions = detectSizeFromFolder(subFolder.name);

      for (const file of files) {
        activePublicIds.add(file.public_id);

        // Check if product already exists with this cloudinaryPublicId
        const existingProduct = await strapi.documents('api::product.product').findMany({
          filters: { cloudinaryPublicId: file.public_id },
          limit: 1,
        });

        if (existingProduct.length > 0) {
          result.products.skipped++;
          continue;
        }

        // Create new product as draft
        try {
          const productName = cleanProductName(file.public_id, subcategoryName);
          const productSlug = generateSlug(`${productName}-${file.public_id.split('/').pop()?.replace(/_[a-z0-9]{6}$/, '') || ''}`);

          // Find media file in Strapi media library
          const mediaId = await findMediaByPublicId(strapi, file.public_id);

          await strapi.documents('api::product.product').create({
            data: {
              name: productName,
              slug: productSlug,
              shortDescription: `Handcrafted ${subcategoryName.toLowerCase()}`,
              subcategory: subcategoryDocumentId,
              sizeOptions: sizeOptions.length > 0 ? sizeOptions : null,
              minQuantity: 1,
              featured: false,
              cloudinaryPublicId: file.public_id,
              ...(mediaId && { images: [mediaId] }),
            },
            status: 'draft',
          });

          result.products.created++;
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          result.errors.push(`Product "${file.public_id}": ${msg}`);
        }
      }
    }
  }

  // Step 4: Unpublish products whose cloudinaryPublicId no longer exists in Cloudinary
  const allSyncedProducts = await strapi.documents('api::product.product').findMany({
    filters: {
      cloudinaryPublicId: { $notNull: true },
      publishedAt: { $notNull: true },
    },
    limit: 10000,
  });

  for (const product of allSyncedProducts) {
    if (product.cloudinaryPublicId && !activePublicIds.has(product.cloudinaryPublicId)) {
      try {
        await strapi.documents('api::product.product').unpublish({
          documentId: product.documentId,
        });
        result.products.unpublished++;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        result.errors.push(`Unpublish "${product.cloudinaryPublicId}": ${msg}`);
      }
    }
  }

  return result;
}
