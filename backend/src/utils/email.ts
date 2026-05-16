import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = `Handiwoodz <${process.env.EMAIL_FROM}>`;
const OWNER_EMAIL = process.env.OWNER_EMAIL || "";

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
}

export async function sendOwnerAlert(data: QuoteEmailData): Promise<void> {
  if (!OWNER_EMAIL) return;

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
      <p style="margin-top:20px;">
        <a href="https://wa.me/${data.whatsapp}" style="background:#984629;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Reply on WhatsApp</a>
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
