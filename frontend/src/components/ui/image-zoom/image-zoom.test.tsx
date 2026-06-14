import { render, screen } from "@testing-library/react";
import ImageZoom from "./image-zoom";

describe("ImageZoom", () => {
  it("renders children", () => {
    render(
      <ImageZoom>
        <img src="/test.jpg" alt="test" />
      </ImageZoom>
    );
    expect(screen.getByAltText("test")).toBeInTheDocument();
  });

  it("applies overflow-hidden on the container", () => {
    const { container } = render(
      <ImageZoom>
        <img src="/test.jpg" alt="test" />
      </ImageZoom>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("overflow-hidden");
  });

  it("applies hover:scale-110 transition on inner wrapper", () => {
    const { container } = render(
      <ImageZoom>
        <img src="/test.jpg" alt="test" />
      </ImageZoom>
    );
    const wrapper = container.firstChild as HTMLElement;
    const inner = wrapper.firstChild as HTMLElement;
    expect(inner.className).toContain("hover:scale-110");
    expect(inner.className).toContain("transition-transform");
  });

  it("applies custom className on the container", () => {
    const { container } = render(
      <ImageZoom className="rounded-lg">
        <img src="/test.jpg" alt="test" />
      </ImageZoom>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("rounded-lg");
  });
});
