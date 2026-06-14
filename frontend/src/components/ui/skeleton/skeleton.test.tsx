import { render, screen } from "@testing-library/react";
import Skeleton from "./skeleton";
import { uiContent } from "@/lib/content";

describe("Skeleton", () => {
  it("renders with loading status role", () => {
    render(<Skeleton />);
    expect(
      screen.getByRole("status", {
        name: uiContent.skeleton.loadingAriaLabel,
      })
    ).toBeInTheDocument();
  });

  it("applies animate-pulse class", () => {
    render(<Skeleton />);
    const element = screen.getByRole("status");
    expect(element.className).toContain("animate-pulse");
  });

  it("applies custom className for sizing", () => {
    render(<Skeleton className="w-full h-8" />);
    const element = screen.getByRole("status");
    expect(element.className).toContain("w-full");
    expect(element.className).toContain("h-8");
  });

  it("renders with default classes when no className provided", () => {
    render(<Skeleton />);
    const element = screen.getByRole("status");
    expect(element.className).toContain("bg-surface-container-high");
    expect(element.className).toContain("rounded-md");
  });
});
