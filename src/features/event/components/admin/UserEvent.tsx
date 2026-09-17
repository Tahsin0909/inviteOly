"use client";

import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { staticAdminEvents } from "../../data/adminEvent.data";
import { IAdminEventCard } from "../../event.interface";

// 1. Host User Icon
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

// 2. Pavilion Venue Icon
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

interface UserEventProps {
    events?: IAdminEventCard[];
    className?: string;
}

export const UserEvent: React.FC<UserEventProps> = ({
    events,
    className,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const eventList = events || staticAdminEvents.slice(0, 3);

    return (
        <div className={cn("w-full space-y-6 mt-8", className)}>
            {/* 3 User Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {eventList.map((event: IAdminEventCard) => {
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
                                    Total Guest
                                </p>
                                <p className="text-2xl sm:text-[26px] font-bold font-space-grotesk text-neutral-900 tracking-tight mt-0.5">
                                    {event.totalGuests}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Bar: Rows per page on left & Pagination on right */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs sm:text-sm text-neutral-500 font-work-sans select-none">
                <div>Rows per page 10</div>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="size-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    {[1, 2, 3, 4].map((page) => {
                        const isActive = currentPage === page;
                        return (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    "size-8 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center transition-all cursor-pointer",
                                    isActive
                                        ? "bg-[#B89047] text-white font-semibold shadow-xs"
                                        : "text-neutral-600 hover:bg-neutral-100"
                                )}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                        className="size-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserEvent;

