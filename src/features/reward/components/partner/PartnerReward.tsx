"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveTab,
  setCurrentPage,
  openPayoutModal,
} from "../../store/reward.slice";
import PartnerRewardStats from "./PartnerRewardStats";
import PartnerPendingRewardTable from "./PartnerPendingRewardTable";
import PartnerPayoutHistoryTable from "./PartnerPayoutHistoryTable";
import PartnerPayoutModal from "./PartnerPayoutModal";
import { RewardTabs } from "../shared/RewardTabs";
import { RewardPagination } from "../shared/RewardPagination";

export const PartnerReward: React.FC = () => {
  const dispatch = useDispatch();
  const rewardState = useSelector((state: RootState) => state.reward);

  const stats = rewardState?.stats || {
    totalRewards: 5486,
    pendingRewards: 2400,
    paidRewards: 3150,
  };
  const pendingRewards = rewardState?.pendingRewards || [];
  const payoutHistory = rewardState?.payoutHistory || [];
  const activeTab = rewardState?.activeTab || "pending";
  const currentPage = rewardState?.currentPage || 2;

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header with PayOut Action */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            Reward
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
            Track your rewards and see what you&apos;ve earned
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(openPayoutModal())}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
        >
          PayOut
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Top Tabs */}
      {/* ========================================================================= */}
      <RewardTabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
      />

      {/* ========================================================================= */}
      {/* 3. 3 Stat Summary Cards */}
      {/* ========================================================================= */}
      <PartnerRewardStats stats={stats} />

      {/* ========================================================================= */}
      {/* 4. Table (Pending vs History) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {activeTab === "pending" ? (
          <PartnerPendingRewardTable items={pendingRewards} />
        ) : (
          <PartnerPayoutHistoryTable items={payoutHistory} />
        )}

        {/* ========================================================================= */}
        {/* 5. Pagination */}
        {/* ========================================================================= */}
        <RewardPagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </div>

      {/* Payout Request Modal */}
      <PartnerPayoutModal />
    </div>
  );
};

export default PartnerReward;

