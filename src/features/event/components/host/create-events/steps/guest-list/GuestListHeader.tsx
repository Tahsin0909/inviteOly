"use client";

import React from "react";
import { Users } from "lucide-react";

export const GuestListHeader: React.FC = () => {
  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Full Name,Email Address,Ticket Type,Table Number,Notes\n" +
      "Alexander Vance,alexander.v@example.com,Adult,Table 01,VIP Guest\n" +
      "Sophia Montenegro,sophia.m@example.com,Adult,Table 01,Special Seating\n" +
      "Marcus Thorne,marcus.t@example.com,VIP,Table 02,Keynote Speaker\n" +
      "Elena Rostova,elena.r@example.com,Child,Table 03,Accompanied by parent\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "InviteOly_Guest_List_CSV_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 font-work-sans">
      {/* Left: Icon + Title + Subtitle */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="size-11 sm:size-12 rounded-full bg-[#FBF4E8] dark:bg-[#B89047]/10 flex items-center justify-center shrink-0 shadow-2xs border border-[#B89047]/15 dark:border-[#B89047]/20">
          <Users className="size-5 sm:size-6 text-[#B89047]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Guest List
          </h2>
          <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans leading-relaxed mt-0.5">
            <p>Upload Your Guest Lists By Ticket Type.</p>
            <p>Each CSV File Should Contain Only Guests For One Ticket Type.</p>
          </div>
        </div>
      </div>

      {/* Right: Download Template Link */}
      <div className="md:text-right shrink-0">
        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 font-medium transition-colors cursor-pointer text-left md:text-right inline-block"
        >
          Download the InviteOly Guest List CSV Template
        </button>
      </div>
    </div>
  );
};

export default GuestListHeader;

