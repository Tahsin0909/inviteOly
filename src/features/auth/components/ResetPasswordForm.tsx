"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { resetPasswordSchema, ResetPasswordFormValues } from "../auth.schema";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";
  const otpParam = searchParams?.get("otp") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleResetPassword, pendingEmail, isLoading } = useAuth();
  const activeEmail = emailParam || pendingEmail || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    await handleResetPassword({
      email: activeEmail,
      otp: otpParam,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto py-8" data-testid="reset-password-container" aria-label="Reset password container">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-foreground tracking-tight">
          Set New Password
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-work-sans max-w-xs mx-auto leading-relaxed">
          Create a strong password that is at least 6 characters long.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 font-work-sans"
        noValidate
        aria-label="Reset password form"
        data-testid="reset-password-form"
      >
        {/* New Password */}
        <div>
          <label htmlFor="reset-new-password" className="block text-xs font-medium text-foreground mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
            <input
              id="reset-new-password"
              type={showPassword ? "text" : "password"}
              placeholder="enter new password"
              autoComplete="new-password"
              data-testid="reset-new-password-input"
              {...register("password")}
              className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            <button
              type="button"
              data-testid="toggle-new-password"
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
          {errors.password && (
            <p role="alert" data-testid="reset-new-password-error" className="text-[11px] text-destructive mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="reset-confirm-password" className="block text-xs font-medium text-foreground mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="re-enter password"
              autoComplete="new-password"
              data-testid="reset-confirm-password-input"
              {...register("confirmPassword")}
              className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
            <button
              type="button"
              data-testid="toggle-confirm-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground cursor-pointer transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p role="alert" data-testid="reset-confirm-password-error" className="text-[11px] text-destructive mt-1 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="reset-password-submit-button"
          disabled={isLoading}
          className="w-full h-11 mt-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          {isLoading ? "Saving..." : "Set Password"}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 text-center font-work-sans">
        <p className="text-xs text-muted-foreground">
          Back to{" "}
          <Link
            href="/login"
            data-testid="back-to-login-link"
            className="text-primary font-medium hover:underline transition-colors ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

