import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BatteryCharging,
  Building,
  Building2,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  Gift,
  HeartHandshake,
  Hotel,
  Lock,
  Megaphone,
  MessageCircle,
  Music,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  UtensilsCrossed
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner Program | InviteOly - A Premium Service Your Clients Will Remember",
  description:
    "Join InviteOly’s Partner Program. Offer secure QR-code tickets, live guest check-in, and capacity control without technology development expenses. Earn a 10% Partner Reward on qualifying paid bookings.",
  keywords: [
    "InviteOly Partner Program",
    "event venue partnership",
    "wedding planner ticketing",
    "banquet hall guest management",
    "event entry scanning app",
    "10% partner reward",
    "preferred partner status",
    "private event capacity control",
  ],
};

// 10 categories of event professionals from Page 2 of the PDF
const WHO_CAN_BECOME_PARTNERS = [
  {
    icon: Building2,
    title: "Wedding & Event Venues",
    description: "Historic estates, chateaus, and private ceremony grounds.",
  },
  {
    icon: Building,
    title: "Banquet Halls & Ballrooms",
    description: "Multi-hall facilities requiring simultaneous entry control.",
  },
  {
    icon: CalendarCheck,
    title: "Event Planners & Coordinators",
    description: "Full-service agencies managing invite-only private galas.",
  },
  {
    icon: HeartHandshake,
    title: "Wedding Planners",
    description: "Specialists crafting unforgettable bespoke wedding experiences.",
  },
  {
    icon: Music,
    title: "DJs & Entertainment Companies",
    description: "Artists and performers looking to elevate event admission.",
  },
  {
    icon: UtensilsCrossed,
    title: "Luxury Caterers",
    description: "Culinary teams coordinating seated dining and guest manifests.",
  },
  {
    icon: Palette,
    title: "Event-Decor & Rental Companies",
    description: "Designers creating high-end immersive event environments.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Staffing Companies",
    description: "Door personnel enforcing ID and single-scan ticket policies.",
  },
  {
    icon: Hotel,
    title: "Hotels & Private Event Spaces",
    description: "Hospitality suites, rooftops, and private club lounges.",
  },
  {
    icon: Camera,
    title: "Photographers & Trusted Pros",
    description: "Established industry vendors with direct private client access.",
  },
];

// 4 Pillars from Page 3 of the PDF
const WHY_PARTNER_PILLARS = [
  {
    icon: Sparkles,
    title: "Offer a Premium Service",
    description:
      "Differentiate your business by offering a modern guest-management experience that many competitors do not provide.",
  },
  {
    icon: HeartHandshake,
    title: "Enhance the Guest Experience",
    description:
      "Give clients and guests a smooth, organized, and professional arrival experience without paper list delays.",
  },
  {
    icon: Users,
    title: "Live Capacity Control",
    description:
      "Monitor guest check-ins in real time and maintain accurate event capacity throughout the event.",
  },
  {
    icon: Megaphone,
    title: "Strengthen Your Marketing",
    description:
      "Gain exposure as an InviteOly Partner through website listings, partnership announcements, and social-media opportunities.",
  },
];

// Partner Responsibilities checklist from Page 9
const PARTNER_RESPONSIBILITIES = [
  "Provide and assign professional Door Assistants.",
  "Ensure Door Assistants download the InviteOly Scan App.",
  "Provide a compatible smartphone with a working camera.",
  "Provide a backup scanning device.",
  "Provide a power bank or reliable charging option.",
  "Give authorized Door Assistants the event's Scanner Login Code.",
  "Confirm that staff understand the Host's entry requirements.",
  "Monitor live guest check-in and event capacity.",
  "Handle entry concerns professionally.",
];

// Private Information protection list from Page 10
const PROTECTED_INFO_ITEMS = [
  "Guest names & contact details",
  "Guest lists and ticket information",
  "Scanner Login Codes",
  "Host and event details",
  "Check-in and attendance records",
];


