import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IHostInvite,
  ICreateHostInvitePayload,
  IUpdateHostInvitePayload,
} from "./hostandpartner.interface";

export const hostandpartnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHostInvites: builder.query<ApiResponse<IHostInvite[]>, void>({
      query: () => "/partner/invite-host",
      providesTags: ["hostandpartner"],
    }),
    getHostInviteById: builder.query<ApiResponse<IHostInvite>, string>({
      query: (id) => `/partner/invite-host/${id}`,
      providesTags: (result, error, id) => [{ type: "hostandpartner", id }],
    }),
    createHostInvite: builder.mutation<
      ApiResponse<IHostInvite>,
      ICreateHostInvitePayload
    >({
      query: (body) => ({
        url: "/partner/invite-host",
        method: "POST",
        body,
      }),
      invalidatesTags: ["hostandpartner"],
    }),
    updateHostInvite: builder.mutation<
      ApiResponse<IHostInvite>,
      IUpdateHostInvitePayload
    >({
      query: ({ id, ...body }) => ({
        url: `/partner/invite-host/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "hostandpartner",
        { type: "hostandpartner", id },
      ],
    }),
    resendHostInvite: builder.mutation<
      ApiResponse<{ id: string; resent: boolean }>,
      string
    >({
      query: (id) => ({
        url: `/partner/invite-host/${id}/resend`,
        method: "POST",
      }),
    }),
    cancelHostInvite: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/partner/invite-host/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hostandpartner"],
    }),
  }),
});

export const {
  useGetHostInvitesQuery,
  useGetHostInviteByIdQuery,
  useCreateHostInviteMutation,
  useUpdateHostInviteMutation,
  useResendHostInviteMutation,
  useCancelHostInviteMutation,
} = hostandpartnerApi;
