"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPartnerEvent, PartnerEventStatus } from "../../event.interface";
import { staticPartnerEvents } from "../../data/event.data";

interface EventsTableProps {
    events?: IPartnerEvent[];
    className?: string;
}

export const EventsTable: React.FC<EventsTableProps> = ({
    events = staticPartnerEvents,
    className,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter events based on host name (and event type or venue)
    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return events;
        const query = searchQuery.toLowerCase().trim();
        return events.filter(
            (e: IPartnerEvent) =>
                e.hostName.toLowerCase().includes(query) ||
                e.eventType.toLowerCase().includes(query) ||
                e.venueRoom.toLowerCase().includes(query) ||
                e.status.toLowerCase().includes(query)
        );
    }, [events, searchQuery]);

    const getStatusStyle = (status: PartnerEventStatus) => {
        switch (status) {
            case "Live Now":
                return "text-[#16A34A] dark:text-emerald-400 font-semibold";
            case "Scheduled":
                return "text-[#2563EB] dark:text-blue-400 font-semibold";
            case "Pending":
                return "text-[#3B82F6] dark:text-blue-400 font-semibold";
            case "Confirmed":
                return "text-[#2563EB] dark:text-blue-400 font-semibold";
            default:
                return "text-neutral-700 dark:text-neutral-300 font-semibold";
        }
    };

    return (
        <section className={cn("w-full space-y-4 sm:space-y-5", className)}>
            {/* Top Header Section: Title & Pill Search Input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                        Events
                    </h2>
                </div>

                {/* Pill Search Input */}
                <div className="relative w-full sm:w-72 md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search host name..."
                        className="w-full pl-10 pr-9 py-2 text-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all font-work-sans shadow-2xs"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5 rounded-full transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="size-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white dark:bg-neutral-900/80 rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden transition-all">
                {filteredEvents.length === 0 ? (
                    /* Empty Search Results State */
                    <div className="py-16 px-4 text-center">
                        <div className="size-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-400 dark:text-neutral-500">
                            <Search className="size-5" />
                        </div>
                        <h3 className="text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white">
                            No events found
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1 max-w-sm mx-auto">
                            We couldn&apos;t find any events matching &ldquo;{searchQuery}&rdquo;. Try
                            searching by host name, venue, or status.
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 inline-flex items-center text-xs font-semibold text-[#C39B4C] hover:text-[#b08738] transition-colors"
                        >
                            Clear search filter
                        </button>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[880px] lg:min-w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold font-work-sans bg-neutral-50/40 dark:bg-neutral-950/40">
                                    <th className="py-4 px-5 sm:px-6">Event Type</th>
                                    <th className="py-4 px-4 sm:px-5">Host Name</th>
                                    <th className="py-4 px-4 sm:px-5">Date</th>
                                    <th className="py-4 px-4 sm:px-5">Venue/Room</th>
                                    <th className="py-4 px-4 sm:px-5">Guests</th>
                                    <th className="py-4 px-4 sm:px-5">RSVP Rate</th>
                                    <th className="py-4 px-4 sm:px-5">Check in</th>
                                    <th className="py-4 px-4 sm:px-5">Status</th>
                                    <th className="py-4 px-4 sm:px-6 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-work-sans text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                                {filteredEvents.map((event: IPartnerEvent) => (
                                    <tr
                                        key={event.id}
                                        className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors duration-150 group"
                                    >
                                        {/* Event Type */}
                                        <td className="py-4 sm:py-4.5 px-5 sm:px-6 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                                            {event.eventType}
                                        </td>

                                        {/* Host Name */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.hostName}
                                        </td>

                                        {/* Date */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.date}
                                        </td>

                                        {/* Venue/Room */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.venueRoom}
                                        </td>

                                        {/* Guests */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.guests}
                                        </td>

                                        {/* RSVP Rate */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.rsvpRate}
                                        </td>

                                        {/* Check in: e.g. 286/560 (51%) */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.checkIn.checkedIn}/{event.checkIn.total} ({event.checkIn.percentage})
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-5 whitespace-nowrap">
                                            <span className={getStatusStyle(event.status)}>
                                                {event.status}
                                            </span>
                                        </td>

                                        {/* Actions: Eye Icon Navigating to Event Details */}
                                        <td className="py-4 sm:py-4.5 px-4 sm:px-6 text-center whitespace-nowrap">
                                            <Link
                                                href={`/partner/events/${event.id}`}
                                                className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20"
                                                title={`View details for ${event.hostName}`}
                                                aria-label={`View details for ${event.hostName}`}
                                            >
                                                <Eye className="size-4 sm:size-4.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsTable;