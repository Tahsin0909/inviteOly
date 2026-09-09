import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IEvent, IPartnerEvent } from "./event.interface";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse<IEvent[]>, void>({
      query: () => "/event",
      providesTags: ["event"],
    }),
    getPartnerEvents: builder.query<ApiResponse<IPartnerEvent[]>, void>({
      query: () => "/event/partner",
      providesTags: ["event"],
    }),
    getEventById: builder.query<ApiResponse<IEvent>, string>({
      query: (id) => `/event/${id}`,
      providesTags: ["event"],
    }),
    createEvent: builder.mutation<IEvent, Partial<IEvent>>({
      query: (body) => ({ url: "/event", method: "POST", body }),
      invalidatesTags: ["event"],
    }),
    updateEvent: builder.mutation<IEvent, Partial<IEvent> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/event/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["event"],
      }
    ),
    deleteEvent: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/event/${id}`, method: "DELETE" }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetPartnerEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
