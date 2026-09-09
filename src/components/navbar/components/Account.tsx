"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRoleRedirectPath } from "@/utils/roleRedirect";
import { ChevronDown, CreditCard, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";

export const Account = () => {
  const { user, profile, handleLogout } = useAuth();

  const currentUser = profile || user;
  const firstName = currentUser?.firstName || "My";
  const lastName = currentUser?.lastName || "Account";
  const roleName = currentUser?.role || "USER";

  const initials = `${firstName[0] || "U"}${lastName !== "Account" ? lastName[0] || "" : ""
    }`.toUpperCase();

  const dashboardUrl = getRoleRedirectPath(
    currentUser?.role,
    currentUser?.hasActiveSubscription
  );

  const onLogout = () => {
    handleLogout();
  };

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 sm:gap-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700/80 hover:border-primary/60 rounded-full pl-2 pr-3.5 py-1.5 transition-all duration-200 outline-none cursor-pointer group shadow-xs">
          {/* User Initial Circle */}
          <div className="size-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            {initials}
          </div>

          {/* User Name */}
          <span className="text-xs sm:text-sm font-medium font-work-sans text-neutral-200 group-hover:text-white max-w-[110px] truncate">
            {currentUser?.firstName || "Account"}
          </span>

          {/* Role Badge */}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded-full leading-none">
            {roleName}
          </span>

          {/* Chevron */}
          <ChevronDown className="size-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 shrink-0" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 bg-neutral-900/95 border border-neutral-800 text-white p-2 rounded-2xl shadow-xl z-50 backdrop-blur-md font-work-sans"
          align="end"
        >
          {/* User Info Header */}
          <div className="px-3 py-2.5 mb-1.5 rounded-xl bg-neutral-800/60 border border-neutral-700/50">
            <p className="text-[11px] text-neutral-400 font-normal">Signed in as</p>
            <p className="text-sm font-semibold text-white truncate mt-0.5">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className="text-xs text-neutral-400 truncate mt-0.5">
              {currentUser?.email || ""}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/15 border border-primary/30 px-2 py-0.5 rounded-full">
                {roleName}
              </span>
              {currentUser?.hasActiveSubscription && (
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>

          <DropdownMenuSeparator className="bg-neutral-800 my-1" />

          {/* Role Dashboard Link */}
          <DropdownMenuItem asChild>
            <Link
              href={dashboardUrl}
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <LayoutDashboard className="size-4 text-primary" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          {/* Profile Link */}
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <User className="size-4 text-neutral-400" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          {/* Billing / Pricing */}
          <DropdownMenuItem asChild>
            <Link
              href="/#pricing"
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <CreditCard className="size-4 text-neutral-400" />
              <span>Pricing & Plans</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-neutral-800 my-1" />

          {/* Log Out */}
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="size-4 text-red-400" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
