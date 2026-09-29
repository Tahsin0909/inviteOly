"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  ICreateEventPackageState,
  TPackageCategory,
  TPackageTier,
} from "@/features/event/event.interface";
import {
  setCurrentStep,
  setPackageSelection,
} from "@/features/event/store/createEvent.slice";
import { INVITE_PRICING_TIERS } from "@/features/payment/data/pricingData";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { CheckCircle2, Gem, Mail, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StepPackageProps {
  isReferred?: boolean;
  referrerName?: string;
}

export const StepPackage: React.FC<StepPackageProps> = ({
  isReferred = false,
  referrerName = "James Smith (Host Partner)",
}) => {
  const { user, profile } = useAuth();
  const activeUser = user || profile;
  const isHostReferred =
    isReferred ||
    Boolean(
      activeUser?.referredBy ||
      activeUser?.referredByHostId ||
      activeUser?.referredByHostName
    );

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
    features: string[],
    categoryName?: string
  ) => {
    const payload: ICreateEventPackageState = {
      category: (categoryName as TPackageCategory) || activeCategory,
      tier,
      packageName: `${planName} (${categoryName || currentCategoryData.tab.label})`,
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
      {/* Referred Host Welcome Banner */}
      {isHostReferred && (
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-[#C39B4C]/30 dark:border-amber-800/50 text-xs sm:text-sm text-amber-900 dark:text-amber-300 max-w-xl mx-auto shadow-2xs">
          <Sparkles className="size-4 text-[#C39B4C] shrink-0" />
          <span>
            Referred by <strong>{referrerName}</strong>. You receive an exclusive <strong>$50 off Premium</strong> on any event size!
          </span>
        </div>
      )}

      {/* Header section */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
          Choose Your Experience
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Select the package that fits your event needs.
          <br className="hidden sm:inline" /> You can upgrade anytime.
        </p>
      </div>

      {/* 4 Category Tabs Container matching media_1789290322166.png */}
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#F9F8F5] dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl max-w-2xl w-full">
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
                    ? "bg-[#FFFDF7] dark:bg-neutral-800 border border-[#C39B4C] shadow-xs"
                    : "bg-transparent border border-transparent hover:bg-white/60 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                )}
              >
                <span
                  className={cn(
                    "text-xs sm:text-sm font-semibold capitalize transition-colors",
                    isSelected ? "text-neutral-900 dark:text-white" : "text-neutral-700 dark:text-neutral-300"
                  )}
                >
                  {tier.tab.label}
                </span>
                <span
                  className={cn(
                    "text-[11px] sm:text-xs transition-colors mt-0.5",
                    isSelected
                      ? "text-[#C39B4C] font-semibold"
                      : "text-neutral-400 dark:text-neutral-500 font-normal"
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
        <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-8 text-center space-y-6">
          <div className="size-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#C39B4C] flex items-center justify-center mx-auto shadow-2xs">
            <Mail className="size-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Custom Enterprise Package
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-work-sans leading-relaxed">
              Planning an event with more than 600 guests or needs that do not fit our standard packages? Contact us to discuss your event, receive a custom quote, and learn how InviteOly may be able to assist with your guest-management and entry needs.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              handleSelectPlan(
                "custom",
                "Custom Quote",
                "Custom",
                "600+",
                ["Unlimited attendees", "White-label branding", "Dedicated concierge"],
                "Custom"
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

            const hasReferralDiscount =
              isHostReferred && isPremium && Boolean(plan.referredPrice);
            const displayPrice = hasReferralDiscount
              ? plan.referredPrice
              : plan.price;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-white dark:bg-neutral-900/80 rounded-3xl border shadow-xs p-6 sm:p-8 flex flex-col justify-between transition-all duration-200",
                  isCurrentlySelected
                    ? "border-[#C39B4C] ring-2 ring-[#C39B4C]/20 shadow-md"
                    : "border-neutral-200/80 dark:border-neutral-800 hover:border-[#C39B4C]/40 hover:shadow-sm"
                )}
              >
                <div>
                  {/* Icon badge */}
                  <div
                    className={cn(
                      "size-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs",
                      isPremium
                        ? "bg-[#FFF9EC] dark:bg-amber-950/30 text-[#C39B4C]"
                        : "bg-[#EFF6FF] dark:bg-blue-950/30 text-[#2563EB] dark:text-blue-400"
                    )}
                  >
                    {isPremium ? (
                      <Gem className="size-6" />
                    ) : (
                      <Sparkles className="size-6" />
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white text-center">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-work-sans text-center mt-2 leading-relaxed max-w-xs mx-auto min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mt-6">
                    {hasReferralDiscount ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center gap-2.5">
                          <span className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-400 dark:text-neutral-500 line-through">
                            {plan.price}
                          </span>
                          <span className="text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight text-[#C39B4C]">
                            {plan.referredPrice}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 shadow-2xs">
                            <Sparkles className="size-3 text-[#C39B4C]" />
                            Special Pricing: $50 Off
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={cn(
                          "text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight",
                          isPremium ? "text-[#C39B4C]" : "text-neutral-900 dark:text-white"
                        )}
                      >
                        {plan.price}
                      </span>
                    )}
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-work-sans mt-1">
                      {plan.guestRange}
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3.5 mt-8 font-work-sans text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={cn(
                            "size-4 sm:size-4.5 shrink-0 mt-0.5",
                            isPremium ? "text-[#C39B4C]" : "text-neutral-600 dark:text-neutral-400"
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
                        displayPrice || "$149",
                        plan.guestRange,
                        plan.features,
                        currentCategoryData.tab.label
                      )
                    }
                    className={cn(
                      "w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-[0.98]",
                      isPremium
                        ? "bg-[#C39B4C] hover:bg-[#b08b3e] text-white"
                        : "bg-white dark:bg-neutral-900 border border-[#C39B4C] text-[#C39B4C] hover:bg-[#FFFDF7] dark:hover:bg-neutral-800"
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
