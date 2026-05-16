import { render, screen } from "@testing-library/react";
import FeaturedProducts from "./featured-products";
import { homepageContent, sharedContent } from "@/lib/content";
import { Product } from "@/lib/types";

const mockProducts: Product[] = [
  { id: 1, name: "Artisan Walnut Bowl", slug: "artisan-walnut-bowl", shortDescription: "Signature Series", minQuantity: 1, featured: true },
  { id: 2, name: "Oak Keepsake Chest", slug: "oak-keepsake-chest", shortDescription: "Essential Craft", minQuantity: 1, featured: true },
];

describe("FeaturedProducts", () => {
  it("renders the heading from content", () => {
    render(<FeaturedProducts products={mockProducts} />);
    expect(screen.getByText(homepageContent.featured.heading)).toBeInTheDocument();
  });

  it("renders all products from props", () => {
    render(<FeaturedProducts products={mockProducts} />);
    expect(screen.getByText("Artisan Walnut Bowl")).toBeInTheDocument();
    expect(screen.getByText("Oak Keepsake Chest")).toBeInTheDocument();
  });

  it("renders Add to Quote button from shared content", () => {
    render(<FeaturedProducts products={mockProducts} />);
    expect(screen.getAllByText(sharedContent.buttons.addToQuote)).toHaveLength(2);
  });

  it("renders product short descriptions", () => {
    render(<FeaturedProducts products={mockProducts} />);
    expect(screen.getByText("Signature Series")).toBeInTheDocument();
  });

  it("renders empty grid when no products", () => {
    render(<FeaturedProducts products={[]} />);
    expect(screen.getByText(homepageContent.featured.heading)).toBeInTheDocument();
    expect(screen.queryByText(sharedContent.buttons.addToQuote)).not.toBeInTheDocument();
  });
});
