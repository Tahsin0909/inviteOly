import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { IRole } from "@/features/user/user.interface";
import { getRoleRedirectPath } from "@/utils/roleRedirect";

/**
 * JWT payload interface matching backend auth token structure.
 */
export interface DecodedTokenPayload {
  id?: string;
  email?: string;
  role?: string;
  hasActiveSubscription?: boolean;
  exp?: number;
  iat?: number;
}

const TOKEN_COOKIE_NAME = "token";
const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

/**
 * Extracts authentication token from request cookies.
 */
function getAuthToken(request: NextRequest): string | null {
  return (
    request.cookies.get(TOKEN_COOKIE_NAME)?.value ||
    request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value ||
    null
  );
}

/**
 * Decodes and validates JWT token payload.
 * Returns null if token is missing, invalid, or expired.
 */
function parseTokenPayload(token: string | null): DecodedTokenPayload | null {
  if (!token) return null;
  try {
    const payload = jwtDecode<DecodedTokenPayload>(token);
    if (!payload) return null;

    // Check expiration (exp is in seconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Helper to check if a path matches exactly or starts with prefix + '/'.
 * Prevents false positives like '/partners' matching '/partner'.
 */
function matchesPath(pathname: string, targetPath: string): boolean {
  if (targetPath === "/") {
    return pathname === "/";
  }
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

/**
 * Auth routes: accessible only by unauthenticated guests.
 * Authenticated users visiting these routes are redirected to their role's dashboard.
 */
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
];

/**
 * Public routes: accessible to everyone regardless of authentication status.
 * Referenced from ALL_NAVBAR_MENU_ITEMS, PUBLIC_NAVBAR_ITEMS (navbar.constants.ts),
 * and footerSections, bottomLinks (footer.constants.ts).
 */
const PUBLIC_ROUTES = [
  "/",
  "/contact",
  "/faq",
  "/terms",
  "/privacy",
  "/partners",
  "/partners-agreement",
  "/host-agreement",
  "/guest-management",
  "/ticketing",
  "/create-event",
  "/hosts",
];

/**
 * Role-protected route definitions.
 * Maps route prefixes to their permitted user roles.
 * Referenced from ADMIN_MENU_ITEMS, HOST_MENU_ITEMS, PARTNER_MENU_ITEMS, USER_MENU_ITEMS (sidebarMenu.ts).
 */
interface RoleRouteConfig {
  prefix: string;
  allowedRoles: IRole[];
}

const ROLE_ROUTE_CONFIGS: RoleRouteConfig[] = [
  {
    prefix: "/admin",
    allowedRoles: [IRole.ADMIN],
  },
  {
    prefix: "/host",
    allowedRoles: [IRole.HOST],
  },
  {
    prefix: "/partner",
    allowedRoles: [IRole.PARTNER],
  },
  {
    prefix: "/user",
    allowedRoles: [IRole.USER],
  },
];

/**
 * Common authenticated routes accessible by all logged-in roles.
 * Referenced from COMMON_ROUTES (sidebarMenu.ts) and COMMON_NAVBAR_ROUTES (navbar.constants.ts).
 */
const COMMON_AUTHENTICATED_ROUTES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
  "/payment",
  "/support",
  "/download-app",
];

/**
 * Next.js 16 Proxy function (formerly middleware.ts)
 * Intercepts incoming requests at the network boundary and enforces role-based access control.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Allow public marketing and policy pages
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    matchesPath(pathname, route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Extract and decode JWT authentication token
  const token = getAuthToken(request);
  const user = parseTokenPayload(token);
  const isAuthenticated = !!user;
  const userRole = user?.role ? (user.role.toUpperCase() as IRole) : undefined;
  const isTokenExpiredOrInvalid = Boolean(token && !user);

  // 3. Handle auth routes (/login, /register, etc.)
  const isAuthRoute = AUTH_ROUTES.some((route) => matchesPath(pathname, route));
  if (isAuthRoute) {
    if (isAuthenticated && userRole) {
      // Authenticated users are redirected to their respective role dashboard
      const targetPath = getRoleRedirectPath(
        userRole,
        user?.hasActiveSubscription
      );
      return NextResponse.redirect(new URL(targetPath, request.url));
    }
    return NextResponse.next();
  }

  // 4. Handle generic /dashboard route: redirect to role-specific dashboard
  if (matchesPath(pathname, "/dashboard")) {
    if (!isAuthenticated || !userRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      const response = NextResponse.redirect(loginUrl);
      if (isTokenExpiredOrInvalid) {
        response.cookies.delete(TOKEN_COOKIE_NAME);
        response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
      }
      return response;
    }

    const targetPath = getRoleRedirectPath(
      userRole,
      user?.hasActiveSubscription
    );
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  // 5. Enforce role-based access on role-specific routes (/admin, /host, /partner, /user)
  const matchedRoleConfig = ROLE_ROUTE_CONFIGS.find((config) =>
    matchesPath(pathname, config.prefix)
  );

  if (matchedRoleConfig) {
    if (!isAuthenticated || !userRole) {
      // Unauthenticated: redirect to login with callback URL
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      const response = NextResponse.redirect(loginUrl);
      if (isTokenExpiredOrInvalid) {
        response.cookies.delete(TOKEN_COOKIE_NAME);
        response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
      }
      return response;
    }

    // Verify user role has access to this route prefix
    const hasPermission = matchedRoleConfig.allowedRoles.includes(userRole);
    if (!hasPermission) {
      // Unauthorized: redirect to user's assigned role dashboard
      const authorizedPath = getRoleRedirectPath(
        userRole,
        user?.hasActiveSubscription
      );
      return NextResponse.redirect(new URL(authorizedPath, request.url));
    }

    return NextResponse.next();
  }

  // 6. Handle common authenticated routes (/profile, /settings, /payment, etc.)
  const isCommonAuthenticatedRoute = COMMON_AUTHENTICATED_ROUTES.some((route) =>
    matchesPath(pathname, route)
  );

  if (isCommonAuthenticatedRoute) {
    if (!isAuthenticated || !userRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      const response = NextResponse.redirect(loginUrl);
      if (isTokenExpiredOrInvalid) {
        response.cookies.delete(TOKEN_COOKIE_NAME);
        response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
      }
      return response;
    }

    return NextResponse.next();
  }

  // Allow any other unmatched routes
  return NextResponse.next();
}

export default proxy;

/**
 * Configure matching paths for Next.js proxy.
 * Excludes static assets, image optimization, favicon, and api routes.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)",
  ],
};

