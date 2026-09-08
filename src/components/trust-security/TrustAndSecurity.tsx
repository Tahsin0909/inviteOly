import React from "react";
import { DoorOpen, Lock, QrCode, Router } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrustSecurityItem {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface TrustAndSecurityProps {
    /**
     * Uppercase subtitle above the main headline.
     * @default "TRUST & SECURITY"
     */
    eyebrow?: string;

    /**
     * Main section headline.
     * @default "BUILT FOR SECURE, SEAMLESS EVENTS"
     */
    title?: string;

    /**
     * List of trust and security feature items.
     */
    items?: readonly TrustSecurityItem[];

    /**
     * Optional custom CSS classes for the root container section.
     */
    className?: string;
}

const DEFAULT_ITEMS: readonly TrustSecurityItem[] = [
    {
        id: "secure-payments",
        title: "Secure Payments",
        description:
            "SSL encrypted, PCI compliant payment processing through Stripe.",
        icon: Lock,
    },
    {
        id: "unique-qr-tickets",
        title: "Unique QR Tickets",
        description:
            "Every ticket has a one-of-a-kind QR code that can only be scanned once.",
        icon: QrCode,
    },
    {
        id: "real-time-rsvp-status",
        title: "Real-Time RSVP Status",
        description:
            "Live updates so you always know exactly who is attending your event.",
        icon: Router,
    },
    {
        id: "controlled-event-access",
        title: "Controlled Event Access",
        description:
            "Only confirmed guests with valid tickets can check in at the door.",
        icon: DoorOpen,
    },
];

const TrustAndSecurity: React.FC<TrustAndSecurityProps> = ({
    eyebrow = "TRUST & SECURITY",
    title = "BUILT FOR SECURE, SEAMLESS EVENTS",
    items = DEFAULT_ITEMS,
    className,
}) => {
    return (
        <section
            id="trust-security"
            className={cn(
                "pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-20 md:pb-24 bg-background",
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

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="bg-card dark:bg-card border border-border rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center h-full group"
                            >
                                {/* Black Rounded Icon Box */}
                                <div className="size-14 rounded-2xl bg-neutral-900 dark:bg-neutral-800 text-white flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                                    <IconComponent className="size-6 text-white stroke-[1.8]" />
                                </div>

                                {/* Card Title */}
                                <h3 className="text-base sm:text-lg font-bold font-space-grotesk text-foreground mb-2.5">
                                    {item.title}
                                </h3>

                                {/* Card Description */}
                                <p className="text-xs sm:text-sm text-muted-foreground font-work-sans leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustAndSecurity;