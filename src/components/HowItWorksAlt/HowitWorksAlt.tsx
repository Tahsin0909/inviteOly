import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HowItWorksAltStep {
    step: string;
    title: string;
    description: string;
}

export interface HowItWorksAltProps {
    className?: string;
}

const STANDARD_STEPS: readonly HowItWorksAltStep[] = [
    {
        step: "01",
        title: "Create your event",
        description: "Add the venue, date, ticket types, and entry requirements.",
    },
    {
        step: "02",
        title: "View a sample ticket",
        description: "Preview a ticket with your event details before you purchase.",
    },
    {
        step: "03",
        title: "Add guests",
        description: "Upload a guest list or add guests manually.",
    },
    {
        step: "04",
        title: "Prepare each ticket",
        description: "Choose the ticket type and assign a name for tracking.",
    },
    {
        step: "05",
        title: "Finalize and send",
        description: "Select Lock & Finalize, then copy and send each link.",
    },
];

const PREMIUM_STEPS: readonly HowItWorksAltStep[] = [
    {
        step: "01",
        title: "Create your event",
        description: "Add the venue, date, ticket types, and entry requirements.",
    },
    {
        step: "02",
        title: "View a sample ticket",
        description: "Preview a ticket with your event details before you purchase.",
    },
    {
        step: "03",
        title: "Add guest details",
        description: "Enter names, emails, ticket types, and optional seating.",
    },
    {
        step: "04",
        title: "Set deadline and finalize",
        description: "Choose the RSVP deadline, review, and finalize the tickets.",
    },
    {
        step: "05",
        title: "Send and track responses",
        description: "Send by email or link, then monitor each guest's response.",
    },
];

