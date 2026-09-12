import { z } from "zod";

export const hostInviteSchema = z.object({
  hostName: z.string().trim().min(2, "Host or client name is required"),
  hostEmail: z.string().trim().email("Please enter a valid email address"),
  hostPhone: z.string().trim().optional().or(z.literal("")),
  venueId: z.string().min(1, "Please select a venue"),
  room: z.string().min(1, "Please select a room"),
  eventDate: z.string().min(1, "Event date is required"),
  endDate: z.string().optional().or(z.literal("")),
  eventName: z.string().optional().or(z.literal("")),
});

export type HostInviteFormValues = z.infer<typeof hostInviteSchema>;
