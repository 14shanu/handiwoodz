import { render, screen } from "@testing-library/react";
import WhatsAppFloat from "./whatsapp-float";

describe("WhatsAppFloat", () => {
  it("renders a link with correct aria-label", () => {
    render(<WhatsAppFloat />);
    const link = screen.getByLabelText("Chat on WhatsApp");
    expect(link).toBeInTheDocument();
  });

  it("opens in a new tab", () => {
    render(<WhatsAppFloat />);
    const link = screen.getByLabelText("Chat on WhatsApp");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links to wa.me with pre-filled message", () => {
    render(<WhatsAppFloat />);
    const link = screen.getByLabelText("Chat on WhatsApp");
    const href = link.getAttribute("href") || "";
    expect(href).toContain("https://wa.me/");
    expect(href).toContain("text=");
  });
});
