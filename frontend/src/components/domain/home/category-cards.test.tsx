import { render, screen } from "@testing-library/react";
import CategoryCards from "./category-cards";
import { homepageContent } from "@/lib/content";
import { Category } from "@/lib/types";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockCategories: Category[] = [
  { id: 1, name: "Printing Blocks", slug: "printing-blocks" },
  { id: 2, name: "Wall Plates", slug: "wall-plates" },
];

describe("CategoryCards", () => {
  it("renders the heading from content", () => {
    render(<CategoryCards categories={mockCategories} />);
    expect(screen.getByText(homepageContent.categories.heading)).toBeInTheDocument();
  });

  it("renders the subtitle from content", () => {
    render(<CategoryCards categories={mockCategories} />);
    expect(screen.getByText(homepageContent.categories.subtitle)).toBeInTheDocument();
  });

  it("renders all categories from props", () => {
    render(<CategoryCards categories={mockCategories} />);
    expect(screen.getByText("Printing Blocks")).toBeInTheDocument();
    expect(screen.getByText("Wall Plates")).toBeInTheDocument();
  });

  it("renders category links with correct hrefs", () => {
    render(<CategoryCards categories={mockCategories} />);
    const link = screen.getByText("Printing Blocks").closest("a");
    expect(link).toHaveAttribute("href", "/catalog/printing-blocks");
  });

  it("renders View All link", () => {
    render(<CategoryCards categories={mockCategories} />);
    const link = screen.getByText(homepageContent.categories.viewAll).closest("a");
    expect(link).toHaveAttribute("href", "/catalog");
  });

  it("renders empty grid when no categories", () => {
    render(<CategoryCards categories={[]} />);
    expect(screen.getByText(homepageContent.categories.heading)).toBeInTheDocument();
    expect(screen.queryByText("Printing Blocks")).not.toBeInTheDocument();
  });
});
