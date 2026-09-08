import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IUser } from "../user/user.interface";
import {
  AuthResponse,
  ForgotPasswordCredentials,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  SendOtpCredentials,
  VerifyOtpCredentials,
} from "./auth.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Login with Email & Password
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Send OTP
    sendOtp: builder.mutation<ApiResponse<void>, SendOtpCredentials | { email: string }>({
      query: (body) => ({
        url: "/otp/send",
        method: "POST",
        body: typeof body === "string" ? { email: body } : body,
      }),
    }),

    // Resend OTP
    resendOtp: builder.mutation<ApiResponse<void>, { email: string }>({
      query: (body) => ({
        url: "/otp/resend",
        method: "POST",
        body,
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpCredentials>({
      query: ({ email, otp, type }) => ({
        url: "/otp/verify",
        method: "POST",
        body: { email, otp: Number(otp), type },
      }),
    }),

    // Forgot Password - requests OTP to email
    forgotPassword: builder.mutation<ApiResponse<void>, ForgotPasswordCredentials>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset / Set New Password with OTP
    resetPassword: builder.mutation<ApiResponse<void>, ResetPasswordCredentials>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: {
          email: body.email,
          otp: Number(body.otp),
          password: body.password,
        },
      }),
      invalidatesTags: ["auth"],
    }),

    // Update Profile
    updateProfile: builder.mutation<ApiResponse<IUser>, Partial<IUser>>({
      query: (body) => ({
        url: `/users/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    // Logout
    logout: builder.mutation<ApiResponse<void>, Record<string, unknown> | void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    // Get User Profile
    getProfile: builder.query<ApiResponse<IUser>, string | void>({
      query: () => `/users/profile`,
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = userApi;

