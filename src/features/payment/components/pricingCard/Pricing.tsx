"use client";

import React, { useState } from "react";
import { PRICING_TIERS } from "../../data/pricingData";
import { TPricingTierKey } from "../../payment.interface";
import PricingCard from "./PricingCard";
import { cn } from "@/lib/utils";

export default function Pricing() {
    const [activeTierKey, setActiveTierKey] = useState<TPricingTierKey>("medium");

    const currentTier =
        PRICING_TIERS.find((t) => t.id === activeTierKey) || PRICING_TIERS[1];

    const isSingleCard = currentTier.plans.length === 1;

    const handleSelectPlan = (planId: string) => {
        // Demo handler for plan selection (e.g. opens checkout or navigates to onboarding/contact)
        console.log("Selected plan:", planId);
    };

    return (
        <section
            id="pricing"
            aria-label="Event Pricing Plans"
            className="pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 md:pb-16 bg-background"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Eyebrow */}
                <div className="text-center mb-6">
                    <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase font-space-grotesk">
                        PRICING
                    </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-10 sm:mb-12">
                    <div
                        role="tablist"
                        aria-label="Pricing guest tiers"
                        className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl bg-muted/30 dark:bg-card border border-border/80 shadow-2xs gap-1.5 sm:gap-3"
                    >
                        {PRICING_TIERS.map((tier) => {
                            const isActive = tier.id === activeTierKey;
                            return (
                                <button
                                    key={tier.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    type="button"
                                    onClick={() => setActiveTierKey(tier.id)}
                                    className={cn(
                                        "w-24 sm:w-36 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-center transition-all cursor-pointer font-work-sans",
                                        isActive
                                            ? "bg-[#FDFBF7] dark:bg-amber-950/30 border border-[#C39B4C]/60 shadow-xs"
                                            : "bg-transparent border border-transparent hover:bg-muted/50"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "text-xs sm:text-sm font-medium",
                                            isActive
                                                ? "text-foreground font-semibold"
                                                : "text-foreground/80"
                                        )}
                                    >
                                        {tier.tab.label}
                                    </div>
                                    <div
                                        className={cn(
                                            "text-[10px] sm:text-xs mt-0.5",
                                            isActive
                                                ? "text-[#C39B4C] font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {tier.tab.sublabel}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Pricing Cards */}
                {isSingleCard ? (
                    <div className="flex justify-center w-full">
                        <div className="w-full max-w-[420px]">
                            <PricingCard
                                plan={currentTier.plans[0]}
                                onSelectPlan={handleSelectPlan}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-stretch">
                        {currentTier.plans.map((plan) => (
                            <PricingCard
                                key={plan.id}
                                plan={plan}
                                onSelectPlan={handleSelectPlan}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}