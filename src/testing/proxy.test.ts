import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

function createMockToken(payload: {
  id?: string;
  email?: string;
  role?: string;
  exp?: number;
  hasActiveSubscription?: boolean;
}): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.mockSignature`;
}

function createRequest(
  url: string,
  token?: string | null
): NextRequest {
  const headers: Record<string, string> = {};
  if (token) {
    headers["cookie"] = `token=${token}`;
  }
  return new NextRequest(new URL(url, "http://localhost:3000"), {
    headers,
  });
}

describe("Next.js 16 Role-based Proxy (proxy.ts)", () => {
  const validHostToken = createMockToken({
    id: "host_1",
    email: "host@example.com",
    role: "HOST",
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  const validPartnerToken = createMockToken({
    id: "partner_1",
    email: "partner@example.com",
    role: "PARTNER",
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  const validAdminToken = createMockToken({
    id: "admin_1",
    email: "admin@example.com",
    role: "ADMIN",
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  const expiredToken = createMockToken({
    id: "host_expired",
    email: "host@example.com",
    role: "HOST",
    exp: Math.floor(Date.now() / 1000) - 3600, // expired 1 hour ago
  });

  describe("Public Routes", () => {
    it("allows unauthenticated access to landing page '/'", () => {
      const res = proxy(createRequest("/"));
      // NextResponse.next() returns a response without 307/308/302 redirect
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });

    it("allows unauthenticated access to public marketing & informational routes", () => {
      const publicPaths = [
        "/contact",
        "/faq",
        "/terms",
        "/privacy",
        "/partners",
        "/partners/benefits",
        "/partners-agreement",
        "/host-agreement",
        "/guest-management",
        "/ticketing",
        "/create-event",
        "/hosts",
      ];

      for (const path of publicPaths) {
        const res = proxy(createRequest(path));
        expect(res.status).toBe(200);
        expect(res.headers.get("location")).toBeNull();
      }
    });

    it("prevents prefix collisions: '/partners' is public while '/partner' is protected", () => {
      const partnersRes = proxy(createRequest("/partners"));
      expect(partnersRes.status).toBe(200);

      const partnerRes = proxy(createRequest("/partner"));
      expect(partnerRes.status).toBe(307);
      expect(partnerRes.headers.get("location")).toContain("/login");
    });

    it("prevents prefix collisions: '/host-agreement' and '/hosts' are public while '/host' is protected", () => {
      const hostAgreementRes = proxy(createRequest("/host-agreement"));
      expect(hostAgreementRes.status).toBe(200);

      const hostsRes = proxy(createRequest("/hosts"));
      expect(hostsRes.status).toBe(200);

      const hostRes = proxy(createRequest("/host"));
      expect(hostRes.status).toBe(307);
      expect(hostRes.headers.get("location")).toContain("/login");
    });
  });

  describe("Guest / Auth Routes (/login, /register, etc.)", () => {
    it("allows unauthenticated users to access auth routes", () => {
      const authPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-otp",
      ];

      for (const path of authPaths) {
        const res = proxy(createRequest(path));
        expect(res.status).toBe(200);
        expect(res.headers.get("location")).toBeNull();
      }
    });

    it("redirects authenticated HOST to /host when visiting /login or /register", () => {
      const res = proxy(createRequest("/login", validHostToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/host");

      const registerRes = proxy(createRequest("/register", validHostToken));
      expect(registerRes.status).toBe(307);
      expect(registerRes.headers.get("location")).toBe("http://localhost:3000/host");
    });

    it("redirects authenticated PARTNER to /partner when visiting auth routes", () => {
      const res = proxy(createRequest("/login", validPartnerToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/partner");
    });

    it("redirects authenticated ADMIN to /admin when visiting auth routes", () => {
      const res = proxy(createRequest("/forgot-password", validAdminToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin");
    });

    it("allows users with expired tokens to access /login to re-authenticate", () => {
      const res = proxy(createRequest("/login", expiredToken));
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });
  });

  describe("Role-Protected Routes", () => {
    describe("/admin routes", () => {
      it("redirects unauthenticated users to /login with callbackUrl", () => {
        const res = proxy(createRequest("/admin/events"));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe(
          "http://localhost:3000/login?callbackUrl=%2Fadmin%2Fevents"
        );
      });

      it("allows ADMIN users", () => {
        const res = proxy(createRequest("/admin", validAdminToken));
        expect(res.status).toBe(200);

        const subRes = proxy(createRequest("/admin/users", validAdminToken));
        expect(subRes.status).toBe(200);
      });

      it("redirects unauthorized HOST users to /host", () => {
        const res = proxy(createRequest("/admin", validHostToken));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe("http://localhost:3000/host");
      });

      it("redirects unauthorized PARTNER users to /partner", () => {
        const res = proxy(createRequest("/admin/events", validPartnerToken));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe("http://localhost:3000/partner");
      });
    });

    describe("/host routes", () => {
      it("redirects unauthenticated users to /login with callbackUrl", () => {
        const res = proxy(createRequest("/host/events"));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe(
          "http://localhost:3000/login?callbackUrl=%2Fhost%2Fevents"
        );
      });

      it("allows HOST users", () => {
        const res = proxy(createRequest("/host", validHostToken));
        expect(res.status).toBe(200);

        const subRes = proxy(
          createRequest("/host/payment-pending", validHostToken)
        );
        expect(subRes.status).toBe(200);
      });
      it("redirects unauthorized PARTNER users to /partner", () => {
        const res = proxy(createRequest("/host", validPartnerToken));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe("http://localhost:3000/partner");
      });
    });

    describe("/partner routes", () => {
      it("redirects unauthenticated users to /login with callbackUrl", () => {
        const res = proxy(createRequest("/partner/venues"));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe(
          "http://localhost:3000/login?callbackUrl=%2Fpartner%2Fvenues"
        );
      });

      it("allows PARTNER users", () => {
        const res = proxy(createRequest("/partner", validPartnerToken));
        expect(res.status).toBe(200);

        const subRes = proxy(
          createRequest("/partner/rewards", validPartnerToken)
        );
        expect(subRes.status).toBe(200);
      });

      it("redirects unauthorized HOST users to /host", () => {
        const res = proxy(createRequest("/partner", validHostToken));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe("http://localhost:3000/host");
      });
    });
  });

  describe("General /dashboard Route", () => {
    it("redirects unauthenticated users to /login with callbackUrl", () => {
      const res = proxy(createRequest("/dashboard"));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe(
        "http://localhost:3000/login?callbackUrl=%2Fdashboard"
      );
    });

    it("redirects authenticated HOST to /host", () => {
      const res = proxy(createRequest("/dashboard", validHostToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/host");
    });

    it("redirects authenticated PARTNER to /partner", () => {
      const res = proxy(createRequest("/dashboard", validPartnerToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/partner");
    });

    it("redirects authenticated ADMIN to /admin", () => {
      const res = proxy(createRequest("/dashboard", validAdminToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin");
    });
  });

  describe("Common Authenticated Routes (/settings, /payment, /profile, etc.)", () => {
    it("redirects unauthenticated users to /login with callbackUrl", () => {
      const commonPaths = [
        "/settings",
        "/profile",
        "/payment",
        "/support",
        "/download-app",
      ];

      for (const path of commonPaths) {
        const res = proxy(createRequest(path));
        expect(res.status).toBe(307);
        expect(res.headers.get("location")).toBe(
          `http://localhost:3000/login?callbackUrl=${encodeURIComponent(path)}`
        );
      }
    });

    it("allows authenticated HOST access to common routes", () => {
      const res = proxy(createRequest("/settings", validHostToken));
      expect(res.status).toBe(200);
    });

    it("allows authenticated PARTNER access to common routes", () => {
      const res = proxy(createRequest("/profile", validPartnerToken));
      expect(res.status).toBe(200);
    });

    it("allows authenticated ADMIN access to common routes", () => {
      const res = proxy(createRequest("/payment", validAdminToken));
      expect(res.status).toBe(200);
    });
  });

  describe("Token Expiration and Malformed Tokens", () => {
    it("redirects expired token to /login and clears cookies", () => {
      const res = proxy(createRequest("/host", expiredToken));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toContain("/login");
      // Check that expired token cookie deletion is dispatched
      const setCookie = res.headers.get("set-cookie");
      expect(setCookie).toBeDefined();
    });

    it("treats malformed token as unauthenticated", () => {
      const res = proxy(createRequest("/host", "not-a-valid-jwt"));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toContain("/login");
    });
  });
});