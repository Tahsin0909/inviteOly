"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { ALL_FAQS, FaqItem } from "@/lib/data/faq.data";
import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";

export default function FaqClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Default the first 3 questions open for immediate visibility
    const initial: Record<string, boolean> = {};
    ALL_FAQS.slice(0, 3).forEach((item) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    ALL_FAQS.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_FAQS;

    return ALL_FAQS.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B89047]/10 border border-[#B89047]/25 text-[#B89047] text-xs font-semibold tracking-[0.2em] uppercase font-space-grotesk mb-3">
          <Sparkles className="size-3" />
          <span>InviteOnly FAQ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-space-grotesk text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
          Everything you need to know about InviteOnly&apos;s guest management, secure QR ticketing, RSVP workflow, and door scanning.
        </p>

        {/* Search Box */}
        <div className="relative max-w-lg mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. RSVP, tickets, QR)..."
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#B89047] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-neutral-800 px-2 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expand / Collapse All Controls */}
      <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-1">
        <span>
          Showing <strong className="text-white">{filteredFaqs.length}</strong> question
          {filteredFaqs.length === 1 ? "" : "s"}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-[#B89047] transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-[#B89047] transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* FAQ Items List */}
      <div className="space-y-3.5 mb-16">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq: FaqItem) => {
            const isOpen = Boolean(openIds[faq.id]);
            return (
              <div
                key={faq.id}
                className="bg-neutral-900/60 border border-neutral-800/90 border-l-4 border-l-[#B89047] rounded-xl overflow-hidden transition-all duration-200 hover:border-neutral-700/80"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#B89047] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="size-4.5 text-[#B89047] shrink-0" />
                  ) : (
                    <ChevronDown className="size-4.5 text-neutral-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8">
            <HelpCircle className="size-10 text-neutral-500 mx-auto mb-3" />
            <p className="text-base font-medium text-white">No questions found</p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              We couldn&apos;t find any questions matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Still have a question? (Page 6 of PDF) */}
      <div className="bg-neutral-900/50 border border-neutral-800 border-l-4 border-l-[#B89047] rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <HelpCircle className="size-10 text-[#B89047] mx-auto" />
        <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-white">
          Still have a question?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Contact InviteOly or speak with your InviteOly Partner for help choosing a package, preparing your guest list, or planning event-day entry.
        </p>
        <div className="pt-3 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href={WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <MessageCircle className="size-4" />
            Chat on WhatsApp
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm border border-neutral-700 inline-flex items-center transition-all cursor-pointer"
          >
            Contact InviteOly
          </Link>
        </div>
      </div>
    </>
  );
}
