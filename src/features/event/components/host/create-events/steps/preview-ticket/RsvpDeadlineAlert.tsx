"use client";

import React from "react";
import { Clock } from "lucide-react";

interface RsvpDeadlineAlertProps {
  deadlineText?: string;
}

export const RsvpDeadlineAlert: React.FC<RsvpDeadlineAlertProps> = ({
  deadlineText = "RSVP Deadline: Saturday, Aug 23, 2026 at 11:56",
}) => {
  return (
    <div className="bg-[#FFF5F5] dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-[#DC2626] dark:text-red-400 rounded-xl p-3 sm:p-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold font-work-sans shadow-2xs">
      <Clock className="size-4 text-[#DC2626] dark:text-red-400 shrink-0" />
      <span>{deadlineText}</span>
    </div>
  );
};

export default RsvpDeadlineAlert;

