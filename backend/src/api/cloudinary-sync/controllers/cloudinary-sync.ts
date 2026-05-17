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

    try {
      const result = await syncCloudinaryToStrapi(strapi, folder);

      ctx.body = {
        message: 'Cloudinary sync completed',
        data: result,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      ctx.throw(500, `Sync failed: ${message}`);
    }
  },
});

export default controller;
