import { z } from "zod";

export const quoteFormSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  whatsapp: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  country: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  companyName: z
    .string()
    .max(200)
    .optional()
    .or(z.literal("")),
  generalNotes: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal("")),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
