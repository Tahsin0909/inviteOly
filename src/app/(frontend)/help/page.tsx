"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  QrCode,
  Smartphone,
  Building2,
  CreditCard,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";

interface FaqItem {
  question: string;
  answer: string;
}

const CATEGORIES = [
  {
    icon: BookOpen,
    title: "Getting Started for Hosts",
    description: "Learn how to configure events, pick packages, and invite your first guests.",
    articlesCount: 8,
  },
  {
    icon: QrCode,
    title: "Digital Tickets & QR Codes",
    description: "How guests receive, download, and present their secure personalized tickets.",
    articlesCount: 6,
  },
  {
    icon: Smartphone,
    title: "InviteOly Scanner App",
    description: "Fast multi-door guest check-in, real-time headcounts, and offline verification.",
    articlesCount: 5,
  },
  {
    icon: Building2,
    title: "Venues & Partner Directory",
    description: "Browse partner spaces, link preferred venues, and earn referral perks.",
    articlesCount: 7,
  },
  {
    icon: CreditCard,
    title: "Billing & Invoices",
    description: "Package pricing, payment receipts, wire transfers, and custom invoice approvals.",
    articlesCount: 6,
  },
  {
    icon: ShieldCheck,
    title: "Security & Account",
    description: "Two-factor OTP security, privacy controls, and data confidentiality.",
    articlesCount: 4,
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How do guests receive their invitations and tickets?",
    answer:
      "Hosts can send personalized RSVP links directly via WhatsApp, SMS, or Email. Once a guest confirms their RSVP, their unique secure QR ticket unlocks immediately and can be added to Apple or Google Wallet.",
  },
  {
    question: "Can guests transfer or screenshot their tickets?",
    answer:
      "InviteOly tickets feature dynamic cryptographic watermarks and can be locked to single-scan validity to prevent duplicate entry or fraudulent transfers.",
  },
  {
    question: "Does the scanner app work if the venue has poor internet?",
    answer:
      "Yes! The InviteOly scanner app downloads your encrypted guest manifest prior to check-in, allowing seamless 100% offline verification with instant cloud sync as soon as connectivity resumes.",
  },
  {
    question: "What packages are available for large events or weddings?",
    answer:
      "We offer flexible tiers from intimate gatherings (up to 50 guests) to grand galas with thousands of guests, plus dedicated custom quotes for multi-day festivals and corporate conventions.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            INVITEONLY HELP CENTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3.5 leading-relaxed">
            Find setup guides, ticketing troubleshooting, scanner app walkthroughs, and answers to common questions.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles, guides, or troubleshooting topics..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/30 transition-all shadow-xl"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="group bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800 hover:border-[#B89047]/50 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="size-12 rounded-xl bg-[#B89047]/10 group-hover:bg-[#B89047]/20 text-[#B89047] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-lg font-bold font-space-grotesk text-white group-hover:text-[#B89047] transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>{cat.articlesCount} Articles</span>
                  <span className="flex items-center gap-1 text-[#B89047] group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Common FAQs Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-wider text-[#B89047] uppercase font-space-grotesk">
              QUICK ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#B89047] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="size-5 text-[#B89047] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="size-5 text-neutral-400 shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-white">
              Still need assistance?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
              Our 24/7 dedicated support team is ready to answer questions, configure custom tickets, or assist with on-site scanner setup.
            </p>
          </div>
          <div className="flex items-center gap-3.5 flex-wrap">
            <Link
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="size-4" />
              WhatsApp Live
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl border border-neutral-700 hover:border-white bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Mail className="size-4" />
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

