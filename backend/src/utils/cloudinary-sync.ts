import { v2 as cloudinary } from 'cloudinary';
import type { Core } from '@strapi/strapi';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  created_at: string;
}

interface SyncResult {
  synced: number;
  skipped: number;
  deleted: number;
  deletionSkipped: number;
  errors: string[];
}

const MIME_MAP: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  pdf: 'application/pdf',
  ai: 'application/postscript',
};

function getMimeType(format: string): string {
  return MIME_MAP[format] || `image/${format}`;
}

function getFilenameFromPublicId(publicId: string): string {
  const parts = publicId.split('/');
  return parts[parts.length - 1];
}

async function fetchAllCloudinaryResources(folder?: string): Promise<CloudinaryResource[]> {
  const allResources: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const options: Record<string, unknown> = {
      type: 'upload',
      max_results: 500,
      ...(folder && { prefix: folder }),
      ...(nextCursor && { next_cursor: nextCursor }),
    };

    const result = await cloudinary.api.resources(options);
    allResources.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return allResources;
}

async function isFileLinkedToContent(strapi: Core.Strapi, fileId: number): Promise<boolean> {
  const morphEntries = await strapi.db.query('plugin::upload.file').findOne({
    where: { id: fileId },
    populate: ['related'],
  });

  return morphEntries?.related?.length > 0;
}

export async function syncCloudinaryToStrapi(
  strapi: Core.Strapi,
  folder?: string
): Promise<SyncResult> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const result: SyncResult = { synced: 0, skipped: 0, deleted: 0, deletionSkipped: 0, errors: [] };

  const cloudinaryResources = await fetchAllCloudinaryResources(folder);

  const cloudinaryHashes = new Set(
    cloudinaryResources.map((r) => r.public_id.replace(/\//g, '_'))
  );

  // Get all existing files in Strapi media library
  const existingFiles = await strapi.db.query('plugin::upload.file').findMany({
    select: ['id', 'hash'],
    where: { provider: '@strapi/provider-upload-cloudinary' },
  });

  const existingHashes = new Set(existingFiles.map((f: { hash: string }) => f.hash));

  // --- ADD new files from Cloudinary ---
  for (const resource of cloudinaryResources) {
    const hash = resource.public_id.replace(/\//g, '_');

    if (existingHashes.has(hash)) {
      result.skipped++;
      continue;
    }

    try {
      const filename = getFilenameFromPublicId(resource.public_id);
      const mime = getMimeType(resource.format);

      await strapi.db.query('plugin::upload.file').create({
        data: {
          name: `${filename}.${resource.format}`,
          alternativeText: filename,
          caption: null,
          hash,
          ext: `.${resource.format}`,
          mime,
          size: resource.bytes / 1000,
          width: resource.width || null,
          height: resource.height || null,
          url: resource.secure_url,
          provider: '@strapi/provider-upload-cloudinary',
          provider_metadata: {
            public_id: resource.public_id,
            resource_type: resource.resource_type,
          },
          folderPath: '/',
          createdAt: resource.created_at,
          updatedAt: resource.created_at,
        },
      });

      result.synced++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`Failed to sync ${resource.public_id}: ${message}`);
    }
  }

  // --- REMOVE files deleted from Cloudinary ---
  for (const file of existingFiles) {
    const typedFile = file as { id: number; hash: string };

    if (cloudinaryHashes.has(typedFile.hash)) {
      continue;
    }

    try {
      const isLinked = await isFileLinkedToContent(strapi, typedFile.id);

      if (isLinked) {
        result.deletionSkipped++;
        result.errors.push(`Skipped deletion of file #${typedFile.id} (${typedFile.hash}) — still linked to content`);
        continue;
      }

      await strapi.db.query('plugin::upload.file').delete({
        where: { id: typedFile.id },
      });

      result.deleted++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`Failed to delete file #${typedFile.id}: ${message}`);
    }
  }

  return result;
}
