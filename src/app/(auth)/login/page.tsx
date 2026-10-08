import LoginForm from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-100 flex items-center justify-center text-xs text-muted-foreground">
          Loading...
        </div>
      }
    >
      <div className="w-full">
        <LoginForm />
      </div>
    </Suspense>
  );
}

