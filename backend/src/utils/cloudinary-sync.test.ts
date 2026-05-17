import { syncCloudinaryToStrapi } from './cloudinary-sync';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    api: {
      resources: jest.fn(),
    },
  },
}));

const mockStrapi = {
  db: {
    query: jest.fn(),
  },
} as unknown as Parameters<typeof syncCloudinaryToStrapi>[0];

const mockFindMany = jest.fn();
const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockDelete = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (mockStrapi.db.query as jest.Mock).mockReturnValue({
    findMany: mockFindMany,
    findOne: mockFindOne,
    create: mockCreate,
    delete: mockDelete,
  });

  process.env.CLOUDINARY_NAME = 'test-cloud';
  process.env.CLOUDINARY_KEY = 'test-key';
  process.env.CLOUDINARY_SECRET = 'test-secret';
});

describe('syncCloudinaryToStrapi', () => {
  it('configures cloudinary with env variables', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({ resources: [] });
    mockFindMany.mockResolvedValue([]);

    await syncCloudinaryToStrapi(mockStrapi);

    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: 'test-cloud',
      api_key: 'test-key',
      api_secret: 'test-secret',
    });
  });

  it('adds new files from Cloudinary that do not exist in Strapi', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({
      resources: [
        {
          public_id: 'products/block-01',
          secure_url: 'https://res.cloudinary.com/test/products/block-01.jpg',
          format: 'jpg',
          resource_type: 'image',
          bytes: 50000,
          width: 800,
          height: 600,
          created_at: '2025-01-15T10:00:00Z',
        },
      ],
    });
    mockFindMany.mockResolvedValue([]);
    mockCreate.mockResolvedValue({ id: 1 });

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.synced).toBe(1);
    expect(result.skipped).toBe(0);
    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'block-01.jpg',
        hash: 'products_block-01',
        url: 'https://res.cloudinary.com/test/products/block-01.jpg',
        mime: 'image/jpeg',
        size: 50,
        width: 800,
        height: 600,
        provider: '@strapi/provider-upload-cloudinary',
      }),
    });
  });

  it('skips files that already exist in Strapi', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({
      resources: [
        {
          public_id: 'products/block-01',
          secure_url: 'https://res.cloudinary.com/test/products/block-01.jpg',
          format: 'jpg',
          resource_type: 'image',
          bytes: 50000,
          width: 800,
          height: 600,
          created_at: '2025-01-15T10:00:00Z',
        },
      ],
    });
    mockFindMany.mockResolvedValue([{ id: 1, hash: 'products_block-01' }]);

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.synced).toBe(0);
    expect(result.skipped).toBe(1);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('deletes files from Strapi that no longer exist on Cloudinary', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({ resources: [] });
    mockFindMany.mockResolvedValue([{ id: 5, hash: 'old_deleted-file' }]);
    mockFindOne.mockResolvedValue({ id: 5, related: [] });
    mockDelete.mockResolvedValue({ id: 5 });

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.deleted).toBe(1);
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 5 } });
  });

  it('skips deletion of files still linked to content', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({ resources: [] });
    mockFindMany.mockResolvedValue([{ id: 7, hash: 'linked_file' }]);
    mockFindOne.mockResolvedValue({ id: 7, related: [{ id: 1, __type: 'api::category.category' }] });

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.deleted).toBe(0);
    expect(result.deletionSkipped).toBe(1);
    expect(result.errors).toContain(
      'Skipped deletion of file #7 (linked_file) — still linked to content'
    );
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('handles errors during file creation gracefully', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({
      resources: [
        {
          public_id: 'bad/file',
          secure_url: 'https://res.cloudinary.com/test/bad/file.png',
          format: 'png',
          resource_type: 'image',
          bytes: 1000,
          created_at: '2025-01-15T10:00:00Z',
        },
      ],
    });
    mockFindMany.mockResolvedValue([]);
    mockCreate.mockRejectedValue(new Error('DB constraint violation'));

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.synced).toBe(0);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('Failed to sync bad/file');
  });

  it('handles errors during file deletion gracefully', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({ resources: [] });
    mockFindMany.mockResolvedValue([{ id: 9, hash: 'orphan_file' }]);
    mockFindOne.mockResolvedValue({ id: 9, related: [] });
    mockDelete.mockRejectedValue(new Error('Delete failed'));

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.deleted).toBe(0);
    expect(result.errors[0]).toContain('Failed to delete file #9');
  });

  it('paginates through Cloudinary resources using next_cursor', async () => {
    (cloudinary.api.resources as jest.Mock)
      .mockResolvedValueOnce({
        resources: [
          { public_id: 'page1/file1', secure_url: 'url1', format: 'jpg', resource_type: 'image', bytes: 1000, created_at: '2025-01-01' },
        ],
        next_cursor: 'cursor123',
      })
      .mockResolvedValueOnce({
        resources: [
          { public_id: 'page2/file2', secure_url: 'url2', format: 'png', resource_type: 'image', bytes: 2000, created_at: '2025-01-02' },
        ],
      });
    mockFindMany.mockResolvedValue([]);
    mockCreate.mockResolvedValue({ id: 1 });

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.synced).toBe(2);
    expect(cloudinary.api.resources).toHaveBeenCalledTimes(2);
  });

  it('filters by folder when provided', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({ resources: [] });
    mockFindMany.mockResolvedValue([]);

    await syncCloudinaryToStrapi(mockStrapi, 'handiwoodz/products');

    expect(cloudinary.api.resources).toHaveBeenCalledWith(
      expect.objectContaining({ prefix: 'handiwoodz/products' })
    );
  });

  it('returns correct counts for mixed operations', async () => {
    (cloudinary.api.resources as jest.Mock).mockResolvedValue({
      resources: [
        { public_id: 'existing/file', secure_url: 'url1', format: 'jpg', resource_type: 'image', bytes: 1000, created_at: '2025-01-01' },
        { public_id: 'new/file', secure_url: 'url2', format: 'png', resource_type: 'image', bytes: 2000, created_at: '2025-01-02' },
      ],
    });
    mockFindMany.mockResolvedValue([
      { id: 1, hash: 'existing_file' },
      { id: 2, hash: 'removed_file' },
    ]);
    mockFindOne.mockResolvedValue({ id: 2, related: [] });
    mockCreate.mockResolvedValue({ id: 3 });
    mockDelete.mockResolvedValue({ id: 2 });

    const result = await syncCloudinaryToStrapi(mockStrapi);

    expect(result.synced).toBe(1);
    expect(result.skipped).toBe(1);
    expect(result.deleted).toBe(1);
    expect(result.deletionSkipped).toBe(0);
    expect(result.errors).toHaveLength(0);
  });
});
