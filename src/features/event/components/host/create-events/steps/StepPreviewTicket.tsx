"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/features/event/store/createEvent.slice";
import {
  PackageIncludesList,
  TicketPreviewCard,
} from "./preview-ticket";

export const StepPreviewTicket: React.FC = () => {
  const dispatch = useDispatch();

  // Read saved dynamic user input values from Redux
  const packageSelection = useSelector(
    (state: RootState) => state.createEvent?.packageSelection
  );
  const eventDetails = useSelector(
    (state: RootState) => state.createEvent?.eventDetails
  );
  const eventSettings = useSelector(
    (state: RootState) => state.createEvent?.eventSettings
  );

  const handleNext = () => {
    dispatch(setCurrentStep(5));
  };

  const handleCancel = () => {
    dispatch(setCurrentStep(3));
  };

  return (
    <div className="w-full space-y-8 font-work-sans py-2">
      {/* 2-Column Responsive Layout matching media_1789291184487.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Package Features Checklist (~40% on desktop) */}
        <div className="lg:col-span-5">
          <PackageIncludesList packageSelection={packageSelection} />
        </div>

        {/* Right Column: Digital Invitation Preview (~60% on desktop) */}
        <div className="lg:col-span-7">
          <TicketPreviewCard
            eventDetails={eventDetails}
            eventSettings={eventSettings}
          />
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-100 max-w-5xl mx-auto">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-7 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#b08b3e] text-white text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepPreviewTicket;
