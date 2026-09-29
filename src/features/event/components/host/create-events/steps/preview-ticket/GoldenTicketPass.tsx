"use client";

import React from "react";
import Image from "next/image";
import {
  Clock,
  Building,
  Armchair,
  MapPin,
} from "lucide-react";
import {
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
} from "@/features/event/event.interface";
import { cn, formatTo12Hour } from "@/lib/utils";

interface GoldenTicketPassProps {
  eventDetails?: ICreateEventDetailsForm;
  eventSettings?: ICreateEventSettingsForm;
  isPremium?: boolean;
}

// Crisp Vector QR Code SVG matching media_1789292285749.png
const VectorQrCode: React.FC = () => (
  <svg
    viewBox="0 0 120 120"
    className="size-28 sm:size-32 mx-auto"
    fill="currentColor"
  >
    {/* QR Corner 1 (Top-Left) */}
    <rect x="8" y="8" width="32" height="32" rx="3" fill="#111827" />
    <rect x="14" y="14" width="20" height="20" rx="2" fill="#FFFFFF" />
    <rect x="19" y="19" width="10" height="10" rx="1" fill="#111827" />

    {/* QR Corner 2 (Top-Right) */}
    <rect x="80" y="8" width="32" height="32" rx="3" fill="#111827" />
    <rect x="86" y="14" width="20" height="20" rx="2" fill="#FFFFFF" />
    <rect x="91" y="19" width="10" height="10" rx="1" fill="#111827" />

    {/* QR Corner 3 (Bottom-Left) */}
    <rect x="8" y="80" width="32" height="32" rx="3" fill="#111827" />
    <rect x="14" y="86" width="20" height="20" rx="2" fill="#FFFFFF" />
    <rect x="19" y="91" width="10" height="10" rx="1" fill="#111827" />

    {/* Data Blocks */}
    <rect x="46" y="10" width="7" height="7" fill="#111827" />
    <rect x="58" y="10" width="7" height="7" fill="#111827" />
    <rect x="68" y="15" width="7" height="7" fill="#111827" />
    <rect x="46" y="24" width="7" height="7" fill="#111827" />
    <rect x="58" y="28" width="7" height="7" fill="#111827" />
    <rect x="46" y="38" width="7" height="7" fill="#111827" />

    <rect x="10" y="48" width="7" height="7" fill="#111827" />
    <rect x="22" y="48" width="7" height="7" fill="#111827" />
    <rect x="34" y="48" width="7" height="7" fill="#111827" />
    <rect x="48" y="50" width="7" height="7" fill="#111827" />
    <rect x="60" y="48" width="7" height="7" fill="#111827" />
    <rect x="74" y="48" width="7" height="7" fill="#111827" />
    <rect x="86" y="50" width="7" height="7" fill="#111827" />
    <rect x="98" y="48" width="7" height="7" fill="#111827" />

    <rect x="14" y="60" width="7" height="7" fill="#111827" />
    <rect x="26" y="60" width="7" height="7" fill="#111827" />
    <rect x="38" y="62" width="7" height="7" fill="#111827" />
    <rect x="52" y="60" width="7" height="7" fill="#111827" />
    <rect x="66" y="60" width="7" height="7" fill="#111827" />
    <rect x="78" y="62" width="7" height="7" fill="#111827" />
    <rect x="90" y="60" width="7" height="7" fill="#111827" />

    <rect x="46" y="80" width="7" height="7" fill="#111827" />
    <rect x="58" y="84" width="7" height="7" fill="#111827" />
    <rect x="70" y="80" width="7" height="7" fill="#111827" />
    <rect x="82" y="80" width="7" height="7" fill="#111827" />
    <rect x="94" y="84" width="7" height="7" fill="#111827" />

    <rect x="46" y="94" width="7" height="7" fill="#111827" />
    <rect x="58" y="98" width="7" height="7" fill="#111827" />
    <rect x="70" y="94" width="7" height="7" fill="#111827" />
    <rect x="82" y="98" width="7" height="7" fill="#111827" />
    <rect x="96" y="98" width="7" height="7" fill="#111827" />
  </svg>
);

// Vintage ornamental scroll divider
const ScrollFlourish: React.FC = () => (
  <svg
    viewBox="0 0 100 12"
    fill="none"
    className="w-20 sm:w-24 h-2.5 mx-auto text-[#C39B4C]"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M5 6h25c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4h25" />
    <circle cx="50" cy="6" r="1.5" fill="currentColor" />
  </svg>
);

