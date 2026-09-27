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
  | string;

export interface AuthState {
  email: string;
  pendingEmail?: string;
  pendingFlow?: "register" | "forgot-password" | "login" | null;
  resetToken?: string | null;
  currentStep: number;
  totalSteps: number;
  token: string;
  user: Partial<IUser> | null;
}

export interface VerifyOtpData {
  token: string;
  user?: IUser | null;
}

export interface SendOtpCredentials {
  email: string;
  type?: "register" | "forgot-password" | "login";
}

export interface VerifyOtpCredentials {
  email: string;
  otp: number | string;
  type?: "register" | "forgot-password" | "login";
}

export interface RegisterHostCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "HOST";
}

export interface RegisterPartnerCredentials {
  firstName: string;
  lastName: string;
  role: "PARTNER";
  partnerType: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  website?: string;
  businessAddress?: string;
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
  otp: number | string;
  password: string;
  confirmPassword?: string;
}

export interface UpdateProfileCredentials {
  user: Partial<IUser>;
}

export interface AuthResponse {
  data: {
    token: string;
    user?: IUser;
    resetToken?: string;
  };
  message: string;
  success?: boolean;
}

export interface UseAuthReturn {
  user: Partial<IUser> | null;
  token: string | null;
  email: string | null;
  pendingEmail?: string;
  pendingFlow?: "register" | "forgot-password" | "login" | null;
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
