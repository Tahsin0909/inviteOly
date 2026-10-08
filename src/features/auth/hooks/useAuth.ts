"use client";

import { IRole, IUser } from "@/features/user/user.interface";
import { useAppSelector } from "@/redux/hook";
import {
  clearToken,
  decodeStoredToken,
  decodeToken,
  extractErrorMessage,
  saveToken,
} from "@/utils/tokenHandler";
import { getRoleRedirectPath } from "@/utils/roleRedirect";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  ForgotPasswordCredentials,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  SendOtpCredentials,
  UseAuthReturn,
  VerifyOtpCredentials,
} from "../auth.interface";

import {
  useForgotPasswordMutation,
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
} from "../auth.api";
import {
  clearPendingAuth,
  reset,
  setEmail,
  setPendingAuth,
  setResetToken,
  setToken,
  setUser,
} from "../store/auth.slice";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, email, pendingEmail, pendingFlow } = useAppSelector(
    (state) => state.auth
  );

  const [sendOtp, { isLoading: sendOtpLoading }] = useSendOtpMutation();
  const [resendOtp, { isLoading: resendOtpLoading }] = useResendOtpMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !token,
    }
  );

  const activeUser = user || profileData?.data || null;
  const activeToken = token || null;
  const profile = profileData?.data || activeUser || null;

  const isLoading =
    sendOtpLoading ||
    resendOtpLoading ||
    verifyOtpLoading ||
    loginLoading ||
    registerLoading ||
    forgotPasswordLoading ||
    resetPasswordLoading ||
    updateProfileLoading ||
    logoutLoading ||
    profileLoading;

  // ---- SEND OTP (LEGACY) ----
  const handleSendOtp = useCallback(
    async ({ email, type }: SendOtpCredentials) => {
      const toastId = toast.loading("Sending verification code...");
      try {
        const response = await sendOtp({ email, type }).unwrap();
        dispatch(setEmail(email));
        dispatch(setPendingAuth({ email, flow: type ?? "register" }));
        toast.success("Verification code sent to your email", { id: toastId });
        return response;
      } catch (error) {
        const message = extractErrorMessage(error, "Failed to send OTP");
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [sendOtp, dispatch]
  );

  // ---- RESEND OTP ----
  const handleResendOtp = useCallback(async () => {
    const targetEmail = pendingEmail || email;
    if (!targetEmail) {
      toast.error("Email address not found. Please start over.");
      return;
    }

    const toastId = toast.loading("Resending verification code...");
    try {
      const resendType =
        pendingFlow === "forgot-password" || pendingFlow === "forgot"
          ? "forgot"
          : "register";

      const response = await resendOtp({
        email: targetEmail,
        type: resendType,
      }).unwrap();

      toast.success(
        response?.message || "A new 6-digit verification code has been sent!",
        { id: toastId }
      );
    } catch (error) {
      const message = extractErrorMessage(error, "Failed to resend OTP");
      toast.error(message, { id: toastId });
      throw new Error(message);
    }
  }, [resendOtp, pendingEmail, email, pendingFlow]);

  // ---- REGISTER ----
  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const response = await register(credentials).unwrap();
        const targetEmail: string =
          (credentials.role === "PARTNER"
            ? credentials.email || credentials.businessEmail
            : credentials.email) || "";

        dispatch(
          setPendingAuth({
            email: targetEmail,
            flow: "register",
          })
        );
        dispatch(setEmail(targetEmail));

        toast.success(
          response?.message ||
            "Registration successful. Please check your email for the 6-digit verification code.",
          { id: toastId }
        );
        router.push(
          `/verify-otp?email=${encodeURIComponent(targetEmail)}&flow=register`
        );
      } catch (error) {
        const message = extractErrorMessage(error, "Registration failed");
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [register, dispatch, router]
  );

  // ---- LOGIN ----
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const toastId = toast.loading("Logging in...");
      try {
        const response = await login(credentials).unwrap();
        const tokenStr: string | undefined =
          response?.data?.token || response?.data?.accessToken;

        if (!tokenStr) {
          throw new Error("No authentication token received from server");
        }

        const decodedUser = decodeToken(tokenStr);
        const userObj = (response?.data?.user || decodedUser) as IUser;

        dispatch(setToken(tokenStr));
        if (userObj) {
          dispatch(setUser(userObj));
        }
        dispatch(clearPendingAuth());

        saveToken(tokenStr);
        toast.success(response?.message || "Logged in successfully!", { id: toastId });
        const redirectPath = getRoleRedirectPath(
          userObj?.role,
          userObj?.hasActiveSubscription
        );
        router.push(redirectPath);
      } catch (error) {
        const message = extractErrorMessage(error, "Login failed");
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [login, dispatch, router]
  );

  // ---- FORGOT PASSWORD ----
  const handleForgotPassword = useCallback(
    async (credentials: ForgotPasswordCredentials) => {
      const toastId = toast.loading("Sending recovery code...");
      try {
        const response = await forgotPassword(credentials).unwrap();
        dispatch(
          setPendingAuth({
            email: credentials.email,
            flow: "forgot-password",
          })
        );
        toast.success(
          response?.message ||
            "A 6-digit password reset code has been sent to your email address.",
          { id: toastId }
        );
        router.push(
          `/verify-otp?email=${encodeURIComponent(
            credentials.email
          )}&flow=forgot-password`
        );
      } catch (error) {
        const message = extractErrorMessage(
          error,
          "Failed to process forgot password request"
        );
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [forgotPassword, dispatch, router]
  );

  // ---- VERIFY OTP ----
  const handleVerifyOtp = useCallback(
    async ({ email: targetEmail, otp, type }: VerifyOtpCredentials) => {
      const toastId = toast.loading("Verifying code...");
      try {
        const currentFlow =
          type ||
          (pendingFlow as "register" | "forgot-password" | "forgot" | "login") ||
          "register";

        const response = await verifyOtp({
          email: targetEmail,
          otp: String(otp),
          type: currentFlow,
        }).unwrap();

        if (currentFlow === "forgot-password" || currentFlow === "forgot") {
          const resetTokenStr =
            response?.data?.resetToken || response?.data?.token;
          if (resetTokenStr) {
            dispatch(setResetToken(resetTokenStr));
          }
          toast.success(
            response?.message ||
              "Verification code is valid. You may now enter your new password.",
            { id: toastId }
          );
          router.push(
            `/reset-password?email=${encodeURIComponent(
              targetEmail
            )}&otp=${encodeURIComponent(String(otp))}`
          );
        } else {
          // Registration or standard login verification
          let redirectPath = "/login";
          const tokenStr =
            response?.data?.token || response?.data?.accessToken;
          const returnedUser = response?.data?.user;

          if (tokenStr) {
            dispatch(setToken(tokenStr));
            saveToken(tokenStr);

            const decodedUser = decodeToken(tokenStr);
            const userObj =
              returnedUser || (decodedUser as unknown as IUser);
            if (userObj) {
              dispatch(setUser(userObj as IUser));
              redirectPath = getRoleRedirectPath(
                userObj.role,
                userObj.hasActiveSubscription
              );
            }
          }
          dispatch(clearPendingAuth());
          toast.success(
            response?.message || "Email address verified successfully!",
            { id: toastId }
          );
          router.push(redirectPath);
        }
      } catch (error) {
        const message = extractErrorMessage(error, "OTP verification failed");
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [verifyOtp, pendingFlow, dispatch, router]
  );

  // ---- RESET PASSWORD ----
  const handleResetPassword = useCallback(
    async (credentials: ResetPasswordCredentials) => {
      if (!credentials.email) {
        toast.error("Email address not found. Please restart the password reset process.");
        return;
      }
      const toastId = toast.loading("Setting new password...");
      try {
        const response = await resetPassword({
          email: credentials.email,
          newPassword: credentials.newPassword || credentials.password,
        }).unwrap();
        dispatch(clearPendingAuth());
        toast.success(
          response?.message ||
            "Password has been successfully updated. You can now log in with your new password.",
          { id: toastId }
        );
        router.push("/login");
      } catch (error) {
        const message = extractErrorMessage(error, "Failed to set password");
        toast.error(message, { id: toastId });
        throw new Error(message);
      }
    },
    [resetPassword, dispatch, router]
  );

  // ---- UPDATE PROFILE ----
  const handleUpdateProfile = useCallback(
    async (userData: Partial<IUser>) => {
      try {
        const response = await updateProfile({
          ...userData,
        }).unwrap();

        const updatedUser = response?.data;
        if (updatedUser) {
          dispatch(setUser(updatedUser));
        }

        return response;
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Failed to update profile"));
      }
    },
    [updateProfile, dispatch]
  );

  // ---- LOGOUT ----
  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
      dispatch(reset());
      clearToken();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Logout failed"));
    }
  }, [logout, dispatch, router]);

  // ---- ROLE HELPERS ----
  const getUserRole = useCallback((): IRole | null => {
    if (activeUser?.role) return activeUser.role;
    const decoded = decodeStoredToken();
    return decoded?.role || null;
  }, [activeUser]);

  const hasRole = useCallback(
    (requiredRoles: IRole[]): boolean => {
      const role = getUserRole();
      return role ? requiredRoles.includes(role) : false;
    },
    [getUserRole]
  );

  const isAdmin = useCallback((): boolean => hasRole([IRole.ADMIN]), [hasRole]);

  const isUser = useCallback(
    (): boolean => hasRole([IRole.USER, IRole.HOST]),
    [hasRole]
  );

  return {
    user: activeUser,
    token: activeToken,
    email: activeUser?.email || email || "",
    pendingEmail,
    pendingFlow,
    profile,
    isLoading,
    isAuthenticated: Boolean(activeToken),
    handleSendOtp,
    handleResendOtp,
    handleRegister,
    handleLogin,
    handleForgotPassword,
    handleResetPassword,
    handleVerifyOtp,
    handleUpdateProfile,
    handleLogout,
    getUserRole,
    hasRole,
    isAdmin,
    isUser,
  };
};
