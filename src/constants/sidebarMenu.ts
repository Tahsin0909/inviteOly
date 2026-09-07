import { IRole } from "@/features/user/user.interface";
import { SidebarMenuItem } from "@/types/sidebar";
import {
  CalendarClock,
  CircleDollarSign,
  LayoutDashboard,
  LayoutList,
  ListTodo,
  Users,
} from "lucide-react";

export const ALL_MENU_ITEMS: Record<string, SidebarMenuItem> = {
  dashboard: {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  articles: {
    title: "Articles",
    icon: LayoutList,
    url: "#",
    items: [
      { title: "All Articles", url: "/articles" },
      { title: "All Categories", url: "/articles/categories" },
      { title: "Add New", url: "/articles/create" },
    ],
  },
  polls: {
    title: "Polls",
    icon: ListTodo,
    url: "#",
    items: [
      { title: "All Polls", url: "/polls" },
      { title: "All Categories", url: "/polls/categories" },
      { title: "Add New", url: "/polls/create" },
    ],
  },
  subscriptions: {
    title: "Subscriptions",
    icon: CalendarClock,
    url: "#",
    items: [
      { title: "All Subscriptions", url: "/subscriptions" },
      { title: "Add New", url: "/subscriptions/create" },
    ],
  },
  payments: {
    title: "Payments",
    icon: CircleDollarSign,
    url: "#",
    items: [{ title: "All Payments", url: "/payments" }],
  },
  users: {
    title: "Users",
    icon: Users,
    url: "#",
    items: [{ title: "All Users", url: "/users" }],
  },
};

export const COMMON_ROUTES = [
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
];

export const ROLE_MENU_CONFIG: Record<IRole, string[]> = {
  [IRole.ADMIN]: [
    "dashboard",
    "articles",
    "polls",
    "subscriptions",
    "payments",
    "users",
  ],
  [IRole.USER]: [
    "dashboard",
    "articles",
    "polls",
    "subscriptions",
    "payments",
    "users",
  ],
};
