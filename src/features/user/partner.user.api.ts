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
      query: () => "/user/partner/profile",
      providesTags: ["profile", "users"],
    }),

    // 2. Update Partner Profile
    updatePartnerProfile: builder.mutation<
      ApiResponse<IUser>,
      IUpdatePartnerProfileDto
    >({
      query: (body) => ({
        url: "/user/partner/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["profile", "users"],
    }),

    // 3. Upload Partner Avatar / Profile Photo
    uploadPartnerAvatar: builder.mutation<
      ApiResponse<{ profileImage: string }>,
      FormData
    >({
      query: (body) => ({
        url: "/user/partner/avatar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profile", "users"],
    }),

    // 4. Remove Partner Photo
    removePartnerAvatar: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/user/partner/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["profile", "users"],
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
        url: "/user/partner/account",
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
