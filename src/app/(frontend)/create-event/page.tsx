"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function CreateEventGatewayPage() {
  const router = useRouter();
  const { getUserRole, isAuthenticated } = useAuth();
  const role = getUserRole();

  useEffect(() => {
    if (isAuthenticated) {
      if (role?.toUpperCase() === "HOST") {
        router.push("/host/create-event");
      } else if (role?.toUpperCase() === "ADMIN") {
        router.push("/admin/events");
      }
    }
  }, [isAuthenticated, role, router]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            EVENT CREATOR
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            Create Your Next Unforgettable Event
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Set up your event in minutes, configure secure QR guest tickets, manage RSVPs, and ensure seamless entry verification on event day.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register?role=HOST"
              className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              Start as a Host <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login?redirect=/host/create-event"
              className="px-8 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm transition-all"
            >
              Host Sign In
            </Link>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] font-bold font-space-grotesk flex items-center justify-center text-sm">
              01
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              Event Details & Venue
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Add your date, time, venue address, dress code, and select from our partner ballrooms or private estates.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] font-bold font-space-grotesk flex items-center justify-center text-sm">
              02
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              Select Package Tier
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Choose an attendee package matching your guest count (Intimate, Signature, Grand) with instant automated invoice generation.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] font-bold font-space-grotesk flex items-center justify-center text-sm">
              03
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              Dispatch Digital Tickets
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Send encrypted QR ticket invitations directly to your guests via WhatsApp or SMS, and track confirmations live.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 sm:p-10">
          <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-white mb-6">
            Included in Every Event Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              "Personalized Guest QR Codes",
              "100% Offline Scanning App",
              "Real-time RSVP Tracking",
              "Instant Duplicate Scan Detection",
              "Apple & Google Wallet Ready",
              "Dedicated 24/7 Event Support",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4.5 text-[#0FA958] shrink-0" />
                <span className="text-sm text-neutral-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

