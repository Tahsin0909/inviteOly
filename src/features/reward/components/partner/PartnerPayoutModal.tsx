"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closePayoutModal, requestPayout } from "../../store/reward.slice";
import { TPayoutMethod } from "../../reward.interface";
import { CreditCard, Landmark, X } from "lucide-react";
import { toast } from "sonner";

export const PartnerPayoutModal: React.FC = () => {
  const dispatch = useDispatch();
  const rewardState = useSelector((state: RootState) => state.reward);
  const isPayoutModalOpen = rewardState?.isPayoutModalOpen ?? false;
  const stats = rewardState?.stats;

  const pendingBalance = stats?.pendingRewards ?? 0;

  const [method, setMethod] = useState<TPayoutMethod>("Bank Transfer");
  const [amount, setAmount] = useState<string>("");
  const [accountDetails, setAccountDetails] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isPayoutModalOpen) {
      setAmount(pendingBalance > 0 ? String(pendingBalance) : "");
      setAccountDetails("");
      setError("");
    }
  }, [isPayoutModalOpen, pendingBalance]);

  if (!isPayoutModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid payout amount greater than $0");
      return;
    }

    if (numericAmount > pendingBalance) {
      setError(
        `Amount exceeds your available pending balance of $${pendingBalance}`
      );
      return;
    }

    if (!accountDetails.trim()) {
      setError("Please enter your payout account details");
      return;
    }

    dispatch(
      requestPayout({
        amount: numericAmount,
        method,
        accountDetails: accountDetails.trim(),
      })
    );

    toast.success(
      `Payout request of $${numericAmount.toFixed(2)} submitted successfully via ${method}!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-work-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(closePayoutModal())}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900">
              Request Payout
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Available Pending Balance:{" "}
              <span className="font-semibold text-[#C39B4C]">
                ${pendingBalance}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(closePayoutModal())}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200/80 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Method Selection (Bank and Stripe only) */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-2">
              Payout Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("Bank Transfer")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${method === "Bank Transfer"
                  ? "border-[#C39B4C] bg-[#FFFBF0] text-[#C39B4C] font-semibold shadow-2xs"
                  : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
              >
                <Landmark className="size-5 mb-1.5" />
                <span className="text-xs font-semibold">Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("Stripe")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${method === "Stripe"
                  ? "border-[#C39B4C] bg-[#FFFBF0] text-[#C39B4C] font-semibold shadow-2xs"
                  : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
              >
                <CreditCard className="size-5 mb-1.5" />
                <span className="text-xs font-semibold">Stripe</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Payout Amount ($)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white"
            />
          </div>

          {/* Account Details */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              {method === "Bank Transfer"
                ? "Bank Account / IBAN / Routing #"
                : "Stripe Connect Account ID / Email"}
            </label>
            <input
              type="text"
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              placeholder={
                method === "Bank Transfer"
                  ? "Enter routing and account number"
                  : "Enter Stripe email or connect ID (acct_...)"
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => dispatch(closePayoutModal())}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs font-semibold cursor-pointer transition-all shadow-2xs"
            >
              Confirm Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerPayoutModal;
