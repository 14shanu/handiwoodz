import { render, screen } from "@testing-library/react";
import Breadcrumb from "./breadcrumb";

jest.mock("next/link", () => {
  function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  }
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Printing Blocks" },
  ];

  it("renders all breadcrumb items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
    expect(screen.getByText("Printing Blocks")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Catalog").closest("a")).toHaveAttribute("href", "/catalog");
  });

  it("renders last item as text (no link)", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Printing Blocks").closest("a")).toBeNull();
  });

  it("renders separators between items", () => {
    render(<Breadcrumb items={items} />);
    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(2);
  });

  it("has accessible navigation landmark", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });
});
