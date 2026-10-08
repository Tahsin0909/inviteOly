import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import {
  IAdminUserListItem,
  IAdminUserProfile,
  IUser,
  TCreateUser,
  IAdminPartnerListItem,
  IAdminPartnerDetails,
  IInvitePartnerPayload,
  TPartnerStatus,
  IUpdateUserProfilePayload,
} from "./user.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<IUser[], true>, Partial<ApiParams>>({
      query: ({ page, limit, searchTerm }) => ({
        url: "/users",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["users"],
    }),

    getUserById: builder.query<ApiResponse<IUser>, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),

    createUser: builder.mutation<ApiResponse<{ token: string }>, Partial<TCreateUser>>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation<
      ApiResponse<IUser>,
      Partial<IUser> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    getAdminUsers: builder.query<
      ApiResponse<IAdminUserListItem[], true>,
      { page?: number; limit?: number; searchTerm?: string; role?: string }
    >({
      query: ({ page, limit, searchTerm, role }) => ({
        url: "/admin/users",
        params: { page, limit, searchTerm, role },
      }),
      providesTags: ["users"],
    }),

    getAdminUserProfile: builder.query<ApiResponse<IAdminUserProfile>, string>({
      query: (id) => `/admin/users/${id}`,
      providesTags: ["users"],
    }),

    suspendUser: builder.mutation<
      ApiResponse<{ success: boolean; status: string }>,
      string
    >({
      query: (id) => ({
        url: `/admin/users/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),

    // Admin Partner Endpoints
    getAdminPartners: builder.query<
      ApiResponse<IAdminPartnerListItem[], true>,
      { page?: number; limit?: number; searchTerm?: string; status?: string }
    >({
      query: ({ page, limit, searchTerm, status }) => ({
        url: "/admin/partners",
        params: { page, limit, searchTerm, status },
      }),
      providesTags: ["users"],
    }),

    getAdminPartnerById: builder.query<ApiResponse<IAdminPartnerDetails>, string>({
      query: (id) => `/admin/partners/${id}`,
      providesTags: ["users"],
    }),

    invitePartner: builder.mutation<
      ApiResponse<{ success: boolean; message: string }>,
      IInvitePartnerPayload
    >({
      query: (body) => ({
        url: "/admin/partners/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    updatePartnerPreferred: builder.mutation<
      ApiResponse<{ success: boolean; isPreferred: boolean }>,
      { id: string; isPreferred: boolean }
    >({
      query: ({ id, isPreferred }) => ({
        url: `/admin/partners/${id}/preferred`,
        method: "PATCH",
        body: { isPreferred },
      }),
      invalidatesTags: ["users"],
    }),

    updatePartnerStatus: builder.mutation<
      ApiResponse<{ success: boolean; status: TPartnerStatus }>,
      { id: string; status: TPartnerStatus }
    >({
      query: ({ id, status }) => ({
        url: `/admin/partners/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
    }),

    // Get current user profile - GET /user/me
    getMe: builder.query<ApiResponse<IUser>, void>({
      query: () => "/user/me",
      providesTags: ["profile", "users"],
    }),

    // Update profile - PATCH /user/me
    updateProfile: builder.mutation<
      ApiResponse<IUser>,
      IUpdateUserProfilePayload
    >({
      query: (body) => ({
        url: "/user/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // Profile photo upload - POST /user/upload-profile-image (FormData, key: image)
    uploadProfileImage: builder.mutation<ApiResponse<IUser>, FormData>({
      query: (body) => ({
        url: "/user/upload-profile-image",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // Remove profile photo - DELETE /user/remove-profile-image
    removeProfileImage: builder.mutation<ApiResponse<IUser>, void>({
      query: () => ({
        url: "/user/remove-profile-image",
        method: "DELETE",
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),

    // Delete current user account - DELETE /user/me
    deleteMyAccount: builder.mutation<
      ApiResponse<{ success?: boolean; message?: string }>,
      void
    >({
      query: () => ({
        url: "/user/me",
        method: "DELETE",
      }),
      invalidatesTags: ["profile", "users", "auth"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAdminUsersQuery,
  useGetAdminUserProfileQuery,
  useSuspendUserMutation,
  useGetAdminPartnersQuery,
  useGetAdminPartnerByIdQuery,
  useInvitePartnerMutation,
  useUpdatePartnerPreferredMutation,
  useUpdatePartnerStatusMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
  useDeleteMyAccountMutation,
} = userApi;


