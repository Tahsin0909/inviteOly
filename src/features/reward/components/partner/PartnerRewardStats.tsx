"use client";

import React from "react";
import { IRewardStats } from "../../reward.interface";
import { Award, Clock, DollarSign } from "lucide-react";

interface PartnerRewardStatsProps {
  stats: IRewardStats;
}

export const PartnerRewardStats: React.FC<PartnerRewardStatsProps> = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 font-work-sans">
      {/* 1. Total Rewards */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
        <div className="size-9 rounded-lg bg-[#C39B4C]/10 border border-[#C39B4C]/20 text-[#C39B4C] flex items-center justify-center mb-4">
          <Award className="size-5" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            ${stats?.totalRewards ?? 0}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-work-sans mt-0.5">
            Total Rewards
          </p>
        </div>
      </div>

      {/* 2. Pending Rewards */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
        <div className="size-9 rounded-lg bg-red-50 border border-red-200/60 text-red-500 flex items-center justify-center mb-4">
          <Clock className="size-5" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            ${stats?.pendingRewards ?? 0}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-work-sans mt-0.5">
            Pending Rewards
          </p>
        </div>
      </div>

      {/* 3. Paid Rewards */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
        <div className="size-9 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center mb-4">
          <DollarSign className="size-5" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            ${stats?.paidRewards ?? 0}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-work-sans mt-0.5">
            Paid Rewards
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerRewardStats;

