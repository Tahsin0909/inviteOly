"use client";

import React from "react";
import { IPendingRewardItem } from "../../reward.interface";

interface AdminPendingRewardTableProps {
  items: IPendingRewardItem[];
  onApproveClick: (item: IPendingRewardItem) => void;
}

export const AdminPendingRewardTable: React.FC<
  AdminPendingRewardTableProps
> = ({ items, onApproveClick }) => {
  return (
    <div className="overflow-x-auto font-work-sans">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50 dark:bg-neutral-900/60">
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
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-12 text-center text-neutral-400 dark:text-neutral-500 text-sm"
              >
                No pending rewards found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {item.partnerName || "Partner"}
                  </div>
                  <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    {item.partnerEmail || "partner@example.com"}
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                  {item.eventName}
                </td>
                <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400 font-mono text-xs">
                  {item.orderId}
                </td>
                <td className="py-4 px-4 font-medium text-neutral-900 dark:text-white">
                  {item.ticketRevenue}
                </td>
                <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">{item.rate}</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 dark:text-white">
                  {item.reward}
                </td>
                <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">{item.date}</td>
                <td className="py-4 px-6 text-center">
                  {item.status === "Pending" ? (
                    <button
                      type="button"
                      onClick={() => onApproveClick(item)}
                      className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFF7ED] dark:bg-amber-950/40 hover:bg-[#FFEDD5] dark:hover:bg-amber-900/50 text-[#EA580C] dark:text-amber-400 border border-[#FFEDD5] dark:border-amber-800/40 transition-all cursor-pointer shadow-2xs hover:scale-105"
                      title="Click to Approve Payout"
                    >
                      Pending
                    </button>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7EE] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPendingRewardTable;

