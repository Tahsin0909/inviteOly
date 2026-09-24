import React, { Suspense } from "react";
import { Metadata } from "next";
import RefereedCreateEvents from "@/features/event/components/host/refered-create-events/RefereedCreateEvents";

export const metadata: Metadata = {
  title: "Create Event (Referred Host) - InviteOly",
  description: "Create your event as a referred host partner",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="size-8 rounded-full border-2 border-[#C39B4C]/20 border-t-[#C39B4C] animate-spin" />
        </div>
      }
    >
      <RefereedCreateEvents />
    </Suspense>
  );
}