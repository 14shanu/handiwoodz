require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const XLSX = require('xlsx');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// --- CONFIGURATION ---

const CATEGORY_NAME = 'Printing Blocks';

// Subcategory detection from filename keywords
const SUBCATEGORY_RULES = [
  { keywords: ['elephant', 'fox', 'hare', 'cat', 'cats', 'deer', 'bambi', 'owl', 'owls', 'alpaca', 'dinosaur', 'bee', 'animal', 'reindeer'], subcategory: 'Animal Blocks' },
  { keywords: ['paisley', 'kite'], subcategory: 'Paisley Blocks' },
  { keywords: ['floral', 'botanical', 'daisy', 'flower', 'dandelion', 'meadow', 'berries', 'wreath', 'rose'], subcategory: 'Floral Blocks' },
  { keywords: ['tree', 'trees', 'leaf', 'leaves', 'acorn', 'seed'], subcategory: 'Nature Blocks' },
  { keywords: ['heart', 'hearts', 'spotty', 'star', 'stars', 'spiral', 'geometric', 'tile', 'wavy'], subcategory: 'Geometric Blocks' },
  { keywords: ['set'], subcategory: 'Block Sets' },
];

const DEFAULT_SUBCATEGORY = 'Hand Carved Blocks';

// Filter detection from filename
const FILTER_RULES = [
  { keywords: ['hand-carved', 'hand_carved'], filter: { filterName: 'craftType', filterValue: 'Handmade' } },
  { keywords: ['large'], filter: { filterName: 'size', filterValue: 'Large' } },
  { keywords: ['small', 'mini'], filter: { filterName: 'size', filterValue: 'Small' } },
  { keywords: ['400x400', '400x401', '400x399', '400x386', '376x400', '363x400', '400x391'], filter: { filterName: 'size', filterValue: '4x4 inch' } },
];

// --- HELPERS ---

function cleanProductName(publicId) {
  let name = publicId.split('/').pop();
  
  // Remove Cloudinary hash suffix (last _xxxxx)
  name = name.replace(/_[a-z0-9]{6}$/, '');
  
  // Remove size dimensions
  name = name.replace(/[-_]?\d+x\d+/g, '');
  
  // Remove common prefixes
  name = name.replace(/^Selected[-_]*/i, '');
  name = name.replace(/^[-_]*Animal[-_]*/i, '');
  name = name.replace(/^[-_]*Cat[-_]*/i, '');
  name = name.replace(/^[-_]*Elephant[-_]*/i, '');
  name = name.replace(/^[-_]*Dear[-_]*/i, '');
  
  // Remove common suffixes/noise
  name = name.replace(/[-_]*\d+$/, '');
  name = name.replace(/[-_]*copy[-_]*/gi, '');
  name = name.replace(/[-_]*\(\d+\)/, '');
  
  // Replace separators with spaces
  name = name.replace(/[-_]+/g, ' ').trim();
  
  // Title case
  name = name
    .split(' ')
    .filter(w => w.length > 0)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  // Remove redundant words
  name = name.replace(/\s+/g, ' ').trim();
  
  return name || 'Unnamed Block';
}

function detectSubcategory(filename) {
  const lower = filename.toLowerCase();
  for (const rule of SUBCATEGORY_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      return rule.subcategory;
    }
  }
  return DEFAULT_SUBCATEGORY;
}

function detectFilters(filename) {
  const lower = filename.toLowerCase();
  const filters = [];
  
  for (const rule of FILTER_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      // Avoid duplicate filter names
      if (!filters.some(f => f.filterName === rule.filter.filterName)) {
        filters.push(rule.filter);
      }
    }
  }
  
  // Detect theme from subcategory keywords
  const themes = [
    { keywords: ['elephant', 'fox', 'cat', 'owl', 'deer', 'hare', 'alpaca', 'dinosaur', 'bee'], theme: 'Animal' },
    { keywords: ['paisley'], theme: 'Paisley' },
    { keywords: ['floral', 'botanical', 'daisy', 'flower', 'rose', 'meadow'], theme: 'Floral' },
    { keywords: ['tree', 'leaf', 'acorn', 'nature'], theme: 'Nature' },
    { keywords: ['heart', 'star', 'geometric', 'spiral'], theme: 'Geometric' },
    { keywords: ['christmas', 'wreath', 'berries'], theme: 'Festive' },
  ];
  
  for (const t of themes) {
    if (t.keywords.some(kw => lower.includes(kw))) {
      filters.push({ filterName: 'theme', filterValue: t.theme });
      break;
    }
  }

  return filters;
}

