import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export interface EventTypeItem {
    id: string;
    title: string;
    image: string;
    alt: string;
    href?: string;
}

export interface EventTypesProps {
    /**
     * Small uppercase eyebrow title.
     * @default "EVENT TYPES"
     */
    eyebrow?: string;

    /**
     * Main section headline.
     * @default "MADE FOR EVERY KIND OF EVENT"
     */
    title?: string;

    /**
     * List of event category items.
     */
    events?: readonly EventTypeItem[];

    /**
     * Optional custom CSS classes for the root container.
     */
    className?: string;
}

const DEFAULT_EVENT_TYPES: readonly EventTypeItem[] = [
    {
        id: "weddings",
        title: "Weddings",
        image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=90",
        alt: "Elegant luxury wedding ceremony with sophisticated floral decor",
        href: "/events/weddings",
    },
    {
        id: "birthdays",
        title: "Birthdays",
        image:
            "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=1200&auto=format&fit=crop&q=90",
        alt: "Elegant birthday celebration with luxury table decorations",
        href: "/events/birthdays",
    },
    {
        id: "corporate-events",
        title: "Corporate Events",
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=90",
        alt: "Premium corporate conference with professional stage and audience",
        href: "/events/corporate",
    },
    {
        id: "private-parties",
        title: "Private Parties",
        image:
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=90",
        alt: "Luxury private party with elegant ambient lighting",
        href: "/events/private-parties",
    },
    // {
    //     id: "cultural-events",
    //     title: "Cultural Events",
    //     image:
    //         "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=90",
    //     alt: "Large-scale cultural event with dramatic stage lighting",
    //     href: "/events/cultural",
    // },
    {
        id: "cultural-events",
        title: "Cultural Events",
        image:
            "/culturalImage.jpg",
        alt: "Large-scale cultural event with dramatic stage lighting",
        href: "/events/cultural",
    },
    {
        id: "social-events",
        title: "Social Events",
        image:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&auto=format&fit=crop&q=90",
        alt: "Luxury gala event in an elegant ballroom",
        href: "/events/social",
    },
];

const EventTypes: React.FC<EventTypesProps> = ({
    eyebrow = "EVENT TYPES",
    title = "MADE FOR EVERY KIND OF EVENT",
    events = DEFAULT_EVENT_TYPES,
    className,
}) => {
    return (
        <section
            id="event-types"
            aria-label="Event types"
            className={cn(
                "py-16 sm:py-20 md:py-24 lg:py-28 bg-[#141414] text-white relative overflow-hidden",
                className
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
                    <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase mb-3 select-none">
                        {eyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold font-space-grotesk text-white uppercase tracking-tight leading-tight">
                        {title}
                    </h2>
                </div>

                {/* 6-Card Event Types Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={cn(
                                "group relative block aspect-[16/11] sm:aspect-[16/11] w-full rounded-2xl sm:rounded-[22px] overflow-hidden",
                                "border border-white/10 hover:border-primary/60",
                                "shadow-md hover:shadow-xl hover:shadow-primary/10",
                                "transition-all duration-500 ease-out outline-none"
                            )}
                        >
                            {/* Background Event Photo with Zoom Hover Effect */}
                            <Image
                                src={event.image}
                                alt={event.alt}
                                fill
                                quality={85}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className={cn(
                                    "object-cover object-center",
                                    "transform scale-100 group-hover:scale-110 group-hover:brightness-105",
                                    "transition-all duration-700 ease-out select-none"
                                )}
                            />

                            {/* Bottom Dark Gradient Scrim */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent",
                                    "group-hover:from-black/90 group-hover:via-black/25",
                                    "transition-all duration-500 pointer-events-none"
                                )}
                                aria-hidden="true"
                            />

                            {/* Gold Ambient Accent Glow on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/20 via-transparent to-transparent transition-opacity duration-500 pointer-events-none"
                                aria-hidden="true"
                            />

                            {/* Event Title Label */}
                            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 z-10 pointer-events-none">
                                <span
                                    className={cn(
                                        "text-white font-work-sans font-medium sm:font-semibold text-base sm:text-lg lg:text-xl tracking-normal drop-shadow-md",
                                        "inline-block transform group-hover:-translate-y-1 group-hover:text-primary-foreground",
                                        "transition-all duration-300 ease-out"
                                    )}
                                >
                                    {event.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventTypes;