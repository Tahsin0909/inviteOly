"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";
import React from "react";
import { IPricingPlan } from "../../payment.interface";

interface PricingCardProps {
  plan: IPricingPlan;
  onSelectPlan?: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  onSelectPlan,
}) => {
  const isSolidButton = plan.buttonVariant === "solid";

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden",
        plan.isPopular && "border-[#C39B4C]/40 ring-1 ring-[#C39B4C]/20"
      )}
    >
      {/* Most Popular Ribbon */}
      {/* {plan.isPopular && (
        <div
          className="absolute top-0 right-6 w-14 bg-[#C39B4C] text-white pt-2.5 pb-4 px-1 flex flex-col items-center justify-center text-center shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)] z-10"
          aria-label={plan.ribbonText || "Most Popular"}
        >
          <Star className="size-3.5 mb-0.5 fill-none stroke-[2.2]" />
          <span className="text-[9px] font-bold uppercase tracking-wider leading-tight">
            Most
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider leading-tight">
            Popular
          </span>
        </div>
      )} */}

      {/* Top Content: Icon, Title, Description, Price */}
      <div>
        {/* Top Circle Icon */}
        <div className="flex justify-center mb-3 pt-1">
          {plan.iconType === "premium" ? (
            <div className="size-12 rounded-full bg-[#FDF8EE] dark:bg-amber-950/40 text-[#C39B4C] flex items-center justify-center shadow-2xs">
              <Crown className="size-6 stroke-[1.8]" />
            </div>
          ) : (
            <div className="size-12 rounded-full bg-[#EBF3FF] dark:bg-blue-950/40 text-[#2563EB] flex items-center justify-center shadow-2xs">
              <Sparkles className="size-5 stroke-[1.8]" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-foreground text-center">
          {plan.name}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs text-muted-foreground font-work-sans text-center mt-2 max-w-[280px] sm:max-w-xs mx-auto leading-relaxed">
          {plan.description}
        </p>

        {/* Divider */}
        <div className="border-t border-border/60 my-5" />

        {/* Price & Guest Range (if available) */}
        {plan.price !== null && (
          <div className="text-center mb-5">
            <div
              className={cn(
                "text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight",
                plan.isPopular ? "text-[#C39B4C]" : "text-foreground"
              )}
            >
              {plan.price}
            </div>
            <p className="text-xs text-muted-foreground font-work-sans mt-1">
              {plan.guestRange}
            </p>
          </div>
        )}

        {/* Features List */}
        <ul className="space-y-3.5 my-5">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2
                className={cn(
                  "size-4 shrink-0 mt-0.5",
                  plan.isPopular ? "text-[#C39B4C]" : "text-foreground/80"
                )}
              />
              <span className="text-xs sm:text-[13px] text-foreground/90 font-work-sans leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button
          type="button"
          onClick={() => onSelectPlan?.(plan.id)}
          variant={isSolidButton ? "default" : "outlined"}
          shape="rounded"
          className="w-full h-11 text-xs sm:text-sm font-medium"
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;

