import { z } from "zod";

export const PromotionalCodesSchema = z.object({});

export type PromotionalCodesSchemaType = z.infer<typeof PromotionalCodesSchema>;
