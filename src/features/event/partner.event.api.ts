import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IEventCard,
  IPartnerEventDetails,
  IPartnerEventsManagementData,
} from "./event.interface";

export const partnerEventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPartnerEventsManagement: builder.query<
      ApiResponse<IPartnerEventsManagementData>,
      void
    >({
      query: () => "/event/partner/management",
      providesTags: ["event"],
    }),
    getPartnerCurrentEvents: builder.query<ApiResponse<IEventCard[]>, void>({
      query: () => "/event/partner/current",
      providesTags: ["event"],
    }),
    getPartnerPastEvents: builder.query<ApiResponse<IEventCard[]>, void>({
      query: () => "/event/partner/past",
      providesTags: ["event"],
    }),
    getPartnerEventById: builder.query<ApiResponse<IEventCard>, string>({
      query: (id) => `/event/partner/${id}`,
      providesTags: ["event"],
    }),
    getPartnerEventDetails: builder.query<
      ApiResponse<IPartnerEventDetails>,
      string
    >({
      query: (id) => `/event/partner/details/${id}`,
      providesTags: ["event"],
    }),
  }),
});

export const {
  useGetPartnerEventsManagementQuery,
  useGetPartnerCurrentEventsQuery,
  useGetPartnerPastEventsQuery,
  useGetPartnerEventByIdQuery,
  useGetPartnerEventDetailsQuery,
} = partnerEventApi;
