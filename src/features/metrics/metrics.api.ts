import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IHostMetrics,
  IMetrics,
  IPartnerMetrics,
} from "./metrics.interface";

export const metricsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetricss: builder.query<ApiResponse<IMetrics[]>, void>({
      query: () => "/metrics",
      providesTags: ["metrics"],
    }),
    getMetricsById: builder.query<ApiResponse<IMetrics>, string>({
      query: (id) => `/metrics/${id}`,
      providesTags: ["metrics"],
    }),
    // Partner Metrics Dummy Endpoint (ready for future integration)
    getPartnerMetrics: builder.query<ApiResponse<IPartnerMetrics>, void>({
      query: () => "/metrics/partner",
      providesTags: ["metrics"],
    }),
    // Host Metrics Dummy Endpoint (ready for future integration)
    getHostMetrics: builder.query<ApiResponse<IHostMetrics>, void>({
      query: () => "/metrics/host",
      providesTags: ["metrics"],
    }),
    createMetrics: builder.mutation<IMetrics, Partial<IMetrics>>({
      query: (body) => ({ url: "/metrics", method: "POST", body }),
      invalidatesTags: ["metrics"],
    }),
    updateMetrics: builder.mutation<IMetrics, Partial<IMetrics> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/metrics/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["metrics"],
      }
    ),
    deleteMetrics: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/metrics/${id}`, method: "DELETE" }),
      invalidatesTags: ["metrics"],
    }),
  }),
});

export const {
  useGetMetricssQuery,
  useGetMetricsByIdQuery,
  useGetPartnerMetricsQuery,
  useGetHostMetricsQuery,
  useCreateMetricsMutation,
  useUpdateMetricsMutation,
  useDeleteMetricsMutation,
} = metricsApi;

