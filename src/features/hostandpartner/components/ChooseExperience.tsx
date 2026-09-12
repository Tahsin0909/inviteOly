"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveView,
  setSelectedTierId,
  setSelectedPlan,
} from "../store/hostandpartner.slice";
import { INVITE_PRICING_TIERS } from "@/features/payment/data/pricingData";
import { IPricingPlan } from "@/features/payment/payment.interface";
import { ArrowLeft, Check, Crown, Sparkles, Star } from "lucide-react";

export const ChooseExperience: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedTierId } = useSelector(
    (state: RootState) => state.hostandpartner
  );

  const currentTier =
    INVITE_PRICING_TIERS.find((t) => t.id === selectedTierId) ||
    INVITE_PRICING_TIERS[0];

  const handleSelectPlan = (plan: IPricingPlan) => {
    dispatch(setSelectedPlan(plan));
    dispatch(setActiveView("invite-form"));
  };

  return (
    <div className="w-full space-y-8 font-work-sans pb-16">
      {/* Back to List Navigation */}
      <div>
        <button
          type="button"
          onClick={() => dispatch(setActiveView("list"))}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Invitations</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Choose Your Experience
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-2">
          Select the package that fits your event needs. You can upgrade anytime.
        </p>
      </div>

      {/* Tier Switcher Pills */}
      <div className="flex justify-center">
        <div
          role="tablist"
          className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-neutral-100/80 border border-neutral-200/70 shadow-2xs gap-1 sm:gap-2"
        >
          {INVITE_PRICING_TIERS.map((tier) => {
            const isActive = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => dispatch(setSelectedTierId(tier.id))}
                className={`flex flex-col items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-center transition-all cursor-pointer ${isActive
                    ? "bg-[#FFFBF0] border border-[#C39B4C]/50 text-neutral-900 shadow-xs"
                    : "text-neutral-600 hover:bg-neutral-200/60 border border-transparent"
                  }`}
              >
                <span
                  className={`text-xs sm:text-sm font-bold font-space-grotesk capitalize ${isActive ? "text-[#C39B4C]" : "text-neutral-800"
                    }`}
                >
                  {tier.tab.label}
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] mt-0.5 ${isActive ? "text-[#C39B4C]/90 font-medium" : "text-neutral-500"
                    }`}
                >
                  {tier.tab.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-2">
        {currentTier.plans.map((plan) => {
          const isPremium = plan.name.toLowerCase() === "premium";

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${isPremium
                  ? "border-2 border-[#C39B4C] shadow-lg"
                  : "border border-neutral-200/80 shadow-2xs hover:shadow-md"
                }`}
            >
              {/* Most Popular Ribbon for Premium */}
              {isPremium && (
                <div className="absolute top-0 right-8 bg-[#C39B4C] text-white text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-b-lg shadow-xs flex items-center gap-1 uppercase">
                  <Star className="size-3 fill-white" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Top Icon Badge */}
                <div className="flex justify-center mb-5">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center ${isPremium
                        ? "bg-amber-50 text-[#C39B4C] border border-amber-200/60"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                  >
                    {isPremium ? (
                      <Crown className="size-6" />
                    ) : (
                      <Sparkles className="size-6" />
                    )}
                  </div>
                </div>

                {/* Plan Title & Description */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-work-sans mt-2 max-w-xs mx-auto leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="text-center mt-6 mb-2">
                  <div className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#C39B4C]">
                    {plan.price || "Custom"}
                  </div>
                  <p className="text-xs text-neutral-400 font-medium mt-1">
                    {currentTier.tab.sublabel}
                  </p>
                </div>

                {/* Features List */}
                <div className="border-t border-neutral-100 my-6" />

                <ul className="space-y-3.5 text-left mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`size-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isPremium
                            ? "text-[#C39B4C]"
                            : "text-neutral-500"
                          }`}
                      >
                        <Check className="size-4 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-[13px] text-neutral-700 font-work-sans leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${isPremium
                      ? "bg-[#C39B4C] hover:bg-[#B38A3B] text-white shadow-xs"
                      : "bg-white hover:bg-amber-50/50 border border-neutral-300 hover:border-[#C39B4C] text-neutral-800 hover:text-[#C39B4C] shadow-2xs"
                    }`}
                >
                  {isPremium ? "Choose Premium" : "Choose Standard"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseExperience;

