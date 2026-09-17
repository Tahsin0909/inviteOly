import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  ICreatePromoCodePayload,
  IPromotionalCode,
} from "./promotional-codes.interface";

export const promotionalCodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionalCodes: builder.query<
      ApiResponse<IPromotionalCode[], true>,
      { page?: number; limit?: number; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/admin/promotional-codes",
        params: params || undefined,
      }),
      providesTags: ["promotional-codes"],
    }),

    getPromotionalCodeById: builder.query<ApiResponse<IPromotionalCode>, string>(
      {
        query: (id) => `/admin/promotional-codes/${id}`,
        providesTags: ["promotional-codes"],
      }
    ),

    createPromotionalCode: builder.mutation<
      ApiResponse<IPromotionalCode>,
      ICreatePromoCodePayload
    >({
      query: (body) => ({
        url: "/admin/promotional-codes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["promotional-codes"],
    }),

    deletePromotionalCode: builder.mutation<
      ApiResponse<{ success: boolean; id: string }>,
      string
    >({
      query: (id) => ({
        url: `/admin/promotional-codes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["promotional-codes"],
    }),
  }),
});

export const {
  useGetPromotionalCodesQuery,
  useGetPromotionalCodeByIdQuery,
  useCreatePromotionalCodeMutation,
  useDeletePromotionalCodeMutation,
} = promotionalCodesApi;
