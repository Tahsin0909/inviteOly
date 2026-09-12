"use client";

import React from "react";

export const StepGuestList: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs font-work-sans">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold font-space-grotesk text-gray-900">
          Step 5: Guest List
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Import or add guests to your event roster, assign tables, and prepare invitation links.
        </p>
      </div>

      <div className="py-12 text-center text-gray-400 text-sm">
        {/* Component content placeholder */}
        <p>Guest list and roster management component will be configured here.</p>
      </div>
    </div>
  );
};

export default StepGuestList;

