"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function OtpStep() {
  const searchParams = useSearchParams();
  const urlEmail = searchParams.get("email");
  const urlFlow = searchParams.get("flow") as
    | "register"
    | "forgot-password"
    | "login"
    | null;

  const {
    pendingEmail,
    pendingFlow,
    handleVerifyOtp,
    handleResendOtp,
    isLoading,
  } = useAuth();

  const activeEmail = urlEmail || pendingEmail || "";
  const activeFlow = urlFlow || pendingFlow || "register";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter()
  // Countdown for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    // Only accept numeric input
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const updated = [...digits];
      updated[index] = "";
      setDigits(updated);
      return;
    }

    // Handle single character
    const char = cleaned.slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto advance to next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle clipboard paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    // Focus on the next empty or last input
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const isComplete = digits.every((d) => d.length === 1);
  const otpCode = digits.join("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    await handleVerifyOtp({
      email: activeEmail,
      otp: otpCode,
      type: activeFlow,
    });
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isLoading) return;
    await handleResendOtp();
    setResendTimer(60);
  };

  return (
    <div className="w-full max-w-sm mx-auto py-8 font-work-sans" data-testid="otp-container" aria-label="OTP verification container">
      <form onSubmit={handleSubmit} noValidate aria-label="OTP verification form" data-testid="otp-form">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold font-space-grotesk text-foreground mb-4">
          Verification Code
        </h1>

        {/* 6 Digit Input Boxes */}
        <div className="flex items-center justify-between gap-2 sm:gap-2.5 my-2">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              id={`otp-input-${idx}`}
              data-testid={`otp-input-${idx}`}
              aria-label={`Digit ${idx + 1} of 6`}
              type="text"
              inputMode="numeric"
              autoComplete={idx === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              autoFocus={idx === 0}
              className="size-11 sm:size-12 rounded-xl border border-input bg-card text-foreground text-center text-lg sm:text-xl font-bold shadow-2xs transition-colors focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 selection:bg-primary/20"
            />
          ))}
        </div>

        {/* Subtitle description */}
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-testid="otp-instructions">
          Enter the 6-digit code sent to your{" "}
          {activeEmail ? (
            <span className="text-foreground font-medium" data-testid="otp-email">{activeEmail}</span>
          ) : (
            "email"
          )}
          .
        </p>

        {/* Verify Button */}
        <button
          type="submit"
          data-testid="otp-submit-button"
          disabled={!isComplete || isLoading}
          className="w-full h-11 mt-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend Link */}
        <div className="mt-5 text-center">
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              data-testid="otp-resend-button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isLoading}
              className="text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors ml-1"
            >
              {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}