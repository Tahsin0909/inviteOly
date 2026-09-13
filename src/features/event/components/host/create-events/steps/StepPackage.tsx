"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setPackageSelection,
  setCurrentStep,
} from "@/features/event/store/createEvent.slice";
import {
  TPackageCategory,
  TPackageTier,
  ICreateEventPackageState,
} from "@/features/event/event.interface";
import { INVITE_PRICING_TIERS } from "@/features/payment/data/pricingData";
import { CheckCircle2, Star, Sparkles, Gem, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const StepPackage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPackage = useSelector(
    (state: RootState) => state.createEvent.packageSelection
  );

  const [activeCategory, setActiveCategory] = useState<TPackageCategory>(
    selectedPackage?.category || "intimate"
  );

  // Find the tier configuration for active category
  const currentCategoryData =
    INVITE_PRICING_TIERS.find((t) => t.id === activeCategory) ||
    INVITE_PRICING_TIERS[0];

  const handleSelectPlan = (
    tier: TPackageTier,
    planName: string,
    price: string,
    guestRange: string,
    features: string[]
  ) => {
    const payload: ICreateEventPackageState = {
      category: activeCategory,
      tier,
      packageName: `${planName} (${currentCategoryData.tab.label})`,
      price,
      guestRange,
      features,
    };
    dispatch(setPackageSelection(payload));
    // Advance to Step 2
    dispatch(setCurrentStep(2));
  };

  return (
    <div className="w-full space-y-8 font-work-sans py-2">
      {/* Header section */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Choose Your Experience
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Select the package that fits your event needs.
          <br className="hidden sm:inline" /> You can upgrade anytime.
        </p>
      </div>

      {/* 4 Category Tabs Container matching media_1789290322166.png */}
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#F9F8F5] border border-neutral-200/70 rounded-2xl max-w-2xl w-full">
          {INVITE_PRICING_TIERS.map((tier) => {
            const isSelected = activeCategory === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveCategory(tier.id as TPackageCategory)}
                className={cn(
                  "flex flex-col items-center justify-center py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center",
                  isSelected
                    ? "bg-[#FFFDF7] border border-[#C39B4C] shadow-xs"
                    : "bg-transparent border border-transparent hover:bg-white/60 text-neutral-600"
                )}
              >
                <span
                  className={cn(
                    "text-xs sm:text-sm font-semibold capitalize transition-colors",
                    isSelected ? "text-neutral-900" : "text-neutral-700"
                  )}
                >
                  {tier.tab.label}
                </span>
                <span
                  className={cn(
                    "text-[11px] sm:text-xs transition-colors mt-0.5",
                    isSelected
                      ? "text-[#C39B4C] font-semibold"
                      : "text-neutral-400 font-normal"
                  )}
                >
                  {tier.tab.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Cards Display */}
      {activeCategory === "custom" ? (
        /* Custom Quote Card */
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-8 text-center space-y-6">
          <div className="size-14 rounded-2xl bg-amber-50 text-[#C39B4C] flex items-center justify-center mx-auto shadow-2xs">
            <Mail className="size-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900">
              Custom Enterprise Package
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-work-sans leading-relaxed">
              Designed for large luxury galas, multi-venue festivals, and events
              with 600+ guests. Get a tailored quote and dedicated event concierge.
            </p>
          </div>
          <div className="py-4 border-y border-neutral-100 text-left space-y-3 font-work-sans text-xs sm:text-sm text-neutral-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-[#C39B4C] shrink-0" />
              <span>Unlimited attendees and tiered entry zones</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-[#C39B4C] shrink-0" />
              <span>Custom white-label branding & VIP ticket design</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-[#C39B4C] shrink-0" />
              <span>On-site check-in attendants & scanner hardware</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              handleSelectPlan(
                "custom",
                "Custom Quote",
                "Custom",
                "600+",
                ["Unlimited attendees", "White-label branding", "Dedicated concierge"]
              )
            }
            className="w-full py-3.5 px-4 rounded-xl bg-[#C39B4C] hover:bg-[#b08b3e] text-white font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Continue with Custom Quote
          </button>
        </div>
      ) : (
        /* Standard & Premium Cards matching media_1789290322166.png */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {currentCategoryData.plans.map((plan) => {
            const isPremium = plan.name.toLowerCase() === "premium";
            const isCurrentlySelected =
              selectedPackage?.category === activeCategory &&
              selectedPackage?.tier === (isPremium ? "premium" : "standard");

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-white rounded-3xl border shadow-xs p-6 sm:p-8 flex flex-col justify-between transition-all duration-200",
                  isCurrentlySelected
                    ? "border-[#C39B4C] ring-2 ring-[#C39B4C]/20 shadow-md"
                    : "border-neutral-200/80 hover:border-[#C39B4C]/40 hover:shadow-sm"
                )}
              >
                {/* Most Popular Ribbon on Premium */}
                {plan.isPopular && (
                  <div className="absolute -top-3 right-6 sm:right-8 bg-[#C39B4C] text-white px-3 py-1.5 rounded-b-lg shadow-sm flex flex-col items-center">
                    <Star className="size-3 fill-white text-white mb-0.5" />
                    <span className="text-[10px] font-bold tracking-tight uppercase leading-none">
                      {plan.ribbonText || "Most Popular"}
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon badge */}
                  <div
                    className={cn(
                      "size-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs",
                      isPremium
                        ? "bg-[#FFF9EC] text-[#C39B4C]"
                        : "bg-[#EFF6FF] text-[#2563EB]"
                    )}
                  >
                    {isPremium ? (
                      <Gem className="size-6" />
                    ) : (
                      <Sparkles className="size-6" />
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 text-center">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-work-sans text-center mt-2 leading-relaxed max-w-xs mx-auto min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mt-6">
                    <span
                      className={cn(
                        "text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight",
                        isPremium ? "text-[#C39B4C]" : "text-neutral-900"
                      )}
                    >
                      {plan.price}
                    </span>
                    <p className="text-xs text-neutral-400 font-work-sans mt-0.5">
                      {plan.guestRange}
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3.5 mt-8 font-work-sans text-xs sm:text-[13px] text-neutral-800">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={cn(
                            "size-4 sm:size-4.5 shrink-0 mt-0.5",
                            isPremium ? "text-[#C39B4C]" : "text-neutral-600"
                          )}
                        />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectPlan(
                        isPremium ? "premium" : "standard",
                        plan.name,
                        plan.price || "$149",
                        plan.guestRange,
                        plan.features
                      )
                    }
                    className={cn(
                      "w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-[0.98]",
                      isPremium
                        ? "bg-[#C39B4C] hover:bg-[#b08b3e] text-white"
                        : "bg-white border border-[#C39B4C] text-[#C39B4C] hover:bg-[#FFFDF7]"
                    )}
                  >
                    {isCurrentlySelected
                      ? `Selected (${plan.name})`
                      : plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StepPackage;
