"use client";

import React from "react";

export const RsvpDemoCard: React.FC = () => {
  return (
    <div className="relative border border-[#E5C378]/70 dark:border-[#C39B4C]/40 bg-[#FFFDF8] dark:bg-neutral-900/60 rounded-2xl p-4 sm:p-5 text-center space-y-3 font-work-sans shadow-2xs">
      {/* Demo Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-950/40 text-[#996b1f] dark:text-[#d4ab59] text-[10px] font-semibold tracking-wide uppercase mx-auto mb-1">
        <span>Preview Demonstration Mode</span>
      </div>

      {/* Two Action Buttons (Disabled for Demonstration Stage) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="RSVP action disabled in preview mode"
          className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#C39B4C] text-white font-semibold text-sm sm:text-base shadow-xs transition-all cursor-not-allowed opacity-90 select-none"
        >
          Yes, I&apos;ll Attend
        </button>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title="RSVP action disabled in preview mode"
          className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 font-semibold text-sm sm:text-base shadow-2xs transition-all cursor-not-allowed opacity-90 select-none"
        >
          Unable to Attend
        </button>
      </div>

      {/* Footnote */}
      <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-work-sans leading-relaxed">
        Confirm Your Attendance Before The Deadline To Activate Your Ticket. A
        Valid Ticket Is Required For Entry.
      </p>
    </div>
  );
};

export default RsvpDemoCard;

