"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { IFAQItem } from "../training.interface";

interface PartnerFaqItemProps {
  faq: IFAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const PartnerFaqItem: React.FC<PartnerFaqItemProps> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200 overflow-hidden",
        isOpen
          ? "border border-neutral-200/80 bg-white shadow-2xs"
          : "bg-[#F7F7F7] hover:bg-[#F2F2F2]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left font-work-sans transition-colors cursor-pointer",
          isOpen ? "text-neutral-900 font-semibold" : "text-neutral-800 font-medium"
        )}
      >
        <span className="text-xs sm:text-sm">{faq.question}</span>
        <span className="text-neutral-400 shrink-0 ml-3">
          {isOpen ? (
            <ChevronUp className="size-4 text-neutral-500" />
          ) : (
            <ChevronDown className="size-4 text-neutral-400" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-neutral-100 text-xs sm:text-sm font-work-sans text-neutral-600 leading-relaxed">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default PartnerFaqItem;

