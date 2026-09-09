import { z } from "zod";

export const MetricsSchema = z.object({});

export type MetricsSchemaType = z.infer<typeof MetricsSchema>;
