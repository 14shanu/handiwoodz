import { sendOwnerAlert, sendCustomerConfirmation } from "../../../../utils/email";

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = String(Math.floor(Math.random() * 9999)).padStart(4, "0");
    event.params.data.quoteNumber = `HW-${year}${month}${day}-${random}`;
  },

  async afterCreate(event: { result: Record<string, unknown> }) {
    const data = event.result;

    // In Strapi v5, afterCreate result may not include components
    // Re-fetch with populate to get customDesigns and catalogItems data
    let customDesigns: Array<Record<string, unknown>> = [];
    let catalogItems: Array<Record<string, unknown>> = [];
    if (data.documentId) {
      try {
        const full = await strapi.documents("api::quote-request.quote-request").findOne({
          documentId: data.documentId as string,
          populate: ["customDesigns", "catalogItems", "catalogItems.product"],
        });
        customDesigns = (full?.customDesigns as Array<Record<string, unknown>>) || [];
        catalogItems = (full?.catalogItems as Array<Record<string, unknown>>) || [];
      } catch (e) {
        console.error("[QuoteRequest] Failed to re-fetch for components:", e);
      }
    }

    const emailData = {
      quoteNumber: (data.quoteNumber as string) || "",
      customerName: (data.customerName as string) || "",
      email: (data.email as string) || "",
      whatsapp: (data.whatsapp as string) || "",
      country: data.country as string | undefined,
      companyName: data.companyName as string | undefined,
      generalNotes: data.generalNotes as string | undefined,
      catalogItemsCount: catalogItems.length || (Array.isArray(data.catalogItems) ? data.catalogItems.length : 0),
      customDesignsCount: customDesigns.length || (Array.isArray(data.customDesigns) ? data.customDesigns.length : 0),
      catalogItems: catalogItems.length > 0 ? catalogItems as Array<{
        product?: { name?: string; slug?: string };
        selectedSize?: string;
        quantity?: number;
        notes?: string;
      }> : [],
      customDesigns: customDesigns.length > 0 ? customDesigns as Array<{
        fileUrl?: string;
        fileName?: string;
        designName?: string;
        productType?: string;
        width?: number;
        height?: number;
        unit?: string;
        colorCount?: string;
        quantity?: number;
        notes?: string;
      }> : [],
    };

    try {
      console.log("[QuoteRequest] Sending emails for:", emailData.quoteNumber);
      const results = await Promise.allSettled([
        sendOwnerAlert(emailData),
        sendCustomerConfirmation(emailData),
      ]);
      results.forEach((result, i) => {
        const target = i === 0 ? "owner" : "customer";
        if (result.status === "rejected") {
          console.error(`[QuoteRequest] ${target} email FAILED:`, result.reason);
        } else {
          console.log(`[QuoteRequest] ${target} email sent successfully`);
        }
      });
    } catch (error) {
      console.error("[QuoteRequest] Email notification failed:", error);
    }
  },
};
