import type { Core } from '@strapi/strapi';
import { syncCloudinaryToStrapi } from './utils/cloudinary-sync';
import { syncCatalogFromCloudinary } from './utils/cloudinary-catalog-sync';

const DEFAULT_CATALOG_SYNC_CRON = '0 2 * * *';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const cronEnabled = process.env.CRON_ENABLED === 'true';
    const catalogSyncCron = process.env.CLOUDINARY_CATALOG_SYNC_CRON || DEFAULT_CATALOG_SYNC_CRON;

    // Run media sync in background after 30s delay (non-blocking)
    setTimeout(async () => {
      try {
        const result = await syncCloudinaryToStrapi(strapi);
        strapi.log.info(
          `Cloudinary media sync (startup): ${result.synced} added, ${result.deleted} removed, ${result.skipped} unchanged`
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        strapi.log.error(`Cloudinary media sync (startup) failed: ${message}`);
      }
    }, 30000);

    if (!cronEnabled) {
      strapi.log.info('Cron jobs disabled (CRON_ENABLED != true)');
      return;
    }

    // Schedule catalog sync cron
    strapi.cron.add({
      catalogSync: {
        task: async ({ strapi }) => {
          try {
            strapi.log.info('Cloudinary catalog sync (cron): starting...');

            // First sync media library
            const mediaResult = await syncCloudinaryToStrapi(strapi);
            strapi.log.info(
              `Cloudinary media sync (cron): ${mediaResult.synced} added, ${mediaResult.deleted} removed, ${mediaResult.skipped} unchanged`
            );

            // Then sync catalog (categories, subcategories, products)
            const catalogResult = await syncCatalogFromCloudinary(strapi);
            strapi.log.info(
              `Cloudinary catalog sync (cron): Categories ${catalogResult.categories.created} new / ${catalogResult.categories.skipped} existing | ` +
              `Subcategories ${catalogResult.subcategories.created} new / ${catalogResult.subcategories.skipped} existing | ` +
              `Products ${catalogResult.products.created} new / ${catalogResult.products.skipped} existing / ${catalogResult.products.unpublished} unpublished`
            );

            if (catalogResult.errors.length > 0) {
              strapi.log.warn(`Catalog sync errors (${catalogResult.errors.length}): ${catalogResult.errors.slice(0, 5).join('; ')}`);
            }
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            strapi.log.error(`Cloudinary catalog sync (cron) failed: ${message}`);
          }
        },
        options: {
          rule: catalogSyncCron,
        },
      },
    });

    strapi.log.info(`Catalog sync cron scheduled: ${catalogSyncCron}`);
  },
};