export default function PartnersLandingPage() {
  return (
    <main className="min-h-screen bg-neutral-50/60 dark:bg-[#0F0F0F] text-neutral-900 dark:text-white pt-24 pb-20 font-work-sans transition-colors duration-200">
      <div className="container mx-auto space-y-24">
        {/* =========================================================================
            PAGE 1: HERO SECTION - PARTNER PROGRAM
            ========================================================================= */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89047]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="font-space-grotesk italic text-[#916D28] dark:text-[#E5C170] text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
                  A Premium Service Your Clients Will Remember
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white mt-2 tracking-tight leading-tight">
                  Raise the Standard for Invite-Only Events
                </h1>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                InviteOly’s Partner Program provides a premium guest-management platform that allows event professionals to offer secure QR-code tickets, live guest check-in, and capacity control—without the expense of developing and maintaining their own technology.
              </p>

              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 shadow-xs dark:shadow-none flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#B89047]/20 border border-[#B89047]/40 text-[#916D28] dark:text-[#E5C170] flex items-center justify-center shrink-0">
                  <Gift className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Exclusive Partner Reward</p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Earn a <strong className="text-[#916D28] dark:text-[#E5C170]">10% Partner Reward</strong> on qualifying paid bookings
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3.5 flex-wrap">
                <Link
                  href="/register?role=PARTNER"
                  className="px-7 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                >
                  Join the Partner Network <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="px-7 py-3.5 rounded-xl bg-white dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold text-sm transition-all shadow-xs"
                >
                  Partner Login
                </Link>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                No monthly membership fee · Fast verification · Dedicated partner dashboard
              </p>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700/70 shadow-2xl group">
                <Image
                  src="/authSideImage.png"
                  alt="Luxury event entry with InviteOly scanning"
                  width={600}
                  height={700}
                  className="w-full h-[400px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Floating Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#E5C170] font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="size-4" /> Secure QR Check-in
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Live Entry
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-snug">
                    Door staff verify single-scan tickets in under a second with the InviteOly Scan App.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 2: WHO CAN BECOME AN INVITEOLY PARTNER?
            ========================================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
              PARTNER NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Who Can Become an InviteOly Partner?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              InviteOly Partners are event professionals and businesses that regularly work with clients hosting private events, including:
            </p>
          </div>

          {/* 10 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHO_CAN_BECOME_PARTNERS.map((partner, idx) => {
              const Icon = partner.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800/90 hover:border-[#B89047]/60 shadow-xs dark:shadow-none transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="size-11 rounded-xl bg-[#B89047]/10 text-[#916D28] dark:text-[#E5C170] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-sm font-bold font-space-grotesk text-neutral-900 dark:text-white group-hover:text-[#916D28] dark:group-hover:text-[#E5C170] transition-colors leading-snug">
                      {partner.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Requirements & Callout Box from Page 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-7 p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-xs dark:shadow-none">
              <h3 className="text-base font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[#B89047]" />
                Partner Expectations & Quality Standard
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                For events booked through a Partner, the Partner provides trained entry staff and scanning devices unless the Host and Partner agree otherwise
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Partnership applications are reviewed to ensure each Partner is a good fit and can provide a professional experience for clients and guests.
              </p>
            </div>

            <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#B89047]/15 via-white to-amber-50/30 dark:from-[#B89047]/20 dark:via-neutral-900 dark:to-neutral-950 border-2 border-[#B89047]/60 flex flex-col justify-center text-center space-y-3 shadow-xs dark:shadow-none">
              <span className="text-xs font-semibold tracking-wider text-[#916D28] dark:text-[#E5C170] uppercase font-space-grotesk">
                Zero Financial Risk
              </span>
              <p className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white leading-snug">
                There is no monthly membership fee
              </p>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                Partners earn a <strong className="text-[#916D28] dark:text-[#E5C170]">10% Partner Reward</strong> on qualifying paid bookings they refer.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGES 3 & 4: WHY PARTNER WITH INVITEOLY? & NO TECH DEV REQUIRED
            ========================================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
              PARTNER BENEFITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Why Partner with InviteOly?
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Deliver a world-class arrival experience while elevating your venue&apos;s prestige.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_PARTNER_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 hover:border-[#B89047]/50 shadow-xs dark:shadow-none transition-all flex gap-5"
                >
                  <div className="size-12 rounded-xl bg-[#B89047]/10 text-[#916D28] dark:text-[#E5C170] flex items-center justify-center shrink-0">
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Page 4: No Technology Development Required */}
          <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xs dark:shadow-none">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold tracking-wider text-[#B89047] uppercase font-space-grotesk">
                TECHNOLOGY & EFFICIENCY
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                No Technology Development Required
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Use advanced event technology without investing in software development, maintenance, or your own ticketing system.
              </p>
            </div>

            {/* Highlight quote banner from Page 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-black/60 border border-[#B89047]/40 max-w-xl mx-auto">
              <p className="text-sm sm:text-lg font-semibold font-space-grotesk text-[#8C6B28] dark:text-[#E5C170] tracking-wide">
                &ldquo;Modern tools. Professional entry. No custom development required.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2 text-left">
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <Smartphone className="size-5 text-[#B89047] mb-2" />
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Any Smartphone</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Works on iOS & Android camera without expensive scanners.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <Users className="size-5 text-[#B89047] mb-2" />
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Live Monitoring</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Real-time arrival count and capacity visibility during the event.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <Lock className="size-5 text-[#B89047] mb-2" />
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Zero Maintenance</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">We handle all hosting, QR encryption, and system updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGES 5 & 6: INVITEOLY PARTNER STATUS VS PREFERRED PARTNER STATUS
            ========================================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
              MEMBERSHIP & RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Partner Tiers & Privileges
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Compare our standard Partner Membership with our prestigious Preferred Partner Status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: InviteOly Partner Status (Page 5) */}
            <div className="rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xs dark:shadow-none">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase font-space-grotesk">
                    MEMBERSHIP TIER 1
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Standard Partner
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                    InviteOly Partner Status
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    InviteOly Partners earn a 10% Partner Reward on qualifying paid bookings referred through their Partner Dashboard.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6B28] dark:text-[#E5C170]">
                    Your Partner Membership Includes:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    {[
                      "Access to a custom Partner Dashboard",
                      "Live event and capacity monitoring",
                      "Door Assistant training materials",
                      "Client-facing marketing materials",
                      "Discounted Premium Ticket Packages",
                      "Partner Rewards on qualifying paid bookings",
                      "Social-media partnership announcements when applicable",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Callout Badge */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-base font-bold font-space-grotesk text-[#8C6B28] dark:text-[#E5C170]">
                  10% Partner Reward
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">On qualifying paid bookings</p>
              </div>
            </div>

            {/* Card 2: Preferred Partner Status (Page 6) */}
            <div className="rounded-3xl bg-gradient-to-b from-[#B89047]/15 via-white to-amber-50/20 dark:from-[#B89047]/15 dark:via-neutral-900 dark:to-neutral-950 border-2 border-[#B89047] p-8 sm:p-10 flex flex-col justify-between space-y-6 relative shadow-xl">
              <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-[#B89047] text-white font-bold text-xs uppercase tracking-wider shadow-md">
                Elite Recognition
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-[#8C6B28] dark:text-[#E5C170] uppercase font-space-grotesk">
                    RECOGNITION TIER 2
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#B89047]/20 border border-[#B89047]/40 text-xs font-semibold text-[#8C6B28] dark:text-[#E5C170]">
                    Preferred Partner
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                    <Award className="size-6 text-[#B89047] dark:text-[#E5C170]" />
                    Preferred Partner Status
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    Preferred Partners receive everything included with regular Partner Membership, plus exclusive marketing and branding privileges:
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6B28] dark:text-[#E5C170]">
                    Exclusive Preferred Privileges:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-900 dark:text-white">
                    {[
                      "More frequent featured exposure on InviteOly's social-media platforms",
                      "Priority consideration for website features and promotional opportunities",
                      "The Partner's custom logo displayed on eligible digital tickets",
                      "Official recognition as a trusted InviteOly Preferred Partner badge",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <BadgeCheck className="size-4.5 text-[#B89047] dark:text-[#E5C170] shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-[#B89047]/50 text-center space-y-2">
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Status is earned through consistent usage and exceptional guest satisfaction.
                </p>
                <Link
                  href="/register?role=PARTNER"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6B28] dark:text-[#E5C170] hover:underline"
                >
                  Learn how to qualify below <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGES 7 & 8: HOW TO BECOME A PREFERRED PARTNER & COMMITMENT
            ========================================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
              PREFERRED PARTNER QUALIFICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              How to Become a Preferred Partner
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              InviteOly Preferred Partners are recognized for consistently promoting InviteOly and delivering exceptional client and guest experiences.
            </p>
          </div>

          {/* Preferred Partner Qualification Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4 hover:border-[#B89047]/40 shadow-xs dark:shadow-none transition-colors">
              <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
                <CalendarCheck className="size-5" />
              </div>
              <span className="text-xs font-bold text-[#B89047] dark:text-[#E5C170] uppercase font-space-grotesk tracking-wider block">
                Requirement 1
              </span>
              <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white leading-relaxed">
                Services at least 10 InviteOnly events each year
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4 hover:border-[#B89047]/40 shadow-xs dark:shadow-none transition-colors">
              <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
                <Camera className="size-5" />
              </div>
              <span className="text-xs font-bold text-[#B89047] dark:text-[#E5C170] uppercase font-space-grotesk tracking-wider block">
                Requirement 2
              </span>
              <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white leading-relaxed">
                Allows InviteOly to showcase the partnership through testimonials, photos, or event examples when permission has been provided.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4 hover:border-[#B89047]/40 shadow-xs dark:shadow-none transition-colors">
              <div className="size-10 rounded-xl bg-[#B89047]/10 text-[#B89047] flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-xs font-bold text-[#B89047] dark:text-[#E5C170] uppercase font-space-grotesk tracking-wider block">
                Requirement 3
              </span>
              <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white leading-relaxed">
                Consistently follows InviteOly Guest Entry Policies &amp; Procedures.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGES 9 & 10: PARTNER RESPONSIBILITIES & EVENT ENTRY OPERATIONS
            ========================================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
              EVENT-DAY OPERATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Partner Responsibilities & Event Entry
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear operational standards to ensure seamless, professional check-in for every private event.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Responsibilities Checklist (Page 9) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-xs dark:shadow-none space-y-6">
              <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                Partner is responsible for event entry & must:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {PARTNER_RESPONSIBILITIES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/80 dark:border-neutral-800/80">
                    <CheckCircle2 className="size-4 text-[#B89047] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/80 dark:border-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="size-3.5 text-[#B89047] dark:text-[#E5C170]" /> Camera Smartphone
                </span>
                <span className="flex items-center gap-1.5">
                  <BatteryCharging className="size-3.5 text-[#B89047] dark:text-[#E5C170]" /> Power Bank Backup
                </span>
              </div>
            </div>

            {/* Host-Managed Entry & Information Security (Page 10) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Host-Managed Entry */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-xs dark:shadow-none space-y-3">
                <h4 className="text-sm font-bold font-space-grotesk text-neutral-900 dark:text-white">
                  Support Host-Managed Entry
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  If the Partner and Host agree that the Host will manage event entry, the Partner may provide the Host with:
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
                  <li>The event&apos;s Scanner Login Code</li>
                  <li>InviteOly Scan App instructions</li>
                  <li>Guest-entry procedures</li>
                  <li>Event requirements & approved training materials</li>
                </ul>
                <div className="p-3 rounded-xl bg-[#B89047]/10 border border-[#B89047]/30 text-[11px] text-[#9A742E] dark:text-[#E5C170]">
                  <strong>Notice:</strong> Scanner Login Codes must only be shared with people authorized to work on the applicable event.
                </div>
              </div>

              {/* Protect Private Information */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 shadow-xs dark:shadow-none space-y-3">
                <h4 className="text-sm font-bold font-space-grotesk text-neutral-900 dark:text-white flex items-center gap-2">
                  <Lock className="size-4 text-[#B89047]" /> Protect Private Information
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Partners must keep the following information private and secure at all times:
                </p>
                <div className="grid grid-cols-1 gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                  {PROTECTED_INFO_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-[#B89047]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CTA BANNER
            ========================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-950 p-8 sm:p-14 text-center space-y-6 shadow-sm dark:shadow-none">
          <Building2 className="size-12 text-[#B89047] mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
            Ready to Join the Growing Partner Network?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Raise the standard for your clients&apos; invite-only events. Partner registration takes less than two minutes with zero monthly fees.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register?role=PARTNER"
              className="px-8 py-3.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              Apply to Become a Partner <ArrowRight className="size-4" />
            </Link>
            <Link
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
