import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteContactForm from "./quote-contact-form";

const mockOnSubmit = jest.fn();

beforeEach(() => {
  mockOnSubmit.mockClear();
});

describe("QuoteContactForm", () => {
  it("renders all form fields", () => {
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/)).toBeInTheDocument();
  });

  it("shows error on blur when required field is empty", async () => {
    const user = userEvent.setup();
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    const nameInput = screen.getByLabelText(/Full Name/);
    await user.click(nameInput);
    await user.tab();
    expect(screen.getByText(/Name must be at least/)).toBeInTheDocument();
  });

  it("shows error for invalid email on blur", async () => {
    const user = userEvent.setup();
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/Email Address/);
    await user.type(emailInput, "not-valid");
    await user.tab();
    expect(screen.getByText(/valid email/)).toBeInTheDocument();
  });

  it("clears error when valid value is entered", async () => {
    const user = userEvent.setup();
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/Email Address/);
    await user.type(emailInput, "bad");
    await user.tab();
    expect(screen.getByText(/valid email/)).toBeInTheDocument();
    await user.clear(emailInput);
    await user.type(emailInput, "good@email.com");
    expect(screen.queryByText(/valid email/)).not.toBeInTheDocument();
  });

  it("does not call onSubmit with invalid data", async () => {
    const user = userEvent.setup();
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    const form = screen.getByLabelText(/Full Name/).closest("form")!;
    await user.type(screen.getByLabelText(/Full Name/), "A");
    form.dispatchEvent(new Event("submit", { bubbles: true }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with valid data", async () => {
    const user = userEvent.setup();
    render(<QuoteContactForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Full Name/), "John Doe");
    await user.type(screen.getByLabelText(/Email Address/), "john@test.com");
    await user.type(screen.getByLabelText(/WhatsApp/), "+91 9876543210");
    const form = screen.getByLabelText(/Full Name/).closest("form")!;
    form.dispatchEvent(new Event("submit", { bubbles: true }));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName: "John Doe",
        email: "john@test.com",
        whatsapp: "+91 9876543210",
      })
    );
  });

  it("disables all fields when disabled prop is true", () => {
    render(<QuoteContactForm onSubmit={mockOnSubmit} disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});
