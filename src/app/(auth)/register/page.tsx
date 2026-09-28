import RegisterForm from "@/features/auth/components/RegisterForm";
import React, { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs text-muted-foreground">Loading...</div>}>
      <div className="w-full">
        <RegisterForm />
      </div>
    </Suspense>
  );
}

