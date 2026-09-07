"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMemo } from "react";
import { getNavbarMenu } from "../navbar.utils";

export const useNavbarMenu = () => {
  const { getUserRole, isAuthenticated } = useAuth();
  const role = getUserRole();

  const navbarMenu = useMemo(() => {
    return getNavbarMenu(role, isAuthenticated);
  }, [role, isAuthenticated]);

  return navbarMenu;
};
