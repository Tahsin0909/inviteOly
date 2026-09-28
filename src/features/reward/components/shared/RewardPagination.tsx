"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RewardPaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export const RewardPagination: React.FC<RewardPaginationProps> = ({
  currentPage,
  totalPages = 5,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="py-4 px-6 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex items-center justify-center gap-1.5 font-work-sans select-none">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`size-8 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center ${currentPage === page
            ? "bg-[#C39B4C] text-white shadow-2xs font-semibold"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default RewardPagination;

