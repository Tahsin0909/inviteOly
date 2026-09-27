"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, LoginFormValues } from "../auth.schema";
import { DemoUserSwitcher } from "@/components/navbar/components/DemoUserSwitcher";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await handleLogin(values);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-foreground tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-work-sans">
          Login to your InviteOly account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-work-sans" noValidate>
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
              {...register("email")}
              className="w-full h-10 sm:h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 shadow-2xs"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-destructive mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary font-medium hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              {...register("password")}
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
          {errors.password && (
            <p className="text-[11px] text-destructive mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 mt-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Quick Demo Login Switcher */}
      <div className="mt-6 pt-5 border-t border-border/80">
        <div className="bg-card/70 border border-border rounded-2xl p-2 shadow-2xs">
          <DemoUserSwitcher />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-6 text-center font-work-sans">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline transition-colors ml-1"
          >
            Create account
          </Link>
        </p>

        <p className="mt-4 text-[11px] text-muted-foreground/80 leading-relaxed max-w-xs mx-auto">
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