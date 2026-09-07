// utils/navbar.ts
import { IRole } from "@/features/user/user.interface";
import {
  ALL_NAVBAR_MENU_ITEMS,
  AUTHENTICATED_MOBILE_ITEMS,
  PUBLIC_NAVBAR_ITEMS,
  ROLE_NAVBAR_MENU_CONFIG,
  UNAUTHENTICATED_ITEMS,
} from "./navbar.constants";
import { IMenu } from "./navbar.interface";

export const getNavbarMenu = (
  role: IRole | null,
  isAuthenticated: boolean
): {
  desktopMenu: IMenu[];
  mobileMenu: IMenu[];
} => {
  // Get menu items based on role or public items
  // Use optional chaining and nullish coalescing to handle missing role configs
  const menuKeys =
    (role && ROLE_NAVBAR_MENU_CONFIG[role]) ?? PUBLIC_NAVBAR_ITEMS;

  const menuItems = menuKeys.map((key) => ALL_NAVBAR_MENU_ITEMS[key]);

  // Desktop menu - only show the base navigation items
  const desktopMenu = menuItems;

  // Mobile menu - includes additional items based on auth status
  let mobileMenu = [...menuItems];

  if (isAuthenticated) {
    // Add authenticated-only items to mobile menu (My Account, no Subscribe)
    mobileMenu = [...mobileMenu, AUTHENTICATED_MOBILE_ITEMS.myAccount];
  } else {
    // Add unauthenticated items (Subscribe and Login)
    mobileMenu = [
      ...mobileMenu,
      UNAUTHENTICATED_ITEMS.subscribe,
      UNAUTHENTICATED_ITEMS.login,
    ];
  }

  return {
    desktopMenu,
    mobileMenu,
  };
};
