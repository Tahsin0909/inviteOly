import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import {
  IRewardStats,
  IPendingRewardItem,
  IPayoutHistoryItem,
  IRequestPayoutPayload,
  IUpdateCommissionPayload,
} from "./reward.interface";

export const rewardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRewardStats: builder.query<ApiResponse<IRewardStats>, void>({
      query: () => "/reward/stats",
      providesTags: ["reward"],
    }),
    getPendingRewards: builder.query<
      ApiResponse<IPendingRewardItem[]>,
      { dateFrom?: string; dateTo?: string } | void
    >({
      query: (params) => ({
        url: "/reward/pending",
        params: params || {},
      }),
      providesTags: ["reward"],
    }),
    getPayoutHistory: builder.query<ApiResponse<IPayoutHistoryItem[]>, void>({
      query: () => "/reward/payout-history",
      providesTags: ["reward"],
    }),
    updateCommissionRate: builder.mutation<
      ApiResponse<{ commissionRate: number }>,
      IUpdateCommissionPayload
    >({
      query: (body) => ({
        url: "/reward/commission-rate",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["reward"],
    }),
    requestPayout: builder.mutation<
      ApiResponse<IPayoutHistoryItem>,
      IRequestPayoutPayload
    >({
      query: (body) => ({
        url: "/reward/payout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reward"],
    }),
    approveReward: builder.mutation<
      ApiResponse<{ id: string; status: string }>,
      string
    >({
      query: (id) => ({
        url: `/reward/approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["reward"],
    }),
    rejectReward: builder.mutation<
      ApiResponse<{ id: string; status: string }>,
      string
    >({
      query: (id) => ({
        url: `/reward/reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["reward"],
    }),
  }),
});

export const {
  useGetRewardStatsQuery,
  useGetPendingRewardsQuery,
  useGetPayoutHistoryQuery,
  useUpdateCommissionRateMutation,
  useRequestPayoutMutation,
  useApproveRewardMutation,
  useRejectRewardMutation,
} = rewardApi;

