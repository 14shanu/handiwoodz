import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ShareButton from "./share-button";
import { uiContent } from "@/lib/content";

describe("ShareButton", () => {
  const defaultProps = {
    url: "https://handiwoodz.com/products/bowl",
    title: "Wooden Bowl",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, "share", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it("renders share button with label", () => {
    render(<ShareButton {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: uiContent.shareButton.label })
    ).toBeInTheDocument();
  });

  it("opens popover on click when Web Share API is unavailable", () => {
    render(<ShareButton {...defaultProps} />);
    fireEvent.click(
      screen.getByRole("button", { name: uiContent.shareButton.label })
    );
    expect(
      screen.getByText(uiContent.shareButton.shareViaWhatsApp)
    ).toBeInTheDocument();
    expect(
      screen.getByText(uiContent.shareButton.copyLink)
    ).toBeInTheDocument();
  });

  it("uses Web Share API when available", async () => {
    const mockShare = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      value: mockShare,
      writable: true,
      configurable: true,
    });

    render(<ShareButton {...defaultProps} />);
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: uiContent.shareButton.label })
      );
    });

    expect(mockShare).toHaveBeenCalledWith({
      title: defaultProps.title,
      url: defaultProps.url,
    });
  });

  it("falls back to popover when Web Share API rejects", async () => {
    const mockShare = jest.fn().mockRejectedValue(new Error("User cancelled"));
    Object.defineProperty(navigator, "share", {
      value: mockShare,
      writable: true,
      configurable: true,
    });

    render(<ShareButton {...defaultProps} />);
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: uiContent.shareButton.label })
      );
    });

    expect(
      screen.getByText(uiContent.shareButton.shareViaWhatsApp)
    ).toBeInTheDocument();
  });

  it("opens WhatsApp share link in new window", () => {
    window.open = jest.fn();
    render(<ShareButton {...defaultProps} />);
    fireEvent.click(
      screen.getByRole("button", { name: uiContent.shareButton.label })
    );
    fireEvent.click(
      screen.getByText(uiContent.shareButton.shareViaWhatsApp)
    );

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/"),
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("copies link to clipboard and shows confirmation", async () => {
    render(<ShareButton {...defaultProps} />);
    fireEvent.click(
      screen.getByRole("button", { name: uiContent.shareButton.label })
    );
    fireEvent.click(screen.getByText(uiContent.shareButton.copyLink));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      defaultProps.url
    );

    await waitFor(() => {
      expect(
        screen.getByText(uiContent.shareButton.linkCopied)
      ).toBeInTheDocument();
    });
  });

  it("closes popover when clicking outside", () => {
    render(
      <div>
        <ShareButton {...defaultProps} />
        <p>Outside</p>
      </div>
    );
    fireEvent.click(
      screen.getByRole("button", { name: uiContent.shareButton.label })
    );
    expect(
      screen.getByText(uiContent.shareButton.shareViaWhatsApp)
    ).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText("Outside"));

    expect(
      screen.queryByText(uiContent.shareButton.shareViaWhatsApp)
    ).not.toBeInTheDocument();
  });

  it("has aria-expanded attribute reflecting popover state", () => {
    render(<ShareButton {...defaultProps} />);
    const button = screen.getByRole("button", {
      name: uiContent.shareButton.label,
    });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
