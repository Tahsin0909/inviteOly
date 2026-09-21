"use client";

import React from "react";
import { IPayoutHistoryItem } from "../../reward.interface";

interface PartnerPayoutHistoryTableProps {
  items: IPayoutHistoryItem[];
  onViewDetails?: (item: IPayoutHistoryItem) => void;
}

export const PartnerPayoutHistoryTable: React.FC<
  PartnerPayoutHistoryTableProps
> = ({ items, onViewDetails }) => {
  return (
    <div className="overflow-x-auto font-work-sans">
      <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[700px]">
        <thead>
          <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
            <th className="py-3.5 px-6 font-space-grotesk">Payout ID</th>
            <th className="py-3.5 px-5 font-space-grotesk">Disbursement Date</th>
            <th className="py-3.5 px-5 font-space-grotesk">Reference ID</th>
            <th className="py-3.5 px-5 font-space-grotesk">Payout Method</th>
            <th className="py-3.5 px-5 font-space-grotesk">Total Reward</th>
            <th className="py-3.5 px-5 font-space-grotesk text-center">Status</th>
            <th className="py-3.5 px-6 font-space-grotesk text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-neutral-700">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-neutral-400 text-sm font-medium"
              >
                No payout history found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/70 transition-colors"
              >
                <td className="py-4 px-6 font-mono text-xs font-semibold text-neutral-900">
                  {item.payoutId}
                </td>
                <td className="py-4 px-5 text-neutral-600">{item.date}</td>
                <td className="py-4 px-5 font-mono text-xs text-neutral-500">
                  {item.referenceId}
                </td>
                <td className="py-4 px-5 text-neutral-800 font-medium">
                  {item.method}
                </td>
                <td className="py-4 px-5 font-bold text-neutral-900 font-space-grotesk">
                  {item.reward}
                </td>
                <td className="py-4 px-5 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {item.status}
                  </span>
                </td>
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

export default PartnerPayoutHistoryTable;
