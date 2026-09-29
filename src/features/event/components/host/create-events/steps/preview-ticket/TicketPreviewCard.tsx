"use client";

import React from "react";
import Image from "next/image";
import {
  ICreateEventDetailsForm,
  ICreateEventSettingsForm,
  ICreateEventPackageState,
} from "@/features/event/event.interface";
import { GoldenTicketPass } from "./GoldenTicketPass";
import { WalletBadgesRow } from "./WalletBadgesRow";
import { RsvpDemoCard } from "./RsvpDemoCard";
import { RsvpDeadlineAlert } from "./RsvpDeadlineAlert";
import { EventDetailsPreviewCard } from "./EventDetailsPreviewCard";
import { HostNotePreviewCard } from "./HostNotePreviewCard";
import { SecurityNoticeBar } from "./SecurityNoticeBar";
import { TicketTermsDisclaimer } from "./TicketTermsDisclaimer";

interface TicketPreviewCardProps {
  eventDetails?: ICreateEventDetailsForm;
  eventSettings?: ICreateEventSettingsForm;
  packageSelection?: ICreateEventPackageState;
}

export const TicketPreviewCard: React.FC<TicketPreviewCardProps> = ({
  eventDetails,
  eventSettings,
  packageSelection,
}) => {
  const isPremium = packageSelection?.tier === "premium";

  return (
    <div className="bg-white dark:bg-neutral-900/80 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-5 sm:p-8 space-y-6 font-work-sans">
      {/* 1. Header Branding with ticketIcon.png matching media_1789292285749.png */}
      <div className="text-center space-y-1.5">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/ticketIcon.png"
            alt="InviteOly Logo"
            width={28}
            height={28}
            className="rounded-full shrink-0"
          />
          <span className="font-bold text-2xl font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Invite<span className="text-[#C39B4C]">Oly</span>
          </span>
        </div>

        {/* Ornamental Subtitle */}
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <div className="h-[1px] w-10 sm:w-16 bg-[#E5C378]/70 dark:bg-[#E5C378]/40" />
          <p className="text-[11px] sm:text-xs text-[#C39B4C] tracking-widest font-semibold uppercase font-space-grotesk">
            • Your Invitation Has Arrived •
          </p>
          <div className="h-[1px] w-10 sm:w-16 bg-[#E5C378]/70 dark:bg-[#E5C378]/40" />
        </div>
      </div>

      {/* 2. Luxury Golden Ticket Pass */}
      <GoldenTicketPass
        eventDetails={eventDetails}
        eventSettings={eventSettings}
        isPremium={isPremium}
      />

      {/* 3. 4 Wallet & Status Badges */}
      <WalletBadgesRow />

      {/* 4. RSVP Decision Box & Deadline (Premium only) */}
      {isPremium && (
        <>
          <RsvpDemoCard />
          <RsvpDeadlineAlert />
        </>
      )}

      {/* 5. Event Details Card */}
      <EventDetailsPreviewCard
        eventDetails={eventDetails}
        eventSettings={eventSettings}
      />

      {/* 6. Important Note From Host Card */}
      <HostNotePreviewCard note={eventSettings?.ticketNote} />

      {/* 7. 5-Item Security Notice Bar */}
      <SecurityNoticeBar />

      {/* 8. Legal Terms Disclaimer */}
      <TicketTermsDisclaimer />
    </div>
  );
};

export default TicketPreviewCard;

