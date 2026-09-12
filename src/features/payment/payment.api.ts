import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IPayment,
  IHostPendingPaymentEvent,
  IPaymentInvoice,
  ISubmitInvoicePayload,
} from "./payment.interface";

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
    updatePayment: builder.mutation<
      IPayment,
      Partial<IPayment> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/payment/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["payment"],
    }),
    deletePayment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/payment/${id}`, method: "DELETE" }),
      invalidatesTags: ["payment"],
    }),
    getPricingPlans: builder.query<ApiResponse<unknown>, void>({
      query: () => "/pricing",
      providesTags: ["pricing"],
    }),

    // Host Payment Pending Endpoints
    getHostPendingPayments: builder.query<
      ApiResponse<IHostPendingPaymentEvent[]>,
      void
    >({
      query: () => "/host/payment-pending",
      providesTags: ["payment"],
    }),
    getHostPaymentInvoice: builder.query<ApiResponse<IPaymentInvoice>, string>({
      query: (id) => `/host/payment-pending/${id}/invoice`,
      providesTags: ["payment"],
    }),
    uploadPaymentProof: builder.mutation<
      ApiResponse<{ success: boolean; receiptUrl: string }>,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/host/payment-pending/${id}/upload-receipt`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["payment"],
    }),
    submitPaymentInvoice: builder.mutation<
      ApiResponse<{ success: boolean; invoiceId: string; status: string }>,
      { id: string; body: ISubmitInvoicePayload }
    >({
      query: ({ id, body }) => ({
        url: `/host/payment-pending/${id}/submit-invoice`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["payment"],
    }),
    confirmHostPayment: builder.mutation<
      ApiResponse<{ success: boolean; status: string }>,
      string
    >({
      query: (id) => ({
        url: `/host/payment-pending/${id}/confirm`,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
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
  useGetHostPendingPaymentsQuery,
  useGetHostPaymentInvoiceQuery,
  useUploadPaymentProofMutation,
  useSubmitPaymentInvoiceMutation,
  useConfirmHostPaymentMutation,
} = paymentApi;
