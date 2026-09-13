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

interface GoldenTicketPassProps {
  eventDetails?: ICreateEventDetailsForm;
  eventSettings?: ICreateEventSettingsForm;
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
}) => {
  // Read dynamic user inputs with realistic luxury fallbacks
  const eventName = eventDetails?.eventName || "EVENT NAME";
  const venueName = eventSettings?.venue || "VENUE NAME";
  const address = eventSettings?.venueState
    ? `${eventSettings.venueState}`
    : "1234 Event Way, City, State 12345";
  const startTime = eventDetails?.startTime || "06:00 PM";
  const endTime = eventDetails?.endTime || "11:00 PM";
  const room = eventSettings?.room || "Grand Ballroom";
  const guestName = eventDetails?.hostName || "Jhon Doe";

  return (
    <div className="overflow-hidden ">
      <div className="relative w-full  rounded-2xl border-2 border-[#E5C378] bg-[#FFFDFA] p-3 sm:p-5 shadow-xs font-work-sans">
        {/* Decorative Concave Corner Notches Effect */}
        <div className="absolute -top-3 -left-4 size-12 rounded-full bg-white border-2 border-[#E5C378] z-10 pointer-events-none" />
        <div className="absolute -top-3 -right-3 size-12 rounded-full bg-white border-2 border-[#E5C378] z-10 pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 size-12 rounded-full bg-white border-2 border-[#E5C378] z-10 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 size-12 rounded-full bg-white border-2 border-[#E5C378] z-10 pointer-events-none" />


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
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-neutral-900 tracking-wider uppercase leading-tight pt-1">
                {eventName}
              </h4>

              {/* Venue and Address */}
              <div className="space-y-0.5 pt-0.5">
                <span className="text-[#C39B4C] text-[10px] block">✦</span>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 uppercase font-space-grotesk">
                  • {venueName} •
                </p>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 flex items-center justify-center gap-1 font-work-sans truncate max-w-sm mx-auto">
                  <MapPin className="size-3 text-neutral-400 shrink-0" />
                  <span>{address}</span>
                </p>
              </div>

              {/* 4 Details Badges Grid with Vertical Dividers */}
              <div className="grid grid-cols-4 border-y border-[#E5C378]/60 py-2.5 my-3 divide-x divide-[#E5C378]/50 text-neutral-700">
                {/* Start Time */}
                <div className="flex flex-col items-center px-1">
                  <Clock className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 font-medium leading-none mb-1">
                    Start Time
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800">
                    {startTime}
                  </span>
                </div>

                {/* End Time */}
                <div className="flex flex-col items-center px-1">
                  <Clock className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 font-medium leading-none mb-1">
                    End Time
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800">
                    {endTime}
                  </span>
                </div>

                {/* Room */}
                <div className="flex flex-col items-center px-1">
                  <Building className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 font-medium leading-none mb-1">
                    Room
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 truncate max-w-[70px]">
                    {room}
                  </span>
                </div>

                {/* Seat */}
                <div className="flex flex-col items-center px-1">
                  <Armchair className="size-3.5 text-[#C39B4C] mb-1" />
                  <span className="text-[9px] text-neutral-400 font-medium leading-none mb-1">
                    Seat
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800">
                    14
                  </span>
                </div>
              </div>

              {/* Admit One & Guest Name */}
              <div className="space-y-0.5 pt-0.5">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-8 bg-[#E5C378]/80" />
                  <span className="text-[10px] text-[#C39B4C] font-semibold tracking-widest uppercase">
                    • ADMIT ONE •
                  </span>
                  <span className="h-[1px] w-8 bg-[#E5C378]/80" />
                </div>
                <p className="text-[10px] font-bold text-neutral-600 tracking-wider">
                  VIP
                </p>
                <p className="text-xs sm:text-sm font-bold text-neutral-900 font-serif">
                  {guestName}
                </p>
              </div>
            </div>

            {/* Right Ticket Stub (QR Code & Scan - 40% width) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center md:border-l md:border-dashed md:border-[#E5C378] md:pl-6 pt-3 md:pt-0">
              {/* Decorative Corner Brackets Frame around QR */}
              <div className="relative p-3 bg-white border border-[#E5C378]/80 rounded-xl shadow-2xs">
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
              <p className="text-[9px] tracking-widest text-neutral-600 font-semibold text-center mt-3 uppercase font-work-sans">
                PRESENT THIS TICKET FOR ENTRY
              </p>

              <div className="w-12 h-[1px] bg-[#E5C378]/60 my-2" />

              {/* InviteOly Branding with ticketIcon.png */}
              <div className="flex items-center justify-center gap-1.5">
                <Image
                  src="/ticketIcon.png"
                  alt="InviteOly"
                  width={20}
                  height={20}
                  className="rounded-full shrink-0"
                />
                <span className="font-bold text-sm font-space-grotesk text-neutral-900 tracking-tight">
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

