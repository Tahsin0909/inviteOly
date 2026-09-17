"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { staticAdminMetrics } from "../../data/adminMetrics.data";
import {
    AdminMetricIconType,
    IAdminMetricCard,
    IAdminMetrics,
} from "../../metrics.interface";

// 1. Partner Sparkle Icon (Card 1 & 3)
const PartnerSparkleIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Left figure */}
        <circle cx="8.5" cy="12.5" r="2.75" />
        <path d="M4 21v-1.5a3.5 3.5 0 0 1 7 0V21" />
        {/* Right figure */}
        <circle cx="16" cy="13" r="2.25" />
        <path d="M13.5 21v-1a3 3 0 0 1 5.5-1.5" />
        {/* Sparkles / star above */}
        <path d="M10 2v3M8.5 3.5h3" strokeWidth="1.6" />
        <path d="M17.5 4.5v2.5M16.25 5.75h2.5" strokeWidth="1.4" />
    </svg>
);

// 2. Host Users Group Icon (Card 2 & 4)
const HostUsersIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5.5 text-white"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="3.75" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const renderAdminIcon = (type: AdminMetricIconType) => {
    switch (type) {
        case "totalPartner":
        case "newRegisteredPartner":
            return <PartnerSparkleIcon />;
        case "totalHost":
        case "newRegisteredHost":
            return <HostUsersIcon />;
        default:
            return <PartnerSparkleIcon />;
    }
};

interface AdminMatricsProps {
    customMetrics?: IAdminMetrics;
    className?: string;
}

export const AdminMatrics: React.FC<AdminMatricsProps> = ({
    customMetrics,
    className,
}) => {
    const data = customMetrics || staticAdminMetrics;

    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
                className
            )}
        >
            {data.cards.map((card: IAdminMetricCard) => (
                <div
                    key={card.id}
                    className="bg-white rounded-2xl p-5 border border-neutral-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                    {/* Top Gold Badge Icon */}
                    <div className="size-10 rounded-xl bg-[#B89047] flex items-center justify-center shadow-xs shrink-0">
                        {renderAdminIcon(card.iconType)}
                    </div>

                    {/* Value and Label / Growth Row */}
                    <div className="mt-4">
                        <p className="text-2xl sm:text-[28px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            {card.value}
                        </p>

                        <div className="flex items-center justify-between mt-1.5 gap-2">
                            <span className="text-xs sm:text-sm font-medium text-neutral-500 font-work-sans truncate">
                                {card.title}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#E8F8EE] text-[#0FA958] shrink-0">
                                {card.growthRate}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminMatrics;

