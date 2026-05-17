import * as XLSX from 'xlsx';
import { parseExcelFile, importCatalogData } from './bulk-import';

function createExcelBuffer(sheets: Record<string, unknown[]>): Buffer {
  const wb = XLSX.utils.book_new();
  for (const [name, data] of Object.entries(sheets)) {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), name);
  }
  return Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }));
}

describe('parseExcelFile', () => {
  it('parses all three sheets from Excel buffer', () => {
    const buffer = createExcelBuffer({
      Categories: [{ name: 'Test Category', description: 'Desc' }],
      Subcategories: [{ name: 'Test Sub', category: 'Test Category' }],
      Products: [{ name: 'Test Product', subcategory: 'Test Sub' }],
    });

    const result = parseExcelFile(buffer);

    expect(result.categories).toHaveLength(1);
    expect(result.categories[0].name).toBe('Test Category');
    expect(result.subcategories).toHaveLength(1);
    expect(result.products).toHaveLength(1);
  });

  it('returns empty arrays for missing sheets', () => {
    const buffer = createExcelBuffer({
      Categories: [{ name: 'Only Categories' }],
    });

    const result = parseExcelFile(buffer);

    expect(result.categories).toHaveLength(1);
    expect(result.subcategories).toHaveLength(0);
    expect(result.products).toHaveLength(0);
  });

  it('handles empty sheets', () => {
    const buffer = createExcelBuffer({
      Categories: [],
      Subcategories: [],
      Products: [],
    });

    const result = parseExcelFile(buffer);

    expect(result.categories).toHaveLength(0);
    expect(result.subcategories).toHaveLength(0);
    expect(result.products).toHaveLength(0);
  });
});

describe('importCatalogData', () => {
  const mockFindMany = jest.fn();
  const mockCreate = jest.fn();
  const mockDbFindOne = jest.fn();

  const mockStrapi = {
    documents: jest.fn().mockReturnValue({
      findMany: mockFindMany,
      create: mockCreate,
    }),
    db: {
      query: jest.fn().mockReturnValue({
        findOne: mockDbFindOne,
      }),
    },
  } as unknown as Parameters<typeof importCatalogData>[0];

  beforeEach(() => {
    jest.clearAllMocks();
    (mockStrapi.documents as unknown as jest.Mock).mockReturnValue({
      findMany: mockFindMany,
      create: mockCreate,
    });
    (mockStrapi.db.query as jest.Mock).mockReturnValue({
      findOne: mockDbFindOne,
    });
  });

  it('creates new categories and skips existing ones', async () => {
    mockFindMany
      .mockResolvedValueOnce([]) // first category doesn't exist
      .mockResolvedValueOnce([{ id: 1, documentId: 'doc1', slug: 'existing' }]); // second exists
    mockCreate.mockResolvedValue({ id: 1, documentId: 'doc1' });

    const result = await importCatalogData(mockStrapi, {
      categories: [
        { name: 'New Category' },
        { name: 'Existing' },
      ],
      subcategories: [],
      products: [],
    });

    expect(result.categories.created).toBe(1);
    expect(result.categories.skipped).toBe(1);
  });

  it('reports error for categories missing name', async () => {
    const result = await importCatalogData(mockStrapi, {
      categories: [{ name: '' }],
      subcategories: [],
      products: [],
    });

    expect(result.categories.errors).toHaveLength(1);
    expect(result.categories.errors[0]).toContain('missing required field');
  });

  it('creates subcategories linked to existing categories', async () => {
    mockFindMany
      .mockResolvedValueOnce([]) // subcategory doesn't exist
      .mockResolvedValueOnce([{ id: 5, documentId: 'cat-doc-1' }]); // category found
    mockCreate.mockResolvedValue({ id: 1, documentId: 'sub-doc-1' });

    const result = await importCatalogData(mockStrapi, {
      categories: [],
      subcategories: [{ name: 'New Sub', category: 'Printing Blocks' }],
      products: [],
    });

    expect(result.subcategories.created).toBe(1);
  });

  it('reports error when subcategory references non-existent category', async () => {
    mockFindMany
      .mockResolvedValueOnce([]) // subcategory doesn't exist
      .mockResolvedValueOnce([]); // category not found

    const result = await importCatalogData(mockStrapi, {
      categories: [],
      subcategories: [{ name: 'Orphan Sub', category: 'Non Existent' }],
      products: [],
    });

    expect(result.subcategories.errors[0]).toContain('not found');
  });

  it('creates products linked to existing subcategories', async () => {
    mockFindMany
      .mockResolvedValueOnce([]) // product doesn't exist
      .mockResolvedValueOnce([{ id: 3, documentId: 'sub-doc-1' }]); // subcategory found
    mockCreate.mockResolvedValue({ id: 1, documentId: 'prod-doc-1' });

    const result = await importCatalogData(mockStrapi, {
      categories: [],
      subcategories: [],
      products: [{ name: 'New Product', subcategory: 'Hand-Carved Blocks' }],
    });

    expect(result.products.created).toBe(1);
  });

  it('skips existing products by slug', async () => {
    mockFindMany.mockResolvedValueOnce([{ id: 1, documentId: 'doc1', slug: 'existing-product' }]);

    const result = await importCatalogData(mockStrapi, {
      categories: [],
      subcategories: [],
      products: [{ name: 'Existing Product', subcategory: 'Some Sub' }],
    });

    expect(result.products.skipped).toBe(1);
    expect(result.products.created).toBe(0);
  });

  it('reports error when product references non-existent subcategory', async () => {
    mockFindMany
      .mockResolvedValueOnce([]) // product doesn't exist
      .mockResolvedValueOnce([]); // subcategory not found

    const result = await importCatalogData(mockStrapi, {
      categories: [],
      subcategories: [],
      products: [{ name: 'Orphan Product', subcategory: 'Ghost Sub' }],
    });

    expect(result.products.errors[0]).toContain('not found');
  });

  it('handles creation errors gracefully', async () => {
    mockFindMany.mockResolvedValueOnce([]);
    mockCreate.mockRejectedValueOnce(new Error('DB error'));

    const result = await importCatalogData(mockStrapi, {
      categories: [{ name: 'Failing Category' }],
      subcategories: [],
      products: [],
    });

    expect(result.categories.created).toBe(0);
    expect(result.categories.errors[0]).toContain('Failed to create');
  });
});
