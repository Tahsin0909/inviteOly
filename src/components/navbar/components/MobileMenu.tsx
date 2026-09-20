"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CrownIcon from "@/assets/navbar/crown.svg";
import {
  ChevronDown,
  Menu,
  LayoutDashboard,
  User,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IRole } from "@/features/user/user.interface";
import { getRoleRedirectPath } from "@/utils/roleRedirect";
import { useNavbarMenu } from "../hooks/use-navbar-menu";
import { Logo } from "./Logo";
import { NavbarAuthButtons } from "./SignUpButton";
import { DemoUserSwitcher } from "./DemoUserSwitcher";

export const MobileMenu = () => {
  const { user, profile, isLoading, isAuthenticated, token, handleLogout } =
    useAuth();
  const { mobileMenu } = useNavbarMenu();
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const currentUser = profile || user;
  const firstName = currentUser?.firstName || "My";
  const lastName = currentUser?.lastName || "Account";
  const initials = `${firstName[0] || "U"}${lastName !== "Account" ? lastName[0] || "" : ""
    }`.toUpperCase();

  const isReferredHost = Boolean(
    currentUser?.role === IRole.HOST &&
    (currentUser?.referredBy || currentUser?.referredByHostId)
  );

  const roleName = isReferredHost
    ? "Referred Host"
    : currentUser?.role || "USER";

  const dashboardUrl = getRoleRedirectPath(
    currentUser?.role,
    currentUser?.hasActiveSubscription
  );

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const onLogout = () => {
    handleLogout();
    setOpen(false);
  };

  // Filter out redundant auth items from generic menu since we have dedicated sections
  const primaryNavItems = mobileMenu.filter(
    (item) =>
      item?.label !== "My Account" &&
      item?.label !== "Sign in" &&
      item?.label !== "Subscribe"
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden p-0 h-9 w-9 text-white hover:text-white hover:bg-neutral-800 rounded-full"
        >
          <Menu className="!h-6 !w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] sm:w-[380px] bg-neutral-900 border-r border-neutral-800 text-white flex flex-col p-0 font-work-sans"
      >
        {/* Header with Logo */}
        <SheetHeader className="p-4 sm:p-5 border-b border-neutral-800/80">
          <SheetTitle>
            <Link href="/" onClick={handleLinkClick} className="inline-flex outline-none">
              <Logo />
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* User Account / Switcher Section */}
          {!isLoading && isAuthenticated && token ? (
            <div className="space-y-3">
              {/* User Profile Card */}
              <div className="p-3 rounded-xl bg-neutral-800/70 border border-neutral-700/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <Avatar className="text-secondary w-10 h-10 border border-[#B89047]/30">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate">
                      {currentUser?.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      {isReferredHost ? (
                        <span className="text-[10px] font-semibold tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="size-2.5" />
                          Referred
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/15 border border-primary/30 px-2 py-0.5 rounded-full">
                          {roleName}
                        </span>
                      )}
                      {currentUser?.hasActiveSubscription && (
                        <Badge
                          variant="outline"
                          className="border-primary text-[10px] text-primary bg-primary/10 py-0.5 px-2 leading-[1em] gap-1"
                        >
                          <Image
                            src={CrownIcon}
                            width={10}
                            height={10}
                            alt="Crown Icon"
                            className="object-contain"
                          />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Account Links */}
                <div className="mt-3 pt-2.5 border-t border-neutral-700/50 grid grid-cols-3 gap-1 text-center">
                  <Link
                    href={dashboardUrl}
                    onClick={handleLinkClick}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-[11px] text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-colors"
                  >
                    <LayoutDashboard className="size-3.5 text-primary" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-[11px] text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-colors"
                  >
                    <User className="size-3.5 text-neutral-400" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/#pricing"
                    onClick={handleLinkClick}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-[11px] text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-colors"
                  >
                    <CreditCard className="size-3.5 text-neutral-400" />
                    <span>Pricing</span>
                  </Link>
                </div>
              </div>

              {/* Collapsible Account Switcher */}
              <Collapsible defaultOpen={true} className="w-full">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer border border-neutral-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-3.5 text-[#E5C170]" />
                      <span>Account Switcher</span>
                    </div>
                    <ChevronDown className="size-3.5 text-neutral-400" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="bg-neutral-950/80 rounded-xl border border-neutral-800/80 p-1">
                    <DemoUserSwitcher onSelectUser={() => setOpen(false)} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            /* Unauthenticated View with Auth Buttons + Demo Switcher */
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex flex-col gap-2">
                <p className="text-xs text-neutral-400">Join InviteOnly to manage luxury guest lists & RSVPs</p>
                <NavbarAuthButtons onItemClick={handleLinkClick} className="w-full justify-center" />
              </div>

              {/* Demo Switcher for Unauthenticated Users */}
              <Collapsible defaultOpen={true} className="w-full">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer border border-neutral-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-3.5 text-[#E5C170]" />
                      <span>Demo Account Switcher</span>
                    </div>
                    <ChevronDown className="size-3.5 text-neutral-400" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="bg-neutral-950/80 rounded-xl border border-neutral-800/80 p-1">
                    <DemoUserSwitcher onSelectUser={() => setOpen(false)} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Navigation Links */}
          <div className="pt-2 border-t border-neutral-800/80 space-y-1">
            <p className="px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Navigation
            </p>
            {primaryNavItems.map((item) => (
              <div key={item?.label}>
                {item?.children ? (
                  <Collapsible
                    open={openItems.includes(item.label)}
                    onOpenChange={() => toggleItem(item.label)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full text-sm justify-between h-auto !px-3 py-2 font-medium text-left text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-lg"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(item.label) ? "rotate-180" : ""
                            }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-0.5">
                      {item.children.map((child) =>
                        child.isButton ? (
                          <button
                            key={child.label}
                            onClick={onLogout}
                            className="block w-full text-left py-2 px-3 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            {child.label}
                          </button>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href || "/"}
                            onClick={handleLinkClick}
                            className="block py-2 px-3 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={item?.href || "/"}
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    {item?.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Log Out Button for Authenticated Users */}
          {isAuthenticated && token && (
            <div className="pt-2 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors cursor-pointer"
              >
                <LogOut className="size-4 text-red-400" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>

        <SheetDescription className="sr-only">
          InviteOnly Mobile Menu & Account Switcher
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
