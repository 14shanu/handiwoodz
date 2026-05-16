import { render, screen } from "@testing-library/react";
import HeroSection from "./hero-section";
import { homepageContent } from "@/lib/content";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("HeroSection", () => {
  it("renders the title", () => {
    render(<HeroSection />);
    expect(screen.getByText(homepageContent.hero.title)).toBeInTheDocument();
  });

  it("renders the badge", () => {
    render(<HeroSection />);
    expect(screen.getByText(homepageContent.hero.badge)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);
    expect(screen.getByText(homepageContent.hero.subtitle)).toBeInTheDocument();
  });

  it("renders primary CTA linking to catalog", () => {
    render(<HeroSection />);
    const cta = screen.getByText(homepageContent.hero.ctaPrimary).closest("a");
    expect(cta).toHaveAttribute("href", "/catalog");
  });

  it("renders secondary CTA linking to custom design", () => {
    render(<HeroSection />);
    const cta = screen.getByText(homepageContent.hero.ctaSecondary).closest("a");
    expect(cta).toHaveAttribute("href", "/custom-design");
  });
});