export const GoldenTicketPass: React.FC<GoldenTicketPassProps> = ({
  eventDetails,
  eventSettings,
  isPremium = false,
}) => {
  // Read dynamic user inputs with realistic luxury fallbacks
  const eventName = eventDetails?.eventName || "EVENT NAME";
  const venueName = eventSettings?.venue || "VENUE NAME";
  const fullAddress = [
    eventSettings?.address,
    eventSettings?.city,
    eventSettings?.state || eventSettings?.venueState,
    eventSettings?.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
  const address = fullAddress || "1234 Event Way, City, State 12345";
  const startTime = formatTo12Hour(eventDetails?.startTime) || "6:00 PM";
  const endTime = formatTo12Hour(eventDetails?.endTime) || "11:00 PM";
  const room = eventSettings?.room || "Grand Ballroom";

  return (
    <div className="overflow-hidden ">
      <div className="relative w-full rounded-2xl border-2 border-[#E5C378] dark:border-[#C39B4C]/70 bg-[#FFFDFA] dark:bg-neutral-950/80 p-3 sm:p-5 shadow-xs font-work-sans">
        {/* Decorative Concave Corner Notches Effect */}
        <div className="absolute -top-3 -left-4 size-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#E5C378] dark:border-[#C39B4C]/70 z-10 pointer-events-none" />
        <div className="absolute -top-3 -right-3 size-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#E5C378] dark:border-[#C39B4C]/70 z-10 pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 size-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#E5C378] dark:border-[#C39B4C]/70 z-10 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 size-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#E5C378] dark:border-[#C39B4C]/70 z-10 pointer-events-none" />


        {/* Inner Decorative Fine Border */}
        <div className="rounded-xl p-3 sm:p-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 items-center">
            {/* Left Ticket Stub (Info & Details - 60% width) */}
            <div className="md:col-span-6 text-center space-y-2">
              <p className="text-[10px] sm:text-[11px] text-[#C39B4C] font-semibold tracking-[0.2em] uppercase font-space-grotesk">
                YOU HAVE BEEN INVITED TO:
              </p>

              <ScrollFlourish />

              {/* Event Name */}
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-neutral-900 dark:text-white tracking-wider uppercase leading-tight pt-1">
                {eventName}
              </h4>

              {/* Venue and Address */}
              <div className="space-y-0.5 pt-0.5">
                <span className="text-[#C39B4C] text-[10px] block">✦</span>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 dark:text-neutral-200 uppercase font-space-grotesk">
                  • {venueName} •
                </p>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1 font-work-sans truncate max-w-sm mx-auto">
                  <MapPin className="size-3 text-neutral-400 dark:text-neutral-500 shrink-0" />
                  <span>{address}</span>
                </p>
              </div>

              {/* Details Badges Grid with Vertical Dividers (3 columns for standard, 4 for premium) */}
              <div
                className={cn(
                  "grid border-y border-[#E5C378]/60 dark:border-[#E5C378]/40 py-2.5 my-3 divide-x divide-[#E5C378]/50 dark:divide-[#E5C378]/30 text-neutral-700 dark:text-neutral-300",
                  isPremium ? "grid-cols-4" : "grid-cols-3"
                )}
              >
                {/* Start Time */}
                <div className="flex flex-col items-center px-1">
                  <Clock className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 dark:text-neutral-500 font-medium leading-none mb-1">
                    Start Time
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                    {startTime}
                  </span>
                </div>

                {/* End Time */}
                <div className="flex flex-col items-center px-1">
                  <Clock className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 dark:text-neutral-500 font-medium leading-none mb-1">
                    End Time
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                    {endTime}
                  </span>
                </div>

                {/* Room */}
                <div className="flex flex-col items-center px-1">
                  <Building className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 dark:text-neutral-500 font-medium leading-none mb-1">
                    Room
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200 truncate max-w-[70px]">
                    {room}
                  </span>
                </div>

                {/* Seat (Premium package only) */}
                {isPremium && (
                  <div className="flex flex-col items-center px-1">
                    <Armchair className="size-3.5 text-[#C39B4C] mb-1" />
                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 font-medium leading-none mb-1">
                      Seat
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                      14
                    </span>
                  </div>
                )}
              </div>

              {/* Admit One & Guest 001 */}
              <div className="space-y-0.5 pt-0.5">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-8 bg-[#E5C378]/80 dark:bg-[#E5C378]/50" />
                  <span className="text-xs sm:text-md text-[#C39B4C] font-semibold tracking-widest uppercase">
                    • ADMIT ONE •
                  </span>
                  <span className="h-[1px] w-8 bg-[#E5C378]/80 dark:bg-[#E5C378]/50" />
                </div>
                <p className="text-xs sm:text-md font-bold text-neutral-600 dark:text-neutral-400 tracking-wider uppercase">
                  {isPremium ? "VIP" : "GENERAL ADMISSION"}
                </p>
                <p className="text-sm sm:text-lg font-bold text-neutral-900 dark:text-white font-serif">
                  Guest 001
                </p>
              </div>
            </div>

            {/* Right Ticket Stub (QR Code & Scan - 40% width) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center md:border-l md:border-dashed md:border-[#E5C378] dark:md:border-[#E5C378]/40 md:pl-6 pt-3 md:pt-0">
              {/* Decorative Corner Brackets Frame around QR */}
              <div className="relative p-3 bg-white border border-[#E5C378]/80 dark:border-[#E5C378]/50 rounded-xl shadow-2xs">
                {/* Corner 1: Top-Left */}
                <div className="absolute top-1.5 left-1.5 size-3.5 border-t-2 border-l-2 border-[#C39B4C]" />
                {/* Corner 2: Top-Right */}
                <div className="absolute top-1.5 right-1.5 size-3.5 border-t-2 border-r-2 border-[#C39B4C]" />
                {/* Corner 3: Bottom-Left */}
                <div className="absolute bottom-1.5 left-1.5 size-3.5 border-b-2 border-l-2 border-[#C39B4C]" />
                {/* Corner 4: Bottom-Right */}
                <div className="absolute bottom-1.5 right-1.5 size-3.5 border-b-2 border-r-2 border-[#C39B4C]" />

                <VectorQrCode />
              </div>

              {/* Present This Ticket Label */}
              <p className="text-[9px] tracking-widest text-neutral-600 dark:text-neutral-400 font-semibold text-center mt-3 uppercase font-work-sans">
                PRESENT THIS TICKET FOR ENTRY
              </p>

              <div className="w-12 h-[1px] bg-[#E5C378]/60 dark:bg-[#E5C378]/40 my-2" />

              {/* InviteOly Branding with ticketIcon.png */}
              <div className="flex items-center justify-center gap-1.5">
                <Image
                  src="/ticketIcon.png"
                  alt="InviteOly"
                  width={20}
                  height={20}
                  className="rounded-full shrink-0"
                />
                <span className="font-bold text-sm font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                  Invite<span className="text-[#C39B4C]">Oly</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenTicketPass;

