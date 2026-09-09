"use client";

import React, { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCards } from "../EventCards";
import { IEventCard, IPartnerEventsManagementData } from "../../event.interface";
import { staticPartnerEventsManagementData } from "../../data/event.data";

// 1. Party Garland / Bunting Icon
const BuntingIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 5h20" />
        <path d="M3 5l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
        <path d="M9 5l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
        <path d="M15 5l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
        <path d="M2 13h20" />
        <path d="M3 13l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
        <path d="M9 13l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
        <path d="M15 13l3 5 3-5" fill="currentColor" fillOpacity="0.3" />
    </svg>
);

// 2. Upcoming / Clock with SOON Icon
const SoonClockIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8.5" r="5.5" />
        <polyline points="12 6 12 8.5 14 9.5" />
        <text
            x="12"
            y="20.5"
            textAnchor="middle"
            fontSize="7"
            fontWeight="900"
            fill="currentColor"
            stroke="none"
            letterSpacing="0.5"
        >
            SOON
        </text>
    </svg>
);

// 3. Guests / User Plus Icon
const GuestsIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
);

interface EventManagementProps {
    customData?: IPartnerEventsManagementData;
    className?: string;
}

export const EventManagement: React.FC<EventManagementProps> = ({
    customData,
    className,
}) => {
    const data: IPartnerEventsManagementData =
        customData || staticPartnerEventsManagementData;
    const [viewMode, setViewMode] = useState<"current" | "past">("current");
    const [searchQuery, setSearchQuery] = useState("");

    const rawEvents: IEventCard[] =
        viewMode === "current" ? data.currentEvents : data.pastEvents;

    const filteredEvents: IEventCard[] = useMemo(() => {
        if (!searchQuery.trim()) return rawEvents;
        const q = searchQuery.toLowerCase().trim();
        return rawEvents.filter(
            (e: IEventCard) =>
                e.hostName.toLowerCase().includes(q) ||
                e.title.toLowerCase().includes(q) ||
                e.status.toLowerCase().includes(q)
        );
    }, [rawEvents, searchQuery]);

    return (
        <section className={cn("w-full space-y-6 sm:space-y-8", className)}>
            {/* Top Header: Title, Description, Date & View Toggle */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        Events Management
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1 max-w-xl">
                        Manage all your events, track their progress, and monitor every stage
                        from request to completion.
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1.5 self-start shrink-0">
                    {/* Formatted Date */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 font-work-sans">
                        <span>{data.dateFormatted || "06 Aug, 2026"}</span>
                        <CalendarIcon className="size-4 text-neutral-400" />
                    </div>

                    {/* Toggle View Mode Link */}
                    <button
                        onClick={() => {
                            setViewMode((prev) => (prev === "current" ? "past" : "current"));
                            setSearchQuery("");
                        }}
                        className="text-xs sm:text-sm font-semibold text-[#C39B4C] hover:text-[#a88237] transition-colors cursor-pointer"
                    >
                        {viewMode === "current" ? "View Past Events" : "Current Events"}
                    </button>
                </div>
            </div>

            {/* Metric Summary Cards */}
            {viewMode === "current" ? (
                /* Current Events Metrics (3 Cards) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Card 1: Today's Events */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[145px] sm:min-h-[160px]">
                        <div className="size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <BuntingIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-600 font-work-sans">
                                Today&apos;s Events
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {data.currentMetrics.todaysEvents}
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Upcoming Events */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[145px] sm:min-h-[160px]">
                        <div className="size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <SoonClockIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-600 font-work-sans">
                                Upcoming Events
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {data.currentMetrics.upcomingEvents}
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Total Guests */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[145px] sm:min-h-[160px]">
                        <div className="size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <GuestsIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-600 font-work-sans">
                                Total Guests
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {data.currentMetrics.totalGuests}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Past Events Metrics (2 Cards) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Card 1: Completed Events */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[145px] sm:min-h-[160px]">
                        <div className="size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <BuntingIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-600 font-work-sans">
                                Completed Events
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {data.pastMetrics.completedEvents}
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Total Guests */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[145px] sm:min-h-[160px]">
                        <div className="size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <GuestsIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-600 font-work-sans">
                                Total Guests
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {data.pastMetrics.totalGuests}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Events Section: Header & Cards Grid */}
            <div className="space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                    <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        Events
                    </h2>

                    {/* Pill Search Input */}
                    <div className="relative w-full sm:w-72 md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search host name..."
                            className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] placeholder:text-neutral-400 transition-all font-work-sans shadow-2xs"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 rounded-full transition-colors"
                                aria-label="Clear search"
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Event Cards Grid or Empty State */}
                {filteredEvents.length === 0 ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-12 text-center border border-neutral-200/80 shadow-xs">
                        <div className="size-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                            <Search className="size-5" />
                        </div>
                        <h3 className="text-base font-semibold font-space-grotesk text-neutral-900">
                            No events found
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1 max-w-sm mx-auto">
                            No {viewMode === "current" ? "active" : "past"} events matched &ldquo;{searchQuery}&rdquo;.
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-xs font-semibold text-[#C39B4C] hover:text-[#b08738] transition-colors"
                        >
                            Clear search filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {filteredEvents.map((event: IEventCard) => (
                            <EventCards key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventManagement;