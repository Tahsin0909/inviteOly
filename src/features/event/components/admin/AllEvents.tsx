"use client";

import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    staticAdminEventMetrics,
    staticAdminEvents,
} from "../../data/adminEvent.data";
import { useGetAdminEventsQuery } from "../../event.api";
import { IAdminEventCard } from "../../event.interface";

// 1. Ticket Stub Icon for "Total Events"
const TicketStubIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
        <line x1="12" y1="6" x2="12" y2="8" strokeDasharray="1 1" />
        <line x1="12" y1="11" x2="12" y2="13" strokeDasharray="1 1" />
        <line x1="12" y1="16" x2="12" y2="18" strokeDasharray="1 1" />
    </svg>
);

// 2. Broadcast / Radio Tower Icon for "Active Events"
const BroadcastIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 7.76a6 6 0 0 0 0 8.49" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
);

// 3. Completed Checkmark Circle Icon for "Completed Events"
const CompletedCheckIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="9" />
        <polyline points="8.5 12.5 11 15 15.5 9.5" />
    </svg>
);

// 4. Host User Icon
const HostUserIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-neutral-400 shrink-0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
);

// 5. Pavilion Venue Icon
const VenuePavilionIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-neutral-400 shrink-0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 10L12 4l9 6" />
        <path d="M5 10v10" />
        <path d="M10 10v10" />
        <path d="M14 10v10" />
        <path d="M19 10v10" />
        <path d="M2 20h20" />
    </svg>
);

interface AllEventsProps {
    className?: string;
}

export const AllEvents: React.FC<AllEventsProps> = ({ className }) => {
    const { data: apiData } = useGetAdminEventsQuery();
    const metrics = apiData?.data?.metrics || staticAdminEventMetrics;
    const events = apiData?.data?.events || staticAdminEvents;

    return (
        <div className={cn("space-y-6 sm:space-y-8", className)}>
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Total Events */}
                <div className="bg-white rounded-2xl p-5 border border-neutral-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    <div className="size-10 rounded-xl bg-[#B89047] flex items-center justify-center shadow-xs shrink-0">
                        <TicketStubIcon />
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            {metrics.totalEvents.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans mt-1">
                            Total Events
                        </p>
                    </div>
                </div>

                {/* Active Events */}
                <div className="bg-white rounded-2xl p-5 border border-neutral-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    <div className="size-10 rounded-xl bg-[#B89047] flex items-center justify-center shadow-xs shrink-0">
                        <BroadcastIcon />
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            {metrics.activeEvents.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans mt-1">
                            Active Events
                        </p>
                    </div>
                </div>

                {/* Completed Events */}
                <div className="bg-white rounded-2xl p-5 border border-neutral-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    <div className="size-10 rounded-xl bg-[#B89047] flex items-center justify-center shadow-xs shrink-0">
                        <CompletedCheckIcon />
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            {metrics.completedEvents.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans mt-1">
                            Completed Events
                        </p>
                    </div>
                </div>
            </div>

            {/* 9 Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {events.map((event: IAdminEventCard) => {
                    const isPremium = event.tier === "Premium";

                    return (
                        <Link
                            key={event.id}
                            href={`/admin/events/${event.id}`}
                            className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-[#C39B4C]/60 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                        >
                            <div>
                                {/* Tier Badge */}
                                <div>
                                    <span
                                        className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium inline-block",
                                            isPremium
                                                ? "bg-[#FEF7EC] text-[#B89047]"
                                                : "bg-[#EBF5FF] text-[#2563EB]"
                                        )}
                                    >
                                        {event.tier}
                                    </span>
                                </div>

                                {/* Event Title */}
                                <h3 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 group-hover:text-[#B89047] transition-colors mt-3 sm:mt-3.5 leading-snug">
                                    {event.title}
                                </h3>

                                {/* Event Meta: Date & Time */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 font-work-sans mt-3 sm:mt-3.5">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5 sm:size-4 text-neutral-400 shrink-0" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-3.5 sm:size-4 text-neutral-400 shrink-0" />
                                        <span>{event.time}</span>
                                    </div>
                                </div>

                                {/* Host */}
                                <div className="flex items-center gap-2 text-xs text-neutral-800 font-medium font-work-sans mt-3">
                                    <HostUserIcon />
                                    <span className="truncate">{event.hostName}</span>
                                </div>

                                {/* Venue */}
                                <div className="flex items-center gap-2 text-xs text-neutral-800 font-medium font-work-sans mt-3">
                                    <VenuePavilionIcon />
                                    <span className="truncate">{event.venue}</span>
                                </div>
                            </div>

                            {/* Total Guests Section */}
                            <div className="mt-5 pt-4 border-t border-neutral-100/80">
                                <p className="text-xs text-neutral-500 font-medium font-work-sans">
                                    Total Guest{event.totalGuests !== 1 ? "s" : ""}
                                </p>
                                <p className="text-2xl sm:text-[26px] font-bold font-space-grotesk text-neutral-900 tracking-tight mt-0.5">
                                    {event.totalGuests}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default AllEvents;

