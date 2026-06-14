import { render, screen } from "@testing-library/react";
import ProductCardSkeleton from "./product-card-skeleton";

describe("ProductCardSkeleton", () => {
  it("renders multiple skeleton elements", () => {
    render(<ProductCardSkeleton />);
    const skeletons = screen.getAllByRole("status");
    expect(skeletons.length).toBeGreaterThanOrEqual(4);
  });

  it("renders an aspect-square skeleton for the image area", () => {
    render(<ProductCardSkeleton />);
    const skeletons = screen.getAllByRole("status");
    const imageBlock = skeletons[0];
    expect(imageBlock.className).toContain("aspect-square");
  });

  it("renders within a bordered container", () => {
    const { container } = render(<ProductCardSkeleton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("border");
    expect(wrapper.className).toContain("rounded-lg");
  });
});
