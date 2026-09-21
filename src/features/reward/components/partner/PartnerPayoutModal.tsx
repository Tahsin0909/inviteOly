"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closePayoutModal } from "../../store/reward.slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Landmark, Calendar, Info, CheckCircle2 } from "lucide-react";

export const PartnerPayoutModal: React.FC = () => {
  const dispatch = useDispatch();
  const rewardState = useSelector((state: RootState) => state.reward);
  const isPayoutModalOpen = rewardState?.isPayoutModalOpen ?? false;
  const pendingRewards = rewardState?.pendingRewards || [];
  const stats = rewardState?.stats;

  // Calculate dynamic balances from pending rewards
  const approvedTotal = pendingRewards
    .filter((r) => r.status === "Approved")
    .reduce((sum, r) => {
      const val = typeof r.reward === "string" ? parseFloat(r.reward.replace(/[^0-9.-]+/g, "")) : (r.reward || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

  const pendingReviewTotal = pendingRewards
    .filter((r) => r.status === "Pending")
    .reduce((sum, r) => {
      const val = typeof r.reward === "string" ? parseFloat(r.reward.replace(/[^0-9.-]+/g, "")) : (r.reward || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

  const onHoldTotal = pendingRewards
    .filter((r) => r.status === "On Hold")
    .reduce((sum, r) => {
      const val = typeof r.reward === "string" ? parseFloat(r.reward.replace(/[^0-9.-]+/g, "")) : (r.reward || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

  // Pointer events cleanup
  useEffect(() => {
    if (!isPayoutModalOpen) {
      document.body.style.pointerEvents = "";
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isPayoutModalOpen]);

  return (
    <Dialog
      open={isPayoutModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closePayoutModal());
          setTimeout(() => {
            document.body.style.pointerEvents = "";
          }, 250);
        }
      }}
    >
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          document.body.style.pointerEvents = "";
        }}
        className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[#C39B4C]/10 text-[#C39B4C] flex items-center justify-center">
              <Landmark className="size-4.5" />
            </div>
            <DialogTitle className="text-lg font-bold font-space-grotesk text-neutral-900">
              Partner Payout Details
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-neutral-500 mt-1">
            Review your registered payout method and automated monthly payment schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2 text-xs">
          {/* Registered Payout Method */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <Landmark className="size-4 text-[#C39B4C]" />
                Designated Payout Method
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                <CheckCircle2 className="size-3" />
                Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-neutral-600 pt-1">
              <div>
                <p className="text-[11px] text-neutral-400">Method</p>
                <p className="font-semibold text-neutral-900 mt-0.5">Bank Transfer (ACH)</p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-400">Bank Name</p>
                <p className="font-semibold text-neutral-900 mt-0.5">Chase Bank</p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-400">Account Number</p>
                <p className="font-semibold text-neutral-900 mt-0.5">•••• 4892</p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-400">Account Holder</p>
                <p className="font-semibold text-neutral-900 mt-0.5">Elena Rodriguez</p>
              </div>
            </div>
          </div>

          {/* Automated Payment Schedule */}
          <div className="p-4 rounded-xl bg-[#FCF7ED] border border-[#F3E7D3] space-y-2.5">
            <div className="flex items-center gap-1.5 text-neutral-900 font-bold">
              <Calendar className="size-4 text-[#C39B4C]" />
              <span>Payment Schedule</span>
            </div>

            <div className="space-y-1.5 text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Payout Frequency:</span>
                <span className="font-semibold text-neutral-900">Monthly (1st of every month)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Next Scheduled Payout:</span>
                <span className="font-bold text-[#C39B4C] font-space-grotesk">
                  {stats?.nextPayoutDate || "October 1, 2026"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Monthly Processing Cutoff:</span>
                <span className="font-medium text-neutral-700">Last day of month, 11:59 PM</span>
              </div>
            </div>
          </div>

          {/* Reward Status Summary Breakdown */}
          <div className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2">
            <p className="font-semibold text-neutral-900 text-xs">Current Reward Balances</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white border border-neutral-200/70">
                <p className="text-[10px] text-emerald-700 font-semibold">Approved (Oct 1)</p>
                <p className="text-sm font-bold text-neutral-900 font-space-grotesk mt-0.5">
                  ${approvedTotal.toFixed(2)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white border border-neutral-200/70">
                <p className="text-[10px] text-orange-600 font-semibold">Pending Review</p>
                <p className="text-sm font-bold text-neutral-900 font-space-grotesk mt-0.5">
                  ${pendingReviewTotal.toFixed(2)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white border border-neutral-200/70">
                <p className="text-[10px] text-red-600 font-semibold">On Hold</p>
                <p className="text-sm font-bold text-neutral-900 font-space-grotesk mt-0.5">
                  ${onHoldTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* No Early Payout Allowed Notice */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-2.5 text-neutral-600">
            <Info className="size-4 text-neutral-400 mt-0.5 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Early or ad-hoc payout requests are not permitted. Approved rewards are automatically batched and disbursed to your designated bank account on the 1st of every month.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <button
            type="button"
            onClick={() => dispatch(closePayoutModal())}
            className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerPayoutModal;
