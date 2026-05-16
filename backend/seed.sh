#!/bin/bash

# Usage: ./seed.sh
# Reads STRAPI_API_TOKEN from .env file automatically

# Load token from .env
if [ -f .env ]; then
  TOKEN=$(grep -i "Strapi_Api_token" .env | cut -d '=' -f2 | tr -d ' ')
fi

if [ -z "$TOKEN" ]; then
  echo "Error: STRAPI_API_TOKEN not found in .env"
  exit 1
fi

API="http://localhost:1337/api"
HEADER="Authorization: Bearer $TOKEN"

echo "=== Seeding Categories ==="

curl -s -X POST "$API/categories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Printing Blocks","slug":"printing-blocks","description":"Traditional hand-carved wooden printing blocks for textile and fabric printing."}}'
echo ""

curl -s -X POST "$API/categories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Wall Plates","slug":"wall-plates","description":"Decorative hand-carved wooden wall plates and art pieces."}}'
echo ""

curl -s -X POST "$API/categories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Pichwai Art","slug":"pichwai-art","description":"Traditional Pichwai paintings on handcrafted wood panels."}}'
echo ""

curl -s -X POST "$API/categories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Custom Carvings","slug":"custom-carvings","description":"Bespoke wood carvings made to your specifications."}}'
echo ""

echo "=== Seeding Subcategories ==="

curl -s -X POST "$API/subcategories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Hand Carved","slug":"hand-carved","category":1}}'
echo ""

curl -s -X POST "$API/subcategories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Machine Assisted","slug":"machine-assisted","category":1}}'
echo ""

curl -s -X POST "$API/subcategories" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Decorative","slug":"decorative","category":2}}'
echo ""

echo "=== Seeding Products ==="

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Mandala Floret Block","slug":"mandala-floret-block","shortDescription":"Traditional circular floret motif hand-carved in seasoned hardwood.","sizeOptions":["3x3 inch","4x4 inch","6x6 inch","Custom"],"filters":[{"filterName":"woodType","filterValue":"Sheesham"},{"filterName":"theme","filterValue":"Floral"},{"filterName":"shape","filterValue":"Round"}],"minQuantity":10,"featured":false,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Paisley Border Unit","slug":"paisley-border-unit","shortDescription":"Continuous paisley pattern for fabric borders and edging.","sizeOptions":["2x6 inch","3x8 inch"],"filters":[{"filterName":"woodType","filterValue":"Teak"},{"filterName":"theme","filterValue":"Traditional"},{"filterName":"shape","filterValue":"Rectangular"}],"minQuantity":10,"featured":false,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Geometric Tile Set","slug":"geometric-tile-set","shortDescription":"Set of 3 small blocks with interlocking geometric star patterns.","sizeOptions":["3x3 inch"],"filters":[{"filterName":"woodType","filterValue":"Sheesham"},{"filterName":"theme","filterValue":"Geometric"},{"filterName":"shape","filterValue":"Square"}],"minQuantity":5,"featured":true,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Botanical Vine Block","slug":"botanical-vine-block","shortDescription":"Artisan-grade Mango wood block featuring delicate climbing vine details.","sizeOptions":["4x4 inch","8x3 inch"],"filters":[{"filterName":"woodType","filterValue":"Mango"},{"filterName":"theme","filterValue":"Floral"},{"filterName":"shape","filterValue":"Rectangular"}],"minQuantity":10,"featured":false,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Artisan Walnut Bowl","slug":"artisan-walnut-bowl","shortDescription":"Signature Series","minQuantity":1,"featured":true,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Oak Keepsake Chest","slug":"oak-keepsake-chest","shortDescription":"Essential Craft","minQuantity":1,"featured":true,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Teak Heritage Tray","slug":"teak-heritage-tray","shortDescription":"Pattern Collection","minQuantity":1,"featured":true,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Birch Orbit Lamp","slug":"birch-orbit-lamp","shortDescription":"Modern Heritage","minQuantity":1,"featured":true,"subcategory":1}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Custom Pillar Sets","slug":"custom-pillar-sets","shortDescription":"Architectural","minQuantity":1,"featured":true,"subcategory":2}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Charred Wall Accents","slug":"charred-wall-accents","shortDescription":"Texture Series","minQuantity":1,"featured":true,"subcategory":3}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Executive Desk Suite","slug":"executive-desk-suite","shortDescription":"Bespoke Decor","minQuantity":1,"featured":true,"subcategory":3}}'
echo ""

curl -s -X POST "$API/products" \
  -H "Content-Type: application/json" -H "$HEADER" \
  -d '{"data":{"name":"Peak Ridge Coasters","slug":"peak-ridge-coasters","shortDescription":"Gifting Series","minQuantity":1,"featured":true,"subcategory":2}}'
echo ""

echo "=== Done! ==="
echo ""
echo "Next steps:"
echo "1. Go to http://localhost:1337/admin"
echo "2. Content Manager → Select all entries → Publish"
echo "3. Settings → Users & Permissions → Roles → Public:"
echo "   - Category: enable find, findOne"
echo "   - Subcategory: enable find, findOne"
echo "   - Product: enable find, findOne"
echo "   - Quote Request: enable create"
