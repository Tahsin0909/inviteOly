"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, QrCode, Smartphone, ArrowRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function GuestManagementGatewayPage() {
  const router = useRouter();
  const { getUserRole, isAuthenticated } = useAuth();
  const role = getUserRole();

  useEffect(() => {
    if (isAuthenticated) {
      if (role?.toUpperCase() === "HOST") {
        router.push("/host/events");
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
            GUEST EXPERIENCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            Know Exactly Who&apos;s Coming Before the Big Day
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Streamline your guest list, collect dietary notes, manage table seating, and monitor check-ins at the door in real time with our Host Dashboard.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register?role=HOST"
              className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              Get Started as a Host <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login?redirect=/host/events"
              className="px-8 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm transition-all"
            >
              Host Dashboard Login
            </Link>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Users className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              Instant RSVP Responses
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Track who has viewed their invite, confirmed attendance, or declined in real time with zero manual follow-up stress.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <QrCode className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              One-Scan Entry Validation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Each confirmed guest receives a unique QR code. Entry door teams scan in under one second, eliminating long entrance queues.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 space-y-3">
            <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
              <Smartphone className="size-5" />
            </div>
            <h3 className="text-lg font-bold font-space-grotesk text-white">
              Live Arrival Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Watch your arrival percentages live on your phone. See when VIPs, family members, or specific tables have checked in.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

