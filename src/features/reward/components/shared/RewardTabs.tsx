"use client";

import React from "react";

interface RewardTabsProps {
  activeTab: "pending" | "history";
  onTabChange: (tab: "pending" | "history") => void;
}

export const RewardTabs: React.FC<RewardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center gap-6 border-b border-neutral-200/80 font-work-sans">
      <button
        type="button"
        onClick={() => onTabChange("pending")}
        className={`pb-3 text-xs sm:text-sm transition-all relative cursor-pointer ${activeTab === "pending"
          ? "text-[#C39B4C] font-semibold"
          : "text-neutral-500 hover:text-neutral-800 font-medium"
          }`}
      >
        Pending & Approved
        {activeTab === "pending" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C39B4C] rounded-full" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onTabChange("history")}
        className={`pb-3 text-xs sm:text-sm transition-all relative cursor-pointer ${activeTab === "history"
          ? "text-[#C39B4C] font-semibold"
          : "text-neutral-500 hover:text-neutral-800 font-medium"
          }`}
      >
        Payout History
        {activeTab === "history" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C39B4C] rounded-full" />
        )}
      </button>
    </div>
  );
};

export default RewardTabs;

