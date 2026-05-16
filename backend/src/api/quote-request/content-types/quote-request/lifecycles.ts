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

    const emailData = {
      quoteNumber: (data.quoteNumber as string) || "",
      customerName: (data.customerName as string) || "",
      email: (data.email as string) || "",
      whatsapp: (data.whatsapp as string) || "",
      country: data.country as string | undefined,
      companyName: data.companyName as string | undefined,
      generalNotes: data.generalNotes as string | undefined,
      catalogItemsCount: Array.isArray(data.catalogItems) ? data.catalogItems.length : 0,
      customDesignsCount: Array.isArray(data.customDesigns) ? data.customDesigns.length : 0,
    };

    try {
      await Promise.all([
        sendOwnerAlert(emailData),
        sendCustomerConfirmation(emailData),
      ]);
    } catch (error) {
      // Log but don't fail the request — quote is already saved
      console.error("Email notification failed:", error);
    }
  },
};
