"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ACCOUNT_MENU_ITEMS,
  ROLE_SIDEBAR_MENU,
} from "@/constants/sidebarMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IRole } from "@/features/user/user.interface";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, profile, handleLogout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const currentUser = profile || user;

  // Determine current active role from pathname or authenticated user profile
  let activeRole: IRole = IRole.HOST;
  if (pathname.startsWith("/admin")) {
    activeRole = IRole.ADMIN;
  } else if (pathname.startsWith("/host")) {
    activeRole = IRole.HOST;
  } else if (pathname.startsWith("/partner")) {
    activeRole = IRole.PARTNER;
  } else if (pathname.startsWith("/user")) {
    activeRole = IRole.USER;
  } else if (currentUser?.role) {
    activeRole = currentUser.role;
  }

  const generalMenuItems = ROLE_SIDEBAR_MENU[activeRole] || ROLE_SIDEBAR_MENU[IRole.HOST];

  const checkIsActive = (url: string) => {
    if (url === pathname) return true;
    // For non-root dashboard items, match prefix
    if (
      url !== "/admin" &&
      url !== "/host" &&
      url !== "/partner" &&
      url !== "/user" &&
      url !== "/" &&
      pathname.startsWith(url)
    ) {
      return true;
    }
    return false;
  };

  const displayName = currentUser
    ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() || "User"
    : "Shadcn";
  const displayEmail = currentUser?.email || "m@example.com";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "IO";

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-r border-neutral-200/80 bg-white font-work-sans">
      {/* Sidebar Header with Brand Logo */}
      <SidebarHeader className="p-3 sm:p-4 border-b border-neutral-100">
        <Link
          href="/"
          className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-neutral-50 transition-colors group/brand cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            {/* Brand Name */}
            <span className="font-space-grotesk font-bold text-3xl text-neutral-900 tracking-tight leading-none">
              Invite<span className="text-primary">O</span>ly
            </span>
          </div>

          <ChevronsUpDown className="size-4 text-neutral-400 group-hover/brand:text-neutral-600 transition-colors shrink-0" />
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-2 sm:px-3 py-3 flex-1 flex flex-col">
        {/* GENERAL SECTION */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            GENERAL
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {generalMenuItems.map((item) => {
                const isActive = checkIsActive(item.url);
                const IconComponent = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group/menu-btn h-10 px-3.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-3 cursor-pointer",
                        isActive
                          ? "bg-[#FAF5EB] text-primary hover:bg-[#FAF5EB] hover:text-primary font-semibold shadow-xs"
                          : "text-neutral-700 hover:bg-[#FAF5EB]/50 hover:text-primary"
                      )}
                    >
                      <Link href={item.url} onClick={closeSidebarOnMobile}>
                        <IconComponent
                          className={cn(
                            "size-[18px] shrink-0 transition-colors",
                            isActive
                              ? "text-primary stroke-[2.2]"
                              : "text-neutral-500 group-hover/menu-btn:text-primary stroke-[1.8]"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ACCOUNT SECTION - Positioned at the bottom side */}
        <SidebarGroup className="p-0 pt-6 mt-auto">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            ACCOUNT
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {ACCOUNT_MENU_ITEMS.map((item) => {
                const isActive = !item.isAction && checkIsActive(item.url);
                const IconComponent = item.icon;

                if (item.isAction) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => {
                          closeSidebarOnMobile();
                          handleLogout();
                        }}
                        className="group/menu-btn h-10 px-3.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-3 text-neutral-700 hover:bg-red-50 hover:text-red-600 cursor-pointer w-full text-left"
                      >
                        <IconComponent className="size-[18px] shrink-0 text-neutral-500 group-hover/menu-btn:text-red-600 transition-colors stroke-[1.8]" />
                        <span className="truncate">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group/menu-btn h-10 px-3.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-3 cursor-pointer",
                        isActive
                          ? "bg-[#FAF5EB] text-primary hover:bg-[#FAF5EB] hover:text-primary font-semibold shadow-xs"
                          : "text-neutral-700 hover:bg-[#FAF5EB]/50 hover:text-primary"
                      )}
                    >
                      <Link href={item.url} onClick={closeSidebarOnMobile}>
                        <IconComponent
                          className={cn(
                            "size-[18px] shrink-0 transition-colors",
                            isActive
                              ? "text-primary stroke-[2.2]"
                              : "text-neutral-500 group-hover/menu-btn:text-primary stroke-[1.8]"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with User Profile */}
      <SidebarFooter className="p-3 sm:p-4 border-t border-neutral-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors group/footer cursor-pointer">
          <Avatar className="size-9 rounded-lg border border-neutral-200">
            <AvatarImage
              src={currentUser?.profileImage || "https://i.pravatar.cc/150?img=5"}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold font-space-grotesk text-neutral-900 truncate leading-snug">
              {displayName}
            </span>
            <span className="text-xs text-neutral-400 font-work-sans truncate">
              {displayEmail}
            </span>
          </div>

          <ChevronsUpDown className="size-4 text-neutral-400 group-hover/footer:text-neutral-600 transition-colors shrink-0" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

