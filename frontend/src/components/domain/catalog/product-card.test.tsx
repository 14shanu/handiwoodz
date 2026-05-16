import { render, screen } from "@testing-library/react";
import ProductCard from "./product-card";
import { Product } from "@/lib/types";
import { sharedContent } from "@/lib/content";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

const baseProduct: Product = {
  id: 1,
  name: "Mandala Floret Block",
  slug: "mandala-floret-block",
  shortDescription: "Traditional circular floret motif.",
  sizeOptions: ["3x3 inch", "4x4 inch"],
  minQuantity: 10,
  featured: false,
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={baseProduct} href="/catalog/blocks/hand-carved/mandala" />);
    expect(screen.getByText("Mandala Floret Block")).toBeInTheDocument();
  });

  it("renders short description", () => {
    render(<ProductCard product={baseProduct} href="/test" />);
    expect(screen.getByText("Traditional circular floret motif.")).toBeInTheDocument();
  });

  it("renders Add to Quote as a link to product detail", () => {
    render(<ProductCard product={baseProduct} href="/test" />);
    const link = screen.getByText(sharedContent.buttons.addToQuote).closest("a");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders min quantity badge when > 1", () => {
    render(<ProductCard product={baseProduct} href="/test" />);
    expect(screen.getByText(/Min:/)).toBeInTheDocument();
  });

  it("does not render min quantity badge when 1", () => {
    const product = { ...baseProduct, minQuantity: 1 };
    render(<ProductCard product={product} href="/test" />);
    expect(screen.queryByText(/Min:/)).not.toBeInTheDocument();
  });

  it("renders sizes available count", () => {
    render(<ProductCard product={baseProduct} href="/test" />);
    expect(screen.getByText(/2 sizes available/)).toBeInTheDocument();
  });

  it("links to correct href", () => {
    render(<ProductCard product={baseProduct} href="/catalog/blocks/hand-carved/mandala" />);
    const link = screen.getByText("Mandala Floret Block").closest("a");
    expect(link).toHaveAttribute("href", "/catalog/blocks/hand-carved/mandala");
  });
});
