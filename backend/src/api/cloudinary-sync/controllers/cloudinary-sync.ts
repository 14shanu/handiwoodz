import type { Core } from '@strapi/strapi';
import { syncCloudinaryToStrapi } from '../../../utils/cloudinary-sync';

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

    const folder = ctx.query.folder as string | undefined;
    const force = ctx.query.force === 'true';

    // Run sync in background to avoid gateway timeout
    setImmediate(async () => {
      try {
        if (force) {
          const existing = await strapi.db.query('plugin::upload.file').findMany({
            select: ['id'],
            where: { provider: '@strapi/provider-upload-cloudinary' },
          });

          let deleted = 0;
          for (const file of existing) {
            await strapi.db.query('plugin::upload.file').delete({
              where: { id: (file as { id: number }).id },
            });
            deleted++;
          }
          strapi.log.info(`Force sync: deleted ${deleted} existing records`);
        }

        const result = await syncCloudinaryToStrapi(strapi, folder);
        strapi.log.info(
          `Cloudinary sync done: ${result.synced} added, ${result.deleted} removed, ${result.skipped} skipped, ${result.errors.length} errors`
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        strapi.log.error(`Cloudinary sync failed: ${message}`);
      }
    });

    // Return immediately
    ctx.body = {
      message: force
        ? 'Force re-sync started in background. Check Railway logs for progress.'
        : 'Sync started in background. Check Railway logs for progress.',
    };
  },
});

export default controller;
