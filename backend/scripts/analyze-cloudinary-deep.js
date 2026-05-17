require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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
  // Get all root-level files
  const allFiles = await getFilesInFolder('');
  const rootFiles = allFiles.filter(f => !f.public_id.includes('/'));
  
  console.log(`=== ROOT FILES ANALYSIS (${rootFiles.length} files) ===\n`);

  // Group by naming pattern
  const groups = {
    'dg_*': [],
    'block/hand/stamp': [],
    'numbered (just numbers)': [],
    'img_*': [],
    'other': [],
  };

  rootFiles.forEach(f => {
    const name = f.public_id.toLowerCase();
    if (name.startsWith('dg_') || name.startsWith('dg-')) {
      groups['dg_*'].push(f);
    } else if (name.includes('block') || name.includes('hand') || name.includes('stamp') || name.includes('printing')) {
      groups['block/hand/stamp'].push(f);
    } else if (/^\d+/.test(name)) {
      groups['numbered (just numbers)'].push(f);
    } else if (name.startsWith('img') || name.startsWith('image')) {
      groups['img_*'].push(f);
    } else {
      groups['other'].push(f);
    }
  });

  Object.entries(groups).forEach(([group, files]) => {
    console.log(`\n📂 ${group} (${files.length} files)`);
    files.slice(0, 10).forEach(f => {
      console.log(`   ${f.public_id}.${f.format}`);
    });
    if (files.length > 10) console.log(`   ... and ${files.length - 10} more`);
  });

  // Analyze Product Photos (Yash) folder
  console.log('\n\n=== PRODUCT PHOTOS (YASH) ===\n');
  const yashFiles = allFiles.filter(f => f.public_id.startsWith('Product Photos (Yash)'));
  
  const yashFolders = {};
  yashFiles.forEach(f => {
    const parts = f.public_id.split('/');
    const subPath = parts.slice(1, -1).join('/') || '[root]';
    if (!yashFolders[subPath]) yashFolders[subPath] = [];
    yashFolders[subPath].push(f);
  });

  Object.entries(yashFolders).forEach(([folder, files]) => {
    console.log(`📁 ${folder} (${files.length} files)`);
    files.slice(0, 3).forEach(f => {
      const name = f.public_id.split('/').pop();
      console.log(`   ${name}.${f.format}`);
    });
  });

  // Analyze 3*3 and 6*6 folders
  console.log('\n\n=== SIZE FOLDERS ===\n');
  const sizeFiles = allFiles.filter(f => f.public_id.startsWith('3*3') || f.public_id.startsWith('6*6'));
  const sizeFolders = {};
  sizeFiles.forEach(f => {
    const parts = f.public_id.split('/');
    const folder = parts.slice(0, -1).join('/') || '[root]';
    if (!sizeFolders[folder]) sizeFolders[folder] = [];
    sizeFolders[folder].push(f);
  });

  Object.entries(sizeFolders).forEach(([folder, files]) => {
    console.log(`📁 ${folder} (${files.length} files)`);
    files.slice(0, 3).forEach(f => {
      const name = f.public_id.split('/').pop();
      console.log(`   ${name}.${f.format}`);
    });
  });

  // Show all unique "block" product names
  console.log('\n\n=== BLOCK PRODUCT NAMES (sample) ===\n');
  const blockFiles = rootFiles.filter(f => f.public_id.toLowerCase().includes('block'));
  const blockNames = blockFiles.map(f => f.public_id).slice(0, 30);
  blockNames.forEach(n => console.log(`  ${n}`));
  console.log(`  ... total block files: ${blockFiles.length}`);
}

run().catch(e => console.error('Error:', e.message));
