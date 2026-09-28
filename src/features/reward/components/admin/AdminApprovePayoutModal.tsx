"use client";

import React from "react";
import { IPendingRewardItem } from "../../reward.interface";
import { Award, X } from "lucide-react";

interface AdminApprovePayoutModalProps {
  item: IPendingRewardItem | null;
  onClose: () => void;
  onConfirm: (item: IPendingRewardItem) => void;
}

export const AdminApprovePayoutModal: React.FC<
  AdminApprovePayoutModalProps
> = ({ item, onClose, onConfirm }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150 font-work-sans">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-neutral-100 dark:border-neutral-800 relative animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-[#C39B4C]/10 text-[#C39B4C] flex items-center justify-center">
            <Award className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Approve Reward Payout
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Confirm payout approval for this partner
            </p>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800 rounded-xl p-4 space-y-2.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 dark:text-neutral-500">Partner:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {item.partnerName || "Partner"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 dark:text-neutral-500">Email:</span>
            <span className="text-neutral-600 dark:text-neutral-300">
              {item.partnerEmail || "partner@example.com"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 dark:text-neutral-500">Event:</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {item.eventName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 dark:text-neutral-500">Order ID:</span>
            <span className="font-mono text-neutral-800 dark:text-neutral-200">{item.orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 dark:text-neutral-500">Ticket Revenue:</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {item.ticketRevenue}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-200/80 dark:border-neutral-800 pt-2.5 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Reward Amount:</span>
            <span className="font-bold text-[#C39B4C] font-space-grotesk text-base">
              {item.reward}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(item)}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] rounded-lg cursor-pointer transition-all shadow-2xs"
          >
            Approve & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminApprovePayoutModal;

