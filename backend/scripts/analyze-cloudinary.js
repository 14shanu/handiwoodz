require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function getAllFolders(path = '') {
  const folders = [];
  try {
    const result = path
      ? await cloudinary.api.sub_folders(path)
      : await cloudinary.api.root_folders();
    
    for (const folder of result.folders) {
      folders.push(folder.path);
      const subFolders = await getAllFolders(folder.path);
      folders.push(...subFolders);
    }
  } catch (e) {
    // No subfolders
  }
  return folders;
}

async function getFilesInFolder(folder) {
  const files = [];
  let nextCursor;
  
  do {
    const options = {
      type: 'upload',
      prefix: folder,
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
  console.log('=== CLOUDINARY STRUCTURE ANALYSIS ===\n');

  // Get all folders
  const folders = await getAllFolders();
  console.log('FOLDERS:');
  folders.forEach(f => console.log('  ' + f));
  console.log(`\nTotal folders: ${folders.length}\n`);

  // Get files per folder with sample names
  console.log('FILES PER FOLDER:');
  console.log('─'.repeat(80));

  for (const folder of folders) {
    const files = await getFilesInFolder(folder);
    // Only show files directly in this folder (not subfolders)
    const directFiles = files.filter(f => {
      const relativePath = f.public_id.replace(folder + '/', '');
      return !relativePath.includes('/');
    });

    if (directFiles.length === 0) continue;

    console.log(`\n📁 ${folder} (${directFiles.length} files)`);
    console.log('   Sample files:');
    directFiles.slice(0, 5).forEach(f => {
      const name = f.public_id.split('/').pop();
      console.log(`     - ${name}.${f.format} (${f.width}x${f.height})`);
    });
    if (directFiles.length > 5) {
      console.log(`     ... and ${directFiles.length - 5} more`);
    }
  }

  // Also check root-level files (no folder)
  const allFiles = await getFilesInFolder('');
  const rootFiles = allFiles.filter(f => !f.public_id.includes('/'));
  if (rootFiles.length > 0) {
    console.log(`\n📁 [ROOT] (${rootFiles.length} files)`);
    console.log('   Sample files:');
    rootFiles.slice(0, 5).forEach(f => {
      console.log(`     - ${f.public_id}.${f.format} (${f.width}x${f.height})`);
    });
  }

  console.log('\n\n=== NAMING PATTERNS ===\n');
  
  // Analyze naming patterns from all files
  const allResources = await getFilesInFolder('');
  const keywords = {};
  
  allResources.forEach(f => {
    const name = f.public_id.split('/').pop().toLowerCase();
    const words = name.split(/[_\-\s]+/);
    words.forEach(w => {
      if (w.length > 2 && !/^\d+$/.test(w) && !/^[a-z0-9]{6,}$/.test(w)) {
        keywords[w] = (keywords[w] || 0) + 1;
      }
    });
  });

  const topKeywords = Object.entries(keywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40);

  console.log('TOP KEYWORDS IN FILENAMES:');
  topKeywords.forEach(([word, count]) => {
    console.log(`  ${word}: ${count}`);
  });
}

run().catch(e => console.error('Error:', e.message));
