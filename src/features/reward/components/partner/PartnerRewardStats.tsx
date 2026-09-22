"use client";

import React from "react";
import { IRewardStats } from "../../reward.interface";
import { Award, Clock, DollarSign, Calendar } from "lucide-react";

interface PartnerRewardStatsProps {
  stats: IRewardStats;
}

export const PartnerRewardStats: React.FC<PartnerRewardStatsProps> = ({
  stats,
}) => {
  const formatAmount = (val: number | string | undefined): string => {
    if (val === undefined || val === null) return "$0.00";
    if (typeof val === "string" && val.startsWith("$")) return val;
    const num = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-4 font-work-sans">
      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Total Rewards Earned */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs flex items-center gap-4 hover:border-neutral-300 transition-colors">
          <div className="size-11 rounded-xl bg-[#C39B4C]/10 border border-[#C39B4C]/20 text-[#C39B4C] flex items-center justify-center shrink-0">
            <Award className="size-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-medium">
              Total Rewards Earned
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight mt-0.5">
              {formatAmount(stats?.totalRewards)}
            </h3>
          </div>
        </div>

        {/* 2. Pending Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs flex items-center gap-4 hover:border-neutral-300 transition-colors">
          <div className="size-11 rounded-xl bg-red-50 border border-red-200/60 text-red-500 flex items-center justify-center shrink-0">
            <Clock className="size-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-medium">
              Pending Rewards
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight mt-0.5">
              {formatAmount(stats?.pendingRewards)}
            </h3>
          </div>
        </div>

        {/* 3. Paid Rewards */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs flex items-center gap-4 hover:border-neutral-300 transition-colors">
          <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="size-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-medium">
              Paid Rewards
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight mt-0.5">
              {formatAmount(stats?.paidRewards)}
            </h3>
          </div>
        </div>
      </div>

      {/* Next Payout Date Banner */}
      <div className="bg-[#FCF7ED] border border-[#F3E7D3] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-xl bg-[#C39B4C] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Calendar className="size-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-medium">Next Payout</p>
            <h4 className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900">
              {stats?.nextPayoutDate || "October 1, 2026"}
            </h4>
          </div>
        </div>

        {/* Vertical Divider for sm+ screens */}
        <div className="h-8 w-px bg-[#E6D7C2] hidden sm:block mx-2" />

        <p className="text-xs sm:text-sm text-neutral-600 font-medium">
          Approved rewards will be included automatically.
        </p>
      </div>
    </div>
  );
};

export default PartnerRewardStats;

