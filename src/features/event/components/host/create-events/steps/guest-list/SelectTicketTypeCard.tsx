"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const TICKET_TYPES = ["Adult", "Child", "VIP", "Vendor", "Others"] as const;
export type TTicketTypeOption = (typeof TICKET_TYPES)[number];

interface SelectTicketTypeCardProps {
  selectedTicketType: string;
  onSelectTicketType: (type: string) => void;
}

export const SelectTicketTypeCard: React.FC<SelectTicketTypeCardProps> = ({
  selectedTicketType,
  onSelectTicketType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 sm:p-6 shadow-2xs relative font-work-sans">
      {/* Header with Step 1 Badge */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="size-6 sm:size-7 rounded-md bg-[#B89047] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs shrink-0">
          1
        </div>
        <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white">
          Select Ticket Type
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-1">
        {/* Left Side: Question, description and looping arrow illustration */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Which ticket type is this guest list for?
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              Select the ticket type for the csv file you&apos;re about to upload
            </p>
          </div>

          {/* Hand-drawn arrow and annotation matching mockup */}
          <div className="pt-2 hidden sm:flex items-center justify-center relative min-h-[90px]">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-medium text-[#B89047] max-w-[170px] text-center leading-snug">
                Choose the ticket type before uploading your csv
              </span>

              {/* Looping curly arrow pointing up-right */}
              <svg
                width="84"
                height="68"
                viewBox="0 0 84 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#B89047] shrink-0"
              >
                {/* Curly looping line */}
                <path
                  d="M10 52 C 25 50, 42 54, 46 40 C 49 30, 36 28, 42 16 C 46 8, 62 10, 72 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Loop circle detail */}
                <ellipse
                  cx="44"
                  cy="35"
                  rx="4"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
                {/* Arrow head pointing up-right */}
                <path
                  d="M65 2 L 74 4 L 71 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Dropdown selector */}
        <div className="md:col-span-6 flex justify-start md:justify-end" ref={dropdownRef}>
          <div className="relative w-full max-w-[260px]">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#B89047]/20 transition-all cursor-pointer shadow-2xs"
            >
              <span
                className={
                  selectedTicketType
                    ? "font-medium text-neutral-800 dark:text-neutral-200"
                    : "text-neutral-400 dark:text-neutral-500"
                }
              >
                {selectedTicketType || "Select Ticket Type"}
              </span>
              <ChevronDown
                className={`size-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-neutral-700 dark:text-neutral-200" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu matching mockup */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-950/50 z-20 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                {TICKET_TYPES.map((type) => {
                  const isSelected = selectedTicketType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        onSelectTicketType(type);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${isSelected
                        ? "bg-[#FFF8E7] dark:bg-[#B89047]/15 text-[#B89047] font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                    >
                      <span>{type}</span>
                      {isSelected && <Check className="size-3.5 text-[#B89047]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTicketTypeCard;

