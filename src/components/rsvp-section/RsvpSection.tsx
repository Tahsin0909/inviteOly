"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface RsvpStepItem {
    number: number;
    title: string;
    description: string;
}

export interface RsvpGuestTicket {
    guestName: string;
    eventName: string;
    dateTimeLocation: string;
}

export interface RsvpSectionProps {
    /**
     * Section uppercase eyebrow label.
     * @default "RSVP"
     */
    eyebrow?: string;

    /**
     * Main section headline.
     * @default "KNOW WHO'S COMING BEFORE THE BIG DAY"
     */
    title?: string;

    /**
     * Subtitle description below the main headline.
     * @default "Guests receive a personalized ticket. They confirm attendance - and their QR code unlocks instantly."
     */
    subtitle?: string;

    /**
     * Guest ticket mock data.
     */
    ticketInfo?: RsvpGuestTicket;

    /**
     * 4-step workflow steps.
     */
    steps?: readonly RsvpStepItem[];

    /**
     * Custom CSS class name for the root section.
     */
    className?: string;
}

const DEFAULT_STEPS: readonly RsvpStepItem[] = [
    {
        number: 1,
        title: "Guest receives their RSVP",
        description:
            "Each guest receives a personalized RSVP with your event details.",
    },
    {
        number: 2,
        title: "They respond by your RSVP date",
        description:
            "Guests must select Attending or Not Attending by the RSVP deadline you set.",
    },
    {
        number: 3,
        title: "Their ticket unlocks when confirmed",
        description:
            "Guests who confirm attendance instantly receive access to their personalized QR ticket.",
    },
    {
        number: 4,
        title: "Declined tickets are automatically voided",
        description:
            "If a guest declines, their ticket is deactivated and their RSVP status updates in your Host Dashboard.",
    },
];

const DEFAULT_TICKET: RsvpGuestTicket = {
    guestName: "Sophie Marchetti",
    eventName: "The Harrington Gala",
    dateTimeLocation: "Sat 14 Sep · 7 PM · NYC",
};

const RsvpSection: React.FC<RsvpSectionProps> = ({
    eyebrow = "RSVP",
    title = "KNOW WHO'S COMING BEFORE THE BIG DAY",
    subtitle = "Guests receive a personalized ticket. They confirm attendance - and their QR code unlocks instantly.",
    ticketInfo = DEFAULT_TICKET,
    steps = DEFAULT_STEPS,
    className,
}) => {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <section
            id="rsvp-workflow"
            aria-label="RSVP workflow and ticketing preview"
            className={cn("py-16 sm:py-20 md:py-24 bg-background", className)}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    {/* Eyebrow with gold circle badge */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            {eyebrow}
                        </span>
                        <span
                            className="size-3.5 sm:size-4 rounded-full bg-primary inline-flex items-center justify-center shadow-xs"
                            aria-hidden="true"
                        >
                            <span className="size-1.5 rounded-full bg-white/70" />
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold font-space-grotesk text-foreground uppercase tracking-tight leading-tight">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="mt-3.5 font-work-sans text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                        {subtitle}
                    </p>
                </div>

                {/* Content Grid: 2 Ticket Cards (Left) + 4-Step Explanation (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left Column: Interactive Ticket Previews */}
                    <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-4 lg:gap-6 relative">
                        {/* Card 1: Waiting for RSVP */}
                        <div className="w-full max-w-[280px] sm:w-[280px] h-[420px] bg-card dark:bg-card border border-border rounded-2xl shadow-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md shrink-0">
                            {/* Card Header */}
                            <div className="h-11 bg-muted/60 border-b border-dashed border-border px-5 flex items-center">
                                <span className="text-xs text-muted-foreground font-medium font-work-sans">
                                    Waiting for RSVP
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col items-center justify-between text-center">
                                {/* Guest Details */}
                                <div className="flex flex-col items-center">
                                    <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1">
                                        Guest
                                    </span>
                                    <h3 className="text-base font-bold font-space-grotesk text-foreground">
                                        {ticketInfo.guestName}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {ticketInfo.eventName}
                                    </p>
                                    <p className="text-xs text-muted-foreground/80 mt-0.5">
                                        {ticketInfo.dateTimeLocation}
                                    </p>
                                </div>

                                {/* Blurred QR Code */}
                                <div className="my-auto size-28 relative flex items-center justify-center">
                                    <Image
                                        src="/qr/blurQr.png"
                                        alt="Blurred QR ticket waiting for confirmation"
                                        width={112}
                                        height={112}
                                        className="size-full object-contain select-none"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="w-full flex flex-col items-center mt-auto">
                                    {/* Confirm Attendance Button */}
                                    <button
                                        type="button"
                                        onClick={() => setConfirmed(true)}
                                        className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 active:scale-[0.98] shadow-xs transition-all cursor-pointer"
                                    >
                                        Confirm Attendance
                                    </button>

                                    {/* Decline Option */}
                                    <button
                                        type="button"
                                        onClick={() => setConfirmed(false)}
                                        className="text-xs text-muted-foreground hover:text-foreground mt-2.5 transition-colors cursor-pointer"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Middle Indicator: Tap confirm */}
                        <div className="flex items-center justify-center shrink-0">
                            <span className="text-xs text-muted-foreground font-work-sans whitespace-nowrap select-none">
                                Tap confirm
                            </span>
                        </div>

                        {/* Card 2: Ticket Active */}
                        <div
                            className={cn(
                                "w-full max-w-[280px] sm:w-[280px] h-[420px] bg-card dark:bg-card border border-border rounded-2xl shadow-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md shrink-0",
                                confirmed ? "ring-2 ring-emerald-500/40" : ""
                            )}
                        >
                            {/* Card Header */}
                            <div className="h-11 bg-muted/60 border-b border-dashed border-border px-5 flex items-center justify-between">
                                <span className="text-xs text-foreground font-medium font-work-sans">
                                    Ticket Active
                                </span>
                                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full leading-tight">
                                    Active
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col items-center justify-between text-center">
                                {/* Guest Details */}
                                <div className="flex flex-col items-center">
                                    <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1">
                                        Guest
                                    </span>
                                    <h3 className="text-base font-bold font-space-grotesk text-foreground">
                                        {ticketInfo.guestName}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {ticketInfo.eventName}
                                    </p>
                                    <p className="text-xs text-muted-foreground/80 mt-0.5">
                                        {ticketInfo.dateTimeLocation}
                                    </p>
                                </div>

                                {/* Unlocked Sharp QR Code */}
                                <div className="flex-1 w-full flex items-center justify-center my-auto">
                                    <div className="size-36 sm:size-40 relative flex items-center justify-center">
                                        <Image
                                            src="/qr/qr.png"
                                            alt="Active unlocked QR code ticket"
                                            width={160}
                                            height={160}
                                            className="size-full object-contain select-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 4-Step Process List */}
                    <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-7">
                        {steps.map((item) => (
                            <div key={item.number} className="flex items-start gap-4">
                                {/* Step Number Circle */}
                                <span className="size-6 sm:size-7 rounded-full bg-muted text-muted-foreground font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 select-none">
                                    {item.number}
                                </span>

                                {/* Step Details */}
                                <div className="flex flex-col">
                                    <h4 className="text-sm sm:text-base font-bold font-space-grotesk text-foreground">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-work-sans leading-relaxed mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RsvpSection;