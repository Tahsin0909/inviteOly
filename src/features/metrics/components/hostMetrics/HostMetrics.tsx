"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { staticHostMetrics } from "../../data/hostMetrics.data";
import {
    HostMetricIconType,
    IHostMetricCard,
} from "../../metrics.interface";

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

// 2. Guests / User Plus Icon
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

// 3. RSVP Confirmed (Verified Seal Checkmark)
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

// 4. Ticket Distribute Icon (Angled Ticket with notches)
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

// 5. Check in Icon (User Profile with Checkmark)
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

const renderHostIcon = (type: HostMetricIconType) => {
    switch (type) {
        case "activeEvent":
            return <BuntingIcon />;
        case "totalGuest":
            return <GuestsIcon />;
        case "rsvpConfirmed":
            return <VerifiedBadgeIcon />;
        case "ticketDistribute":
            return <TicketIcon />;
        case "checkIn":
            return <CheckInIcon />;
        default:
            return <BuntingIcon />;
    }
};

interface HostMetricsProps {
    customMetrics?: typeof staticHostMetrics;
    className?: string;
}

export const HostMetrics: React.FC<HostMetricsProps> = ({
    customMetrics,
    className,
}) => {
    const { user, profile } = useAuth();
    const currentUser = profile || user;

    const data = customMetrics || staticHostMetrics;
    const displayName =
        currentUser?.firstName || data.welcomeName || "Alexander";
    const subtitle =
        data.welcomeSubtitle ||
        "Here is a live overview of your hosted events and guest activity across your luxury portfolio.";

    return (
        <section className={cn("w-full", className)}>
            {/* Outer Banner Container with Wedding Reception Background */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xs border border-neutral-200/50 dark:border-neutral-800 bg-[#160E05] min-h-[220px] sm:min-h-[250px] md:min-h-[270px] p-6 sm:p-8 md:p-9 pb-20 sm:pb-24">
                {/* Background Image */}
                <Image
                    src="/hostMetricsBg.png"
                    alt="Host Events Celebration"
                    fill
                    priority
                    className="object-cover object-center pointer-events-none select-none"
                />

                {/* Ambient Dark Gradient Overlays for Optimal Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Top Header Section: Welcome Text */}
                <div className="relative z-10 max-w-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk text-white tracking-tight leading-[1.15]">
                        Welcome back,<br />
                        <span>{displayName}</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-[15px] font-work-sans text-neutral-200/90 mt-2.5 sm:mt-3 leading-relaxed max-w-md">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Overlapping Metrics Cards Grid */}
            <div className="relative z-20 -mt-14 sm:-mt-16 md:-mt-20 px-3 sm:px-5 md:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 md:gap-4">
                    {data.cards.map((card: IHostMetricCard) => (
                        <div
                            key={card.id}
                            className="bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-neutral-200/70 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[140px] sm:min-h-[155px]"
                        >
                            {/* Badge Icon */}
                            <div className="size-10 sm:size-11 rounded-xl bg-[#C39B4C] flex items-center justify-center shadow-xs shrink-0">
                                {renderHostIcon(card.iconType)}
                            </div>

                            {/* Card Title & Value */}
                            <div className="mt-3.5 sm:mt-4">
                                <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-work-sans truncate">
                                    {card.title}
                                </p>

                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                                        {card.value}
                                    </span>
                                    {card.totalValue && (
                                        <span className="text-xs sm:text-sm font-normal text-neutral-400 dark:text-neutral-500 font-work-sans">
                                            / {card.totalValue}
                                        </span>
                                    )}
                                </div>

                                {card.subText && (
                                    <p className="text-xs sm:text-[13px] font-semibold text-neutral-700 dark:text-neutral-300 font-work-sans mt-0.5 truncate">
                                        {card.subText}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HostMetrics;