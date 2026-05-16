import { render, screen } from "@testing-library/react";
import TrustSection from "./trust-section";
import { homepageContent } from "@/lib/content";

describe("TrustSection", () => {
  it("renders all trust item titles", () => {
    render(<TrustSection />);
    homepageContent.trust.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("renders all trust item descriptions", () => {
    render(<TrustSection />);
    homepageContent.trust.items.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it("renders icons for each item", () => {
    render(<TrustSection />);
    homepageContent.trust.items.forEach((item) => {
      expect(screen.getByText(item.icon)).toBeInTheDocument();
    });
  });
});
