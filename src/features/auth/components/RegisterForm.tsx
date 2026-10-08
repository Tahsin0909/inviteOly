"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TAuthRole, TPartnerType } from "../auth.interface";
import {
  HostRegisterFormValues,
  hostRegisterSchema,
  PartnerRegisterFormValues,
  partnerRegisterSchema,
} from "../auth.schema";
import { useAuth } from "../hooks/useAuth";

const PARTNER_OPTIONS: TPartnerType[] = [
  "Venue",
  "Catering",
  "Photography",
  "DJ / Entertainment",
  "Doctor and Floral",
  "Planner / coordinator",
  "Other",
];

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toUpperCase();
  const [role, setRole] = useState<TAuthRole>(
    roleParam === "PARTNER" ? "PARTNER" : "HOST"
  );
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister, isLoading } = useAuth();

  // Host form hook
  const hostForm = useForm<HostRegisterFormValues>({
    resolver: zodResolver(hostRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Partner form hook
  const partnerForm = useForm<PartnerRegisterFormValues>({
    resolver: zodResolver(partnerRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      partnerType: "Venue",
      businessName: "",
      businessEmail: "",
      phone: "",
      website: "",
      businessAddress: "",
      password: "",
    },
  });

  const handleRoleChange = (newRole: TAuthRole) => {
    if (newRole === role) return;
    setRole(newRole);
    if (newRole === "PARTNER") {
      const hostValues = hostForm.getValues();
      if (hostValues.firstName) partnerForm.setValue("firstName", hostValues.firstName);
      if (hostValues.lastName) partnerForm.setValue("lastName", hostValues.lastName);
      if (hostValues.email) partnerForm.setValue("businessEmail", hostValues.email);
      if (hostValues.password) partnerForm.setValue("password", hostValues.password);
    } else {
      const partnerValues = partnerForm.getValues();
      if (partnerValues.firstName) hostForm.setValue("firstName", partnerValues.firstName);
      if (partnerValues.lastName) hostForm.setValue("lastName", partnerValues.lastName);
      if (partnerValues.businessEmail) hostForm.setValue("email", partnerValues.businessEmail);
      if (partnerValues.password) hostForm.setValue("password", partnerValues.password);
    }
  };

  const onHostSubmit = async (values: HostRegisterFormValues) => {
    await handleRegister({
      ...values,
      role: "HOST",
    });
  };

  const onPartnerSubmit = async (values: PartnerRegisterFormValues) => {
    await handleRegister({
      ...values,
      role: "PARTNER",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto py-6" data-testid="register-container" aria-label="Register container">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-foreground tracking-tight">
          Create Your Account
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-work-sans leading-relaxed max-w-xs mx-auto">
          Join InviteOly and simplify your event planning experience.
        </p>
      </div>

      {role === "HOST" ? (
        /* HOST FORM */
        <form
          onSubmit={hostForm.handleSubmit(onHostSubmit)}
          className="space-y-4 font-work-sans"
          noValidate
          aria-label="Host registration form"
          data-testid="host-register-form"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="host-first-name" className="block text-xs font-medium text-foreground mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  id="host-first-name"
                  type="text"
                  placeholder="First name"
                  autoComplete="given-name"
                  data-testid="host-first-name-input"
                  {...hostForm.register("firstName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {hostForm.formState.errors.firstName && (
                <p role="alert" data-testid="host-first-name-error" className="text-[11px] text-destructive mt-1 font-medium">
                  {hostForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="host-last-name" className="block text-xs font-medium text-foreground mb-1.5">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  id="host-last-name"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  data-testid="host-last-name-input"
                  {...hostForm.register("lastName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {hostForm.formState.errors.lastName && (
                <p role="alert" data-testid="host-last-name-error" className="text-[11px] text-destructive mt-1 font-medium">
                  {hostForm.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Select Your role */}
          <div>
            <label htmlFor="host-role-select" className="block text-xs font-medium text-foreground mb-1.5">
              Select Your role
            </label>
            <div className="relative">
              <select
                id="host-role-select"
                data-testid="role-select"
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as TAuthRole)}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                <option value="HOST" className="bg-card text-foreground">I&apos;m a Host</option>
                <option value="PARTNER" className="bg-card text-foreground">I&apos;m a Partner</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="host-email" className="block text-xs font-medium text-foreground mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                id="host-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                data-testid="host-email-input"
                {...hostForm.register("email")}
                className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
            </div>
            {hostForm.formState.errors.email && (
              <p role="alert" data-testid="host-email-error" className="text-[11px] text-destructive mt-1 font-medium">
                {hostForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="host-password" className="block text-xs font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                id="host-password"
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                autoComplete="new-password"
                data-testid="host-password-input"
                {...hostForm.register("password")}
                className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
              <button
                type="button"
                data-testid="host-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground cursor-pointer transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {hostForm.formState.errors.password && (
              <p role="alert" data-testid="host-password-error" className="text-[11px] text-destructive mt-1 font-medium">
                {hostForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="host-submit-button"
            disabled={isLoading}
            className="w-full h-11 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      ) : (
        /* PARTNER FORM */
        <form
          onSubmit={partnerForm.handleSubmit(onPartnerSubmit)}
          className="space-y-4 font-work-sans"
          noValidate
          aria-label="Partner registration form"
          data-testid="partner-register-form"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="partner-first-name" className="block text-xs font-medium text-foreground mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  id="partner-first-name"
                  type="text"
                  placeholder="First name"
                  autoComplete="given-name"
                  data-testid="partner-first-name-input"
                  {...partnerForm.register("firstName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {partnerForm.formState.errors.firstName && (
                <p role="alert" data-testid="partner-first-name-error" className="text-[11px] text-destructive mt-1 font-medium">
                  {partnerForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="partner-last-name" className="block text-xs font-medium text-foreground mb-1.5">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  id="partner-last-name"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  data-testid="partner-last-name-input"
                  {...partnerForm.register("lastName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {partnerForm.formState.errors.lastName && (
                <p role="alert" data-testid="partner-last-name-error" className="text-[11px] text-destructive mt-1 font-medium">
                  {partnerForm.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Select Your Role */}
          <div>
            <label htmlFor="partner-role-select" className="block text-xs font-medium text-foreground mb-1.5">
              Select Your Role
            </label>
            <div className="relative">
              <select
                id="partner-role-select"
                data-testid="role-select"
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as TAuthRole)}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                <option value="HOST" className="bg-card text-foreground">I&apos;m a Host</option>
                <option value="PARTNER" className="bg-card text-foreground">I&apos;m a Partner</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
          </div>

          {/* Partner Type */}
          <div>
            <label htmlFor="partner-type" className="block text-xs font-medium text-foreground mb-1.5">
              Partner Type
            </label>
            <div className="relative">
              <select
                id="partner-type"
                data-testid="partner-type-select"
                {...partnerForm.register("partnerType")}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                {PARTNER_OPTIONS.map((item) => (
                  <option key={item} value={item} className="bg-card text-foreground">
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
            {partnerForm.formState.errors.partnerType && (
              <p role="alert" data-testid="partner-type-error" className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.partnerType.message}
              </p>
            )}
          </div>

          {/* Business / Organization Name */}
          <div>
            <label htmlFor="partner-business-name" className="block text-xs font-medium text-foreground mb-1.5">
              Business / Organization Name
            </label>
            <input
              id="partner-business-name"
              type="text"
              placeholder="e.g. Inviteoly Event Management"
              autoComplete="organization"
              data-testid="partner-business-name-input"
              {...partnerForm.register("businessName")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.businessName && (
              <p role="alert" data-testid="partner-business-name-error" className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.businessName.message}
              </p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label htmlFor="partner-business-email" className="block text-xs font-medium text-foreground mb-1.5">
              Business email
            </label>
            <input
              id="partner-business-email"
              type="email"
              placeholder="you@business.com"
              autoComplete="email"
              data-testid="partner-business-email-input"
              {...partnerForm.register("businessEmail")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.businessEmail && (
              <p role="alert" data-testid="partner-business-email-error" className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.businessEmail.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="partner-phone" className="block text-xs font-medium text-foreground mb-1.5">
              Phone Number
            </label>
            <input
              id="partner-phone"
              type="tel"
              placeholder="(555) 555-5555"
              autoComplete="tel"
              data-testid="partner-phone-input"
              {...partnerForm.register("phone")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.phone && (
              <p role="alert" data-testid="partner-phone-error" className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Website or social media (optional) */}
          <div>
            <label htmlFor="partner-website" className="block text-xs font-medium text-foreground mb-1.5">
              Website or social media (optional)
            </label>
            <input
              id="partner-website"
              type="text"
              placeholder="e.g. www.invitoly.com"
              autoComplete="url"
              data-testid="partner-website-input"
              {...partnerForm.register("website")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>

          {/* Business Address (optional) */}
          <div>
            <label htmlFor="partner-business-address" className="block text-xs font-medium text-foreground mb-1.5">
              Business Address (optional)
            </label>
            <input
              id="partner-business-address"
              type="text"
              placeholder="e.g. 123 East St, San Francisco Ca 94112"
              autoComplete="street-address"
              data-testid="partner-business-address-input"
              {...partnerForm.register("businessAddress")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="partner-password" className="block text-xs font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                id="partner-password"
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                autoComplete="new-password"
                data-testid="partner-password-input"
                {...partnerForm.register("password")}
                className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
              <button
                type="button"
                data-testid="partner-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground cursor-pointer transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {partnerForm.formState.errors.password && (
              <p role="alert" data-testid="partner-password-error" className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="partner-submit-button"
            disabled={isLoading}
            className="w-full h-11 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      )}

      {/* Footer Navigation */}
      <div className="mt-5 text-center font-work-sans">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            data-testid="login-link"
            className="text-primary font-medium hover:underline transition-colors ml-1"
          >
            Login
          </Link>
        </p>

        <p className="mt-3 text-[11px] text-muted-foreground/80 leading-relaxed max-w-xs mx-auto">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}