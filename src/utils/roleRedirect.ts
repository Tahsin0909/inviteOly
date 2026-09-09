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
      return "/admin";
    case IRole.HOST:
    case "HOST":
      return "/host";
    case IRole.PARTNER:
    case "PARTNER":
      return "/partner";
    case IRole.USER:
    case "USER":
      // For role 'USER', force for payment!
      return hasActiveSubscription ? "/user" : "/user";
    default:
      return "/dashboard";
  }
};
