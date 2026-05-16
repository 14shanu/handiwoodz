import { quoteFormSchema } from "./quote-form";

describe("quoteFormSchema", () => {
  const validData = {
    customerName: "John Doe",
    email: "john@example.com",
    whatsapp: "+91 98765 43210",
    country: "India",
    companyName: "Acme Corp",
    generalNotes: "Need by next month",
  };

  it("passes with valid complete data", () => {
    const result = quoteFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("passes with only required fields", () => {
    const result = quoteFormSchema.safeParse({
      customerName: "John",
      email: "john@example.com",
      whatsapp: "+911234567",
    });
    expect(result.success).toBe(true);
  });

  it("passes with empty optional fields", () => {
    const result = quoteFormSchema.safeParse({
      customerName: "John",
      email: "john@example.com",
      whatsapp: "+911234567",
      country: "",
      companyName: "",
      generalNotes: "",
    });
    expect(result.success).toBe(true);
  });

  describe("customerName", () => {
    it("fails when empty", () => {
      const result = quoteFormSchema.safeParse({ ...validData, customerName: "" });
      expect(result.success).toBe(false);
    });

    it("fails when too short", () => {
      const result = quoteFormSchema.safeParse({ ...validData, customerName: "A" });
      expect(result.success).toBe(false);
    });

    it("fails when too long", () => {
      const result = quoteFormSchema.safeParse({ ...validData, customerName: "A".repeat(101) });
      expect(result.success).toBe(false);
    });
  });

  describe("email", () => {
    it("fails with invalid email", () => {
      const result = quoteFormSchema.safeParse({ ...validData, email: "not-an-email" });
      expect(result.success).toBe(false);
    });

    it("fails when empty", () => {
      const result = quoteFormSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
    });

    it("passes with valid email formats", () => {
      const emails = ["test@test.com", "user.name@domain.co.uk", "a@b.io"];
      emails.forEach((email) => {
        const result = quoteFormSchema.safeParse({ ...validData, email });
        expect(result.success).toBe(true);
      });
    });
  });

  describe("whatsapp", () => {
    it("fails when empty", () => {
      const result = quoteFormSchema.safeParse({ ...validData, whatsapp: "" });
      expect(result.success).toBe(false);
    });

    it("fails when too short", () => {
      const result = quoteFormSchema.safeParse({ ...validData, whatsapp: "123" });
      expect(result.success).toBe(false);
    });

    it("fails with invalid characters", () => {
      const result = quoteFormSchema.safeParse({ ...validData, whatsapp: "abc123xyz" });
      expect(result.success).toBe(false);
    });

    it("passes with various valid formats", () => {
      const numbers = ["+91 98765 43210", "9876543210", "+1 (555) 123-4567", "+44-7911-123456"];
      numbers.forEach((whatsapp) => {
        const result = quoteFormSchema.safeParse({ ...validData, whatsapp });
        expect(result.success).toBe(true);
      });
    });
  });

  describe("optional fields", () => {
    it("passes without country", () => {
      const { country, ...rest } = validData;
      void country;
      const result = quoteFormSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });

    it("passes without companyName", () => {
      const { companyName, ...rest } = validData;
      void companyName;
      const result = quoteFormSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });

    it("passes without generalNotes", () => {
      const { generalNotes, ...rest } = validData;
      void generalNotes;
      const result = quoteFormSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });
  });
});
