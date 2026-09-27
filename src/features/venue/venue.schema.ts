import { z } from "zod";

export const venueSpaceSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Room or space name is required"),
  capacity: z
    .number({ message: "Capacity must be a valid number" })
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1"),
  description: z.string().optional(),
});

export const venueCapacitySchema = z
  .union(
    [
      z
        .number({ message: "Capacity must be a valid number" })
        .int("Capacity must be an integer")
        .min(1, "Capacity must be at least 1"),
      z.nan(),
    ],
    {
      message: "Capacity must be a positive integer",
    }
  )
  .optional();

export const venueStep1Schema = z.object({
  name: z.string().trim().min(2, "Venue name must be at least 2 characters"),
  streetAddress: z.string().trim().min(3, "Street address is required"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State / Region is required"),
  zipCode: z.string().trim().optional(),
  capacity: venueCapacitySchema,
});

export const venueFormSchema = z.object({
  name: z.string().trim().min(2, "Venue name must be at least 2 characters"),
  streetAddress: z.string().trim().min(3, "Street address is required"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State / Region is required"),
  zipCode: z.string().trim().optional(),
  capacity: venueCapacitySchema,
  parkingInfo: z.string().optional(),
  spaces: z.array(venueSpaceSchema).optional(),
});

export type VenueSpaceFormValues = z.infer<typeof venueSpaceSchema>;
export type VenueStep1FormValues = z.infer<typeof venueStep1Schema>;
export type VenueFormValues = z.infer<typeof venueFormSchema>;

