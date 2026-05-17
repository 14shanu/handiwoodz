require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:1337';
const SYNC_SECRET = process.env.CLOUDINARY_SYNC_SECRET || 'handiwoodz-sync-2025';

async function run() {
  // Get all categories
  const catRes = await fetch(`${API_URL}/api/categories?populate=*`);
  const categories = (await catRes.json()).data;

  console.log(`Found ${categories.length} categories\n`);

  for (const category of categories) {
    if (category.image) {
      console.log(`✓ ${category.name} — already has image`);
      continue;
    }

    // Find products in this category's subcategories
    const subRes = await fetch(`${API_URL}/api/subcategories?filters[category][slug]=${category.slug}&populate=*`);
    const subcategories = (await subRes.json()).data;

    let imageFound = false;

    for (const sub of subcategories) {
      if (imageFound) break;

      const prodRes = await fetch(`${API_URL}/api/products?filters[subcategory][slug]=${sub.slug}&populate=images&pagination[limit]=1`);
      const products = (await prodRes.json()).data;

      if (products.length > 0 && products[0].images && products[0].images.length > 0) {
        const imageId = products[0].images[0].id;

        // Update category with this image
        const updateRes = await fetch(`${API_URL}/api/categories/${category.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { image: imageId } }),
        });

        if (updateRes.ok) {
          console.log(`✓ ${category.name} — assigned image from "${products[0].name}"`);
          imageFound = true;
        } else {
          const err = await updateRes.json();
          console.log(`✗ ${category.name} — failed: ${err.error?.message || 'unknown'}`);
        }
      }
    }

    if (!imageFound) {
      console.log(`- ${category.name} — no products with images found`);
    }
  }
}

run().catch(e => console.error('Error:', e.message));
