import { IRole, IUser } from "@/features/user/user.interface";
import { ApiResponse } from "@/types/api";

export type TAuthRole = "HOST" | "PARTNER";

export type TPartnerType =
  | "Venue"
  | "Catering"
  | "Photography"
  | "DJ / Entertainment"
  | "Doctor and Floral"
  | "Decor and Floral"
  | "Decor & Floral"
  | "Planner / coordinator"
  | "Planner / Coordinator"
  | "Other"
  | "venue"
  | "catering"
  | "photography"
  | "dj/entertainment"
  | "decor & floral"
  | "planner/coordinator"
  | "other"
  | string;

export interface AuthState {
  email: string;
  pendingEmail?: string;
  pendingFlow?: "register" | "forgot-password" | "forgot" | "login" | null;
  resetToken?: string | null;
  currentStep: number;
  totalSteps: number;
  token: string;
  user: Partial<IUser> | null;
}

export interface VerifyOtpData {
  token: string;
  accessToken?: string;
  user?: IUser | null;
}

export interface SendOtpCredentials {
  email: string;
  type?: "register" | "forgot-password" | "forgot" | "login";
}

export interface VerifyOtpCredentials {
  email: string;
  otp: number | string;
  type?: "register" | "forgot-password" | "forgot" | "reset" | "login" | null;
}

export interface ResendOtpCredentials {
  email: string;
  type?: "register" | "forgot" | "reset" | "REGISTER" | "FORGOT" | "RESET" | string;
}

export interface RegisterHostCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "HOST";
}

export interface RegisterHostPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterPartnerCredentials {
  firstName: string;
  lastName: string;
  role?: "PARTNER";
  partnerType: string;
  businessName: string;
  email?: string;
  businessEmail?: string;
  phone: string;
  website?: string;
  address?: string;
  businessAddress?: string;
  password: string;
}

export interface RegisterPartnerPayload {
  firstName: string;
  lastName: string;
  partnerType: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  password: string;
}

export type RegisterCredentials =
  | RegisterHostCredentials
  | RegisterPartnerCredentials;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  email: string;
  newPassword?: string;
  password?: string;
  confirmPassword?: string;
  otp?: number | string;
}

export interface RefreshTokenCredentials {
  token: string;
}

export interface UpdateProfileCredentials {
  user: Partial<IUser>;
}

export interface AuthResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: {
    accessToken?: string;
    token?: string;
    resetToken?: string;
    user?: IUser;
    id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    role?: IRole | string;
    partnerType?: string | null;
    businessName?: string | null;
    businessEmail?: string | null;
    phone?: string | null;
    website?: string | null;
    address?: string | null;
    businessAddress?: string | null;
    isVerified?: boolean;
    isEmailVerified?: boolean;
    isActive?: boolean;
    [key: string]: unknown;
  } | null;
}

export interface RefreshTokenResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UseAuthReturn {
  user: Partial<IUser> | null;
  token: string | null;
  email: string | null;
  pendingEmail?: string;
  pendingFlow?: "register" | "forgot-password" | "forgot" | "login" | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: Partial<IUser> | null;
  handleSendOtp: (
    credentials: SendOtpCredentials
  ) => Promise<ApiResponse<void>>;
  handleVerifyOtp: (credentials: VerifyOtpCredentials) => Promise<void>;
  handleRegister: (credentials: RegisterCredentials) => Promise<void>;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  handleForgotPassword: (credentials: ForgotPasswordCredentials) => Promise<void>;
  handleResetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleUpdateProfile: (
    userData: Partial<IUser>
  ) => Promise<ApiResponse<IUser>>;
  handleLogout: () => Promise<void>;
  getUserRole: () => IRole | null;
  hasRole: (requiredRoles: IRole[]) => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
}
