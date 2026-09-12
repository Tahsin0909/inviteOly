"use client";

import React from "react";
import { IPendingRewardItem } from "../../reward.interface";

interface PartnerPendingRewardTableProps {
  items: IPendingRewardItem[];
}

export const PartnerPendingRewardTable: React.FC<
  PartnerPendingRewardTableProps
> = ({ items }) => {
  return (
    <div className="overflow-x-auto font-work-sans">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-neutral-400 font-semibold text-[11px] uppercase tracking-wider bg-neutral-50/50">
            <th className="py-3.5 px-6">Event</th>
            <th className="py-3.5 px-4">Order ID</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-4">Ticket Revenue</th>
            <th className="py-3.5 px-4">Rate</th>
            <th className="py-3.5 px-4">Reward</th>
            <th className="py-3.5 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-neutral-700">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-neutral-400 text-sm"
              >
                No pending rewards found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                <td className="py-4 px-6 font-semibold text-neutral-900">
                  {item.eventName}
                </td>
                <td className="py-4 px-4 text-neutral-500 font-mono text-xs">
                  {item.orderId}
                </td>
                <td className="py-4 px-4 text-neutral-500">{item.date}</td>
                <td className="py-4 px-4 font-medium text-neutral-900">
                  {item.ticketRevenue}
                </td>
                <td className="py-4 px-4 text-neutral-500">{item.rate}</td>
                <td className="py-4 px-4 font-semibold text-neutral-900">
                  {item.reward}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
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

export default PartnerPendingRewardTable;

