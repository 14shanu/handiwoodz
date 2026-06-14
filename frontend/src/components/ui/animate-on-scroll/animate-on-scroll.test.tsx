import { render, screen, act } from "@testing-library/react";
import AnimateOnScroll from "./animate-on-scroll";

let observerCallback: IntersectionObserverCallback;
const mockUnobserve = jest.fn();
const mockObserve = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  global.IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: jest.fn(),
      root: null,
      rootMargin: "",
      thresholds: [],
      takeRecords: () => [],
    };
  });
});

describe("AnimateOnScroll", () => {
  it("renders children", () => {
    render(
      <AnimateOnScroll>
        <p>Hello</p>
      </AnimateOnScroll>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("starts with hidden state (opacity-0)", () => {
    const { container } = render(
      <AnimateOnScroll>
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("opacity-0");
  });

  it("becomes visible when element enters viewport", () => {
    const { container } = render(
      <AnimateOnScroll>
        <p>Content</p>
      </AnimateOnScroll>
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("opacity-100");
  });

  it("applies translate-y-8 for default 'up' direction", () => {
    const { container } = render(
      <AnimateOnScroll>
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("translate-y-8");
  });

  it("applies -translate-y-8 for 'down' direction", () => {
    const { container } = render(
      <AnimateOnScroll direction="down">
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("-translate-y-8");
  });

  it("applies translate-x-8 for 'left' direction", () => {
    const { container } = render(
      <AnimateOnScroll direction="left">
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("translate-x-8");
  });

  it("applies -translate-x-8 for 'right' direction", () => {
    const { container } = render(
      <AnimateOnScroll direction="right">
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("-translate-x-8");
  });

  it("applies custom delay as inline style", () => {
    const { container } = render(
      <AnimateOnScroll delay={200}>
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.transitionDelay).toBe("200ms");
  });

  it("applies custom className", () => {
    const { container } = render(
      <AnimateOnScroll className="my-custom-class">
        <p>Content</p>
      </AnimateOnScroll>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });

  it("unobserves element after it becomes visible", () => {
    render(
      <AnimateOnScroll>
        <p>Content</p>
      </AnimateOnScroll>
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it("does not become visible when element is not intersecting", () => {
    const { container } = render(
      <AnimateOnScroll>
        <p>Content</p>
      </AnimateOnScroll>
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("opacity-0");
  });
});
