import React, { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-sm mx-auto py-12 text-center text-xs text-muted-foreground">
          Loading password reset...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}

