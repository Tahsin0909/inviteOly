import { z } from "zod";

// --- Register: Host Schema ---
export const hostRegisterSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Register: Partner Schema ---
export const partnerRegisterSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  partnerType: z.string().min(1, "Please select a partner type"),
  businessName: z.string().trim().min(1, "Business / Organization name is required"),
  businessEmail: z.string().trim().email("Invalid business email address"),
  phone: z.string().trim().min(7, "Valid phone number is required"),
  website: z.string().trim().optional().or(z.literal("")),
  businessAddress: z.string().trim().optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Login Schema ---
export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// --- OTP Schema ---
export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "OTP must contain only numbers",
    }),
});

// --- Forgot Password Schema ---
export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

// --- Reset Password Schema ---
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// --- Legacy & General Schemas ---
export const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "OTP must contain only numbers",
    }),
});

export const emailSchema = authSchema.pick({
  email: true,
});

export type HostRegisterFormValues = z.infer<typeof hostRegisterSchema>;
export type PartnerRegisterFormValues = z.infer<typeof partnerRegisterSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type AuthFormValues = z.infer<typeof authSchema>;
export type EmailFormValues = z.infer<typeof emailSchema>;

