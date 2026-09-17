"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Gift,
  Award,
  Users2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const PARTNER_BENEFITS = [
  {
    icon: Gift,
    title: "$100 Referral Rewards",
    description:
      "Earn direct cash payouts or reward points for every couple or event host who books through your recommendation.",
  },
  {
    icon: Award,
    title: "Preferred Partner Status",
    description:
      "Get highlighted at the top of our venue directory with dedicated badges and priority concierge support.",
  },
  {
    icon: Users2,
    title: "Dedicated Multi-Hall Controls",
    description:
      "Manage separate ballrooms, track simultaneous client check-ins, and assign door scanning roles with ease.",
  },
  {
    icon: Sparkles,
    title: "Modern Client Experience",
    description:
      "Elevate your venue's reputation with elegant digital tickets that eliminate paper guest list chaos at your entrance.",
  },
];

const SUPPORTED_PARTNERS = [
  "Hotel & Resort Ballrooms",
  "Historic Estates & Chateaus",
  "Wedding & Event Planners",
  "Luxury Catering Services",
  "AV, Production & Sound Teams",
  "Private Clubs & Rooftops",
];

export default function PartnersLandingPage() {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  const isPartner = role?.toUpperCase() === "PARTNER";
  const isAdmin = role?.toUpperCase() === "ADMIN";

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            PARTNER NETWORK
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            Elevate Your Venue Experience with InviteOnly
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Partner with InviteOnly to offer your hosts modern digital RSVPs, secure QR ticketing, and seamless entry management — while earning referral rewards.
          </p>

          {/* Action Buttons based on Role */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {isPartner ? (
              <Link
                href="/partner"
                className="px-7 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
              >
                Go to Partner Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : isAdmin ? (
              <Link
                href="/admin/partners"
                className="px-7 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
              >
                Admin Partner Management <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register?role=PARTNER"
                  className="px-7 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                >
                  Join as Partner <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="px-7 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm transition-all"
                >
                  Partner Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PARTNER_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-[#B89047]/50 transition-colors"
              >
                <div>
                  <div className="size-12 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supported Partners Section */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 sm:p-10 mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold tracking-wider text-[#B89047] uppercase font-space-grotesk">
              WHO WE PARTNER WITH
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-white mt-1">
              Built for Premium Event Professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SUPPORTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80"
              >
                <CheckCircle2 className="size-4.5 text-[#0FA958] shrink-0" />
                <span className="text-sm font-medium text-neutral-200">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-12 text-center space-y-5">
          <Building2 className="size-12 text-[#B89047] mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-bold font-space-grotesk text-white">
            Ready to Partner With Us?
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Sign up takes less than two minutes. Once verified, you will receive your partner badge, personalized referral links, and marketing materials.
          </p>
          <div className="pt-2">
            <Link
              href={
                isPartner
                  ? "/partner"
                  : isAdmin
                    ? "/admin/partners"
                    : "/register?role=PARTNER"
              }
              className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              {isPartner
                ? "Open Partner Dashboard"
                : isAdmin
                  ? "Go to Partner Management"
                  : "Register Your Business Today"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

