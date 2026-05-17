import type { Core } from '@strapi/strapi';
import { syncCloudinaryToStrapi } from './utils/cloudinary-sync';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Run sync on startup (after every deploy)
    try {
      const result = await syncCloudinaryToStrapi(strapi);
      strapi.log.info(
        `Cloudinary sync (startup): ${result.synced} added, ${result.deleted} removed, ${result.skipped} unchanged`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      strapi.log.error(`Cloudinary sync (startup) failed: ${message}`);
    }

    // Schedule daily cron at 2:00 AM
    strapi.cron.add({
      cloudinarySync: {
        task: async ({ strapi }) => {
          const result = await syncCloudinaryToStrapi(strapi);
          strapi.log.info(
            `Cloudinary sync (cron): ${result.synced} added, ${result.deleted} removed, ${result.skipped} unchanged`
          );
        },
        options: {
          rule: '0 2 * * *',
        },
      },
    });
  },
};
