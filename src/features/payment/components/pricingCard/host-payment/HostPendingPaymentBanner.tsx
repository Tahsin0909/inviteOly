"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { ArrowRight, FileCheck2, AlertCircle } from "lucide-react";

export const HostPendingPaymentBanner: React.FC = () => {
  const pendingPayments = useSelector(
    (state: RootState) => state.payment.pendingPayments
  );

  const pendingEvent = pendingPayments.find(
    (e) => e.status === "Pending" || e.status === "Under Review"
  );

  if (!pendingEvent) return null;

  const isUnderReview = pendingEvent.status === "Under Review";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all ${isUnderReview
          ? "border-blue-200 bg-blue-50/70 text-blue-950"
          : "border-amber-200/90 bg-[#FFFDF9] text-amber-950 shadow-xs"
        }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isUnderReview
                ? "bg-blue-100 text-blue-600"
                : "bg-[#FDF3E7] text-[#C39B4C]"
              }`}
          >
            {isUnderReview ? (
              <FileCheck2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${isUnderReview
                    ? "bg-blue-100 text-blue-800"
                    : "bg-[#FFF4E5] text-[#D97706]"
                  }`}
              >
                {isUnderReview ? "Receipt Under Review" : "Payment Pending"}
              </span>
              <span className="text-xs font-semibold text-gray-800">
                {pendingEvent.eventName}
              </span>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-gray-600 font-work-sans">
              {isUnderReview
                ? "Your payment receipt has been submitted and is currently being verified by the administration team."
                : "Your booking is currently pending payment confirmation. Upload your payment receipt to activate guest ticketing."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <Link
            href="/host/payment-pending"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C39B4C] px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-[#b08b3e] transition-colors font-work-sans cursor-pointer"
          >
            <span>
              {isUnderReview ? "View Payment Status" : "Upload Receipt"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostPendingPaymentBanner;
