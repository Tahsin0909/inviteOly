import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IChangePartnerPasswordDto,
  IUpdatePartnerProfileDto,
  IUser,
} from "./user.interface";

export const partnerUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Partner Profile
    getPartnerProfile: builder.query<ApiResponse<IUser>, void>({
      query: () => "/user/me",
      providesTags: ["profile", "users"],
    }),

    // 2. Update Partner Profile
    updatePartnerProfile: builder.mutation<
      ApiResponse<IUser>,
      IUpdatePartnerProfileDto | Record<string, unknown>
    >({
      query: (body) => ({
        url: "/user/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // 3. Upload Partner Avatar / Profile Photo
    uploadPartnerAvatar: builder.mutation<
      ApiResponse<IUser>,
      FormData
    >({
      query: (body) => ({
        url: "/user/upload-profile-image",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // 4. Remove Partner Photo
    removePartnerAvatar: builder.mutation<ApiResponse<IUser | void>, void>({
      query: () => ({
        url: "/user/remove-profile-image",
        method: "DELETE",
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // 5. Change Password
    changePartnerPassword: builder.mutation<
      ApiResponse<void>,
      IChangePartnerPasswordDto
    >({
      query: (body) => ({
        url: "/user/partner/change-password",
        method: "PUT",
        body,
      }),
    }),

    // 6. Delete Partner Account
    deletePartnerAccount: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/user/me",
        method: "DELETE",
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),
  }),
});

export const {
  useGetPartnerProfileQuery,
  useUpdatePartnerProfileMutation,
  useUploadPartnerAvatarMutation,
  useRemovePartnerAvatarMutation,
  useChangePartnerPasswordMutation,
  useDeletePartnerAccountMutation,
} = partnerUserApi;
