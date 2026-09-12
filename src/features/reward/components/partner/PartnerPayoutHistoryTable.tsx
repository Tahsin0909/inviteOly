"use client";

import React from "react";
import { IPayoutHistoryItem } from "../../reward.interface";

interface PartnerPayoutHistoryTableProps {
  items: IPayoutHistoryItem[];
}

export const PartnerPayoutHistoryTable: React.FC<
  PartnerPayoutHistoryTableProps
> = ({ items }) => {
  return (
    <div className="overflow-x-auto font-work-sans">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
            <th className="py-3.5 px-6">Payout ID</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-4">Reference ID</th>
            <th className="py-3.5 px-4">Method</th>
            <th className="py-3.5 px-4">Reward</th>
            <th className="py-3.5 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-neutral-700">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-neutral-400 text-sm"
              >
                No payout history found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                <td className="py-4 px-6 font-mono text-xs text-neutral-600">
                  {item.payoutId}
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
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#16A34A]">
                    {item.status}
                  </span>
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

