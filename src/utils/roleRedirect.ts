import { IRole } from "@/features/user/user.interface";

/**
 * Returns the appropriate dashboard redirect route based on user role.
 * - ADMIN -> /dashboard/admin
 * - HOST -> /dashboard/host
 * - PARTNER -> /dashboard/partner
 * - USER -> /dashboard/user (forces for payment)
 */
export const getRoleRedirectPath = (
  role?: IRole | string | null,
  hasActiveSubscription?: boolean
): string => {
  if (!role) return "/login";

  switch (role) {
    case IRole.ADMIN:
    case "ADMIN":
      return "/dashboard/admin";
    case IRole.HOST:
    case "HOST":
      return "/dashboard/host";
    case IRole.PARTNER:
    case "PARTNER":
      return "/dashboard/partner";
    case IRole.USER:
    case "USER":
      // For role 'USER', force for payment!
      return hasActiveSubscription ? "/dashboard/user" : "/dashboard/user";
    default:
      return "/dashboard";
  }
};
