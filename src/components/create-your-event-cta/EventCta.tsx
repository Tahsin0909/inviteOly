import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EventCtaProps {
    /**
     * Uppercase eyebrow subtitle above the main headline.
     * @default "GET STARTED"
     */
    eyebrow?: string;

    /**
     * First line of the main headline.
     * @default "READY TO MAKE YOUR NEXT EVENT"
     */
    titleLine1?: string;

    /**
     * Second line of the main headline.
     * @default "EFFORTLESS?"
     */
    titleLine2?: string;

    /**
     * Optional full headline that overrides titleLine1 and titleLine2 if specified.
     */
    title?: string;

    /**
     * Description text below the headline.
     * @default "Create your event, manage your guests, and give everyone a seamless ticketing experience — all in one place."
     */
    subtitle?: string;

    /**
     * Call-to-action button label.
     * @default "Create Your Event"
     */
    ctaText?: string;

    /**
     * Destination link for the CTA button.
     * @default "/create-event"
     */
    ctaHref?: string;

    /**
     * Optional click handler for the CTA button.
     */
    onCtaClick?: () => void;

    /**
     * Additional custom CSS classes for the root container section.
     */
    className?: string;
}

const EventCta: React.FC<EventCtaProps> = ({
    eyebrow = "GET STARTED",
    titleLine1 = "READY TO MAKE YOUR NEXT EVENT",
    titleLine2 = "EFFORTLESS?",
    title,
    subtitle = "Create your event, manage your guests, and give everyone a seamless ticketing experience — all in one place.",
    ctaText = "Create Your Event",
    ctaHref = "/create-event",
    onCtaClick,
    className,
}) => {
    return (
        <section
            aria-label="Get Started with your event"
            className={cn(
                "relative w-full bg-[#141414] text-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden",
                className
            )}
        >
            {/* Background subtle radial ambient glow */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Eyebrow */}
                <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase mb-3 sm:mb-4 select-none">
                    {eyebrow}
                </p>

                {/* Main Headline */}
                <h2 className="font-space-grotesk font-bold text-white uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[44px] tracking-tight leading-[1.18] max-w-3xl drop-shadow-xs">
                    {title ? (
                        title
                    ) : (
                        <>
                            <span className="block">{titleLine1}</span>
                            <span className="block">{titleLine2}</span>
                        </>
                    )}
                </h2>

                {/* Subtitle Description */}
                <p className="mt-4 sm:mt-5 font-work-sans text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
                    {subtitle}
                </p>

                {/* CTA Button */}
                <div className="mt-8 sm:mt-10">
                    {ctaHref && !onCtaClick ? (
                        <Link href={ctaHref} className="inline-block outline-none">
                            <Button
                                type="button"
                                shape="pill"
                                className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 h-auto shadow-lg shadow-black/25 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                            >
                                {ctaText}
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            type="button"
                            shape="pill"
                            onClick={onCtaClick}
                            className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 h-auto shadow-lg shadow-black/25 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            {ctaText}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventCta;