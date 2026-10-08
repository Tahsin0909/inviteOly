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
  name?: string;
  email: string;
  role: IRole;
  profileImage?: string | null;
  phone?: string | null;
  address?: string | null;

  // Partner registration fields
  partnerType?: string | null;
  businessName?: string | null;
  businessEmail?: string | null;
  website?: string | null;
  businessAddress?: string | null;

  // Partner bank / payout fields
  bankName?: string | null;
  accountHolderName?: string | null;
  accountNumber?: string | null;
  routingNumber?: string | null;
  accountType?: string | null;
  swiftCode?: string | null;

  // Account & system flags
  isEmailVerified?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  status?: string;
  hasActiveSubscription?: boolean;
  stripeCustomerId?: string | null;
  subscriptionStatus?: string | null;
  subscriptionPlan?: string | null;
  subscriptionExpiresAt?: string | null;
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
  isPreferred?: boolean;
  customRole?: string | null;
}

export interface IUpdateUserProfilePayload {
  firstName: string;
  lastName: string;
  partnerType?: string | null;
  businessName?: string | null;
  email?: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  businessAddress?: string | null;
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

export interface IPartnerBankInfo {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings" | "business";
  swiftCode?: string;
}

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
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountType?: string;
  swiftCode?: string;
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
  partnerType?: string;
  isVerified?: boolean;
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

// Admin Partner Management Interfaces
export type TPartnerStatus = "Active" | "Deactivate" | "Suspended";

export interface IAdminPartnerListItem {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  businessName: string;
  venueName: string;
  status: TPartnerStatus;
  eventCount: number;
  isPreferred: boolean;
  joinDate: string;
}

export interface IAdminPartnerEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  amount: string;
  status: "Completed" | "Upcoming" | "Cancelled";
}

export interface IAdminPartnerVenueSpace {
  name: string;
  statusLabel?: string;
}

export interface IAdminPartnerVenue {
  id: string;
  name: string;
  address: string;
  parkingInfo?: string;
  spaces: IAdminPartnerVenueSpace[];
}

export interface IAdminPartnerDetails {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  initials?: string;
  role: string;
  partnerType: string;
  businessName: string;
  businessEmail: string;
  website?: string;
  businessAddress?: string;
  venueName: string;
  status: TPartnerStatus;
  isPreferred: boolean;
  venueCount: number;
  referredEventsCount: number;
  rewardsPoints: string;
  events: IAdminPartnerEvent[];
  venues: IAdminPartnerVenue[];
}

export interface IInvitePartnerPayload {
  firstName: string;
  lastName: string;
  role: string;
  partnerType: string;
  businessName: string;
  businessEmail: string;
  phone?: string;
  website?: string;
  businessAddress?: string;
}

export interface IAdminPartnerStats {
  totalPartners: number;
  totalPartnersTrend?: string;
  activePartners: number;
  activePartnersTrend?: string;
  preferredPartners: number;
  referredEvents: number;
}
