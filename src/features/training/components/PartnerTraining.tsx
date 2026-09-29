"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  partnerTrainingModules,
  eventStaffTrainingModules,
  partnerFaqs,
} from "../data/training.data";
import { PartnerTrainingModuleItem } from "./PartnerTrainingModuleItem";
import { PartnerFaqItem } from "./PartnerFaqItem";

interface PartnerTrainingProps {
  className?: string;
}

export const PartnerTraining: React.FC<PartnerTrainingProps> = ({ className }) => {
  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Open state for Partner Training modules (default first open as in screenshot)
  const [openPartnerModuleId, setOpenPartnerModuleId] = useState<string | null>(
    "getting-started"
  );

  // Open state for Event Staff Training modules
  const [openStaffModuleId, setOpenStaffModuleId] = useState<string | null>(null);

  // Open state for FAQs (default first open or all collapsible)
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const togglePartnerModule = (id: string) => {
    setOpenPartnerModuleId((prev) => (prev === id ? null : id));
  };

  const toggleStaffModule = (id: string) => {
    setOpenStaffModuleId((prev) => (prev === id ? null : id));
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Filtered lists if search query is provided
  const query = searchQuery.trim().toLowerCase();

  const moduleMatchesQuery = (m: (typeof partnerTrainingModules)[number]) => {
    if (!query) return true;
    if (m.title.toLowerCase().includes(query)) return true;
    if (m.introText?.toLowerCase().includes(query)) return true;
    if (
      m.steps?.some(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.paragraphs?.some((p) => p.toLowerCase().includes(query))
      )
    ) {
      return true;
    }
    if (m.numberedList?.some((item) => item.toLowerCase().includes(query))) {
      return true;
    }
    if (
      m.bulletPoints?.some((bp) =>
        typeof bp === "string"
          ? bp.toLowerCase().includes(query)
          : bp.text.toLowerCase().includes(query) ||
          bp.subBullets?.some((sb) => sb.toLowerCase().includes(query))
      )
    ) {
      return true;
    }
    if (
      m.situations?.some(
        (sit) =>
          sit.title.toLowerCase().includes(query) ||
          sit.description.toLowerCase().includes(query)
      )
    ) {
      return true;
    }
    return false;
  };

  const filteredPartnerModules = partnerTrainingModules.filter(moduleMatchesQuery);

  const filteredStaffModules = eventStaffTrainingModules.filter(moduleMatchesQuery);

  const filteredFaqs = partnerFaqs.filter(
    (faq) =>
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
  );

  return (
    <div
      className={cn(
        "w-full space-y-6 sm:space-y-7 font-work-sans pb-16",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* PAGE HEADER */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Training & Resources
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1 max-w-2xl">
            Everything Partners and event staff need to confidently use InviteOly and
            provide a smooth guest-entry experience.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="size-4 text-neutral-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides or FAQs..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C] transition-all"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: Partner Training */}
      {/* ========================================================================= */}
      {filteredPartnerModules.length > 0 && (
        <div className="bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4 tracking-tight">
            Partner Training
          </h2>

          <div className="space-y-2.5">
            {filteredPartnerModules.map((module) => (
              <PartnerTrainingModuleItem
                key={module.id}
                module={module}
                isOpen={openPartnerModuleId === module.id}
                onToggle={() => togglePartnerModule(module.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 2: Event Staff / Scanner Training */}
      {/* ========================================================================= */}
      {filteredStaffModules.length > 0 && (
        <div className="bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4 tracking-tight">
            Event Staff / Scanner Training
          </h2>

          <div className="space-y-2.5">
            {filteredStaffModules.map((module) => (
              <PartnerTrainingModuleItem
                key={module.id}
                module={module}
                isOpen={openStaffModuleId === module.id}
                onToggle={() => toggleStaffModule(module.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 3: FAQs for Partners */}
      {/* ========================================================================= */}
      {filteredFaqs.length > 0 && (
        <div className="bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4 tracking-tight">
            FAQs for Partners
          </h2>

          <div className="space-y-2.5">
            {filteredFaqs.map((faq) => (
              <PartnerFaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onToggle={() => toggleFaq(faq.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* No results fallback */}
      {filteredPartnerModules.length === 0 &&
        filteredStaffModules.length === 0 &&
        filteredFaqs.length === 0 && (
          <div className="bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-10 text-center space-y-2">
            <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              No training resources or FAQs found
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Try adjusting your search terms to find what you are looking for.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 px-4 py-1.5 text-xs text-[#C39B4C] hover:underline font-medium cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}
    </div>
  );
};

export default PartnerTraining;

