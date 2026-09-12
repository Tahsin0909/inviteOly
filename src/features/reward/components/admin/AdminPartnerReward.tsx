"use client";

import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveTab,
  setCurrentPage,
  approveReward,
} from "../../store/reward.slice";
import { IPendingRewardItem } from "../../reward.interface";
import AdminRewardStats from "./AdminRewardStats";
import AdminCommissionControl from "./AdminCommissionControl";
import AdminRewardFilters from "./AdminRewardFilters";
import AdminPendingRewardTable from "./AdminPendingRewardTable";
import AdminPayoutLedgerTable from "./AdminPayoutLedgerTable";
import AdminApprovePayoutModal from "./AdminApprovePayoutModal";
import { RewardTabs } from "../shared/RewardTabs";
import { RewardPagination } from "../shared/RewardPagination";
import { toast } from "sonner";

export const AdminPartnerReward: React.FC = () => {
  const dispatch = useDispatch();
  const rewardState = useSelector((state: RootState) => state.reward);

  const stats = rewardState?.stats || {
    totalRewards: 5486,
    pendingRewards: 2400,
    paidRewards: 3150,
    rewardsPayout: 3150,
    commissionRate: 20,
  };
  const rawPendingRewards = rewardState?.pendingRewards;
  const payoutHistory = rewardState?.payoutHistory || [];
  const activeTab = rewardState?.activeTab || "pending";
  const currentPage = rewardState?.currentPage || 2;
  const commissionRate = rewardState?.commissionRate || 20;
  const dateFrom = rewardState?.dateFrom || "";
  const dateTo = rewardState?.dateTo || "";

  const [selectedRewardToApprove, setSelectedRewardToApprove] =
    useState<IPendingRewardItem | null>(null);

  // Filter pending rewards based on optional date search
  const filteredPendingRewards = useMemo(() => {
    const list = rawPendingRewards || [];
    if (!dateFrom && !dateTo) return list;
    return list.filter((item) => {
      if (dateFrom && !item.date.includes(dateFrom)) return false;
      if (dateTo && !item.date.includes(dateTo)) return false;
      return true;
    });
  }, [rawPendingRewards, dateFrom, dateTo]);

  const handleConfirmApproval = (item: IPendingRewardItem) => {
    dispatch(approveReward(item.id));
    toast.success(
      `Reward of ${item.reward} for ${item.partnerName || "Partner"} approved!`
    );
    setSelectedRewardToApprove(null);
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header Section */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            Partner Reward
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
            Manage and track rewards earned by partners
          </p>
        </div>

        {/* When on Payout History, Commission % appears in the top right per design */}
        {activeTab === "history" && (
          <AdminCommissionControl currentRate={commissionRate} />
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. Tabs */}
      {/* ========================================================================= */}
      <RewardTabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
      />

      {/* ========================================================================= */}
      {/* 3. 4 Stat Summary Cards */}
      {/* ========================================================================= */}
      <AdminRewardStats stats={stats} />

      {/* ========================================================================= */}
      {/* 4. Filters (On Pending Reward tab, per media_1789195262932.png) */}
      {/* ========================================================================= */}
      {activeTab === "pending" && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <AdminRewardFilters dateFrom={dateFrom} dateTo={dateTo} />
          <AdminCommissionControl currentRate={commissionRate} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Main Table Container */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {activeTab === "pending" ? (
          <AdminPendingRewardTable
            items={filteredPendingRewards}
            onApproveClick={(item) => setSelectedRewardToApprove(item)}
          />
        ) : (
          <AdminPayoutLedgerTable items={payoutHistory} />
        )}

        {/* ========================================================================= */}
        {/* 6. Pagination */}
        {/* ========================================================================= */}
        <RewardPagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </div>

      {/* Approval Modal */}
      <AdminApprovePayoutModal
        item={selectedRewardToApprove}
        onClose={() => setSelectedRewardToApprove(null)}
        onConfirm={handleConfirmApproval}
      />
    </div>
  );
};

export default AdminPartnerReward;

