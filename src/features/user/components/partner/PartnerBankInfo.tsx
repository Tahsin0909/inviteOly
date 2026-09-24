"use client";

import React, { useState } from "react";
import {
  Landmark,
  User as UserIcon,
  CreditCard,
  Hash,
  Globe,
  Eye,
  EyeOff,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PartnerBankInfoFormData {
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "checking" | "savings" | "business";
  swiftCode?: string;
}

interface PartnerBankInfoProps {
  data: PartnerBankInfoFormData;
  onChange: (field: keyof PartnerBankInfoFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving?: boolean;
  className?: string;
}

export const PartnerBankInfo: React.FC<PartnerBankInfoProps> = ({
  data,
  onChange,
  onSubmit,
  isSaving = false,
  className,
}) => {
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-100 mb-5 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#C39B4C]/10 text-[#C39B4C] flex items-center justify-center shrink-0">
            <Landmark className="size-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 tracking-tight">
              Bank &amp; Payout Information
            </h3>
            <p className="text-xs text-neutral-500 font-work-sans">
              Add or update your bank account to receive partner rewards and referral commissions.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium self-start sm:self-auto border border-emerald-200/60">
          <CheckCircle2 className="size-3.5" />
          <span>Active for Payouts</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          {/* Account Holder Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Account Holder Name
            </label>
            <div className="flex items-center bg-[#ECECEC] hover:bg-[#E7E7E7] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent">
              <UserIcon className="size-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.accountHolderName}
                onChange={(e) => onChange("accountHolderName", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="e.g. John Doe or Elite Events Co."
                required
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Must match the legal name or company registered on the bank account.
            </p>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Bank Name
            </label>
            <div className="flex items-center bg-[#ECECEC] hover:bg-[#E7E7E7] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent">
              <Building className="size-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.bankName}
                onChange={(e) => onChange("bankName", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="e.g. JPMorgan Chase, Bank of America, Wells Fargo"
                required
              />
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Account Type
            </label>
            <div className="flex items-center bg-[#ECECEC] hover:bg-[#E7E7E7] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent">
              <select
                value={data.accountType}
                onChange={(e) =>
                  onChange(
                    "accountType",
                    e.target.value as "checking" | "savings" | "business"
                  )
                }
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 focus:outline-none font-work-sans cursor-pointer"
              >
                <option value="checking">Checking Account</option>
                <option value="savings">Savings Account</option>
                <option value="business">Business / Commercial Account</option>
              </select>
            </div>
          </div>

          {/* Routing Number */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Routing Number (ABA / Transit)
            </label>
            <div className="flex items-center bg-[#ECECEC] hover:bg-[#E7E7E7] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent">
              <Hash className="size-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.routingNumber}
                onChange={(e) => onChange("routingNumber", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="9-digit routing number"
                required
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Found on the bottom left of your checks or in your online banking app.
            </p>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Account Number / IBAN
            </label>
            <div className="flex items-center bg-[#ECECEC] hover:bg-[#E7E7E7] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent">
              <CreditCard className="size-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type={showAccountNumber ? "text" : "password"}
                value={data.accountNumber}
                onChange={(e) => onChange("accountNumber", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="Enter account number or IBAN"
                required
              />
              <button
                type="button"
                onClick={() => setShowAccountNumber(!showAccountNumber)}
                className="text-neutral-400 hover:text-neutral-600 ml-2 focus:outline-none cursor-pointer"
                title={showAccountNumber ? "Hide account number" : "Show account number"}
              >
                {showAccountNumber ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* SWIFT / BIC Code (Optional) */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              SWIFT / BIC Code (Optional)
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
              <Globe className="size-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.swiftCode || ""}
                onChange={(e) => onChange("swiftCode", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans uppercase"
                placeholder="e.g. CHASUS33"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Required for international direct deposits and cross-border bank wires.
            </p>
          </div>
        </div>

        {/* Security & Encryption Notice */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FFFBF0] border border-[#C39B4C]/25 text-neutral-700">
          <ShieldCheck className="size-4 text-[#C39B4C] shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-semibold text-neutral-900 block">
              Encrypted &amp; Secure Bank Verification
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Your banking details are encrypted using 256-bit TLS bank-grade security and are only used for automated payouts of your 10% partner commissions and verified rewards.
            </p>
          </div>
        </div>

        {/* Update Bank Details Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-70"
          >
            {isSaving ? "Saving Bank Details..." : "Update Bank Info"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerBankInfo;

