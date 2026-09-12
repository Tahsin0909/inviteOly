"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveTab,
  setCurrentPage,
  setCommissionRate,
  setDateFilter,
  approveReward,
} from "../store/reward.slice";
import { IPendingRewardItem } from "../reward.interface";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  X,
} from "lucide-react";

export const AdminPartnerReward: React.FC = () => {
  const dispatch = useDispatch();
  const {
    stats,
    pendingRewards,
    payoutHistory,
    activeTab,
    currentPage,
    commissionRate,
    dateFrom,
    dateTo,
  } = useSelector((state: RootState) => state.reward);

  const [localCommission, setLocalCommission] = useState<string>(
    String(commissionRate || 20)
  );
  const [showApplySuccess, setShowApplySuccess] = useState<boolean>(false);
  const [selectedRewardToApprove, setSelectedRewardToApprove] =
    useState<IPendingRewardItem | null>(null);

  const handleApplyCommission = () => {
    const num = parseFloat(localCommission.replace(/[^0-9.]/g, ""));
    if (!isNaN(num) && num >= 0 && num <= 100) {
      dispatch(setCommissionRate(num));
      setShowApplySuccess(true);
      setTimeout(() => setShowApplySuccess(false), 2500);
    }
  };

  const handleConfirmApproval = () => {
    if (selectedRewardToApprove) {
      dispatch(approveReward(selectedRewardToApprove.id));
      setSelectedRewardToApprove(null);
    }
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

        {/* Top Right Commission % (Visible on History tab or larger screens) */}
        <div className="flex flex-col sm:items-end gap-1">
          <span className="text-xs text-neutral-600 font-medium">Commission %</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={localCommission}
                onChange={(e) => setLocalCommission(e.target.value)}
                placeholder="20%"
                className="w-20 px-3 py-1.5 border border-neutral-200 rounded-lg text-xs font-semibold text-center text-neutral-800 focus:outline-none focus:border-[#C39B4C] bg-white"
              />
              {!localCommission.endsWith("%") && (
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none">
                  %
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleApplyCommission}
              className="px-4 py-1.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Apply
            </button>
          </div>
          {showApplySuccess && (
            <span className="text-[11px] text-emerald-600 font-medium animate-fade-in">
              Commission updated!
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Tabs: Pending Reward & Payout History */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-6 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => dispatch(setActiveTab("pending"))}
          className={`pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer ${activeTab === "pending"
            ? "text-[#C39B4C] font-semibold"
            : "text-neutral-500 hover:text-neutral-800"
            }`}
        >
          Pending Reward
          {activeTab === "pending" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C39B4C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => dispatch(setActiveTab("history"))}
          className={`pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer ${activeTab === "history"
            ? "text-[#C39B4C] font-semibold"
            : "text-neutral-500 hover:text-neutral-800"
            }`}
        >
          Payout History
          {activeTab === "history" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C39B4C]" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. 4 Stat Summary Cards */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-[#C39B4C]/10 border border-[#C39B4C]/20 text-[#C39B4C] flex items-center justify-center mb-4">
            <Award className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900">
              ${stats.totalRewards}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
              Total Rewards
            </p>
          </div>
        </div>

        {/* Pending Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-red-50 border border-red-200/60 text-red-500 flex items-center justify-center mb-4">
            <Clock className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900">
              ${stats.pendingRewards}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
              Pending Rewards
            </p>
          </div>
        </div>

        {/* Paid Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900">
              ${stats.paidRewards}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
              Paid Rewards
            </p>
          </div>
        </div>

        {/* Rewards Payout */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-[#C39B4C]/10 border border-[#C39B4C]/20 text-[#C39B4C] flex items-center justify-center mb-4">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900">
              ${stats.rewardsPayout || stats.paidRewards}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
              Rewards Payout
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Filters / Subheaders */}
      {/* ========================================================================= */}
      {activeTab === "pending" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Date Range Inputs */}
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Date From
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yy"
                  value={dateFrom}
                  onChange={(e) =>
                    dispatch(
                      setDateFilter({ dateFrom: e.target.value, dateTo })
                    )
                  }
                  className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C39B4C]"
                />
                <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Date To
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yy"
                  value={dateTo}
                  onChange={(e) =>
                    dispatch(
                      setDateFilter({ dateFrom, dateTo: e.target.value })
                    )
                  }
                  className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C39B4C]"
                />
                <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Main Table Container */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {activeTab === "history" && (
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="text-base font-bold font-space-grotesk text-neutral-900">
              Payout Ledger
            </h2>
          </div>
        )}

        <div className="overflow-x-auto">
          {activeTab === "pending" ? (
            /* Pending Reward Table */
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-work-sans">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
                  <th className="py-3.5 px-6">Partner</th>
                  <th className="py-3.5 px-4">Event</th>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Ticket Revenue</th>
                  <th className="py-3.5 px-4">Rate</th>
                  <th className="py-3.5 px-4">Reward</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {pendingRewards.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-neutral-900">
                        {item.partnerName || "Partner"}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {item.partnerEmail || "partner@example.com"}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-neutral-800">
                      {item.eventName}
                    </td>
                    <td className="py-4 px-4 text-neutral-500 font-mono text-xs">
                      {item.orderId}
                    </td>
                    <td className="py-4 px-4 font-medium text-neutral-900">
                      {item.ticketRevenue}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">{item.rate}</td>
                    <td className="py-4 px-4 font-semibold text-neutral-900">
                      {item.reward}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">{item.date}</td>
                    <td className="py-4 px-6 text-center">
                      {item.status === "Pending" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedRewardToApprove(item)}
                          className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#EA580C] border border-[#FFEDD5] transition-all cursor-pointer shadow-2xs hover:scale-105"
                          title="Click to Approve Payout"
                        >
                          Pending
                        </button>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#16A34A]">
                          {item.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Payout History Table */
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-work-sans">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
                  <th className="py-3.5 px-6">Payout ID</th>
                  <th className="py-3.5 px-4">Partner</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Reference ID</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Reward</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {payoutHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-neutral-600">
                      {item.payoutId}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-neutral-900">
                        {item.partnerName || "Partner"}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {item.partnerEmail || "partner@example.com"}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-neutral-500">{item.date}</td>
                    <td className="py-4 px-4 font-mono text-xs text-neutral-500">
                      {item.referenceId}
                    </td>
                    <td className="py-4 px-4 text-neutral-700 font-medium">
                      {item.method}
                    </td>
                    <td className="py-4 px-4 font-semibold text-neutral-900">
                      {item.reward}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E0F2FE] text-[#0284C7]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 6. Pagination */}
        {/* ========================================================================= */}
        <div className="py-4 px-6 border-t border-neutral-100 flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              dispatch(setCurrentPage(Math.max(1, currentPage - 1)))
            }
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => dispatch(setCurrentPage(page))}
              className={`size-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${currentPage === page
                ? "bg-[#C39B4C] text-white shadow-2xs font-semibold"
                : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              dispatch(setCurrentPage(Math.min(5, currentPage + 1)))
            }
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. Approve Confirmation Modal */}
      {/* ========================================================================= */}
      {selectedRewardToApprove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in font-work-sans">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-neutral-100 relative">
            <button
              type="button"
              onClick={() => setSelectedRewardToApprove(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 p-1 rounded-full hover:bg-neutral-100 cursor-pointer transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-amber-50 text-[#C39B4C] flex items-center justify-center">
                <Award className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-space-grotesk text-neutral-900">
                  Approve Reward Payout
                </h3>
                <p className="text-xs text-neutral-500">
                  Confirm payout approval for this partner
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 space-y-2 mb-6 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-400">Partner:</span>
                <span className="font-semibold text-neutral-800">
                  {selectedRewardToApprove.partnerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Event:</span>
                <span className="font-medium text-neutral-800">
                  {selectedRewardToApprove.eventName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Order ID:</span>
                <span className="font-mono text-neutral-800">
                  {selectedRewardToApprove.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Ticket Revenue:</span>
                <span className="font-medium text-neutral-800">
                  {selectedRewardToApprove.ticketRevenue}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm">
                <span className="font-medium text-neutral-700">
                  Reward Amount:
                </span>
                <span className="font-bold text-[#C39B4C]">
                  {selectedRewardToApprove.reward}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedRewardToApprove(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#C39B4C] hover:bg-[#B38A3B] rounded-lg cursor-pointer transition-all shadow-2xs"
              >
                Approve & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartnerReward;
