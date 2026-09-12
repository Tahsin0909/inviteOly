"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveTab,
  setCurrentPage,
  openPayoutModal,
} from "../store/reward.slice";
import RewardPayoutModal from "./RewardPayoutModal";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
} from "lucide-react";

export const HostReward: React.FC = () => {
  const dispatch = useDispatch();
  const {
    stats,
    pendingRewards,
    payoutHistory,
    activeTab,
    currentPage,
  } = useSelector((state: RootState) => state.reward);

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
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
        >
          PayOut
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Top Tabs */}
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
      {/* 3. 3 Stat Summary Cards */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* Total Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-amber-50 border border-amber-200/60 text-[#C39B4C] flex items-center justify-center mb-4">
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
            <DollarSign className="size-5" />
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
      </div>

      {/* ========================================================================= */}
      {/* 4. Table (Pending vs History) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "pending" ? (
            /* Pending Reward Table */
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-work-sans">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
                  <th className="py-3.5 px-5">Event</th>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Ticket Revenue</th>
                  <th className="py-3.5 px-4">Rate</th>
                  <th className="py-3.5 px-4">Reward</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {pendingRewards.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-4 px-5 font-semibold text-neutral-900">
                      {item.eventName}
                    </td>
                    <td className="py-4 px-4 text-neutral-500 font-mono text-xs">
                      {item.orderId}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">
                      {item.date}
                    </td>
                    <td className="py-4 px-4 font-medium text-neutral-900">
                      {item.ticketRevenue}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">
                      {item.rate}
                    </td>
                    <td className="py-4 px-4 font-semibold text-neutral-900">
                      {item.reward}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                        {item.status}
                      </span>
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
                  <th className="py-3.5 px-5">Payout ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Reference ID</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Reward</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {payoutHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-4 px-5 font-mono text-xs text-neutral-600">
                      {item.payoutId}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">
                      {item.date}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-neutral-500">
                      {item.referenceId}
                    </td>
                    <td className="py-4 px-4 text-neutral-700 font-medium">
                      {item.method}
                    </td>
                    <td className="py-4 px-4 font-semibold text-neutral-900">
                      {item.reward}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#16A34A]">
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
        {/* 5. Pagination */}
        {/* ========================================================================= */}
        <div className="py-4 px-6 border-t border-neutral-100 flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
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
            onClick={() => dispatch(setCurrentPage(Math.min(5, currentPage + 1)))}
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Payout Request Modal */}
      <RewardPayoutModal />
    </div>
  );
};

export default HostReward;
