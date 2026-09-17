import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IEvent,
  IPartnerEvent,
  IHostEventItem,
  IHostTicketGuest,
  IAddGuestPayload,
  IHostDashboardEvent,
  IHostRsvpMetrics,
  IAdminEventsResponseData,
  IAdminEventDetails,
  IEventOrderItem,
} from "./event.interface";

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
    updateEvent: builder.mutation<IEvent, Partial<IEvent> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/event/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["event"],
    }),
    deleteEvent: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/event/${id}`, method: "DELETE" }),
      invalidatesTags: ["event"],
    }),

    // Host Events Endpoints (RTK Query definitions without integration)
    getHostEvents: builder.query<ApiResponse<IHostEventItem[]>, void>({
      query: () => "/host/events",
      providesTags: ["event"],
    }),
    getHostEventById: builder.query<ApiResponse<IHostEventItem>, string>({
      query: (id) => `/host/events/${id}`,
      providesTags: ["event"],
    }),
    getHostEventTickets: builder.query<
      ApiResponse<IHostTicketGuest[]>,
      { eventId: string; status?: string; search?: string }
    >({
      query: ({ eventId, status, search }) => ({
        url: `/host/events/${eventId}/tickets`,
        params: { status, search },
      }),
      providesTags: ["event"],
    }),
    addHostGuest: builder.mutation<
      ApiResponse<IHostTicketGuest>,
      { eventId: string; body: IAddGuestPayload }
    >({
      query: ({ eventId, body }) => ({
        url: `/host/events/${eventId}/tickets`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["event"],
    }),
    sendTicketReminder: builder.mutation<
      ApiResponse<{ success: boolean }>,
      { eventId: string; ticketId: string }
    >({
      query: ({ eventId, ticketId }) => ({
        url: `/host/events/${eventId}/tickets/${ticketId}/remind`,
        method: "POST",
      }),
      invalidatesTags: ["event"],
    }),
    bulkSendTickets: builder.mutation<
      ApiResponse<{ sentCount: number }>,
      { eventId: string; ticketIds: string[] }
    >({
      query: ({ eventId, ticketIds }) => ({
        url: `/host/events/${eventId}/tickets/bulk-send`,
        method: "POST",
        body: { ticketIds },
      }),
      invalidatesTags: ["event"],
    }),
    regenerateScannerCode: builder.mutation<
      ApiResponse<{ scannerCode: string }>,
      string
    >({
      query: (eventId) => ({
        url: `/host/events/${eventId}/scanner-code/regenerate`,
        method: "POST",
      }),
      invalidatesTags: ["event"],
    }),
    getHostDashboardEvents: builder.query<
      ApiResponse<IHostDashboardEvent[]>,
      void
    >({
      query: () => "/host/dashboard/events",
      providesTags: ["event"],
    }),
    getHostRsvpMetrics: builder.query<ApiResponse<IHostRsvpMetrics>, void>({
      query: () => "/host/dashboard/rsvp-metrics",
      providesTags: ["event"],
    }),
    getAdminEvents: builder.query<ApiResponse<IAdminEventsResponseData>, void>({
      query: () => "/admin/events",
      providesTags: ["event"],
    }),
    getAdminEventById: builder.query<ApiResponse<IAdminEventDetails>, string>({
      query: (id) => `/admin/events/${id}`,
      providesTags: ["event"],
    }),
    getAdminEventOrders: builder.query<ApiResponse<IEventOrderItem[]>, void>({
      query: () => "/admin/event-orders",
      providesTags: ["event"],
    }),
    approveEventOrder: builder.mutation<
      ApiResponse<{ success: boolean; status: string }>,
      string
    >({
      query: (orderId) => ({
        url: `/admin/event-orders/${orderId}/approve`,
        method: "POST",
      }),
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
  useGetHostEventsQuery,
  useGetHostEventByIdQuery,
  useGetHostEventTicketsQuery,
  useAddHostGuestMutation,
  useSendTicketReminderMutation,
  useBulkSendTicketsMutation,
  useRegenerateScannerCodeMutation,
  useGetHostDashboardEventsQuery,
  useGetHostRsvpMetricsQuery,
  useGetAdminEventsQuery,
  useGetAdminEventByIdQuery,
  useGetAdminEventOrdersQuery,
  useApproveEventOrderMutation,
} = eventApi;
