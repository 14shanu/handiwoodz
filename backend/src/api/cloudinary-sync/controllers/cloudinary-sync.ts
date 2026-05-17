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

    try {
      // Force mode: delete all synced files first, then re-sync with thumbnails
      if (force) {
        const existing = await strapi.db.query('plugin::upload.file').findMany({
          select: ['id'],
          where: { provider: '@strapi/provider-upload-cloudinary' },
        });

        for (const file of existing) {
          await strapi.db.query('plugin::upload.file').delete({
            where: { id: (file as { id: number }).id },
          });
        }
      }

      const result = await syncCloudinaryToStrapi(strapi, folder);

      ctx.body = {
        message: force ? 'Force re-sync completed' : 'Cloudinary sync completed',
        data: result,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      ctx.throw(500, `Sync failed: ${message}`);
    }
  },
});

export default controller;
