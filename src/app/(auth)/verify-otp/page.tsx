import React, { Suspense } from "react";
import OtpStep from "@/features/auth/components/OtpStep";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-sm mx-auto py-12 text-center text-xs text-muted-foreground">
          Loading verification...
        </div>
      }
    >
      <OtpStep />
    </Suspense>
  );
}

