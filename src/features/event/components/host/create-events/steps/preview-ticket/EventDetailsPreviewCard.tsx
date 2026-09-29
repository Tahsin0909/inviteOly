"use client";

import React from "react";
import {
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
} from "@/features/event/event.interface";
import { formatTo12Hour } from "@/lib/utils";

interface EventDetailsPreviewCardProps {
  eventDetails?: ICreateEventDetailsForm;
  eventSettings?: ICreateEventSettingsForm;
}

export const EventDetailsPreviewCard: React.FC<
  EventDetailsPreviewCardProps
> = ({ eventDetails, eventSettings }) => {
  const eventType = eventDetails?.eventType || "Wedding Reception";
  const eventDate = eventDetails?.eventDate || "August 30, 2026";
  const startTime = formatTo12Hour(eventDetails?.startTime) || "6:00 PM";
  const endTime = formatTo12Hour(eventDetails?.endTime) || "11:00 PM";

  const room = eventSettings?.room || "The Grand Ballroom";
  const venue = eventSettings?.venue || "Ballroom A";
  const fullAddress = [
    eventSettings?.address,
    eventSettings?.city,
    eventSettings?.state || eventSettings?.venueState,
    eventSettings?.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
  const address = fullAddress || "123 Main Street, New York, NY 10001";

  // Event requirements
  const dressCode = eventDetails?.dressCode || "Formal / Black Tie";
  const idRequirement =
    eventDetails?.idRequirement || "Government-Issued Photo ID Required";
  const ageRestriction = eventDetails?.ageRestriction || "All Ages Welcome";
  const isAdultOnly =
    eventDetails?.ageRestriction === "18+" ||
    eventDetails?.ageRestriction === "21+";
  const ticketRequirement =
    !isAdultOnly && eventDetails?.ticketRequirementAge
      ? `Children under ${eventDetails.ticketRequirementAge} do not require a ticket`
      : "All attendees require a valid ticket";

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs font-work-sans">
      {/* Header with ornamental accents */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378] dark:bg-[#E5C378]/50" />
          <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-widest font-space-grotesk flex items-center gap-1.5">
            <span className="text-[#C39B4C]">✦</span> Event Details{" "}
            <span className="text-[#C39B4C]">✦</span>
          </p>
          <div className="h-[1px] w-12 sm:w-16 bg-[#E5C378] dark:bg-[#E5C378]/50" />
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300">
        {/* Left Column */}
        <div className="space-y-1">
          <p className="font-bold text-neutral-900 dark:text-white text-sm sm:text-[15px]">
            {eventType}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">{eventDate}</p>
          <p className="text-neutral-600 dark:text-neutral-400">
            {startTime} - {endTime}
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-1">
          {room && (
            <p className="font-bold text-neutral-900 dark:text-white text-sm sm:text-[15px]">
              {room}
            </p>
          )}
          <p className="text-neutral-600 dark:text-neutral-400">{venue}</p>
          <p className="text-neutral-500 dark:text-neutral-400">{address}</p>
        </div>
      </div>

      {/* Event Requirements & Guidelines */}
      <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-[13px]">
        <div>
          <p className="font-bold text-neutral-900 dark:text-white">Dress Code</p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{dressCode}</p>
        </div>

        <div>
          <p className="font-bold text-neutral-900 dark:text-white">ID Requirement</p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{idRequirement}</p>
        </div>

        <div>
          <p className="font-bold text-neutral-900 dark:text-white">Age Restriction</p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{ageRestriction}</p>
        </div>

        <div>
          <p className="font-bold text-neutral-900 dark:text-white">Ticket Requirement</p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{ticketRequirement}</p>
        </div>

        {/* Parking Info Block */}
        <div className="sm:col-span-2 pt-1 border-t border-neutral-100/60 dark:border-neutral-800/60">
          <p className="font-bold text-neutral-900 dark:text-white">Parking</p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
            Parking Available At East Entrance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPreviewCard;

