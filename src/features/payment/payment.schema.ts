import { z } from "zod";

export const UploadPaymentReceiptSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  notes: z.string().optional(),
});

export type UploadPaymentReceiptSchemaType = z.infer<
  typeof UploadPaymentReceiptSchema
>;
