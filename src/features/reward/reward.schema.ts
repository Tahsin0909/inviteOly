import { z } from "zod";

export const RequestPayoutSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  method: z.enum(["Bank Transfer", "Stripe"]),
  accountDetails: z.string().min(3, "Account details are required"),
  notes: z.string().optional(),
});

export type RequestPayoutSchemaType = z.infer<typeof RequestPayoutSchema>;

export const UpdateCommissionSchema = z.object({
  commissionRate: z
    .number()
    .min(0, "Commission rate cannot be negative")
    .max(100, "Commission rate cannot exceed 100%"),
});

export type UpdateCommissionSchemaType = z.infer<typeof UpdateCommissionSchema>;
