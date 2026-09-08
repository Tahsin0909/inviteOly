import React from "react";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
    /**
     * Two-digit step indicator (e.g. "01", "02").
     */
    step: string;

    /**
     * Step title heading.
     */
    title: string;

    /**
     * Detailed explanation of the step.
     */
    description: string;
}

export interface HowItWorksProps {
    /**
     * Small uppercase eyebrow tag text above the title.
     * @default "HOW IT WORKS"
     */
    eyebrow?: string;

    /**
     * Main section headline.
     * @default "FROM INVITATION TO CHECK-IN, MADE SIMPLE"
     */
    title?: string;

    /**
     * List of workflow steps.
     */
    steps?: readonly HowItWorksStep[];

    /**
     * Additional custom CSS classes for the root container section.
     */
    className?: string;
}

const DEFAULT_STEPS: readonly HowItWorksStep[] = [
    {
        step: "01",
        title: "Set Up Your Event",
        description:
            "Add your event details, venue information, preview ticket and select your InviteOly package.",
    },
    {
        step: "02",
        title: "Send Guest Tickets",
        description:
            "Send secure digital tickets directly to your guests by text, email, WhatsApp, or your preferred method.",
    },
    {
        step: "03",
        title: "Manage Guests & RSVPs",
        description:
            "Track ticket assignments, guest responses, and attendance from your Host Dashboard.",
    },
    {
        step: "04",
        title: "Check In Guests",
        description:
            "Guests present their unique QR ticket at entry for fast, secure check-in through the InviteOly Scan App.",
    },
];

const HowItWorks: React.FC<HowItWorksProps> = ({
    eyebrow = "HOW IT WORKS",
    title = "FROM INVITATION TO CHECK-IN, MADE SIMPLE",
    steps = DEFAULT_STEPS,
    className,
}) => {
    return (
        <section
            id="how-it-works"
            aria-label="How it works"
            className={cn(
                "pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 md:pb-16 bg-background",
                className
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
                    <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-3">
                        {eyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold font-space-grotesk text-foreground uppercase tracking-tight leading-tight">
                        {title}
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Dashed connecting line across cards on desktop */}
                    <div
                        className="hidden lg:block absolute top-11 left-12 right-12 h-0 border-t border-dashed border-border pointer-events-none z-0"
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
                        {steps.map((item) => (
                            <div
                                key={item.step}
                                className="bg-card dark:bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                            >
                                {/* Step Number Badge */}
                                <div className="size-9 sm:size-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs sm:text-sm shrink-0 shadow-xs">
                                    {item.step}
                                </div>

                                {/* Step Title */}
                                <h3 className="text-lg sm:text-xl font-bold font-space-grotesk text-foreground mt-5 sm:mt-6 mb-2.5">
                                    {item.title}
                                </h3>

                                {/* Step Description */}
                                <p className="text-muted-foreground text-sm font-work-sans leading-relaxed flex-1">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;