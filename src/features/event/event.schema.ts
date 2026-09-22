import { z } from "zod";

export const EventSchema = z.object({});
export type EventSchemaType = z.infer<typeof EventSchema>;

/**
 * Step 2: Event Details Validation Schema
 */
export const createEventDetailsSchema = z
  .object({
    hostName: z.string().min(1, "Host or client name is required"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    eventName: z.string().min(1, "Event name is required"),
    eventType: z.string().min(1, "Event type is required"),
    eventDate: z.string().min(1, "Event date is required"),
    endDate: z.string().min(1, "End date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    ageRestriction: z.string().optional(),
    idRequirement: z.string().optional(),
    dressCode: z.string().optional(),
    ticketRequirementAge: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.eventDate || !data.endDate) return true;
      return data.endDate >= data.eventDate;
    },
    {
      message: "Finish Date cannot be before Start Date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (
        !data.eventDate ||
        !data.endDate ||
        !data.startTime ||
        !data.endTime
      ) {
        return true;
      }
      // When the event starts and ends on the same day, end time must not be before start time
      if (data.eventDate === data.endDate) {
        return data.endTime >= data.startTime;
      }
      return true;
    },
    {
      message: "End Time cannot be before Start Time",
      path: ["endTime"],
    }
  );

export type TCreateEventDetailsSchema = z.infer<typeof createEventDetailsSchema>;

/**
 * Step 3: Event Settings Validation Schema
 */
export const createEventSettingsSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  room: z.string().optional(),
  address: z.string().min(1, "Full address is required"),
  state: z.string().min(1, "State is required"),
  venueState: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  venueContact: z.string().optional(),
  venueGuestCapacity: z.string().optional(),
  estimateGuestCount: z.string().optional(),
  ticketNote: z.string().optional(),
});

export type TCreateEventSettingsSchema = z.infer<
  typeof createEventSettingsSchema
>;
