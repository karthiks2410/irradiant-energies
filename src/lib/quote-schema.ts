import { z } from "zod";

/**
 * Shared schema for the quote API and the calculator's contact form.
 * Server re-validates this on POST so the client can't bypass.
 */

export const PROPERTY_TYPES = ["home", "society", "commercial", "industrial"] as const;

export const quoteInputsSchema = z
  .object({
    propertyType: z.enum(PROPERTY_TYPES),
    pincode: z
      .string()
      .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit Indian pincode"),
    monthlyKwh: z.number().positive().optional(),
    monthlyBillRupees: z.number().positive().optional(),
  })
  .refine(
    (v) => v.monthlyKwh !== undefined || v.monthlyBillRupees !== undefined,
    { message: "Provide monthly bill or kWh" },
  );

export const quoteContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  whatsappOptIn: z.boolean().default(true),
  consent: z.literal(true, { message: "Consent is required" }),
});

export const quoteRequestSchema = z.object({
  inputs: quoteInputsSchema,
  contact: quoteContactSchema,
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type QuoteContact = z.infer<typeof quoteContactSchema>;
