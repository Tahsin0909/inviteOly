"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";

interface FaqItem {
  id: string;
  category: "hosts" | "guests" | "partners" | "billing";
  question: string;
  answer: string;
}

const ALL_FAQS: FaqItem[] = [
  // For Hosts
  {
    id: "h-1",
    category: "hosts",
    question: "How do I create and customize an event on InviteOnly?",
    answer:
      "Log into your Host Dashboard and select 'Create Event'. You can enter event name, dates, venue location, customize digital ticket branding, and configure guest list capacity.",
  },
  {
    id: "h-2",
    category: "hosts",
    question: "How do I invite guests and distribute digital tickets?",
    answer:
      "You can upload a CSV guest manifest or enter guests manually. Once added, click 'Send Tickets' to dispatch personalized links directly via WhatsApp, SMS, or Email.",
  },
  {
    id: "h-3",
    category: "hosts",
    question: "Can I manage seating arrangements and plus-ones?",
    answer:
      "Yes! InviteOnly allows you to assign table numbers, specify meal preferences, and enable or restrict plus-ones per primary guest.",
  },

  // For Guests
  {
    id: "g-1",
    category: "guests",
    question: "Do guests need to download an app to access their tickets?",
    answer:
      "No! Guests can open their personalized digital ticket in any mobile browser, download a PDF version, or save it directly to their Apple Wallet or Google Wallet.",
  },
  {
    id: "g-2",
    category: "guests",
    question: "What happens if a guest forgets their phone or QR code?",
    answer:
      "The check-in team can look up guests by their first or last name, phone number, or email on the InviteOly scanner app and manually verify their entry.",
  },

  // For Partners
  {
    id: "p-1",
    category: "partners",
    question: "How does the Partner Referral Program work?",
    answer:
      "When venues, planners, or vendors recommend InviteOnly to their clients, they receive referral points and financial rewards ($100 per verified event booking) tracked in real time on the Partner Dashboard.",
  },
  {
    id: "p-2",
    category: "partners",
    question: "Can venue managers access scanning controls for multiple halls?",
    answer:
      "Yes! Partners with multiple ballrooms or spaces can organize distinct entry points and delegate temporary scanning credentials to door staff for each hall.",
  },

  // Billing
  {
    id: "b-1",
    category: "billing",
    question: "What payment methods are supported for event packages?",
    answer:
      "We support all major credit/debit cards via Stripe, as well as offline bank wire transfers with official invoice confirmation.",
  },
  {
    id: "b-2",
    category: "billing",
    question: "Can I upgrade my guest tier if my attendee count grows?",
    answer:
      "Absolutely. You can upgrade from Intimate to Signature or Grand tier anytime before your event, paying only the difference.",
  },
];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("h-1");

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-20 font-work-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B89047] uppercase font-space-grotesk">
            HAVE QUESTIONS?
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white mt-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Everything you need to know about the InviteOnly platform, digital invitations, and venue partner benefits.
          </p>

          {/* Search Box */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#B89047]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: "all", label: "All Questions" },
            { id: "hosts", label: "For Hosts" },
            { id: "guests", label: "For Guests" },
            { id: "partners", label: "For Partners" },
            { id: "billing", label: "Pricing & Billing" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                selectedCategory === tab.id
                  ? "bg-[#B89047] text-white shadow-sm"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
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
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No matching questions found for your search query.
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 text-center space-y-4">
          <HelpCircle className="size-10 text-[#B89047] mx-auto" />
          <h3 className="text-xl font-bold font-space-grotesk text-white">
            Have a question that isn&apos;t listed here?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Our concierge team is available around the clock to answer specific venue inquiries or discuss custom integrations.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm border border-neutral-700 inline-flex items-center transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

