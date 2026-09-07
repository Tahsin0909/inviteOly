// navbar.constants.ts
import { IRole } from "@/features/user/user.interface";
import { IMenu } from "./navbar.interface";

// All available menu items (similar to sidebar structure)
export const ALL_NAVBAR_MENU_ITEMS: Record<string, IMenu> = {
  articles: {
    label: "Articles",
    href: "/article",
  },
  newsletters: {
    label: "Newsletters",
    href: "/newsletter",
  },
  polls: {
    label: "Polls",
    href: "/poll",
  },
  resources: {
    label: "Resources",
    children: [
      { label: "Drug Database", href: "/resources/drug-database" },
      { label: "Catalyst Calendar", href: "/resources/catalyst-calendar" },
    ],
  },
};

export const UNAUTHENTICATED_ITEMS: Record<string, IMenu> = {
  subscribe: {
    label: "Subscribe",
    children: [
      { label: "Free Plan", href: "/subscribe/free" },
      { label: "Premium Plan", href: "/subscribe/premium" },
    ],
  },
  login: {
    label: "Login",
    href: "/login",
  },
};

// Menu items for authenticated users in mobile view
export const AUTHENTICATED_MOBILE_ITEMS: Record<string, IMenu> = {
  myAccount: {
    label: "My Account",
    children: [
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
  "articles",
  "newsletters",
  "polls",
  "resources",
];

// Role-based menu configuration
export const ROLE_NAVBAR_MENU_CONFIG: Record<IRole, string[]> = {
  [IRole.ADMIN]: ["articles", "newsletters", "polls", "resources"],
  [IRole.USER]: ["articles", "newsletters", "polls", "resources"],
};
