import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = `Handiwoodz <${process.env.EMAIL_FROM}>`;
const OWNER_EMAIL = process.env.OWNER_EMAIL || "";
const DEFAULT_COUNTRY_CODE = process.env.DEFAULT_COUNTRY_CODE || "91";

function formatWhatsAppNumber(number: string): string {
  // Remove all non-digit characters
  const digits = number.replace(/\D/g, "");
  // If already has country code (10+ digits starting with country code), use as-is
  if (digits.length > 10) return digits;
  // Otherwise prepend default country code
  return `${DEFAULT_COUNTRY_CODE}${digits}`;
}

interface QuoteEmailData {
  quoteNumber: string;
  customerName: string;
  email: string;
  whatsapp: string;
  country?: string;
  companyName?: string;
  generalNotes?: string;
  catalogItemsCount: number;
  customDesignsCount: number;
  catalogItems?: Array<{
    product?: { name?: string; slug?: string };
    selectedSize?: string;
    quantity?: number;
    notes?: string;
  }>;
  customDesigns?: Array<{
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
  }>;
}

export async function sendOwnerAlert(data: QuoteEmailData): Promise<void> {
  if (!OWNER_EMAIL) return;

  const whatsappNumber = formatWhatsAppNumber(data.whatsapp);

  await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    subject: `New Quote Request: ${data.quoteNumber}`,
    html: `
      <h2>New Quote Request Received</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;">Quote Number</td><td style="padding:8px;">${data.quoteNumber}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Customer</td><td style="padding:8px;">${data.customerName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${data.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">WhatsApp</td><td style="padding:8px;">${data.whatsapp}</td></tr>
        ${data.country ? `<tr><td style="padding:8px;font-weight:bold;">Country</td><td style="padding:8px;">${data.country}</td></tr>` : ""}
        ${data.companyName ? `<tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${data.companyName}</td></tr>` : ""}
        <tr><td style="padding:8px;font-weight:bold;">Catalog Items</td><td style="padding:8px;">${data.catalogItemsCount}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Custom Designs</td><td style="padding:8px;">${data.customDesignsCount}</td></tr>
        ${data.generalNotes ? `<tr><td style="padding:8px;font-weight:bold;">Notes</td><td style="padding:8px;">${data.generalNotes}</td></tr>` : ""}
      </table>
      ${data.catalogItems && data.catalogItems.length > 0 ? `
        <h3 style="margin-top:24px;">Catalog Items</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;border:1px solid #ddd;">
          <tr style="background:#f5f5f5;">
            <th style="padding:8px;text-align:left;">Product</th>
            <th style="padding:8px;text-align:left;">Size</th>
            <th style="padding:8px;text-align:left;">Qty</th>
          </tr>
          ${data.catalogItems.map((item) => `
            <tr>
              <td style="padding:8px;">${item.product?.name || "Product"}</td>
              <td style="padding:8px;">${item.selectedSize || "-"}</td>
              <td style="padding:8px;">${item.quantity || 1}</td>
            </tr>
            ${item.notes ? `<tr><td colspan="3" style="padding:4px 8px;color:#666;font-size:12px;">Notes: ${item.notes}</td></tr>` : ""}
          `).join("")}
        </table>
      ` : ""}
      ${data.customDesigns && data.customDesigns.length > 0 ? `
        <h3 style="margin-top:24px;">Custom Design Files</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;border:1px solid #ddd;">
          <tr style="background:#f5f5f5;">
            <th style="padding:8px;text-align:left;">File</th>
            <th style="padding:8px;text-align:left;">Type</th>
            <th style="padding:8px;text-align:left;">Size</th>
            <th style="padding:8px;text-align:left;">Qty</th>
          </tr>
          ${data.customDesigns.map((d) => `
            <tr>
              <td style="padding:8px;"><a href="${d.fileUrl}" target="_blank">${d.designName || d.fileName || "Design"}</a></td>
              <td style="padding:8px;">${d.productType || "-"}</td>
              <td style="padding:8px;">${d.width && d.height ? `${d.width}×${d.height} ${d.unit || "inch"}` : "-"}</td>
              <td style="padding:8px;">${d.quantity || 1}</td>
            </tr>
            ${d.notes ? `<tr><td colspan="4" style="padding:4px 8px;color:#666;font-size:12px;">Notes: ${d.notes}</td></tr>` : ""}
          `).join("")}
        </table>
      ` : ""}
      <p style="margin-top:20px;">
        <a href="https://wa.me/${whatsappNumber}" style="background:#984629;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Reply on WhatsApp</a>
      </p>
    `,
  });
}

export async function sendCustomerConfirmation(data: QuoteEmailData): Promise<void> {
  await resend.emails.send({
    from: EMAIL_FROM,
    to: data.email,
    subject: `Quote Request Received - ${data.quoteNumber}`,
    html: `
      <h2>Thank you, ${data.customerName}!</h2>
      <p>We've received your quotation request and our team is reviewing it.</p>
      <table style="border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:8px;font-weight:bold;">Reference Number</td><td style="padding:8px;">${data.quoteNumber}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Items</td><td style="padding:8px;">${data.catalogItemsCount} catalog items, ${data.customDesignsCount} custom designs</td></tr>
      </table>
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>Our team will review your requirements within 24 hours</li>
        <li>You'll receive a detailed quote with pricing and lead time</li>
        <li>Feel free to reach out on WhatsApp for any questions</li>
      </ul>
      <p style="margin-top:20px;color:#666;font-size:14px;">— The Handiwoodz Team</p>
    `,
  });
}
