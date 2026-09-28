"use client";

import React from "react";
import Link from "next/link";
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function TicketingPage() {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  const isHost = role?.toUpperCase() === "HOST";
  const isAdmin = role?.toUpperCase() === "ADMIN";

  return (
    <main className="min-h-screen bg-neutral-50/60 dark:bg-[#0F0F0F] text-neutral-900 dark:text-white pt-24 pb-20 font-work-sans transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            DIGITAL TICKETING
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-3 tracking-tight">
            Next-Generation Secure Event Passes
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Say goodbye to paper invitations, spreadsheets, and party crashes. InviteOly generates personalized cryptographic tickets that guarantee an exclusive guest experience.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {isHost ? (
              <Link
                href="/host/events"
                className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
              >
                Go to My Events <ArrowRight className="size-4" />
              </Link>
            ) : isAdmin ? (
              <Link
                href="/admin/event-orders"
                className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
              >
                Manage Event Ticket Orders <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/#pricing"
                  className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                >
                  View Ticket Packages <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/create-event"
                  className="px-8 py-3.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold text-sm transition-all shadow-xs"
                >
                  Create an Event
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-7 space-y-3 shadow-xs dark:shadow-none">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <QrCode className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Dynamic Anti-Fraud QR Codes
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our tickets utilize dynamic cryptographic hashing that detects duplicate screenshots and prevents forwarded passes from being reused.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-7 space-y-3 shadow-xs dark:shadow-none">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Smartphone className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Native Wallet Integration
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Guests can save their tickets directly to Apple Wallet or Google Wallet with a single tap, receiving automated lock screen event reminders.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-7 space-y-3 shadow-xs dark:shadow-none">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Sub-Second Door Scans
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The InviteOly scanner app reads and verifies tickets in under 500 milliseconds per guest, keeping entrances flowing smoothly.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-7 space-y-3 shadow-xs dark:shadow-none">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Offline Verification Engine
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Basement ballrooms or remote vineyard estates? Our app functions seamlessly without cellular data and syncs automatically once back online.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xs dark:shadow-none">
          <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
            Choose Your Event Package
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            From 50 to 5,000+ attendees, our transparent fixed-price tiers ensure your event runs smoothly without surprise fees.
          </p>
          <div className="pt-2">
            <Link
              href="/#pricing"
              className="px-8 py-3 rounded-xl bg-[#B89047] hover:bg-[#A37E36] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              Explore Pricing Tiers <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
