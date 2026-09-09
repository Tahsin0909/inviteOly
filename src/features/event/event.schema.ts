import { z } from "zod";

export const EventSchema = z.object({});

export type EventSchemaType = z.infer<typeof EventSchema>;
