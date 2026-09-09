import { z } from "zod";

export const MarketingSchema = z.object({});

export type MarketingSchemaType = z.infer<typeof MarketingSchema>;
