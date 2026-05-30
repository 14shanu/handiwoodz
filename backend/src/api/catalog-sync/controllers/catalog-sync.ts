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

    const action = ctx.query.action as string | undefined;

    // Delete all products (clean slate before re-sync)
    if (action === 'delete-products') {
      const deleted = await strapi.db.query('api::product.product').deleteMany({
        where: {},
      });

      ctx.body = { message: `Deleted ${deleted.count} products` };
      return;
    }

    // Publish all draft products (bulk DB update — fast)
    if (action === 'publish-all') {
      const result = await strapi.db.query('api::product.product').updateMany({
        where: { publishedAt: null },
        data: { publishedAt: new Date() },
      });

      // Trigger single revalidation at the end
      const frontendUrl = process.env.FRONTEND_URL;
      const revalidationSecret = process.env.REVALIDATION_SECRET;
      if (frontendUrl && revalidationSecret) {
        try {
          await fetch(`${frontendUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidation-secret': revalidationSecret,
            },
            body: JSON.stringify({ tag: 'products' }),
          });
        } catch {
          strapi.log.warn('Revalidation after publish-all failed');
        }
      }

      ctx.body = {
        message: `Bulk published ${result.count} products`,
      };
      return;
    }

    // Default: run catalog sync
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

    const result = await syncCatalogFromCloudinary(strapi);
    ctx.body = { message: 'Catalog sync complete', result };
  },
});

export default controller;