const HowItWorksAlt: React.FC<HowItWorksAltProps> = ({ className }) => {
    return (
        <section
            id="how-it-works"
            aria-label="How it works"
            className={cn(
                "pt-14 sm:pt-18 md:pt-22 pb-14 sm:pb-18 md:pb-22 bg-background",
                className
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ========================================================= */}
                {/* 1. Main Section Header & Standard Package                  */}
                {/* ========================================================= */}
                <div className="text-left mb-10 sm:mb-12">
                    <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-primary uppercase mb-2">
                        HOW IT WORKS
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold font-space-grotesk text-foreground uppercase tracking-tight leading-tight">
                        SECURE GUEST TICKETS, MADE SIMPLE
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground font-work-sans">
                        Prepare and manage private-event entry from one easy-to-use Host Dashboard.
                    </p>
                </div>

                <hr className="border-t border-[#ede8dd] dark:border-border/60 my-8 sm:my-10" />

                {/* Standard Package Section: Left Steps, Right Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Standard Package Details & Steps */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#d9c59a] bg-[#fbf7ee] dark:bg-[#262015] text-[#a67d32] dark:text-[#d4af5f] text-xs font-bold uppercase tracking-wider">
                                STANDARD PACKAGE
                            </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold uppercase font-space-grotesk tracking-tight text-foreground mb-2 leading-tight">
                            SIMPLE TICKET FLOW
                        </h3>

                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-work-sans max-w-xl">
                            For hosts who want secure QR tickets and a simple dashboard without RSVP management or automatic email delivery.
                        </p>

                        {/* Step Cards List */}
                        <div className="space-y-3 sm:space-y-3.5">
                            {STANDARD_STEPS.map((item) => (
                                <div
                                    key={item.step}
                                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#1e1c19] border border-[#ede8dd] dark:border-[#332f28] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-primary/40 transition-colors"
                                >
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#c39b4c] dark:bg-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm sm:text-base font-bold text-foreground font-space-grotesk leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground font-work-sans mt-0.5 leading-snug">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Callout Box */}
                        <div className="border-l-[3.5px] border-[#c39b4c] dark:border-primary bg-[#faf7f0] dark:bg-[#1f1d18] rounded-r-xl p-3.5 sm:p-4 mt-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-work-sans">
                            Assigned names stay visible to the Host and door staff in the Scan App, but do not appear on Standard tickets.
                        </div>
                    </div>

                    {/* Right: Standard Package Dashboard + Ticket Preview Card */}
                    <div className="lg:col-span-6">
                        <div className="rounded-3xl border border-[#ede7dc] dark:border-[#38332a] bg-[#faf8f4]/70 dark:bg-[#1a1815]/70 p-4 sm:p-6 lg:p-7 flex flex-col gap-5 sm:gap-6 shadow-xs">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#b88e3e] dark:text-[#d4af5f]">
                                STANDARD PACKAGE DASHBOARD + TICKET
                            </span>

                            {/* Dashboard Image */}
                            <div className="rounded-xl overflow-hidden border border-[#e5dfd4] dark:border-[#332f28] shadow-xs bg-white dark:bg-card">
                                <Image
                                    src="/howitWorks/standard/standard-mangment.png"
                                    alt="Standard Package Dashboard"
                                    width={1321}
                                    height={818}
                                    className="w-full h-auto object-cover block"
                                    priority
                                />
                            </div>

                            {/* Ticket Image & Text Description */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6 pt-1">
                                <div className="rounded-xl overflow-hidden bg-white dark:bg-card border border-[#e5dfd4] dark:border-[#332f28] p-2 sm:p-2.5 shadow-xs flex items-center justify-center shrink-0 w-36 sm:w-44 lg:w-48">
                                    <Image
                                        src="/howitWorks/standard/standard-ticeket.png"
                                        alt="Standard Numbered Ticket"
                                        width={638}
                                        height={550}
                                        className="w-full h-auto object-contain rounded block"
                                    />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-space-grotesk font-bold text-base sm:text-lg text-foreground">
                                        Secure numbered tickets
                                    </h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed font-work-sans">
                                        Each ticket has its own QR code and can only be scanned once.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* 2. Section Separator & Premium Package Header              */}
                {/* ========================================================= */}
                <div className="my-16 sm:my-20 md:my-24 border-t border-[#ede8dd] dark:border-border/60" />

                <div className="text-left mb-10 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold font-space-grotesk text-foreground uppercase tracking-tight leading-tight">
                        PERSONALIZED TICKETS WITH RSVP CONTROL
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground font-work-sans">
                        Manage guest responses, personalized tickets, and event entry in one place.
                    </p>
                </div>

                {/* Premium Package Section: Alternating (Left Preview on Desktop, Right Steps) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left on Desktop: Premium Package Dashboard + Ticket Preview Card */}
                    <div className="order-2 lg:order-1 lg:col-span-6">
                        <div className="rounded-3xl border border-[#ede7dc] dark:border-[#38332a] bg-[#faf8f4]/70 dark:bg-[#1a1815]/70 p-4 sm:p-6 lg:p-7 flex flex-col gap-5 sm:gap-6 shadow-xs">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#b88e3e] dark:text-[#d4af5f]">
                                PREMIUM PACKAGE DASHBOARD + TICKET
                            </span>

                            {/* Dashboard Image */}
                            <div className="rounded-xl overflow-hidden border border-[#e5dfd4] dark:border-[#332f28] shadow-xs bg-white dark:bg-card">
                                <Image
                                    src="/howitWorks/premium/premium-mangment.png"
                                    alt="Premium Package Dashboard"
                                    width={1691}
                                    height={916}
                                    className="w-full h-auto object-cover block"
                                />
                            </div>

                            {/* Ticket Image & Text Description */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6 pt-1">
                                <div className="rounded-xl overflow-hidden bg-white dark:bg-card border border-[#e5dfd4] dark:border-[#332f28] p-2 sm:p-2.5 shadow-xs flex items-center justify-center shrink-0 w-36 sm:w-44 lg:w-48">
                                    <Image
                                        src="/howitWorks/premium/premium-ticket.png"
                                        alt="Premium Personalized Ticket with RSVP"
                                        width={635}
                                        height={739}
                                        className="w-full h-auto object-contain rounded block"
                                    />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-space-grotesk font-bold text-base sm:text-lg text-foreground">
                                        Guests confirm attendance
                                    </h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed font-work-sans">
                                        The QR ticket unlocks after acceptance. Add to Wallet appears after confirmation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right on Desktop: Premium Package Details & Steps */}
                    <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#d9c59a] bg-[#fbf7ee] dark:bg-[#262015] text-[#a67d32] dark:text-[#d4af5f] text-xs font-bold uppercase tracking-wider">
                                PREMIUM PACKAGE
                            </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold uppercase font-space-grotesk tracking-tight text-foreground mb-2 leading-tight">
                            MORE GUEST CONTROL
                        </h3>

                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-work-sans max-w-xl">
                            For hosts who want names on tickets, RSVP tracking, automatic email delivery, and optional table or seat information.
                        </p>

                        {/* Step Cards List */}
                        <div className="space-y-3 sm:space-y-3.5">
                            {PREMIUM_STEPS.map((item) => (
                                <div
                                    key={item.step}
                                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#1e1c19] border border-[#ede8dd] dark:border-[#332f28] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-primary/40 transition-colors"
                                >
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#c39b4c] dark:bg-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm sm:text-base font-bold text-foreground font-space-grotesk leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground font-work-sans mt-0.5 leading-snug">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Callout Box */}
                        <div className="border-l-[3.5px] border-[#c39b4c] dark:border-primary bg-[#faf7f0] dark:bg-[#1f1d18] rounded-r-xl p-3.5 sm:p-4 mt-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-work-sans">
                            The dashboard shows Pending, Accepted, Declined, Sent, Voided, and checked-in ticket status in real time.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksAlt;