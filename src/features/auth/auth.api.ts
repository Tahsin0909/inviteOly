import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IUser } from "../user/user.interface";
import {
  AuthResponse,
  ForgotPasswordCredentials,
  LoginCredentials,
  RefreshTokenCredentials,
  RefreshTokenResponse,
  RegisterCredentials,
  RegisterHostPayload,
  RegisterPartnerPayload,
  ResendOtpCredentials,
  ResetPasswordCredentials,
  SendOtpCredentials,
  VerifyOtpCredentials,
} from "./auth.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Host Register - POST /auth/register-host
    registerHost: builder.mutation<AuthResponse, RegisterHostPayload>({
      query: (body) => ({
        url: "/auth/register-host",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Partner Register - POST /auth/register-partner
    registerPartner: builder.mutation<AuthResponse, RegisterPartnerPayload>({
      query: (body) => ({
        url: "/auth/register-partner",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Unified Register - Dispatches to /auth/register-host or /auth/register-partner
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (body) => {
        if (body.role === "PARTNER") {
          const partnerBody: RegisterPartnerPayload = {
            firstName: body.firstName,
            lastName: body.lastName,
            partnerType: body.partnerType,
            businessName: body.businessName,
            email: body.email || body.businessEmail || "",
            phone: body.phone,
            ...(body.website ? { website: body.website } : {}),
            ...(body.address || body.businessAddress
              ? { address: body.address || body.businessAddress }
              : {}),
            password: body.password,
          };
          return {
            url: "/auth/register-partner",
            method: "POST",
            body: partnerBody,
          };
        }

        const hostBody: RegisterHostPayload = {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email || "",
          password: body.password,
        };
        return {
          url: "/auth/register-host",
          method: "POST",
          body: hostBody,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // Login with Email & Password - POST /auth/login
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Verify Email for Registration - POST /auth/verify-email
    verifyEmail: builder.mutation<AuthResponse, { email: string; otp: string | number }>({
      query: ({ email, otp }) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { email, otp: String(otp) },
      }),
      invalidatesTags: ["auth"],
    }),

    // Verify OTP for Password Reset - POST /auth/verify-reset-otp
    verifyResetOtp: builder.mutation<AuthResponse, { email: string; otp: string | number }>({
      query: ({ email, otp }) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: { email, otp: String(otp) },
      }),
      invalidatesTags: ["auth"],
    }),

    // Unified Verify OTP - Chooses endpoint based on flow type
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpCredentials>({
      query: ({ email, otp, type }) => {
        const isForgot =
          type === "forgot-password" || type === "forgot" || type === "reset";
        return {
          url: isForgot ? "/auth/verify-reset-otp" : "/auth/verify-email",
          method: "POST",
          body: {
            email,
            otp: String(otp),
          },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // Resend OTP - POST /auth/resend-otp
    resendOtp: builder.mutation<ApiResponse<null>, ResendOtpCredentials>({
      query: ({ email, type = "register" }) => {
        const normalizedType =
          type === "forgot-password" ? "forgot" : (type || "register");
        return {
          url: "/auth/resend-otp",
          method: "POST",
          body: {
            email,
            type: normalizedType,
          },
        };
      },
    }),

    // Forgot Password - POST /auth/forgot-password
    forgotPassword: builder.mutation<ApiResponse<null>, ForgotPasswordCredentials>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset Password - POST /auth/reset-password
    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordCredentials>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: {
          email: body.email,
          newPassword: body.newPassword || body.password,
        },
      }),
      invalidatesTags: ["auth"],
    }),

    // Refresh Token - POST /auth/refresh-token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenCredentials>({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Send OTP (Legacy / General) - POST /otp/send
    sendOtp: builder.mutation<ApiResponse<void>, SendOtpCredentials | { email: string }>({
      query: (body) => ({
        url: "/otp/send",
        method: "POST",
        body: typeof body === "string" ? { email: body } : body,
      }),
    }),

    // Update Profile - PATCH /user/me
    updateProfile: builder.mutation<ApiResponse<IUser>, Partial<IUser>>({
      query: (body) => ({
        url: `/user/me`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["auth", "profile", "users"],
    }),

    // Logout - POST /auth/logout
    logout: builder.mutation<ApiResponse<void>, Record<string, unknown> | void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    // Get User Profile - GET /user/me
    getProfile: builder.query<ApiResponse<IUser>, string | void>({
      query: () => `/user/me`,
      providesTags: ["auth", "profile", "users"],
    }),
  }),
});

export const {
  useRegisterHostMutation,
  useRegisterPartnerMutation,
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useVerifyResetOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useSendOtpMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = userApi;
