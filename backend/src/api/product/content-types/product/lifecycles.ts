const FRONTEND_URL = process.env.FRONTEND_URL;
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

async function triggerRevalidation() {
  if (!FRONTEND_URL || !REVALIDATION_SECRET) return;

  try {
    await fetch(`${FRONTEND_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidation-secret": REVALIDATION_SECRET,
      },
      body: JSON.stringify({ tag: "products" }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    strapi.log.warn(`Revalidation failed: ${message}`);
  }
}

export default {
  afterCreate() {
    triggerRevalidation();
  },
  afterUpdate() {
    triggerRevalidation();
  },
  afterDelete() {
    triggerRevalidation();
  },
};
