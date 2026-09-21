// navbar.constants.ts
import { IRole } from "@/features/user/user.interface";
import { IMenu } from "./navbar.interface";

// All available menu items matching the InviteOly navigation
export const ALL_NAVBAR_MENU_ITEMS: Record<string, IMenu> = {
  howItWorks: {
    label: "How it Works",
    href: "/#how-it-works",
  },
  features: {
    label: "Features",
    href: "/#features",
  },
  faq: {
    label: "FAQ",
    href: "/faq",
  },
  pricing: {
    label: "Pricing",
    href: "/#pricing",
  },
  hosts: {
    label: "Hosts",
    href: "/hosts",
  },
  partners: {
    label: "Partners",
    href: "/partners",
  },
};

export const UNAUTHENTICATED_ITEMS: Record<string, IMenu> = {
  login: {
    label: "Sign in",
    href: "/login",
  },
  getStarted: {
    label: "Get Started",
    href: "/register",
  },
};

// Menu items for authenticated users in mobile view
export const AUTHENTICATED_MOBILE_ITEMS: Record<string, IMenu> = {
  myAccount: {
    label: "My Account",
    children: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/profile" },
      { label: "Billing", href: "/payment/manage" },
      { label: "Settings", href: "/settings" },
      { label: "Logout", isButton: true },
    ],
  },
};

// Common routes accessible by all authenticated users
export const COMMON_NAVBAR_ROUTES = [
  "/profile",
  "/settings",
  "/payment/manage",
  "/notifications",
];

// Public menu items (accessible without authentication)
export const PUBLIC_NAVBAR_ITEMS: string[] = [
  "howItWorks",
  "features",
  "pricing",
  "hosts",
  "partners",
];

// Role-based menu configuration
export const ROLE_NAVBAR_MENU_CONFIG: Record<IRole, string[]> = {
  [IRole.ADMIN]: ["howItWorks", "features", "pricing", "faq", "hosts", "partners"],
  [IRole.USER]: ["howItWorks", "features", "pricing", "faq", "hosts", "partners"],
  [IRole.HOST]: ["howItWorks", "features", "pricing", "faq", "hosts", "partners"],
  [IRole.PARTNER]: ["howItWorks", "features", "pricing", "faq", "hosts", "partners"],
};
