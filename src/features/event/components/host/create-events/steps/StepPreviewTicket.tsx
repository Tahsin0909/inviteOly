"use client";

import React from "react";

export const StepPreviewTicket: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs font-work-sans">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold font-space-grotesk text-gray-900">
          Step 4: Preview Ticket
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Review your digital event pass and ticket styling as seen by your attendees.
        </p>
      </div>

      <div className="py-12 text-center text-gray-400 text-sm">
        {/* Component content placeholder */}
        <p>Ticket preview component will be configured here.</p>
      </div>
    </div>
  );
};

export default StepPreviewTicket;

