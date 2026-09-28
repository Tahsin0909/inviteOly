"use client";

import React from "react";
import { IHostPendingPaymentEvent } from "../../../payment.interface";
import { Calendar, Clock, User } from "lucide-react";

interface HostPendingPaymentCardProps {
  event: IHostPendingPaymentEvent;
  onUploadReceiptClick: (event: IHostPendingPaymentEvent) => void;
  onViewInvoiceClick: (event: IHostPendingPaymentEvent) => void;
}

export const HostPendingPaymentCard: React.FC<HostPendingPaymentCardProps> = ({
  event,
  onUploadReceiptClick,
  onViewInvoiceClick,
}) => {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 shadow-xs font-work-sans flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        {/* Top Badges: Upload Payment Receipt on left, Package Type on right */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onUploadReceiptClick(event)}
            className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-[#FFF4E5] hover:bg-[#fee9cc] text-[#D97706] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-400 transition-colors cursor-pointer"
          >
            {event.status === "Under Review"
              ? "Receipt Under Review"
              : "Upload Payment Receipt"}
          </button>

          <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium font-work-sans">
            {event.packageType}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="mt-3.5 text-lg font-bold font-space-grotesk text-gray-900 dark:text-white tracking-tight">
          {event.eventName}
        </h3>

        {/* Date and Time Row */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-neutral-400 font-work-sans">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-500" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-500" />
            <span>{event.eventTime}</span>
          </div>
        </div>

        {/* Host Name Row */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-700 dark:text-neutral-300 font-medium font-work-sans">
          <User className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-500" />
          <span>{event.hostName}</span>
        </div>

        {/* 3 Stats Row (Total Guest, Check in, Remaining) */}
        <div className="mt-4 grid grid-cols-3 border-t border-gray-100 dark:border-neutral-800 pt-3.5 text-center">
          <div>
            <p className="text-xs text-gray-400 dark:text-neutral-500 font-work-sans">Total Guest</p>
            <p className="mt-1 text-xl font-bold font-space-grotesk text-gray-900 dark:text-white">
              {event.totalGuest}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-neutral-500 font-work-sans">Check in</p>
            <p className="mt-1 text-xl font-bold font-space-grotesk text-gray-900 dark:text-white">
              {event.checkIn}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-neutral-500 font-work-sans">Remaining</p>
            <p className="mt-1 text-xl font-bold font-space-grotesk text-gray-900 dark:text-white">
              {event.remaining}
            </p>
          </div>
        </div>
      </div>

      {/* View Payment Invoice Button matching media_1789203657029.png */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onViewInvoiceClick(event)}
          className="w-full rounded-lg border border-[#C39B4C]/40 py-2.5 px-4 text-xs font-semibold text-[#C39B4C] hover:bg-[#FAF5EB] dark:hover:bg-amber-950/30 active:scale-[0.99] transition-colors cursor-pointer text-center font-work-sans"
        >
          View Payment Invoice
        </button>
      </div>
    </div>
  );
};

export default HostPendingPaymentCard;
