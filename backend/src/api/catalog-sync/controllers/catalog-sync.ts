import type { Core } from '@strapi/strapi';
import { syncCatalogFromCloudinary } from '../../../utils/cloudinary-catalog-sync';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async sync(ctx) {
    const syncSecret = process.env.CLOUDINARY_SYNC_SECRET;

    if (!syncSecret) {
      return ctx.throw(500, 'CLOUDINARY_SYNC_SECRET not configured');
    }

    const providedSecret = ctx.request.headers['x-sync-secret'];

    if (providedSecret !== syncSecret) {
      return ctx.throw(401, 'Invalid sync secret');
    }

    const runInBackground = ctx.query.background !== 'false';

    if (runInBackground) {
      setImmediate(async () => {
        try {
          strapi.log.info('Catalog sync (manual): starting...');
          const result = await syncCatalogFromCloudinary(strapi);
          strapi.log.info(
            `Catalog sync (manual): Categories ${result.categories.created} new / ${result.categories.skipped} existing | ` +
            `Subcategories ${result.subcategories.created} new / ${result.subcategories.skipped} existing | ` +
            `Products ${result.products.created} new / ${result.products.skipped} existing / ${result.products.unpublished} unpublished | ` +
            `Errors: ${result.errors.length}`
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          strapi.log.error(`Catalog sync (manual) failed: ${message}`);
        }
      });

      ctx.body = { message: 'Catalog sync started in background. Check logs for progress.' };
      return;
    }

    // Foreground (blocking) — useful for testing
    const result = await syncCatalogFromCloudinary(strapi);
    ctx.body = { message: 'Catalog sync complete', result };
  },
});

export default controller;
