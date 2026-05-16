import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductInfoPanel from "./product-info-panel";
import { productContent } from "@/lib/content";
import { Product } from "@/lib/types";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockProduct: Product = {
  id: 101,
  name: "Mandala Floret Block",
  slug: "mandala-floret-block",
  shortDescription: "Traditional circular floret motif.",
  sizeOptions: ["3x3 inch", "4x4 inch", "6x6 inch"],
  filters: [
    { filterName: "woodType", filterValue: "Sheesham" },
    { filterName: "theme", filterValue: "Floral" },
  ],
  minQuantity: 10,
  featured: false,
};

describe("ProductInfoPanel", () => {
  it("renders product name and description", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByText("Mandala Floret Block")).toBeInTheDocument();
    expect(screen.getByText("Traditional circular floret motif.")).toBeInTheDocument();
  });

  it("renders all size options", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByText("3x3 inch")).toBeInTheDocument();
    expect(screen.getByText("4x4 inch")).toBeInTheDocument();
    expect(screen.getByText("6x6 inch")).toBeInTheDocument();
  });

  it("highlights selected size", async () => {
    const user = userEvent.setup();
    render(<ProductInfoPanel product={mockProduct} />);
    const sizeBtn = screen.getByText("4x4 inch");
    await user.click(sizeBtn);
    expect(sizeBtn).toHaveClass("border-secondary");
  });

  it("renders quantity starting at minQuantity", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("increments quantity", async () => {
    const user = userEvent.setup();
    render(<ProductInfoPanel product={mockProduct} />);
    await user.click(screen.getByLabelText("Increase quantity"));
    expect(screen.getByText("11")).toBeInTheDocument();
  });

  it("does not decrement below minQuantity", async () => {
    const user = userEvent.setup();
    render(<ProductInfoPanel product={mockProduct} />);
    await user.click(screen.getByLabelText("Decrease quantity"));
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders minimum order text", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByText(/Minimum order:/)).toBeInTheDocument();
    expect(screen.getByText(/10 pieces/)).toBeInTheDocument();
  });

  it("renders notes textarea with placeholder", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByPlaceholderText(productContent.notesPlaceholder)).toBeInTheDocument();
  });

  it("disables Add to Quote when no size selected", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    const button = screen.getByText(productContent.addToBasket);
    expect(button).toBeDisabled();
  });

  it("enables Add to Quote after size is selected", async () => {
    const user = userEvent.setup();
    render(<ProductInfoPanel product={mockProduct} />);
    await user.click(screen.getByText("4x4 inch"));
    const button = screen.getByText(productContent.addToBasket);
    expect(button).not.toBeDisabled();
  });

  it("shows confirmation after adding to basket", async () => {
    const user = userEvent.setup();
    render(<ProductInfoPanel product={mockProduct} />);
    await user.click(screen.getByText("4x4 inch"));
    await user.click(screen.getByText(productContent.addToBasket));
    expect(screen.getByText(/Added!/)).toBeInTheDocument();
  });

  it("renders Customize This Design link to custom-design", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    const link = screen.getByText(productContent.customizeDesign).closest("a");
    expect(link).toHaveAttribute("href", "/custom-design");
  });

  it("renders WhatsApp inquiry link", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    const link = screen.getByText(productContent.whatsappInquiry).closest("a");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders filter tags as badges", () => {
    render(<ProductInfoPanel product={mockProduct} />);
    expect(screen.getByText("Sheesham")).toBeInTheDocument();
    expect(screen.getByText("Floral")).toBeInTheDocument();
  });

  it("handles product with no size options", () => {
    const noSizes = { ...mockProduct, sizeOptions: undefined };
    render(<ProductInfoPanel product={noSizes} />);
    expect(screen.queryByText(productContent.selectSize)).not.toBeInTheDocument();
  });

  it("handles product with no filters", () => {
    const noFilters = { ...mockProduct, filters: undefined };
    render(<ProductInfoPanel product={noFilters} />);
    expect(screen.queryByText("Sheesham")).not.toBeInTheDocument();
  });
});
