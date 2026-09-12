"use client";

import React from "react";
import { IPayoutHistoryItem } from "../../reward.interface";

interface AdminPayoutLedgerTableProps {
  items: IPayoutHistoryItem[];
}

export const AdminPayoutLedgerTable: React.FC<AdminPayoutLedgerTableProps> = ({
  items,
}) => {
  return (
    <div className="font-work-sans">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h2 className="text-base font-bold font-space-grotesk text-neutral-900">
          Payout Ledger
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
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
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-neutral-400 text-sm"
                >
                  No payout ledger records found
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayoutLedgerTable;

