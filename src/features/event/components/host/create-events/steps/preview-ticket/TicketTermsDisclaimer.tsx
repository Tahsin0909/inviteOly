"use client";

import React from "react";

export const TicketTermsDisclaimer: React.FC = () => {
  return (
    <div className="text-center pt-2 space-y-2.5 font-work-sans">
      <div className="flex items-center justify-center gap-2">
        <div className="h-[1px] w-8 bg-[#E5C378]/70 dark:bg-[#E5C378]/40" />
        <span className="text-[#C39B4C] text-xs">✦</span>
        <div className="h-[1px] w-8 bg-[#E5C378]/70 dark:bg-[#E5C378]/40" />
      </div>

      <p className="text-[9px] sm:text-[9.5px] text-neutral-400 dark:text-neutral-500 text-justify leading-relaxed">
        This Ticket Has Been Provided By The Event Host At No Cost To The Ticket
        Holder And Grants One Admission To The Event, Subject To The Date,
        Location, And Entry Conditions Shown Above. The QR Code Is Unique And
        May Be Scanned Only Once. To Protect Your Admission, Do Not Share,
        Forward, Duplicate, Alter, Resell, Or Send An Image Or Screenshot Of This
        Ticket To Anyone. For Safekeeping, Add The Ticket To Apple Wallet Or
        Google Wallet, Or Save A Private Screenshot Of The QR Code On Your
        Device. If The Ticket Is Lost, Event Staff May Be Able To Verify The
        Ticket Holder&apos;s Name On The Guest List Using A Valid
        Government-Issued Photo ID. Entry Without A Valid Ticket Remains
        Subject To Verification And Is Not Guaranteed. Event Details May Be
        Changed By The Organizer When Necessary. InviteOly Provides The
        Ticketing Platform, While The Event Organizer Is Responsible For
        Producing And Operating The Event. By Using This Ticket, The Holder
        Agrees To The Event Terms And Privacy Notice: [Short URL]. Support:
        [Email/URL]
      </p>
    </div>
  );
};

export default TicketTermsDisclaimer;

