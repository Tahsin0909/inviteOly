import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IVenue,
  ICreateVenuePayload,
  IUpdateVenuePayload,
} from "./venue.interface";

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenues: builder.query<ApiResponse<IVenue[]>, void>({
      query: () => "/venue",
      providesTags: ["venue"],
    }),
    getVenueById: builder.query<ApiResponse<IVenue>, string>({
      query: (id) => `/venue/${id}`,
      providesTags: (result, error, id) => [{ type: "venue", id }],
    }),
    createVenue: builder.mutation<ApiResponse<IVenue>, ICreateVenuePayload>({
      query: (body) => ({
        url: "/venue",
        method: "POST",
        body,
      }),
      invalidatesTags: ["venue"],
    }),
    updateVenue: builder.mutation<ApiResponse<IVenue>, IUpdateVenuePayload>({
      query: ({ id, ...body }) => ({
        url: `/venue/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["venue", { type: "venue", id }],
    }),
    deleteVenue: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/venue/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["venue"],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
} = venueApi;
