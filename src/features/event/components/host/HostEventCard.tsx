"use client";

import React from "react";
import { IHostEventItem } from "../../event.interface";
import { Calendar, Clock, User } from "lucide-react";

interface HostEventCardProps {
  event: IHostEventItem;
  onViewEvent: (id: string) => void;
  onEdit?: (id: string) => void;
  onUploadReceipt?: (id: string) => void;
}

export const HostEventCard: React.FC<HostEventCardProps> = ({
  event,
  onViewEvent,
  onEdit,
  onUploadReceipt,
}) => {
  const getBadgeStyle = () => {
    switch (event.status) {
      case "Active":
        return "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]/50";
      case "Scheduled":
        return "bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]/50";
      case "Draft":
        return "bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]";
      case "Upload Payment Receipt":
        return "bg-[#FFF4E5] text-[#D97706] border border-[#FDE68A]/60";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const showProgressBar =
    event.status === "Active" || event.status === "Scheduled";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium font-work-sans ${getBadgeStyle()}`}
          >
            {event.status}
          </span>
          {event.tier && event.status === "Upload Payment Receipt" && (
            <span className="text-xs font-medium text-gray-500 font-work-sans">
              {event.tier}
            </span>
          )}
        </div>

        {/* Event Title */}
        <h3 className="mt-3 text-lg font-bold text-gray-900 font-space-grotesk tracking-tight">
          {event.title}
        </h3>

        {/* Date and Time */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-work-sans">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Host Name */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-600 font-work-sans">
          <User className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-medium text-gray-700">{event.hostName}</span>
        </div>

        {/* Metrics Row */}
        <div className="mt-5 grid grid-cols-3 border-t border-gray-100 pt-4 text-center">
          <div>
            <p className="text-xs text-gray-500 font-work-sans">Total Guest</p>
            <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
              {event.totalGuests}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-work-sans">
              {event.status === "Draft" ? "Total Guest" : "Check in"}
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
              {event.checkedIn}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-work-sans">
              {event.status === "Draft" ? "Total Guest" : "Remaining"}
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900 font-space-grotesk">
              {event.remaining}
            </p>
          </div>
        </div>

        {/* Progress Bar (if Active or Scheduled) */}
        {showProgressBar && (
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${event.status === "Active" ? "bg-[#12B76A]" : "bg-blue-500"
                  }`}
                style={{ width: `${event.progressPercentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-500 font-space-grotesk min-w-[32px] text-right">
              {event.progressPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Card Action Button */}
      <div className="mt-5">
        {event.status === "Active" || event.status === "Scheduled" ? (
          <button
            type="button"
            onClick={() => onViewEvent(event.id)}
            className="w-full rounded-lg border border-[#C39B4C] py-2 text-sm font-medium text-[#C39B4C] hover:bg-[#C39B4C] hover:text-white transition-colors cursor-pointer font-work-sans text-center"
          >
            View Event
          </button>
        ) : event.status === "Draft" ? (
          <button
            type="button"
            onClick={() => (onEdit ? onEdit(event.id) : onViewEvent(event.id))}
            className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-work-sans text-center"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              onUploadReceipt
                ? onUploadReceipt(event.id)
                : onViewEvent(event.id)
            }
            className="w-full rounded-lg border border-amber-300 bg-amber-50/50 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100/60 transition-colors cursor-pointer font-work-sans text-center"
          >
            Upload Payment Receipt
          </button>
        )}
      </div>
    </div>
  );
};

