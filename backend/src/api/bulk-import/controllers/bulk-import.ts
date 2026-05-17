import type { Core } from '@strapi/strapi';
import { parseExcelFile, importCatalogData } from '../../../utils/bulk-import';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async import(ctx) {
    const syncSecret = process.env.CLOUDINARY_SYNC_SECRET;

    if (!syncSecret) {
      return ctx.throw(500, 'CLOUDINARY_SYNC_SECRET not configured');
    }

    const providedSecret = ctx.request.headers['x-sync-secret'];

    if (providedSecret !== syncSecret) {
      return ctx.throw(401, 'Invalid sync secret');
    }

    const file = ctx.request.files?.file;

    if (!file) {
      return ctx.throw(400, 'No file uploaded. Send as multipart/form-data with field name "file"');
    }

    const uploadedFile = Array.isArray(file) ? file[0] : file;
    const filename = uploadedFile.originalFilename || uploadedFile.name || '';

    if (!filename.endsWith('.xlsx')) {
      return ctx.throw(400, 'Only .xlsx files are supported');
    }

    try {
      const fs = await import('fs');
      const buffer = fs.readFileSync(uploadedFile.filepath || uploadedFile.path);
      const data = parseExcelFile(buffer);

      if (!data.categories.length && !data.subcategories.length && !data.products.length) {
        return ctx.throw(400, 'Excel file is empty or sheets are not named correctly. Expected sheets: Categories, Subcategories, Products');
      }

      // Run import in background to avoid gateway timeout
      setImmediate(async () => {
        try {
          const result = await importCatalogData(strapi, data);
          strapi.log.info(
            `Bulk import done: Categories ${result.categories.created} new/${result.categories.skipped} skipped, ` +
            `Subcategories ${result.subcategories.created} new/${result.subcategories.skipped} skipped, ` +
            `Products ${result.products.created} new/${result.products.skipped} skipped`
          );
          if (result.categories.errors.length || result.subcategories.errors.length || result.products.errors.length) {
            const allErrors = [...result.categories.errors, ...result.subcategories.errors, ...result.products.errors];
            strapi.log.warn(`Bulk import errors: ${allErrors.join('; ')}`);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          strapi.log.error(`Bulk import failed: ${message}`);
        }
      });

      // Return immediately
      ctx.body = {
        message: 'Import started in background. Check Railway logs for progress.',
        data: {
          categories: data.categories.length,
          subcategories: data.subcategories.length,
          products: data.products.length,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      ctx.throw(500, `Import failed: ${message}`);
    }
  },
});

export default controller;
