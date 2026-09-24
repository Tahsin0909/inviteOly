"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const currentUser = profile || user;

  // Generate readable title from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const mainSection = pathSegments[0] || "dashboard";
  const subSection = pathSegments[1];

  const formatTitle = (str: string) => {
    if (str === "r-create-events") {
      return "Create Event";
    }
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = subSection
    ? formatTitle(subSection)
    : mainSection === "admin"
      ? "Overview"
      : `${formatTitle(mainSection)} Dashboard`;

  return (
    <header className="h-16 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-work-sans">
      <div className="flex items-center gap-3">
        {/* Mobile & Desktop Sidebar Trigger */}
        <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-neutral-100 text-neutral-700 cursor-pointer" />

        {/* Separator */}
        <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

        {/* Breadcrumbs / Page Title */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1.5"
            title="Website Home"
          >
            <Home className="size-3.5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <ChevronRight className="size-3.5 text-neutral-400" />

          <span className="font-semibold text-neutral-900 font-space-grotesk truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>
      </div>

      {/* Right Header Status / Role Badge */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-[#FAF5EB] border border-primary/20 px-2.5 py-1 rounded-full">
          {currentUser?.role || "GUEST"}
        </span>

        <Link
          href="/"
          className="text-xs font-medium text-neutral-500 hover:text-primary transition-colors hidden sm:block"
        >
          Back to Website
        </Link>
      </div>
    </header>
  );
}

