import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./navbar";
import { sharedContent } from "@/lib/content";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Navbar", () => {
  it("renders the site name linking to home", () => {
    render(<Navbar />);
    const logo = screen.getByText(sharedContent.siteName);
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText(sharedContent.nav.catalog)[0]).toBeInTheDocument();
    expect(screen.getAllByText(sharedContent.nav.customDesign)[0]).toBeInTheDocument();
    expect(screen.getAllByText(sharedContent.nav.ourStory)[0]).toBeInTheDocument();
    expect(screen.getAllByText(sharedContent.nav.wholesale)[0]).toBeInTheDocument();
  });

  it("renders quote basket link", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Quote Basket")).toHaveAttribute("href", "/quote-basket");
  });

  it("renders WhatsApp link with external target", () => {
    render(<Navbar />);
    const link = screen.getByLabelText("Chat on WhatsApp");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not show mobile menu by default", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Toggle menu")).toHaveAttribute("aria-expanded", "false");
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getAllByText(sharedContent.nav.catalog).length).toBeGreaterThan(1);
  });

  it("closes mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByLabelText("Toggle menu"));
    const links = screen.getAllByText(sharedContent.nav.catalog);
    await user.click(links[links.length - 1]);
    expect(screen.getAllByText(sharedContent.nav.catalog)).toHaveLength(1);
  });

  it("toggles aria-expanded on menu button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const btn = screen.getByLabelText("Toggle menu");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});
