import { render, screen } from "@testing-library/react";
import CustomDesignCta from "./custom-design-cta";
import { homepageContent } from "@/lib/content";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("CustomDesignCta", () => {
  it("renders the heading", () => {
    render(<CustomDesignCta />);
    expect(screen.getByText(homepageContent.customCta.heading)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<CustomDesignCta />);
    expect(screen.getByText(homepageContent.customCta.subtitle)).toBeInTheDocument();
  });

  it("renders primary CTA linking to custom design", () => {
    render(<CustomDesignCta />);
    const link = screen.getByText(homepageContent.customCta.ctaPrimary).closest("a");
    expect(link).toHaveAttribute("href", "/custom-design");
  });

  it("renders WhatsApp CTA with external target", () => {
    render(<CustomDesignCta />);
    const link = screen.getByText(homepageContent.customCta.ctaSecondary).closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
