import { IRole } from "@/features/user/user.interface";
import { SidebarMenuItem } from "@/types/sidebar";
import {
  Award,
  Building2,
  CalendarDays,
  Clock,
  CreditCard,
  Download,
  GraduationCap,
  Handshake,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Megaphone,
  Package,
  Receipt,
  Settings,
  TicketPercent,
  UserPlus,
  Users,
} from "lucide-react";

// Admin Sidebar Items ("Overview is the admin side")
export const ADMIN_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Overview",
    icon: LayoutGrid,
    url: "/admin",
  },
  {
    title: "Events Management",
    icon: CalendarDays,
    url: "/admin/events",
  },
  {
    title: "User Management",
    icon: Users,
    url: "/admin/users",
  },
  {
    title: "Packages & Pricing",
    icon: Package,
    url: "/admin/packages",
  },
  {
    title: "Event Orders",
    icon: Receipt,
    url: "/admin/event-orders",
  },
  {
    title: "Partner Management",
    icon: Handshake,
    url: "/admin/partners",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    url: "/admin/marketing",
  },
  {
    title: "Promotional Codes",
    icon: TicketPercent,
    url: "/admin/promos",
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "/admin/payments",
  },
  {
    title: "Partner Rewards",
    icon: Award,
    url: "/admin/partner-rewards",
  },
];

// Host Sidebar Items ("Host Dashboard")
export const HOST_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    url: "/host",
  },
  {
    title: "Events Management",
    icon: CalendarDays,
    url: "/host/events",
  },
  {
    title: "Payment Pending",
    icon: Clock,
    url: "/host/payment-pending",
  },
];

// Partner Sidebar Items ("Partner Dashboard")
export const PARTNER_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    url: "/partner",
  },
  {
    title: "Invite a Host",
    icon: UserPlus,
    url: "/partner/invite-host",
  },
  {
    title: "Events Management",
    icon: CalendarDays,
    url: "/partner/events",
  },
  {
    title: "Venue Management",
    icon: Building2,
    url: "/partner/venues",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    url: "/partner/marketing",
  },
  {
    title: "Partner Rewards",
    icon: Award,
    url: "/partner/rewards",
  },
  {
    title: "Training",
    icon: GraduationCap,
    url: "/partner/training",
  },
];

// User Sidebar Items (forces payment)
export const USER_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    url: "/user",
  },
  {
    title: "Choose Pricing Plan",
    icon: CreditCard,
    url: "/#pricing",
  },
];

export const WHATSAPP_SUPPORT_URL =
  "https://wa.me/15550192834?text=Hello!%20I%20would%20like%20to%20inquire%20about%20hosting%20an%20invite-only%20event%20with%20InviteOly.";

// Universal Account Items (shown in all sidebars)
export const ACCOUNT_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Download App APK",
    icon: Download,
    url: "https://drive.google.com/file/d/1IMJKb64oJksxEEd1Jh-a3KiQYLY6EOf5/view",
    external: true,
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    url: WHATSAPP_SUPPORT_URL,
    external: true,
  },
  {
    title: "Logout",
    icon: LogOut,
    url: "#logout",
    isAction: true,
  },
];

export const ROLE_SIDEBAR_MENU: Record<IRole, SidebarMenuItem[]> = {
  [IRole.ADMIN]: ADMIN_MENU_ITEMS,
  [IRole.HOST]: HOST_MENU_ITEMS,
  [IRole.PARTNER]: PARTNER_MENU_ITEMS,
  [IRole.USER]: USER_MENU_ITEMS,
};

export const COMMON_ROUTES = [
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
  "/support",
  "/download-app",
];


