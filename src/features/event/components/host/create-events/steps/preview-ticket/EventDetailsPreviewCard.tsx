"use client";

import React from "react";
import {
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
} from "@/features/event/event.interface";

interface EventDetailsPreviewCardProps {
  eventDetails?: ICreateEventDetailsForm;
  eventSettings?: ICreateEventSettingsForm;
}

export const EventDetailsPreviewCard: React.FC<
  EventDetailsPreviewCardProps
> = ({ eventDetails, eventSettings }) => {
  const eventType = eventDetails?.eventType || "Wedding Reception";
  const eventDate = eventDetails?.eventDate || "August 30, 2026";
  const startTime = eventDetails?.startTime || "6:00 PM";
  const endTime = eventDetails?.endTime || "11:00 PM";

  const room = eventSettings?.room || "The Grand Ballroom";
  const venue = eventSettings?.venue || "Ballroom A";
  const address =
    eventSettings?.venueState || "123 Main Street, New York, NY 10001";

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs font-work-sans">
      {/* Header with ornamental accents */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378]" />
          <p className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-widest font-space-grotesk flex items-center gap-1.5">
            <span className="text-[#C39B4C]">✦</span> Event Details{" "}
            <span className="text-[#C39B4C]">✦</span>
          </p>
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378]" />
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-[13px] text-neutral-700">
        {/* Left Column */}
        <div className="space-y-1">
          <p className="font-bold text-neutral-900 text-sm sm:text-[15px]">
            {eventType}
          </p>
          <p className="text-neutral-600">{eventDate}</p>
          <p className="text-neutral-600">
            {startTime} - {endTime}
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-1">
          <p className="font-bold text-neutral-900 text-sm sm:text-[15px]">
            {room}
          </p>
          <p className="text-neutral-600">{venue}</p>
          <p className="text-neutral-500">{address}</p>
        </div>
      </div>

      {/* Parking Info Block */}
      <div className="border-t border-neutral-100 pt-3.5 text-xs sm:text-[13px]">
        <p className="font-bold text-neutral-900">Parking</p>
        <p className="text-neutral-600 mt-0.5">
          Parking Available At East Entrance.
        </p>
      </div>
    </div>
  );
};

export default EventDetailsPreviewCard;

