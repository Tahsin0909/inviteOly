"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "../auth.schema";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const { handleForgotPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await handleForgotPassword(values);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8" data-testid="forgot-password-container" aria-label="Forgot password container">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-foreground tracking-tight">
          Forgot Password?
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-work-sans max-w-xs mx-auto leading-relaxed">
          Enter your registered email and we&apos;ll send you a 6-digit verification code to reset your password.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 font-work-sans"
        noValidate
        aria-label="Forgot password form"
        data-testid="forgot-password-form"
      >
        {/* Email */}
        <div>
          <label htmlFor="forgot-email" className="block text-xs font-medium text-foreground mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
            <input
              id="forgot-email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              data-testid="forgot-email-input"
              {...register("email")}
              className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>
          {errors.email && (
            <p role="alert" data-testid="forgot-email-error" className="text-[11px] text-destructive mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="forgot-password-submit-button"
          disabled={isLoading}
          className="w-full h-11 mt-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          {isLoading ? "Sending code..." : "Send Verification Code"}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 text-center font-work-sans">
        <p className="text-xs text-muted-foreground">
          Remember your password?{" "}
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

