import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { extractErrorMessage, clearToken } from "@/utils/tokenHandler";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
  useDeleteMyAccountMutation,
} from "../user.api";
import { updateUser, clearPendingAuth, reset } from "@/features/auth/store/auth.slice";
import { IUpdateUserProfilePayload } from "../user.interface";

export const useUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: meData,
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
    error: profileError,
    refetch: refetchProfile,
  } = useGetMeQuery();

  const [updateProfileMutation, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [uploadProfileImageMutation, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();
  const [removeProfileImageMutation, { isLoading: isRemovingImage }] =
    useRemoveProfileImageMutation();
  const [deleteMyAccountMutation, { isLoading: isDeletingAccount }] =
    useDeleteMyAccountMutation();

  const user = meData?.data;

  // 1. Update Profile (PATCH /user/me)
  const handleUpdateProfile = useCallback(
    async (payload: IUpdateUserProfilePayload) => {
      const toastId = toast.loading("Updating profile...");
      try {
        const response = await updateProfileMutation(payload).unwrap();
        if (response.data) {
          dispatch(updateUser(response.data));
        }
        toast.success(response.message || "Profile updated successfully!", {
          id: toastId,
        });
        return response.data;
      } catch (error) {
        const message = extractErrorMessage(error, "Failed to update profile");
        toast.error(message, { id: toastId });
        throw error;
      }
    },
    [updateProfileMutation, dispatch]
  );

  // 2. Upload Profile Image (POST /user/upload-profile-image)
  const handleUploadProfileImage = useCallback(
    async (file: File) => {
      const toastId = toast.loading("Uploading profile image...");
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await uploadProfileImageMutation(formData).unwrap();
        if (response.data) {
          dispatch(updateUser(response.data));
        }
        toast.success(
          response.message || "Profile image uploaded successfully to Cloudinary!",
          { id: toastId }
        );
        return response.data;
      } catch (error) {
        const message = extractErrorMessage(
          error,
          "Failed to upload profile image"
        );
        toast.error(message, { id: toastId });
        throw error;
      }
    },
    [uploadProfileImageMutation, dispatch]
  );

  // 3. Remove Profile Image (DELETE /user/remove-profile-image)
  const handleRemoveProfileImage = useCallback(async () => {
    const toastId = toast.loading("Removing profile photo...");
    try {
      const response = await removeProfileImageMutation().unwrap();
      dispatch(updateUser({ profileImage: null }));
      toast.success(
        response?.message || "Profile photo removed successfully",
        { id: toastId }
      );
      return response;
    } catch (error) {
      const message = extractErrorMessage(
        error,
        "Failed to remove profile photo"
      );
      toast.error(message, { id: toastId });
      throw error;
    }
  }, [removeProfileImageMutation, dispatch]);

  // 4. Delete Account (DELETE /user/me)
  const handleDeleteAccount = useCallback(async () => {
    const toastId = toast.loading("Deleting your account...");
    try {
      const response = await deleteMyAccountMutation().unwrap();
      clearToken();
      dispatch(clearPendingAuth());
      dispatch(reset());
      toast.success(response?.message || "Account deleted successfully", {
        id: toastId,
      });
      router.push("/register");
      return response;
    } catch (error) {
      const message = extractErrorMessage(error, "Failed to delete account");
      toast.error(message, { id: toastId });
      throw error;
    }
  }, [deleteMyAccountMutation, dispatch, router]);

  return {
    user,
    isProfileLoading,
    isProfileFetching,
    profileError,
    refetchProfile,
    isUpdatingProfile,
    isUploadingImage,
    isRemovingImage,
    isDeletingAccount,
    handleUpdateProfile,
    handleUploadProfileImage,
    handleRemoveProfileImage,
    handleDeleteAccount,
  };
};

