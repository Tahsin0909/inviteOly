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
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] font-work-sans flex flex-col justify-between max-w-sm w-full transition-all hover:shadow-md">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            type="button"
            onClick={() => onUploadReceiptClick(event)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#D97706] border border-[#FDE68A]/60 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
          >
            Upload Payment Receipt
          </button>

          <span className="text-xs text-neutral-400 font-medium">
            {event.packageType}
          </span>
        </div>

        {/* Event Title */}
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight mb-4">
          {event.eventName}
        </h2>

        {/* Date and Time Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-neutral-400" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-neutral-400" />
            <span>{event.eventTime}</span>
          </div>
        </div>

        {/* Host Name Row */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-700 mb-6">
          <User className="size-3.5 text-neutral-400" />
          <span className="font-medium">{event.hostName}</span>
        </div>

        {/* 3 Stats Row (Total Guest, Check in, Remaining) */}
        <div className="grid grid-cols-3 gap-2 text-center py-3 border-t border-neutral-100 mb-4">
          <div>
            <p className="text-[11px] text-neutral-400 font-medium">
              Total Guest
            </p>
            <p className="text-xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
              {event.totalGuest}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400 font-medium">Check in</p>
            <p className="text-xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
              {event.checkIn}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400 font-medium">Remaining</p>
            <p className="text-xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
              {event.remaining}
            </p>
          </div>
        </div>
      </div>

      {/* View Payment Invoice Action */}
      <button
        type="button"
        onClick={() => onViewInvoiceClick(event)}
        className="w-full py-2.5 px-4 rounded-xl border border-[#C39B4C]/40 text-[#C39B4C] hover:bg-[#FAF5EB] active:scale-[0.99] text-xs font-semibold transition-all cursor-pointer text-center"
      >
        View Payment Invoice
      </button>
    </div>
  );
};

export default HostPendingPaymentCard;
