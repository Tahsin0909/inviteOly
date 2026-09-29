"use client";

import React from "react";
import { IPendingRewardItem, TRewardStatus } from "../../reward.interface";

interface PartnerPendingRewardTableProps {
  items: IPendingRewardItem[];
  onViewDetails?: (item: IPendingRewardItem) => void;
}

export const PartnerPendingRewardTable: React.FC<
  PartnerPendingRewardTableProps
> = ({ items, onViewDetails }) => {
  const renderStatusBadge = (status: TRewardStatus | string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
            Pending
          </span>
        );
      case "On Hold":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-800/60">
            On Hold
          </span>
        );
      case "Paid":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
            Paid
          </span>
        );
      case "Canceled":
      case "Rejected":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
            Canceled
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto font-work-sans">
      <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[750px]">
        <thead>
          <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50 dark:bg-neutral-950/40">
            <th className="py-3.5 px-6 font-space-grotesk">Event</th>
            <th className="py-3.5 px-5 font-space-grotesk">Host</th>
            <th className="py-3.5 px-5 font-space-grotesk">Payment Date</th>
            <th className="py-3.5 px-5 font-space-grotesk">Reward Earned</th>
            <th className="py-3.5 px-5 font-space-grotesk text-center">Status</th>
            <th className="py-3.5 px-5 font-space-grotesk">Payout Date</th>
            <th className="py-3.5 px-6 font-space-grotesk text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-neutral-400 dark:text-neutral-500 text-sm font-medium"
              >
                No rewards found matching your criteria.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
              >
                {/* Event Name */}
                <td className="py-4 px-6 font-semibold text-neutral-900 dark:text-white">
                  {item.eventName}
                </td>

                {/* Host Name */}
                <td className="py-4 px-5 text-neutral-700 dark:text-neutral-300 font-medium">
                  {item.hostName || item.partnerName || "Event Host"}
                </td>

                {/* Host Payment Date */}
                <td className="py-4 px-5 text-neutral-600 dark:text-neutral-400">
                  {item.hostPaymentDate || item.date}
                </td>

                {/* Reward Earned */}
                <td className="py-4 px-5 font-bold text-neutral-900 dark:text-white font-space-grotesk">
                  {item.rewardEarned || item.reward}
                </td>

                {/* Reward Status */}
                <td className="py-4 px-5 text-center">
                  {renderStatusBadge(item.status)}
                </td>

                {/* Payout Date */}
                <td className="py-4 px-5 text-neutral-600 dark:text-neutral-400">
                  {item.payoutDate || "Oct 1, 2026"}
                </td>

                {/* Action: View Details */}
                <td className="py-4 px-6 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails && onViewDetails(item)}
                    className="border border-[#C39B4C]/70 text-[#C39B4C] hover:bg-[#C39B4C]/10 hover:border-[#C39B4C] text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerPendingRewardTable;

