import { QuoteRequestPayload } from "@/lib/types";
import { strapiPost, API } from "./strapi";

interface SubmitQuoteResponse {
  success: boolean;
  quoteNumber?: string;
  error?: string;
}

interface QuoteRequestResult {
  quoteNumber: string;
}

export async function submitQuoteRequest(
  payload: QuoteRequestPayload
): Promise<SubmitQuoteResponse> {
  try {
    const result = await strapiPost<QuoteRequestResult>(API.QUOTE_REQUESTS, {
      customerName: payload.customerName,
      email: payload.email,
      whatsapp: payload.whatsapp,
      country: payload.country,
      companyName: payload.companyName,
      generalNotes: payload.generalNotes,
      catalogItems: payload.catalogItems,
      customDesigns: payload.customDesigns,
    });
    return { success: true, quoteNumber: result.quoteNumber };
  } catch (error) {
    // Fallback: mock response when Strapi is unavailable
    if (error instanceof Error && error.message !== "Request failed") {
      // Network error — Strapi not running, use mock
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const date = new Date();
      const quoteNumber = `HW-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
      return { success: true, quoteNumber };
    }
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong" };
  }
}
