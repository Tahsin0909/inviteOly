import React, { Suspense } from "react";
import { Metadata } from "next";
import CreateEvents from "@/features/event/components/host/create-events/CreateEvents";

export const metadata: Metadata = {
  title: "Create Event - InviteOnly",
  description: "Create and configure your next luxury event",
};

export default function CreateEventPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="size-8 rounded-full border-2 border-[#C39B4C]/20 border-t-[#C39B4C] animate-spin" />
        </div>
      }
    >
      <CreateEvents />
    </Suspense>
  );
}