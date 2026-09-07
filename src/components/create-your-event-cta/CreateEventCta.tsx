"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CreateEventCtaProps {
    /**
     * Main section headline.
     * @default "SIMPLE PRICING. NO HIDDEN FEES."
     */
    title?: string;

    /**
     * Explanatory subtitle below the headline.
     * @default "Straightforward event pricing based on your guest count and needs. No per-ticket fees. No fees for your guests."
     */
    subtitle?: string;

    /**
     * Call-to-action button text.
     * @default "Create Your Event"
     */
    ctaText?: string;

    /**
     * Target destination URL for the CTA button.
     * @default "/create-event"
     */
    ctaHref?: string;

    /**
     * Optional click handler for the CTA button.
     */
    onCtaClick?: () => void;

    /**
     * Background image path or asset URL.
     * @default "/adBanner.png"
     */
    backgroundImage?: string;

    /**
     * Additional custom CSS classes for the root container.
     */
    className?: string;

    /**
     * Parallax scroll speed multiplier.
     * @default 0.18
     */
    speed?: number;
}

const CreateEventCta: React.FC<CreateEventCtaProps> = ({
    title = "SIMPLE PRICING. NO HIDDEN FEES.",
    subtitle = "Straightforward event pricing based on your guest count and needs. No per-ticket fees. No fees for your guests.",
    ctaText = "Create Your Event",
    ctaHref = "/create-event",
    onCtaClick,
    backgroundImage = "/adBanner.png",
    className,
    speed = 0.18,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [translateY, setTranslateY] = useState<number>(0);

    useEffect(() => {
        // Respect user's motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        let animationFrameId: number;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only calculate if the section is anywhere near the viewport
            if (rect.bottom > -150 && rect.top < windowHeight + 150) {
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = windowHeight / 2;
                const distanceFromCenter = sectionCenter - viewportCenter;
                setTranslateY(distanceFromCenter * speed);
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed]);

    return (
        <section
            ref={sectionRef}
            aria-label="Create your event"
            className={cn(
                "relative w-full overflow-hidden min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] flex items-center",
                className
            )}
        >
            {/* Parallax Background Image Container with headroom */}
            <div
                className="absolute -top-[18%] -bottom-[18%] left-0 right-0 w-full h-[136%] pointer-events-none will-change-transform select-none"
                style={{
                    transform: `translate3d(0, ${translateY}px, 0)`,
                }}
            >
                <Image
                    src={backgroundImage}
                    alt="Invite-only private luxury event"
                    fill
                    quality={90}
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

            {/* Gold-to-transparent overlay matching the design */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#C39B4C] via-[#C39B4C]/85 to-transparent max-md:via-[#C39B4C]/95 max-md:to-[#C39B4C]/70 z-0 pointer-events-none"
                aria-hidden="true"
            />

            {/* Foreground Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
                <div className="max-w-xl text-left">
                    {/* Main Headline */}
                    <h2 className="font-space-grotesk font-bold text-white uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-tight drop-shadow-xs">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="mt-4 sm:mt-5 font-work-sans text-white/95 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                        {subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-7 sm:mt-8">
                        {ctaHref && !onCtaClick ? (
                            <Link href={ctaHref} className="inline-block outline-none">
                                <Button
                                    type="button"
                                    shape="pill"
                                    className="rounded-full bg-white hover:bg-white/90 text-primary font-semibold text-sm sm:text-base px-8 sm:px-9 py-3 sm:py-3.5 h-auto shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                                >
                                    {ctaText}
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                type="button"
                                shape="pill"
                                onClick={onCtaClick}
                                className="rounded-full bg-white hover:bg-white/90 text-primary font-semibold text-sm sm:text-base px-8 sm:px-9 py-3 sm:py-3.5 h-auto shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                            >
                                {ctaText}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateEventCta;