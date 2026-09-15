"use client";

import React from "react";

interface GuestListFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const GuestListFooter: React.FC<GuestListFooterProps> = ({
  onCancel,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-neutral-100 font-work-sans">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="px-7 py-2.5 rounded-lg bg-[#B89047] hover:bg-[#a17e38] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <span>Preview &amp; Confirm</span>
        )}
      </button>
    </div>
  );
};

export default GuestListFooter;

