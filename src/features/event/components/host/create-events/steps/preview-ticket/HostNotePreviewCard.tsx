"use client";

import React from "react";

interface HostNotePreviewCardProps {
  note?: string;
}

export const HostNotePreviewCard: React.FC<HostNotePreviewCardProps> = ({
  note,
}) => {
  const content =
    note ||
    "Lorem Ipsum Dolor Sit Amet Consectetur. Nisl Sit Quis Vivamus Posuere Lacus Nibh Enim. Egestas Vel Dictum Tellus Eu Mattis.";

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs font-work-sans">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378]" />
          <p className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-widest font-space-grotesk flex items-center gap-1.5">
            <span className="text-[#C39B4C]">✦</span> Important Note From Host{" "}
            <span className="text-[#C39B4C]">✦</span>
          </p>
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378]" />
        </div>
      </div>

      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed text-center font-work-sans max-w-xl mx-auto">
        {content}
      </p>
    </div>
  );
};

export default HostNotePreviewCard;

