"use client";

import Link from "next/link";
import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCardStatus, IEventCard } from "../event.interface";

export interface EventCardsProps {
    event: IEventCard;
    className?: string;
    onViewEvent?: (event: IEventCard) => void;
}

export const EventCards: React.FC<EventCardsProps> = ({
    event,
    className,
    onViewEvent,
}) => {
    const getStatusBadge = (status: EventCardStatus) => {
        switch (status) {
            case "Active":
                return "bg-[#EAF7EE] text-[#16A34A] border-[#C6EFD2]";
            case "Scheduled":
                return "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]";
            case "Completed":
                return "bg-neutral-100 text-neutral-700 border-neutral-200";
            case "Pending":
                return "bg-amber-50 text-amber-700 border-amber-200";
            default:
                return "bg-neutral-100 text-neutral-700 border-neutral-200";
        }
    };

    const getProgressBar = () => {
        const variant = event.progressVariant || (event.progressPercentage > 0 ? "green" : "gray");
        switch (variant) {
            case "green":
                return {
                    bar: "bg-[#16A34A]",
                    track: "bg-[#EAF7EE]",
                };
            case "orange":
                return {
                    bar: "bg-[#D97706]",
                    track: "bg-[#FEF3C7]",
                };
            case "gray":
            default:
                return {
                    bar: "bg-neutral-300",
                    track: "bg-neutral-100",
                };
        }
    };

    const { bar, track } = getProgressBar();
    const guestLabel = event.guestLabel || "Guests";

    return (
        <div
            className={cn(
                "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between",
                className
            )}
        >
            {/* Top Header: Status Badge */}
            <div>
                <div className="flex items-center justify-between">
                    <span
                        className={cn(
                            "px-2.5 py-0.5 text-xs font-semibold rounded-full border",
                            getStatusBadge(event.status)
                        )}
                    >
                        {event.status}
                    </span>
                </div>

                {/* Event Title */}
                <h3 className="text-xl sm:text-[22px] font-bold font-space-grotesk text-neutral-900 mt-3.5 tracking-tight">
                    {event.title}
                </h3>

                {/* Date & Time Row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-neutral-600 font-work-sans mt-3">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-neutral-400 shrink-0" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-neutral-400 shrink-0" />
                        <span>{event.time}</span>
                    </div>
                </div>

                {/* Host Row */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-700 font-work-sans mt-2">
                    <User className="size-3.5 text-neutral-400 shrink-0" />
                    <span>{event.hostName}</span>
                </div>

                {/* 3-Column Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-2">
                    <div>
                        <p className="text-xs font-medium text-neutral-400 font-work-sans">
                            {guestLabel}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1">
                            {event.guests}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-neutral-400 font-work-sans">
                            Checked In
                        </p>
                        <p className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1">
                            {event.checkedIn}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-neutral-400 font-work-sans">
                            Remaining
                        </p>
                        <p className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1">
                            {event.remaining}
                        </p>
                    </div>
                </div>

                {/* Progress Bar with Percentage */}
                <div className="flex items-center gap-3 mt-4">
                    <div className={cn("flex-1 h-2 rounded-full overflow-hidden", track)}>
                        <div
                            className={cn("h-full rounded-full transition-all duration-500", bar)}
                            style={{ width: `${Math.min(100, Math.max(0, event.progressPercentage))}%` }}
                        />
                    </div>
                    <span className="text-xs font-medium text-neutral-400 font-work-sans shrink-0">
                        {event.progressPercentage}%
                    </span>
                </div>
            </div>

            {/* Action Button: View Event */}
            <div className="mt-6 pt-1">
                <Link
                    href={`/partner/events/${event.id}`}
                    onClick={() => onViewEvent?.(event)}
                    className="block w-full py-2.5 px-4 rounded-xl sm:rounded-2xl border border-neutral-200 hover:border-[#C39B4C] hover:bg-[#C39B4C]/5 text-[#C39B4C] text-xs sm:text-sm font-semibold font-work-sans transition-colors text-center"
                >
                    View Event
                </Link>
            </div>
        </div>
    );
};

export default EventCards;