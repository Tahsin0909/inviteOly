import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IPayment } from "./payment.interface";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<ApiResponse<IPayment[]>, void>({
      query: () => "/payment",
      providesTags: ["payment"],
    }),
    getPaymentById: builder.query<ApiResponse<IPayment>, string>({
      query: (id) => `/payment/${id}`,
      providesTags: ["payment"],
    }),
    createPayment: builder.mutation<IPayment, Partial<IPayment>>({
      query: (body) => ({ url: "/payment", method: "POST", body }),
      invalidatesTags: ["payment"],
    }),
    updatePayment: builder.mutation<IPayment, Partial<IPayment> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/payment/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["payment"],
      }
    ),
    deletePayment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/payment/${id}`, method: "DELETE" }),
      invalidatesTags: ["payments"],
    }),
    getPricingPlans: builder.query<ApiResponse<unknown>, void>({
      query: () => "/pricing",
      providesTags: ["pricing"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetPricingPlansQuery,
} = paymentApi;
