"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IHostRsvpMetrics } from "../../event.interface";
import { staticHostRsvpMetrics } from "../../data/hostEventTable.data";

interface RsvpMetricsCardProps {
  metrics?: IHostRsvpMetrics;
  className?: string;
}

export const RsvpMetricsCard: React.FC<RsvpMetricsCardProps> = ({
  metrics = staticHostRsvpMetrics,
  className,
}) => {
  const {
    totalInvited,
    confirmationRate,
    confirmed,
    pending,
    declined,
    summaryText,
  } = metrics;

  // Chart configuration: 180x180 viewBox, radius 70, strokeWidth 22
  // Circumference = 2 * PI * 70 ≈ 439.82
  const radius = 70;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  // Arc calculations matching media_1789289757039.png:
  // Visual layout: Green (Confirmed, ~64.3%), Amber (Pending, ~32.1%), Red (Declined, ~3.6% with min arc of 6%)
  // Total base: 560
  const total = totalInvited || 560;

  // Slices:
  // To match the screenshot rotation precisely:
  // Green starts at ~7:30 (approx 225 deg / -135 deg relative to 12 o'clock)
  // Green sweeps clockwise past 12:00 to ~1:30 (approx 62% of circle)
  // Amber sweeps clockwise from 1:30 to ~5:30 (approx 31% of circle)
  // Red sweeps from 5:30 to 7:30 (approx 7% of circle)
  const greenRatio = confirmed / total; // ~0.6428
  const amberRatio = pending / total;   // ~0.3214
  const redRatio = declined / total;     // ~0.0357

  // Calculate DashArrays and offsets:
  // We use standard SVG circle with transform rotate(-135 100 100) so it starts at bottom-left (~7:30)
  const greenDash = greenRatio * circumference;
  const amberDash = amberRatio * circumference;
  const redDash = redRatio * circumference;

  return (
    <div
      className={cn(
        "bg-white rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-xs p-6 sm:p-7 flex flex-col justify-between transition-all",
        className
      )}
    >
      <div>
        {/* Card Header */}
        <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          RSVP Metrics
        </h3>

        {/* Donut Chart with Center Rate */}
        <div className="relative size-48 sm:size-52 md:size-56 mx-auto flex items-center justify-center my-6 sm:my-8">
          <svg
            className="size-full"
            viewBox="0 0 200 200"
            style={{ transform: "rotate(-130deg)" }}
          >
            {/* Background Track Circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#F5F5F5"
              strokeWidth={strokeWidth}
            />

            {/* Segment 1: Confirmed (Green) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#0FA958"
              strokeWidth={strokeWidth}
              strokeDasharray={`${greenDash} ${circumference}`}
              strokeDashoffset={0}
              className="transition-all duration-700"
            />

            {/* Segment 2: Pending (Amber / Gold) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#E5A000"
              strokeWidth={strokeWidth}
              strokeDasharray={`${amberDash} ${circumference}`}
              strokeDashoffset={-greenDash}
              className="transition-all duration-700"
            />

            {/* Segment 3: Declined (Crimson / Red) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#B91C1C"
              strokeWidth={strokeWidth}
              strokeDasharray={`${redDash} ${circumference}`}
              strokeDashoffset={-(greenDash + amberDash)}
              className="transition-all duration-700"
            />
          </svg>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
              {confirmationRate}
            </span>
          </div>
        </div>

        {/* Legend Breakdown Rows */}
        <div className="space-y-3 sm:space-y-3.5 px-1 font-work-sans">
          {/* Confirmed */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-[#0FA958] shrink-0" />
              <span className="font-semibold text-neutral-900">Confirmed</span>
            </div>
            <span className="font-semibold text-neutral-900 font-space-grotesk">
              {confirmed}
            </span>
          </div>

          {/* Pending */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-[#E5A000] shrink-0" />
              <span className="font-semibold text-neutral-900">Pending</span>
            </div>
            <span className="font-semibold text-neutral-900 font-space-grotesk">
              {pending}
            </span>
          </div>

          {/* Declined */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-[#B91C1C] shrink-0" />
              <span className="font-semibold text-neutral-900">Declined</span>
            </div>
            <span className="font-semibold text-neutral-900 font-space-grotesk">
              {declined}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Summary Info */}
      <div className="border-t border-neutral-100 pt-5 mt-6">
        <p className="text-xs sm:text-[13px] text-neutral-600 font-work-sans leading-relaxed">
          {summaryText ? (
            summaryText
          ) : (
            <>
              Total invited{" "}
              <strong className="text-neutral-900 font-semibold">
                {totalInvited}
              </strong>
              . Current confirmation rate is{" "}
              <strong className="text-neutral-900 font-semibold">
                {confirmationRate}
              </strong>
              , up from last week&apos;s projection.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RsvpMetricsCard;