function generateSlug(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// --- MAIN ---

async function getFilesInFolder(folder) {
  const files = [];
  let nextCursor;
  do {
    const options = {
      type: 'upload',
      prefix: folder || '',
      max_results: 500,
      ...(nextCursor && { next_cursor: nextCursor }),
    };
    const result = await cloudinary.api.resources(options);
    files.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);
  return files;
}

async function run() {
  console.log('Fetching Cloudinary files...');
  const allFiles = await getFilesInFolder('');
  const rootFiles = allFiles.filter(f => !f.public_id.includes('/'));

  // --- PART 1: Auto-generate catalog from well-named block files ---
  const blockFiles = rootFiles.filter(f => {
    const name = f.public_id.toLowerCase();
    return name.includes('block') || name.includes('hand') || name.includes('stamp') || name.includes('printing');
  });

  console.log(`\nProcessing ${blockFiles.length} block files for auto-catalog...`);

  const categories = [
    { name: CATEGORY_NAME, description: 'Handcrafted wooden printing blocks for textile and paper printing', image: '' },
  ];

  const subcategoriesSet = new Set();
  const products = [];

  for (const file of blockFiles) {
    const productName = cleanProductName(file.public_id);
    const subcategory = detectSubcategory(file.public_id);
    const filters = detectFilters(file.public_id);
    const slug = generateSlug(productName);

    // Skip if we already have a product with same slug (dedup)
    if (products.some(p => generateSlug(p.name) === slug)) continue;

    subcategoriesSet.add(subcategory);

    const filtersStr = filters.map(f => `${f.filterName}:${f.filterValue}`).join(',');

    products.push({
      name: productName,
      subcategory,
      shortDescription: `Handcrafted ${subcategory.toLowerCase().replace(' blocks', '')} printing block`,
      sizeOptions: '3x3 inch, 4x4 inch, 6x6 inch, Custom',
      minQuantity: 1,
      featured: 'false',
      images: `${file.public_id}.${file.format}`,
      filters: filtersStr,
    });
  }

  const subcategories = Array.from(subcategoriesSet).map(name => ({
    name,
    category: CATEGORY_NAME,
  }));

  // Generate auto-catalog Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(categories), 'Categories');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(subcategories), 'Subcategories');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(products), 'Products');

  const autoCatalogPath = path.join(__dirname, '..', 'templates', 'auto-generated-catalog.xlsx');
  XLSX.writeFile(wb, autoCatalogPath);
  console.log(`\n✅ Auto-generated catalog saved: ${autoCatalogPath}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Subcategories: ${subcategories.length}`);
  console.log(`   Products: ${products.length}`);

  // --- PART 2: Manual review Excel for other files ---
  const dgFiles = rootFiles.filter(f => f.public_id.toLowerCase().startsWith('dg_') || f.public_id.toLowerCase().startsWith('dg-'));
  const numberedFiles = rootFiles.filter(f => /^\d+/.test(f.public_id));
  const imgFiles = rootFiles.filter(f => f.public_id.toLowerCase().startsWith('img'));
  const otherFiles = rootFiles.filter(f => {
    const name = f.public_id.toLowerCase();
    return !name.includes('block') && !name.includes('hand') && !name.includes('stamp') && !name.includes('printing')
      && !name.startsWith('dg_') && !name.startsWith('dg-')
      && !/^\d+/.test(name)
      && !name.startsWith('img');
  });

  const cloudName = process.env.CLOUDINARY_NAME;

  function buildManualReviewRows(files, defaultCategory) {
    return files.map(f => {
      const name = f.public_id.split('/').pop().replace(/_[a-z0-9]{6}$/, '').replace(/[-_]+/g, ' ').trim();
      const imageUrl = f.secure_url;
      // Excel HYPERLINK formula for clickable preview
      const preview = imageUrl;
      
      return {
        'Image Preview (URL)': preview,
        'Cloudinary Public ID': f.public_id,
        'Suggested Name': name,
        'Category (fill)': defaultCategory,
        'Subcategory (fill)': '',
        'Short Description': '',
        'Size Options': '3x3 inch, 4x4 inch, 6x6 inch, Custom',
        'Min Quantity': 1,
        'Featured': 'false',
        'Filters (size:val,theme:val)': '',
        'Include? (yes/no)': 'yes',
      };
    });
  }

  const manualWb = XLSX.utils.book_new();

  if (dgFiles.length > 0) {
    const dgRows = buildManualReviewRows(dgFiles, 'Design Gallery');
    XLSX.utils.book_append_sheet(manualWb, XLSX.utils.json_to_sheet(dgRows), 'Design Gallery');
  }

  if (numberedFiles.length > 0) {
    const numRows = buildManualReviewRows(numberedFiles, '');
    XLSX.utils.book_append_sheet(manualWb, XLSX.utils.json_to_sheet(numRows), 'Numbered Files');
  }

  if (imgFiles.length > 0) {
    const imgRows = buildManualReviewRows(imgFiles, '');
    XLSX.utils.book_append_sheet(manualWb, XLSX.utils.json_to_sheet(imgRows), 'Phone Photos');
  }

  if (otherFiles.length > 0) {
    const otherRows = buildManualReviewRows(otherFiles, '');
    XLSX.utils.book_append_sheet(manualWb, XLSX.utils.json_to_sheet(otherRows), 'Other Files');
  }

  const manualReviewPath = path.join(__dirname, '..', 'templates', 'manual-review-catalog.xlsx');
  XLSX.writeFile(manualWb, manualReviewPath);
  console.log(`\n✅ Manual review file saved: ${manualReviewPath}`);
  console.log(`   Design Gallery: ${dgFiles.length} files`);
  console.log(`   Numbered Files: ${numberedFiles.length} files`);
  console.log(`   Phone Photos: ${imgFiles.length} files`);
  console.log(`   Other Files: ${otherFiles.length} files`);

  console.log('\n\n=== NEXT STEPS ===');
  console.log('1. Review auto-generated-catalog.xlsx — fix any product names, then import via bulk import');
  console.log('2. Review manual-review-catalog.xlsx — fill in categories/subcategories, mark include=no for junk');
  console.log('3. After manual review, rename manual file to match bulk import format and upload');
}

run().catch(e => console.error('Error:', e.message));
