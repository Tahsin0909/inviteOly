"use client";

import React from "react";
import { CheckCircle2, Gem } from "lucide-react";
import { ICreateEventPackageState } from "@/features/event/event.interface";

interface PackageIncludesListProps {
  packageSelection?: ICreateEventPackageState;
}

// 18 feature items matching media_1789291217781.png
export const PREMIUM_FEATURES = [
  {
    title: "Personalized QR-Code Tickets",
    description:
      "Each Guest Receives A Secure Digital Ticket Displaying Their Name And Ticket Type.",
  },
  {
    title: "Everything Included In Standard",
    description:
      "Get All Standard Ticketing, Dashboard, Check-In, And Guest Management Features.",
  },
  {
    title: "Premium Host Dashboard Access",
    description:
      "Manage Personalized Tickets, Guests, RSVP Responses, And Ticket Activity From One Convenient Dashboard. Direct Bookings Include Scanner App Access For The Host, While Partner Bookings Provide Scanner App Access To The Partner Instead.",
  },
  {
    title: "Edit Guest & Ticket Details Before Sending",
    description:
      "Update The Guest Name, Ticket Type, And Other Available Ticket Details Before The Ticket Is Finalized.",
  },
  {
    title: "Copy & Send Tickets",
    description:
      "Easily Copy An Individual Ticket Link And Send It Directly To Your Guest Or Automatically Send The Ticket To Them By Email.",
  },
  {
    title: "Lock & Finalize Tickets",
    description:
      "Finalize Tickets When They're Ready To Send And Prevent Further Edits.",
  },
  {
    title: "Ticket Status Tracking",
    description: "See Which Tickets Are Editable, Ready, Or Already Sent.",
  },
  {
    title: "RSVP Management",
    description: "Track Guest Responses Directly From Your Dashboard.",
  },
  {
    title: "Confirm & Unlock Ticket RSVP",
    description:
      "Guests Must Accept Their Invitation To Unlock And Access Their Personalized Ticket.",
  },
  {
    title: "Declined & Expired Ticket Control",
    description:
      "Declined Invitations And Tickets That Pass The RSVP Deadline Can Be Automatically Voided.",
  },
  {
    title: "Void Tickets",
    description: "Disable A Ticket When It Is No Longer Needed.",
  },
  {
    title: "Guest List Management",
    description:
      "Add Guests Manually Or Upload Guest Information Using A CSV File.",
  },
  {
    title: "Table & Seat Details",
    description:
      "Add Optional Table Or Seat Information To Personalized Guest Tickets.",
  },
  {
    title: "Live Guest Check-In",
    description: "See Guests Being Checked In At Your Event In Real Time.",
  },
  {
    title: "Scanner App Access",
    description:
      "View Your Event's Scanner Login Code Directly From Your Dashboard For Authorized Event Staff.",
  },
  {
    title: "Downloadable Guest List",
    description: "Download A PDF Copy Of Your Guest List When Needed.",
  },
  {
    title: "Event Notes On Tickets",
    description:
      "Add An Optional Note To Tickets, Such As Parking Information, Dress Code, Or A Welcome Message.",
  },
  {
    title: "Dedicated Customer Support",
    description: "Get Assistance When You Need Help Managing Your Event.",
  },
];

export const PackageIncludesList: React.FC<PackageIncludesListProps> = ({
  packageSelection,
}) => {
  const isStandard = packageSelection?.tier === "standard";
  const title = isStandard
    ? "Standard Package Includes"
    : "Premium Package Includes";

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#C39B4C] text-white px-5 py-4 flex items-center gap-2.5">
        <Gem className="size-5 text-white shrink-0" />
        <h3 className="font-semibold font-space-grotesk text-sm sm:text-base tracking-tight">
          {title}
        </h3>
      </div>

      {/* 18 Feature Items */}
      <div className="p-5 sm:p-6 space-y-4 max-h-[960px] overflow-y-auto custom-scrollbar">
        {PREMIUM_FEATURES.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-left">
            <CheckCircle2 className="size-4 sm:size-4.5 text-neutral-800 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
              <strong className="font-semibold text-neutral-900">
                {feat.title}
              </strong>{" "}
              - {feat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageIncludesList;

