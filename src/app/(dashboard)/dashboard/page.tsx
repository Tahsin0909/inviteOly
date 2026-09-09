"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRoleRedirectPath } from "@/utils/roleRedirect";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirectPage() {
  const { user, profile, isAuthenticated, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !token) {
        router.replace("/login");
      } else {
        const currentUser = profile || user;
        const targetPath = getRoleRedirectPath(
          currentUser?.role,
          currentUser?.hasActiveSubscription
        );
        router.replace(targetPath);
      }
    }
  }, [isLoading, isAuthenticated, token, profile, user, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm font-work-sans text-muted-foreground">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}

