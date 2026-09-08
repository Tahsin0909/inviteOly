"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User, ChevronDown } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import {
  hostRegisterSchema,
  partnerRegisterSchema,
  HostRegisterFormValues,
  PartnerRegisterFormValues,
} from "../auth.schema";
import { TAuthRole, TPartnerType } from "../auth.interface";

const PARTNER_OPTIONS: TPartnerType[] = [
  "Venue",
  "Catering",
  "Photography",
  "DJ / Entertainment",
  "Decor & Floral",
  "Planner / Coordinator",
  "Other",
];

export default function RegisterForm() {
  const [role, setRole] = useState<TAuthRole>("HOST");
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
    <div className="w-full max-w-md mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-foreground tracking-tight">
          Create Your Account
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-work-sans leading-relaxed max-w-xs mx-auto">
          Join InviteOnly and simplify your event planning experience.
        </p>
      </div>

      {role === "HOST" ? (
        /* HOST FORM */
        <form
          onSubmit={hostForm.handleSubmit(onHostSubmit)}
          className="space-y-4 font-work-sans"
          noValidate
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="First name"
                  {...hostForm.register("firstName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {hostForm.formState.errors.firstName && (
                <p className="text-[11px] text-destructive mt-1 font-medium">
                  {hostForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="Last name"
                  {...hostForm.register("lastName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {hostForm.formState.errors.lastName && (
                <p className="text-[11px] text-destructive mt-1 font-medium">
                  {hostForm.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Select Your role */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Select Your role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TAuthRole)}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                <option value="HOST">I&apos;m a Host</option>
                <option value="PARTNER">I&apos;m a Partner</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                type="email"
                placeholder="name@example.com"
                {...hostForm.register("email")}
                className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
            </div>
            {hostForm.formState.errors.email && (
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {hostForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                {...hostForm.register("password")}
                className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
              <button
                type="button"
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
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {hostForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
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
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="First name"
                  {...partnerForm.register("firstName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {partnerForm.formState.errors.firstName && (
                <p className="text-[11px] text-destructive mt-1 font-medium">
                  {partnerForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="Last name"
                  {...partnerForm.register("lastName")}
                  className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
                />
              </div>
              {partnerForm.formState.errors.lastName && (
                <p className="text-[11px] text-destructive mt-1 font-medium">
                  {partnerForm.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Select Your Role */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Select Your Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TAuthRole)}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                <option value="HOST">I&apos;m a Host</option>
                <option value="PARTNER">I&apos;m a Partner</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
          </div>

          {/* Partner Type */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Partner Type
            </label>
            <div className="relative">
              <select
                {...partnerForm.register("partnerType")}
                className="w-full h-10 sm:h-11 px-3.5 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs appearance-none cursor-pointer"
              >
                {PARTNER_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
            </div>
            {partnerForm.formState.errors.partnerType && (
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.partnerType.message}
              </p>
            )}
          </div>

          {/* Business / Organization Name */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Business / Organization Name
            </label>
            <input
              type="text"
              placeholder="e.g. Inviteoly Event Management"
              {...partnerForm.register("businessName")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.businessName && (
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.businessName.message}
              </p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Business email
            </label>
            <input
              type="email"
              placeholder="you@business.com"
              {...partnerForm.register("businessEmail")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.businessEmail && (
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.businessEmail.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(555) 555-5555"
              {...partnerForm.register("phone")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            {partnerForm.formState.errors.phone && (
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Website or social media (optional) */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Website or social media (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. www.invitoly.com"
              {...partnerForm.register("website")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>

          {/* Business Address (optional) */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Business Address (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 123 East St, San Francisco Ca 94112"
              {...partnerForm.register("businessAddress")}
              className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                {...partnerForm.register("password")}
                className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
              />
              <button
                type="button"
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
              <p className="text-[11px] text-destructive mt-1 font-medium">
                {partnerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
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