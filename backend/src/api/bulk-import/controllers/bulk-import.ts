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

      const result = await importCatalogData(strapi, data);

      ctx.body = {
        message: 'Bulk import completed',
        data: result,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      ctx.throw(500, `Import failed: ${message}`);
    }
  },
});

export default controller;
