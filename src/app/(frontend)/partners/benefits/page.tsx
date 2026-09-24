"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  Award,
  BarChart3,
  Megaphone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function PartnerBenefitsPage() {
  const { getUserRole } = useAuth();
  const role = getUserRole();
  const isPartner = role?.toUpperCase() === "PARTNER";

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <Link
          href="/partners"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#B89047] transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" /> Back to Partners
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            PARTNER REWARDS & PERKS
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            Partner Benefits Program
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3.5 leading-relaxed">
            Discover why top venues, luxury hotels, and wedding planners recommend InviteOly to their high-value clients.
          </p>
        </div>

        {/* 4 Feature Deep Dives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <DollarSign className="size-5" />
            </div>
            <h2 className="text-lg font-bold font-space-grotesk text-white">
              Direct Referral Rewards
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Earn $100 for each verified event booking referred through your unique link or code. Rewards can be claimed as direct wire deposits or converted into VIP promo credits.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Award className="size-5" />
            </div>
            <h2 className="text-lg font-bold font-space-grotesk text-white">
              Preferred Partner Badge
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Partners who refer 5+ events unlock Preferred Partner status, appearing first in our venue search engine and receiving priority customer concierge support.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <BarChart3 className="size-5" />
            </div>
            <h2 className="text-lg font-bold font-space-grotesk text-white">
              Real-Time Partner Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Track referred bookings, venue spaces, upcoming customer events, and accumulated revenue in your personalized dashboard.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Megaphone className="size-5" />
            </div>
            <h2 className="text-lg font-bold font-space-grotesk text-white">
              Co-Branded Marketing Kit
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Receive digital brochures, branded QR table stands, and custom promo code discounts for your clients to enhance your booking pitches.
            </p>
          </div>
        </div>

        {/* Tier Comparison Table */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-16">
          <h3 className="text-xl font-bold font-space-grotesk text-white mb-6">
            Partner Tiers Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-400 font-space-grotesk">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Standard Partner</th>
                  <th className="py-3 px-4 text-[#B89047]">Preferred Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-xs sm:text-sm text-neutral-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Referral Reward per Event</td>
                  <td className="py-3.5 px-4">$100</td>
                  <td className="py-3.5 px-4 font-bold text-[#B89047]">$125 + Bonus Points</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Directory Placement</td>
                  <td className="py-3.5 px-4">Standard Listing</td>
                  <td className="py-3.5 px-4 font-bold text-[#B89047]">Top Priority Placement</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Multi-Venue Spaces</td>
                  <td className="py-3.5 px-4">Up to 3</td>
                  <td className="py-3.5 px-4 font-bold text-[#B89047]">Unlimited Spaces</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Dedicated Support Manager</td>
                  <td className="py-3.5 px-4">Email / WhatsApp</td>
                  <td className="py-3.5 px-4 font-bold text-[#B89047]">24/7 Phone Concierge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 sm:p-10 space-y-4">
          <h3 className="text-2xl font-bold font-space-grotesk text-white">
            Start Earning Referral Rewards
          </h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Join hundreds of trusted venues and planners recommending InviteOly.
          </p>
          <div className="pt-2">
            <Link
              href={isPartner ? "/partner" : "/register?role=PARTNER"}
              className="px-8 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              {isPartner ? "View Partner Dashboard" : "Sign Up as a Partner"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

