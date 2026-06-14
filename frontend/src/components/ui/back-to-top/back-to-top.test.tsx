import { render, screen, fireEvent, act } from "@testing-library/react";
import BackToTop from "./back-to-top";
import { uiContent } from "@/lib/content";

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    window.scrollTo = jest.fn();
  });

  it("renders a button with correct aria-label", () => {
    render(<BackToTop />);
    expect(
      screen.getByRole("button", { name: uiContent.backToTop.ariaLabel })
    ).toBeInTheDocument();
  });

  it("is hidden when scroll position is below threshold", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", {
      name: uiContent.backToTop.ariaLabel,
    });
    expect(button.className).toContain("opacity-0");
    expect(button.className).toContain("pointer-events-none");
  });

  it("becomes visible when scrolled past 400px", () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = screen.getByRole("button", {
      name: uiContent.backToTop.ariaLabel,
    });
    expect(button.className).toContain("opacity-100");
    expect(button.className).not.toContain("pointer-events-none");
  });

  it("scrolls to top smoothly when clicked", () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = screen.getByRole("button", {
      name: uiContent.backToTop.ariaLabel,
    });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("hides again when scrolled back to top", () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = screen.getByRole("button", {
      name: uiContent.backToTop.ariaLabel,
    });
    expect(button.className).toContain("opacity-0");
  });
});
