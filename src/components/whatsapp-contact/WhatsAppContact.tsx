"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface WhatsAppContactProps {
    /**
     * Phone number in international format (without '+' or leading symbols for wa.me).
     * If omitted, a random demo number will be selected.
     */
    phoneNumber?: string;

    /**
     * Pre-filled message that appears in the WhatsApp chat input.
     * @default "Hello! I would like to inquire about hosting an invite-only event with InviteOly."
     */
    message?: string;

    /**
     * Screen corner position for the floating button.
     * @default "bottom-right"
     */
    position?: "bottom-right" | "bottom-left";

    /**
     * Whether to display a hover tooltip.
     * @default true
     */
    showTooltip?: boolean;

    /**
     * Tooltip label text.
     * @default "Chat with us"
     */
    tooltipText?: string;

    /**
     * Optional custom CSS classes for the container.
     */
    className?: string;
}

const DEMO_PHONE_NUMBERS: readonly string[] = [
    "15550192834",
    "15550148291",
    "15550173920",
    "15550124985",
    "15550186743",
];

const WhatsAppContact: React.FC<WhatsAppContactProps> = ({
    phoneNumber,
    message = "Hello! I would like to inquire about hosting an invite-only event with InviteOly.",
    position = "bottom-right",
    showTooltip = true,
    tooltipText = "Chat with us",
    className,
}) => {
    // Select provided phone number or random number
    const selectedNumber = useMemo(() => {
        if (phoneNumber) {
            return phoneNumber.replace(/\D/g, "");
        }
        const randomIndex = Math.floor(Math.random() * DEMO_PHONE_NUMBERS.length);
        return DEMO_PHONE_NUMBERS[randomIndex];
    }, [phoneNumber]);

    // Construct wa.me direct URL
    const whatsappUrl = useMemo(() => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${selectedNumber}?text=${encodedMessage}`;
    }, [selectedNumber, message]);

    const positionClasses = {
        "bottom-right": "bottom-5 right-5 sm:bottom-6 sm:right-6",
        "bottom-left": "bottom-5 left-5 sm:bottom-6 sm:left-6",
    };

    return (
        <aside
            aria-label="WhatsApp Contact"
            className={cn(
                "fixed z-50 flex items-center select-none",
                positionClasses[position],
                className
            )}
        >
            <div className="relative group">
                {/* Subtle background pulse ping effect */}
                <span
                    className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
                    aria-hidden="true"
                />

                {/* Floating WhatsApp Action Button */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className={cn(
                        "relative flex items-center justify-center",
                        "size-13 sm:size-14 rounded-full",
                        "bg-[#25D366] hover:bg-[#20ba59] text-white",
                        "shadow-lg hover:shadow-xl shadow-black/25 hover:shadow-[#25D366]/40",
                        "transition-all duration-300 transform hover:scale-110 active:scale-95",
                        "outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
                    )}
                >
                    {/* Official WhatsApp SVG Icon */}
                    <svg
                        viewBox="0 0 24 24"
                        className="size-7 sm:size-8 fill-current drop-shadow-xs"
                        aria-hidden="true"
                    >
                        <path d="M12.031 2C6.514 2 2.03 6.484 2.03 12c0 1.905.534 3.687 1.458 5.213L2.01 22l4.945-1.296C8.423 21.533 10.17 22 12.03 22c5.517 0 10-4.484 10-10s-4.483-10-10-10zm5.666 14.195c-.234.656-1.16 1.258-1.637 1.34-.447.076-1.025.109-3.05-.73-2.457-1.018-4.043-3.535-4.166-3.7-.123-.164-1.002-1.332-1.002-2.54 0-1.209.635-1.803.86-2.049.226-.246.493-.307.657-.307.164 0 .328.002.472.009.153.008.358-.058.559.426.208.502.71 1.733.772 1.859.062.126.103.273.02.44-.082.167-.125.273-.248.418-.124.146-.261.327-.373.439-.125.126-.256.263-.11.514.146.251.649 1.069 1.391 1.731.956.852 1.761 1.116 2.012 1.241.251.126.398.105.545-.063.147-.168.628-.733.795-.985.167-.252.335-.21.555-.126.22.084 1.393.657 1.632.776.24.12.399.177.458.279.059.102.059.593-.175 1.249z" />
                    </svg>
                </a>

                {/* Hover Tooltip */}
                {showTooltip && (
                    <div
                        role="tooltip"
                        className={cn(
                            "hidden sm:flex items-center absolute right-full mr-3.5 top-1/2 -translate-y-1/2",
                            "px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-white text-xs font-medium tracking-wide",
                            "shadow-lg backdrop-blur-xs border border-white/10 whitespace-nowrap",
                            "opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0"
                        )}
                    >
                        <span>{tooltipText}</span>
                        {/* Tooltip triangle indicator */}
                        <span
                            className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-neutral-900/90"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
        </aside>
    );
};

export default WhatsAppContact;