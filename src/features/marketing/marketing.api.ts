import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IMarketing } from "./marketing.interface";

export const marketingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketings: builder.query<ApiResponse<IMarketing[]>, void>({
      query: () => "/marketing",
      providesTags: ["marketing"],
    }),
    getMarketingById: builder.query<ApiResponse<IMarketing>, string>({
      query: (id) => `/marketing/${id}`,
      providesTags: ["marketing"],
    }),
    createMarketing: builder.mutation<IMarketing, Partial<IMarketing>>({
      query: (body) => ({ url: "/marketing", method: "POST", body }),
      invalidatesTags: ["marketing"],
    }),
    updateMarketing: builder.mutation<IMarketing, Partial<IMarketing> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/marketing/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["marketing"],
      }
    ),
    deleteMarketing: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/marketing/${id}`, method: "DELETE" }),
      invalidatesTags: ["marketing"],
    }),
  }),
});

export const {
  useGetMarketingsQuery,
  useGetMarketingByIdQuery,
  useCreateMarketingMutation,
  useUpdateMarketingMutation,
  useDeleteMarketingMutation,
} = marketingApi;
