import { IRole, IUser } from "../user.interface";

// 1. The Admin User
export const adminUser: IUser = {
    id: "507f191e810c19729de860ea",
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah.connor@inviteonly.com",
    profileImage: "https://i.pravatar.cc/150?img=5",
    role: IRole.ADMIN,
    phone: "+1 (555) 987-6543",
    isEmailVerified: true,
    isActive: true,
    hasActiveSubscription: true,
    stripeCustomerId: "cus_AdminStripeID",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2026-07-29T10:00:00Z",
};

// 2. The Host User (Standard User from Host Registration)
export const hostUser: IUser = {
    id: "507f191e810c19729de860eb",
    firstName: "James",
    lastName: "Smith",
    email: "james.smith@gmail.com",
    profileImage: null,
    role: IRole.HOST,
    phone: "+1 (416) 555-0199",
    isEmailVerified: true,
    isActive: true,
    hasActiveSubscription: false,
    stripeCustomerId: "",
    createdAt: "2026-06-15T14:30:00Z",
    updatedAt: "2026-07-20T08:15:00Z",
};

export const standardUser: IUser = hostUser;

// 3. The Partner User (from Partner Registration)
export const partnerUser: IUser = {
    id: "507f191e810c19729de860ec",
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena@globalpartners.net",
    profileImage: "https://i.pravatar.cc/150?img=9",
    role: IRole.PARTNER,
    partnerType: "Venue",
    businessName: "Elegance Event Venues",
    businessEmail: "elena@globalpartners.net",
    phone: "+34 91 555 0123",
    website: "https://elegancevenues.com",
    businessAddress: "Calle Serrano 45, 28001 Madrid, Spain",
    isEmailVerified: true,
    isActive: true,
    hasActiveSubscription: true,
    stripeCustomerId: "cus_PartnerStripeID",
    createdAt: "2025-11-05T11:20:00Z",
    updatedAt: "2026-07-28T16:45:00Z",
};

export const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYSIsImZpcnN0TmFtZSI6IlNhcmFoIiwibGFzdE5hbWUiOiJDb25ub3IiLCJlbWFpbCI6InNhcmFoLmNvbm5vckBpbnZpdGVvbmx5LmNvbSIsInJvbGUiOiJBRE1JTiIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vaS5wcmF2YXRhci5jYy8xNTA_aW1nPTUiLCJwaG9uZSI6IisxICg1NTUpIDk4Ny02NTQzIiwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJpc0FjdGl2ZSI6dHJ1ZSwiaGFzQWN0aXZlU3Vic2NyaXB0aW9uIjp0cnVlLCJzdHJpcGVDdXN0b21lcklkIjoiY3VzX0FkbWluU3RyaXBlSUQiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjA4Mjc1ODQwMH0.bW9ja19zaWduYXR1cmU";

export const hostToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYiIsImZpcnN0TmFtZSI6IkphbWVzIiwibGFzdE5hbWUiOiJTbWl0aCIsImVtYWlsIjoiamFtZXMuc21pdGhAZ21haWwuY29tIiwicm9sZSI6IkhPU1QiLCJwcm9maWxlSW1hZ2UiOm51bGwsInBob25lIjoiKzEgKDQxNikgNTU1LTAxOTkiLCJpc0VtYWlsVmVyaWZpZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJoYXNBY3RpdmVTdWJzY3JpcHRpb24iOmZhbHNlLCJzdHJpcGVDdXN0b21lcklkIjoiIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjIwODI3NTg0MDB9.bW9ja19zaWduYXR1cmU";

export const userToken = hostToken;

export const partnerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYyIsImZpcnN0TmFtZSI6IkVsZW5hIiwibGFzdE5hbWUiOiJSb2RyaWd1ZXoiLCJlbWFpbCI6ImVsZW5hQGdsb2JhbHBhcnRuZXJzLm5ldCIsInJvbGUiOiJQQVJUTkVSIiwicGFydG5lclR5cGUiOiJWZW51ZSIsImJ1c2luZXNzTmFtZSI6IkVsZWdhbmNlIEV2ZW50IFZlbnVlcyIsImJ1c2luZXNzRW1haWwiOiJlbGVuYUBnbG9iYWxwYXJ0bmVycy5uZXQiLCJwaG9uZSI6IiszNCA5MSA1NTUgMDEyMyIsIndlYnNpdGUiOiJodHRwczovL2VsZWdhbmNldmVudWVzLmNvbSIsImJ1c2luZXNzQWRkcmVzcyI6IkNhbGxlIFNlcnJhbm8gNDUsIDI4MDAxIE1hZHJpZCwgU3BhaW4iLCJwcm9maWxlSW1hZ2UiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMTUwP2ltZz05IiwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJpc0FjdGl2ZSI6dHJ1ZSwiaGFzQWN0aXZlU3Vic2NyaXB0aW9uIjp0cnVlLCJzdHJpcGVDdXN0b21lcklkIjoiY3VzX1BhcnRuZXJTdHJpcGVJRCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDgyNzU4NDAwfQ.bW9ja19zaWduYXR1cmU";

// Default active user & token
// export const currentUser: IUser = adminUser;
// export const currentUser: IUser = hostUser;
export const currentUser: IUser = partnerUser;

export const getTokenForUser = (user: IUser | null): string => {
    if (!user) return "";

    switch (user.role) {
        case IRole.ADMIN:
            return adminToken;
        case IRole.HOST:
        case IRole.USER:
            return hostToken;
        case IRole.PARTNER:
            return partnerToken;
        default:
            return "";
    }
};

export const currentToken: string = getTokenForUser(currentUser);
