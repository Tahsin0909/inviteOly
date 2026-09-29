"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { staticPartnerMetrics } from "../../data/partnerMetrics.data";
import {
    IPartnerMetricCard,
    PartnerMetricIconType,
} from "../../metrics.interface";

// 1. Bunting / Event Banner Icon
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

// 3. Venue / Architecture Pavilion Icon
const VenueIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
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

// 4. Rewards / Medal Ribbon Icon
const RewardsIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 sm:size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        <path d="M12 5v6" />
        <path d="M9 8h6" />
    </svg>
);

const renderIcon = (type: PartnerMetricIconType) => {
    switch (type) {
        case "events":
        case "todayEvents":
            return <BuntingIcon />;
        case "guests":
            return <GuestsIcon />;
        case "venue":
            return <VenueIcon />;
        case "rewards":
            return <RewardsIcon />;
        default:
            return <BuntingIcon />;
    }
};

interface PartnerMetricsProps {
    customMetrics?: typeof staticPartnerMetrics;
    className?: string;
}

export const PartnerMetrics: React.FC<PartnerMetricsProps> = ({
    customMetrics,
    className,
}) => {
    const { user, profile } = useAuth();
    const currentUser = profile || user;

    const data = customMetrics || staticPartnerMetrics;
    const displayName =
        currentUser?.firstName || data.welcomeName || "Alexander";
    const subtitle =
        data.welcomeSubtitle ||
        "Deliver a seamless arrival experience for every host and every guest.";

    return (
        <section className={cn("w-full", className)}>
            {/* Outer Banner Container with Banquet Hall Background */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xs border border-neutral-200/50 dark:border-neutral-800 bg-[#160E05] min-h-[220px] sm:min-h-[250px] md:min-h-[270px] p-6 sm:p-8 md:p-9 pb-20 sm:pb-24">
                {/* Background Image */}
                <Image
                    src="/dashboardMetricsBg.png"
                    alt="Banquet Venue Header"
                    fill
                    priority
                    className="object-cover object-center pointer-events-none select-none"
                />

                {/* Ambient Dark Gradient Overlays for High Contrast & Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 pointer-events-none" />
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
                    {data.cards.map((card: IPartnerMetricCard) => (
                        <div
                            key={card.id}
                            className="bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-neutral-200/70 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[140px] sm:min-h-[155px]"
                        >
                            {/* Badge Icon */}
                            <div
                                className={cn(
                                    "size-10 sm:size-11 rounded-xl flex items-center justify-center shadow-xs shrink-0",
                                    card.colorVariant === "coral"
                                        ? "bg-[#C85A3F]"
                                        : "bg-[#C39B4C]"
                                )}
                            >
                                {renderIcon(card.iconType)}
                            </div>

                            {/* Card Title & Value */}
                            <div className="mt-3.5 sm:mt-4">
                                <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-work-sans truncate">
                                    {card.title}
                                </p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-1 tracking-tight">
                                    {card.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerMetrics;