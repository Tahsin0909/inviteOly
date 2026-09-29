"use client";

import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    IHostDashboardEvent,
    IHostRsvpMetrics,
    HostDashboardEventStatus,
} from "../../event.interface";
import {
    staticHostDashboardEvents,
    staticHostRsvpMetrics,
} from "../../data/hostEventTable.data";
import { RsvpMetricsCard } from "./RsvpMetricsCard";

interface EventTableProps {
    events?: IHostDashboardEvent[];
    metrics?: IHostRsvpMetrics;
    className?: string;
}

export const EventTable: React.FC<EventTableProps> = ({
    events = staticHostDashboardEvents,
    metrics = staticHostRsvpMetrics,
    className,
}) => {
    const getStatusColorClass = (status: HostDashboardEventStatus) => {
        switch (status) {
            case "Live Now":
                return "text-[#0FA958] dark:text-[#34D399]";
            case "Scheduled":
                return "text-[#3B82F6] dark:text-[#60A5FA]";
            case "Pending":
                return "text-[#E5A000] dark:text-[#FBBF24]";
            default:
                return "text-neutral-700 dark:text-neutral-300";
        }
    };

    const renderCheckInText = (checkIn: IHostDashboardEvent["checkIn"]) => {
        if (!checkIn) return "--";
        if (typeof checkIn === "string") return checkIn;
        return `${checkIn.checkedIn}/${checkIn.total}`;
    };

    return (
        <section className={cn("w-full", className)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Section: Events Table (Span 8 on desktop) */}
                <div className="lg:col-span-8 bg-white dark:bg-neutral-900/60 rounded-2xl sm:rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xs p-3 sm:p-5 md:p-6 overflow-hidden flex flex-col justify-between">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[620px] lg:min-w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs sm:text-sm font-semibold font-work-sans">
                                    <th className="py-3.5 px-3 sm:px-4">Event Name</th>
                                    <th className="py-3.5 px-3 sm:px-4">Date</th>
                                    <th className="py-3.5 px-3 sm:px-4">RSVP Rate</th>
                                    <th className="py-3.5 px-3 sm:px-4">Check in</th>
                                    <th className="py-3.5 px-3 sm:px-4">Status</th>
                                    <th className="py-3.5 px-3 sm:px-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-work-sans text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                                {events.map((event, idx) => (
                                    <tr
                                        key={event.id || idx}
                                        className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors duration-150 group"
                                    >
                                        {/* Event Name */}
                                        <td className="py-4 px-3 sm:px-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                                            {event.eventName}
                                        </td>

                                        {/* Date */}
                                        <td className="py-4 px-3 sm:px-4 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {event.date}
                                        </td>

                                        {/* RSVP Rate Progress Bar */}
                                        <td className="py-4 px-3 sm:px-4 whitespace-nowrap">
                                            {event.rsvpRate !== null &&
                                                event.rsvpRate !== undefined ? (
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm min-w-[34px]">
                                                        {event.rsvpRate}%
                                                    </span>
                                                    <div className="w-20 sm:w-24 h-2 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full transition-all duration-500",
                                                                event.status === "Live Now"
                                                                    ? "bg-[#0FA958]"
                                                                    : "bg-[#C39B4C]"
                                                            )}
                                                            style={{ width: `${event.rsvpRate}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Empty/Pending progress track */
                                                <div className="w-24 sm:w-28 h-2 rounded-full bg-[#FAF4ED] dark:bg-neutral-800 shrink-0" />
                                            )}
                                        </td>

                                        {/* Check In */}
                                        <td className="py-4 px-3 sm:px-4 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {renderCheckInText(event.checkIn)}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-3 sm:px-4 whitespace-nowrap">
                                            <span
                                                className={cn(
                                                    "font-semibold text-xs sm:text-sm",
                                                    getStatusColorClass(event.status)
                                                )}
                                            >
                                                {event.status}
                                            </span>
                                        </td>

                                        {/* Actions: View / Eye Icon */}
                                        <td className="py-4 px-3 sm:px-4 text-center whitespace-nowrap">
                                            <Link
                                                href={`/host/events/${event.id}`}
                                                className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20"
                                                title={`View event ${event.eventName}`}
                                                aria-label={`View event ${event.eventName}`}
                                            >
                                                <Eye className="size-4 sm:size-4.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Section: RSVP Metrics Card (Span 4 on desktop) */}
                <div className="lg:col-span-4 h-full">
                    <RsvpMetricsCard metrics={metrics} className="h-full" />
                </div>
            </div>
        </section>
    );
};

export default EventTable;

