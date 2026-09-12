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


