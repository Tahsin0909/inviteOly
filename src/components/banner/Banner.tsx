import React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import BannerImage from "@/assets/banner/banner.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface BannerAvatar {
    id: string | number;
    src: string;
    alt: string;
}

export interface BannerProps {
    /**
     * First line of the banner headline.
     * @default "The Modern Way to Manage"
     */
    titleLine1?: string;

    /**
     * Second line of the banner headline.
     * @default "Invite-Only Events"
     */
    titleLine2?: string;

    /**
     * Optional full title string that overrides titleLine1 and titleLine2 if provided.
     */
    title?: string;

    /**
     * Supporting description below the main heading.
     * @default "Secure QR Tickets, RSVP Management & Capacity Control with Live Entry Tracking."
     */
    subtitle?: string;

    /**
     * Text displayed inside the call-to-action button.
     * @default "Create Your Event"
     */
    ctaText?: string;

    /**
     * Destination URL when the CTA is clicked.
     * @default "/create-event"
     */
    ctaHref?: string;

    /**
     * Optional click handler for the call-to-action button.
     */
    onCtaClick?: () => void;

    /**
     * Social proof counter number or label.
     * @default "500+"
     */
    statsCount?: string;

    /**
     * Social proof descriptive text.
     * @default "event created this month"
     */
    statsText?: string;

    /**
     * List of social proof avatars to display.
     */
    avatars?: readonly BannerAvatar[];

    /**
     * Background image asset or URL.
     * @default BannerImage from "@/assets/banner/banner.png"
     */
    backgroundImage?: string | StaticImageData;

    /**
     * Custom overlay Tailwind class name.
     * @default "bg-black/55"
     */
    overlayClassName?: string;

    /**
     * Additional custom CSS classes for the root banner section.
     */
    className?: string;

    /**
     * Priority flag for next/image background.
     * @default true
     */
    priority?: boolean;
}

const DEFAULT_AVATARS: readonly BannerAvatar[] = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        alt: "Event Host 1",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        alt: "Event Host 2",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        alt: "Event Host 3",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        alt: "Event Host 4",
    },
];

const Banner: React.FC<BannerProps> = ({
    titleLine1 = "The Modern Way to Manage",
    titleLine2 = "Invite-Only Events",
    title,
    subtitle = "Secure QR Tickets, RSVP Management & Capacity Control with Live Entry Tracking.",
    ctaText = "Create Your Event",
    ctaHref = "/create-event",
    onCtaClick,
    statsCount = "500+",
    statsText = "event created this month",
    avatars = DEFAULT_AVATARS,
    backgroundImage = BannerImage,
    overlayClassName,
    className,
    priority = true,
}) => {
    return (
        <section
            aria-label="Event management banner"
            className={cn(
                "relative w-full min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden",
                className
            )}
        >
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Invite-only upscale event banner background"
                fill
                priority={priority}
                quality={90}
                sizes="100vw"
                className="object-cover object-center pointer-events-none select-none"
            />

            {/* Dark tint overlay with subtle gradient */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/55 backdrop-brightness-[0.92]",
                    overlayClassName
                )}
                aria-hidden="true"
            />

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center text-center">
                {/* Main Headline */}
                <h1 className="font-space-grotesk font-bold text-white tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[68px] max-w-4xl leading-[1.12] drop-shadow-sm">
                    {title ? (
                        title
                    ) : (
                        <>
                            <span className="block">{titleLine1}</span>
                            <span className="block mt-1 sm:mt-2">{titleLine2}</span>
                        </>
                    )}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 sm:mt-5 md:mt-6 font-work-sans text-white/85 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
                    {subtitle}
                </p>

                {/* CTA Button */}
                <div className="mt-7 sm:mt-8 md:mt-9">
                    {ctaHref && !onCtaClick ? (
                        <Link href={ctaHref} className="inline-block outline-none">
                            <Button
                                type="button"
                                className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 h-auto shadow-md shadow-black/25 hover:shadow-lg active:scale-[0.98] transition-all duration-300 cursor-pointer"
                            >
                                {ctaText}
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            type="button"
                            onClick={onCtaClick}
                            className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 h-auto shadow-md shadow-black/25 hover:shadow-lg active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            {ctaText}
                        </Button>
                    )}
                </div>

                {/* Social Proof */}
                <div className="mt-6 sm:mt-7 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
                    {/* Overlapping Avatar Stack */}
                    {avatars && avatars.length > 0 && (
                        <div className="flex -space-x-2.5 overflow-hidden">
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.id}
                                    className="size-7 sm:size-8 border-2 border-white/90 ring-1 ring-black/15 shadow-xs"
                                >
                                    <AvatarImage
                                        src={avatar.src}
                                        alt={avatar.alt}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-primary/30 text-white text-[10px] font-semibold">
                                        {avatar.alt.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    )}

                    {/* Social Proof Text */}
                    <p className="text-white/90 text-xs sm:text-sm font-work-sans">
                        <span className="font-semibold text-white">{statsCount}</span>{" "}
                        <span className="text-white/80">{statsText}</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Banner;