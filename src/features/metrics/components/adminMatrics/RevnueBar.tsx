"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { staticRevenueBreakdown } from "../../data/adminMetrics.data";
import {
    IRevenueBreakdown,
    RevenueTimeframe,
} from "../../metrics.interface";

interface RevnueBarProps {
    customRevenue?: IRevenueBreakdown;
    className?: string;
}

// 7 Y-Axis ticks from top (50k) to bottom (0)
const Y_AXIS_LABELS = ["50k", "30k", "20k", "10k", "5k", "1k", "0"];

// Calculated percentage heights for the 12 bars to match mockup visually
const BAR_HEIGHT_PERCENTAGES: Record<string, number> = {
    Jan: 12,
    Feb: 42,
    Mar: 24,
    Apr: 58,
    May: 73,
    Jun: 86,
    Jul: 59,
    Aug: 72,
    Sep: 52,
    Oct: 45,
    Nov: 68,
    Dec: 83,
};

export const RevnueBar: React.FC<RevnueBarProps> = ({
    customRevenue,
    className,
}) => {
    const data = customRevenue || staticRevenueBreakdown;
    const [selectedTimeframe, setSelectedTimeframe] =
        useState<RevenueTimeframe>(data.timeframe || "Last 30 Days");
    const [activeMonth, setActiveMonth] = useState<string>(
        data.selectedMonth || "Jun"
    );

    const timeframes: RevenueTimeframe[] = [
        "Last 7 Days",
        "Last 30 Days",
        "Last 12 Months",
    ];

    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/70 shadow-xs",
                className
            )}
        >
            {/* Top Header: Title & Total Revenue on Left, Timeframe Tabs on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 font-work-sans">
                        Revenue Breakdown
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight mt-1">
                        {data.totalRevenue}
                    </p>
                </div>

                {/* Timeframe Selector Tabs */}
                <div className="inline-flex items-center p-1 rounded-xl bg-[#F8F8F8] border border-neutral-200/70 self-start sm:self-auto">
                    {timeframes.map((tf) => {
                        const isActive = selectedTimeframe === tf;
                        return (
                            <button
                                key={tf}
                                type="button"
                                onClick={() => setSelectedTimeframe(tf)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
                                    isActive
                                        ? "bg-white text-[#B89047] font-semibold shadow-xs"
                                        : "text-neutral-500 hover:text-neutral-800"
                                )}
                            >
                                {tf}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bar Chart Container */}
            <div className="mt-8">
                <div className="relative flex">
                    {/* Y-Axis Labels */}
                    <div className="flex flex-col justify-between pr-3 sm:pr-4 text-right select-none h-[240px] sm:h-[260px] pb-6 shrink-0">
                        {Y_AXIS_LABELS.map((label) => (
                            <span
                                key={label}
                                className="text-[11px] sm:text-xs font-medium text-neutral-600 font-work-sans leading-none"
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    {/* Chart Plot Area with Grid Lines and Bars */}
                    <div className="relative flex-1 h-[240px] sm:h-[260px] pb-6">
                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 pb-6 flex flex-col justify-between pointer-events-none">
                            {Y_AXIS_LABELS.map((label) => (
                                <div
                                    key={`line-${label}`}
                                    className="w-full border-b border-neutral-100/90"
                                />
                            ))}
                        </div>

                        {/* 12 Month Bars Grid */}
                        <div className="relative h-full flex items-end justify-between px-1 sm:px-2 gap-1.5 sm:gap-2 md:gap-3">
                            {data.data.map((item) => {
                                const isCurrentActive = activeMonth === item.month;
                                const barHeightPercent =
                                    BAR_HEIGHT_PERCENTAGES[item.month] ?? 50;

                                return (
                                    <div
                                        key={item.month}
                                        className="relative flex-1 h-full flex flex-col items-center justify-end group cursor-pointer"
                                        onMouseEnter={() => setActiveMonth(item.month)}
                                        onClick={() => setActiveMonth(item.month)}
                                    >
                                        {/* Tooltip Pill and Downward Arrow */}
                                        {isCurrentActive && (
                                            <div
                                                className="absolute z-30 flex flex-col items-center pointer-events-none transition-all duration-150 animate-in fade-in"
                                                style={{
                                                    bottom: `calc(${barHeightPercent}% + 8px)`,
                                                }}
                                            >
                                                <div className="bg-[#F4F4F5] border border-neutral-200/90 text-neutral-700 text-[10.5px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs whitespace-nowrap">
                                                    {item.tooltipText ||
                                                        (item.month === "Jun"
                                                            ? "This month: $8879.09"
                                                            : `${item.month}: ${item.formattedAmount || `$${item.amount.toLocaleString()}`}`)}
                                                </div>
                                                {/* Downward triangle indicator */}
                                                <div className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[5px] border-t-neutral-300" />
                                            </div>
                                        )}

                                        {/* Vertical Dashed Guideline for Active Month */}
                                        {isCurrentActive && (
                                            <div
                                                className="absolute w-0 border-l border-dashed border-neutral-400/80 z-20 pointer-events-none"
                                                style={{
                                                    bottom: 0,
                                                    height: `calc(${barHeightPercent}% + 8px)`,
                                                }}
                                            />
                                        )}

                                        {/* The Bar */}
                                        <div
                                            className={cn(
                                                "w-full max-w-[22px] sm:max-w-[28px] md:max-w-[32px] rounded-t-[2px] transition-all duration-200 relative z-10",
                                                isCurrentActive
                                                    ? "bg-[#C39B4C] hover:bg-[#B89047]"
                                                    : "bg-[#71717A] hover:bg-neutral-600"
                                            )}
                                            style={{
                                                height: `${barHeightPercent}%`,
                                            }}
                                        />

                                        {/* Month Label below bar */}
                                        <span
                                            className={cn(
                                                "absolute -bottom-6 text-[11px] sm:text-xs font-medium font-work-sans transition-colors duration-150 select-none",
                                                isCurrentActive
                                                    ? "text-neutral-900 font-semibold"
                                                    : "text-neutral-600"
                                            )}
                                        >
                                            {item.month}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevnueBar;

