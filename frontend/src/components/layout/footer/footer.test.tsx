import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import { sharedContent } from "@/lib/content";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Footer", () => {
  it("renders the site name", () => {
    render(<Footer />);
    expect(screen.getByText(sharedContent.siteName)).toBeInTheDocument();
  });

  it("renders brand description", () => {
    render(<Footer />);
    expect(screen.getByText(sharedContent.footer.brandDescription)).toBeInTheDocument();
  });

  it("renders section headings", () => {
    render(<Footer />);
    expect(screen.getByText(sharedContent.footer.collectionsHeading)).toBeInTheDocument();
    expect(screen.getByText(sharedContent.footer.businessHeading)).toBeInTheDocument();
    expect(screen.getByText(sharedContent.footer.contactHeading)).toBeInTheDocument();
  });

  it("renders collection links", () => {
    render(<Footer />);
    sharedContent.footer.links.collections.forEach((link) => {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    });
  });

  it("renders business links", () => {
    render(<Footer />);
    sharedContent.footer.links.business.forEach((link) => {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    });
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders WhatsApp link with external target", () => {
    render(<Footer />);
    const link = screen.getByText(sharedContent.buttons.chatOnWhatsapp).closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders privacy and terms links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: sharedContent.footer.privacyLink })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: sharedContent.footer.termsLink })).toBeInTheDocument();
  });
});
