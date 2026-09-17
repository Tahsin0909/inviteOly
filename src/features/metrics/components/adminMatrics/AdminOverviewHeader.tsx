"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import React from "react";

interface AdminOverviewHeaderProps {
  welcomeName?: string;
  subtitle?: string;
  className?: string;
}

export const AdminOverviewHeader: React.FC<AdminOverviewHeaderProps> = ({
  welcomeName,
  subtitle,
  className,
}) => {
  const { user, profile } = useAuth();
  const currentUser = profile || user;

  const displayName =
    welcomeName || currentUser?.firstName || "Shaima";
  const displaySubtitle =
    subtitle ||
    "Monitor, manage, and oversee your entire platform from one place.";

  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
        Welcome Back, {displayName}
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 font-work-sans leading-relaxed">
        {displaySubtitle}
      </p>
    </div>
  );
};

export default AdminOverviewHeader;

