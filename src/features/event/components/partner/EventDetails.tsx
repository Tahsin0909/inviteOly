"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    ShieldCheck,
    RotateCw,
    Pencil,
    ArrowLeft,
    Copy,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IPartnerEventDetails } from "../../event.interface";
import { getPartnerEventDetailsById } from "../../data/event.data";

// 1. Guests Icon (Two heads with body and plus sign)
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

// 2. RSVP Confirmed (Scalloped Rosette Seal with Checkmark)
const VerifiedBadgeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

// 3. Ticket Distribute (45-degree Angled Ticket)
const TicketIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white -rotate-45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
    </svg>
);

// 4. Check-in Icon (User with Checkmark)
const CheckInIcon = () => (
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
        <polyline points="16 11 18 13 22 9" />
    </svg>
);

// 5. User Silhouette Icon
const UserSilhouetteIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// Pure SVG Donut Chart
const DonutChart: React.FC<{
    percentage: string;
    segments: { label: string; count: number; color: string }[];
}> = ({ percentage, segments }) => {
    const total = segments.reduce((acc, curr) => acc + curr.count, 0) || 1;
    const radius = 62;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercent = 0;

    return (
        <div className="relative size-44 sm:size-52 md:size-60 mx-auto flex items-center justify-center my-4 sm:my-6">
            <svg className="size-full -rotate-90" viewBox="0 0 160 160">
                {segments.map((seg, idx) => {
                    const sliceRatio = seg.count / total;
                    const strokeDasharray = `${sliceRatio * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedPercent * circumference;
                    accumulatedPercent += sliceRatio;

                    return (
                        <circle
                            key={idx}
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-700"
                        />
                    );
                })}
            </svg>
            {/* Center Percentage */}
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                    {percentage}
                </span>
            </div>
        </div>
    );
};

interface EventDetailsProps {
    eventId?: string;
    customEvent?: IPartnerEventDetails;
    className?: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
    eventId,
    customEvent,
    className,
}) => {
    const event = customEvent || getPartnerEventDetailsById(eventId || "cur-1");
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        if (event.scannerAppCode) {
            navigator.clipboard.writeText(event.scannerAppCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getStatusBadge = () => {
        switch (event.status) {
            case "Active":
                return "bg-[#EAF7EE] text-[#16A34A] border-[#C6EFD2]";
            case "Scheduled":
                return "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]";
            default:
                return "bg-neutral-100 text-neutral-700 border-neutral-200";
        }
    };

    const isScheduled = event.status === "Scheduled";

    return (
        <section className={cn("w-full space-y-6 sm:space-y-7", className)}>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link
                            href="/partner/events"
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#C39B4C] transition-colors font-work-sans"
                        >
                            <ArrowLeft className="size-3.5" />
                            <span>Back to Events</span>
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        Events Management
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5 max-w-xl">
                        Manage all your events, track their progress, and monitor every stage
                        from request to completion.
                    </p>
                </div>
            </div>

            {/* Top Overview Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs">
                {/* Title, Badge & Edit Button */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            {event.title}
                        </h2>
                        <span
                            className={cn(
                                "px-2.5 py-0.5 text-xs font-semibold rounded-full border",
                                getStatusBadge()
                            )}
                        >
                            {event.status}
                        </span>
                    </div>

                    {/* Edit Button (Shown on Scheduled events as in Image 2) */}
                    {isScheduled && (
                        <button
                            onClick={() => alert("Edit event modal or page")}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neutral-200 hover:border-[#C39B4C] hover:bg-[#C39B4C]/5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            <span>Edit</span>
                            <Pencil className="size-3 text-[#C39B4C]" />
                        </button>
                    )}
                </div>

                {/* Details 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 pt-5 text-xs sm:text-sm font-work-sans">
                    {/* Left Column */}
                    <div className="space-y-3">
                        {/* Host Name */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <User className="size-4 text-neutral-400 shrink-0" />
                            <span>{event.hostName}</span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <Mail className="size-4 text-neutral-400 shrink-0" />
                            <a
                                href={`mailto:${event.hostEmail}`}
                                className="hover:text-neutral-900 underline-offset-2 hover:underline"
                            >
                                {event.hostEmail}
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <Phone className="size-4 text-neutral-400 shrink-0" />
                            <a href={`tel:${event.hostPhone}`} className="hover:text-neutral-900">
                                {event.hostPhone}
                            </a>
                        </div>

                        {/* Privacy / Type */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <ShieldCheck className="size-4 text-neutral-400 shrink-0" />
                            <span>{event.eventTypePrivacy}</span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        {/* Room Name */}
                        <div className="text-neutral-700">
                            <span className="text-neutral-500">
                                {isScheduled ? "Event Space:" : "Name of Ballroom or Room:"}
                            </span>{" "}
                            <span className="font-semibold text-neutral-900">{event.roomName}</span>
                        </div>

                        {/* Scanner App Login Code (Active events) */}
                        {event.scannerAppCode && (
                            <div className="flex items-center gap-2 text-neutral-700">
                                <span className="text-neutral-500">Scanner App Login Code :</span>
                                {showCode ? (
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-xs">
                                            {event.scannerAppCode}
                                        </span>
                                        <button
                                            onClick={handleCopyCode}
                                            className="text-[#C39B4C] hover:text-[#a88237] p-1"
                                            title="Copy code"
                                        >
                                            {copied ? (
                                                <Check className="size-3.5 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-3.5" />
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowCode(true)}
                                        className="inline-flex items-center gap-1 font-medium text-xs sm:text-sm text-[#C39B4C] hover:underline"
                                    >
                                        <span>View code</span>
                                        <RotateCw className="size-3" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Date */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <Calendar className="size-4 text-neutral-400 shrink-0" />
                            <span>{event.date}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <Clock className="size-4 text-neutral-400 shrink-0" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Section: 2x2 Metric Cards (Left) + Donut Chart Card (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                {/* Left: 4 Metric Cards in 2x2 Grid */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Card 1: Guests Total */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[140px] sm:min-h-[155px]">
                        <div className="size-10 sm:size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <GuestsIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans">
                                Guests Total
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {event.metrics.guestsTotal}
                            </p>
                        </div>
                    </div>

                    {/* Card 2: RSVP Confirmed */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[140px] sm:min-h-[155px]">
                        <div className="size-10 sm:size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <VerifiedBadgeIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans">
                                RSVP Confirmed
                            </p>
                            <p className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 mt-1 tracking-tight">
                                {event.metrics.rsvpConfirmed}
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Tickets Distributed */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[140px] sm:min-h-[155px]">
                        <div className="size-10 sm:size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            <TicketIcon />
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans">
                                Tickets Distributed
                            </p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                                    {event.metrics.ticketsDistributed}
                                </span>
                                <span className="text-xs sm:text-sm text-neutral-400 font-work-sans">
                                    / {event.metrics.ticketsTotal}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Checked In OR Available Tickets */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between min-h-[140px] sm:min-h-[155px]">
                        <div className="size-10 sm:size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-2xs">
                            {event.metrics.checkedIn !== undefined ? (
                                <CheckInIcon />
                            ) : (
                                <UserSilhouetteIcon />
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans">
                                {event.metrics.checkedIn !== undefined
                                    ? "Checked In"
                                    : "Available Tickets"}
                            </p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                                    {event.metrics.checkedIn !== undefined
                                        ? event.metrics.checkedIn
                                        : event.metrics.availableTickets}
                                </span>
                                <span className="text-xs sm:text-sm text-neutral-400 font-work-sans">
                                    / {event.metrics.ticketsTotal}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Donut Chart Card */}
                <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                    <h3 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        {event.chart.title}
                    </h3>

                    {/* SVG Donut Chart */}
                    <DonutChart
                        percentage={event.chart.percentage}
                        segments={event.chart.segments}
                    />

                    {/* Chart Legend */}
                    <div className="space-y-2.5 pt-2 border-t border-neutral-100">
                        {event.chart.segments.map((seg, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between text-xs sm:text-sm font-work-sans"
                            >
                                <div className="flex items-center gap-2 text-neutral-700">
                                    <span
                                        className="size-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: seg.color }}
                                    />
                                    <span>{seg.label}</span>
                                </div>
                                <span className="font-bold font-space-grotesk text-neutral-900">
                                    {seg.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;