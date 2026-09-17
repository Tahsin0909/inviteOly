import { IAdminEventCard } from "../event/event.interface";

export enum IRole {
  ADMIN = "ADMIN",
  HOST = "HOST",
  PARTNER = "PARTNER",
  USER = "USER",
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  profileImage?: string | null;
  phone?: string;

  // Partner registration fields
  partnerType?: string | null;
  businessName?: string | null;
  businessEmail?: string | null;
  website?: string | null;
  businessAddress?: string | null;

  // Account & system flags
  isEmailVerified?: boolean;
  isActive?: boolean;
  hasActiveSubscription?: boolean;
  stripeCustomerId?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;

  // Profile & compatibility fields
  location?: string;
  phoneNumber?: string;
  companyName?: string;
  jobTitle?: string;
  jobFunction?: string;
  country?: string;
  jobLevel?: string;
  companyIndustry?: string;
  companySize?: string;
  postalCode?: string;

  // Referral tracking fields
  referredBy?: string | null;
  referredByHostId?: string | null;
  referredByHostName?: string | null;
  referredByEmail?: string | null;
  referralCode?: string | null;
}

export type TCreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: IRole;
  phone?: string;
  partnerType?: string;
  businessName?: string;
  businessEmail?: string;
  website?: string;
  businessAddress?: string;
  companyName?: string;
  jobTitle?: string;
  jobFunction?: string;
  country?: string;
  jobLevel?: string;
  companyIndustry?: string;
  companySize?: string;
  postalCode?: string;
};

export interface IUpdatePartnerProfileDto {
  firstName?: string;
  lastName?: string;
  partnerType?: string;
  businessName?: string;
  businessEmail?: string;
  phone?: string;
  website?: string;
  businessAddress?: string;
  profileImage?: string;
}

export interface IChangePartnerPasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IPartnerProfileResponse {
  user: IUser;
}

// Admin User Management Interfaces
export interface IAdminUserListItem {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "Host" | "Partner" | "Admin";
  joinDate: string;
  eventCount: {
    active: number;
    total: number;
  };
  status?: "Active" | "Suspended";
}

export interface IAdminUserProfileSubscription {
  plan: string;
  price: string;
  lastEventDate: string;
  totalEvent: number;
}

export interface IAdminUserProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  currentPlan: string;
  avatarUrl: string;
  bannerUrl?: string;
  status: "Active" | "Suspended";
  subscription: IAdminUserProfileSubscription;
  events: IAdminEventCard[];
}



