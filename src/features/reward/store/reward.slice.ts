import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPendingRewardItem,
  IPayoutHistoryItem,
  IRewardStats,
  IRequestPayoutPayload,
} from "../reward.interface";
import {
  initialPendingRewards,
  initialPayoutHistory,
  initialRewardStats,
} from "../data/reward.data";

export interface RewardState {
  stats: IRewardStats;
  pendingRewards: IPendingRewardItem[];
  payoutHistory: IPayoutHistoryItem[];
  activeTab: "pending" | "history";
  commissionRate: number;
  isPayoutModalOpen: boolean;
  dateFrom: string;
  dateTo: string;
  currentPage: number;
}

const initialState: RewardState = {
  stats: initialRewardStats,
  pendingRewards: initialPendingRewards,
  payoutHistory: initialPayoutHistory,
  activeTab: "pending",
  commissionRate: 20,
  isPayoutModalOpen: false,
  dateFrom: "",
  dateTo: "",
  currentPage: 2,
};

export const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<"pending" | "history">) => {
      state.activeTab = action.payload;
    },
    setCommissionRate: (state, action: PayloadAction<number>) => {
      state.commissionRate = action.payload;
      if (state.stats) {
        state.stats.commissionRate = action.payload;
      }
    },
    setDateFilter: (
      state,
      action: PayloadAction<{ dateFrom: string; dateTo: string }>
    ) => {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    openPayoutModal: (state) => {
      state.isPayoutModalOpen = true;
    },
    closePayoutModal: (state) => {
      state.isPayoutModalOpen = false;
    },
    approveReward: (state, action: PayloadAction<string>) => {
      const idx = state.pendingRewards.findIndex((r) => r.id === action.payload);
      if (idx !== -1) {
        const item = state.pendingRewards[idx];
        item.status = "Approved";

        const newPayout: IPayoutHistoryItem = {
          id: `pay-${Date.now()}`,
          payoutId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
          partnerName: item.partnerName,
          partnerEmail: item.partnerEmail,
          date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
          referenceId: item.orderId,
          method: "Bank Transfer",
          reward: item.reward,
          status: "Paid",
        };
        state.payoutHistory.unshift(newPayout);

        const numericReward =
          typeof item.reward === "string"
            ? parseFloat(item.reward.replace(/[^0-9.-]+/g, ""))
            : item.reward;

        if (!isNaN(numericReward)) {
          state.stats.pendingRewards = Math.max(
            0,
            state.stats.pendingRewards - numericReward
          );
          state.stats.paidRewards += numericReward;
          if (state.stats.rewardsPayout !== undefined) {
            state.stats.rewardsPayout += numericReward;
          }
        }
      }
    },
    requestPayout: (state, action: PayloadAction<IRequestPayoutPayload>) => {
      const { amount, method } = action.payload;
      const newPayout: IPayoutHistoryItem = {
        id: `pay-${Date.now()}`,
        payoutId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
        referenceId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        method,
        reward: `$${amount.toFixed(2)}`,
        status: "Paid",
      };

      state.payoutHistory.unshift(newPayout);
      state.stats.pendingRewards = Math.max(
        0,
        state.stats.pendingRewards - amount
      );
      state.stats.paidRewards += amount;
      state.isPayoutModalOpen = false;
    },
  },
});

export const {
  setActiveTab,
  setCommissionRate,
  setDateFilter,
  setCurrentPage,
  openPayoutModal,
  closePayoutModal,
  approveReward,
  requestPayout,
} = rewardSlice.actions;

export const rewardReducer = rewardSlice.reducer;
