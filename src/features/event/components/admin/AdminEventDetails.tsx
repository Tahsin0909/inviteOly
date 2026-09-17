"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  getAdminEventDetailsById,
  staticAdminEventDetails,
} from "../../data/adminEvent.data";
import { useGetAdminEventByIdQuery } from "../../event.api";
import { IAdminEventDetails, IAdminEventGuest } from "../../event.interface";

interface AdminEventDetailsProps {
  eventId: string;
  className?: string;
}

// Reusable Read-only Input Field Component
interface ReadOnlyFieldProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  label,
  value,
  icon,
  className,
}) => (
  <div className={cn("space-y-1.5", className)}>
    <label className="text-xs sm:text-[13px] font-medium text-neutral-800 font-work-sans block">
      {label}
    </label>
    <div className="relative flex items-center justify-between w-full min-h-[46px] sm:min-h-[48px] px-4 rounded-xl bg-[#FBFBFA] border border-neutral-200/70 text-xs sm:text-sm text-neutral-700 font-work-sans">
      <span className="truncate">{value || "---"}</span>
      {icon && <div className="text-neutral-400 shrink-0 ml-2">{icon}</div>}
    </div>
  </div>
);

export const AdminEventDetails: React.FC<AdminEventDetailsProps> = ({
  eventId,
  className,
}) => {
  const { data: apiData } = useGetAdminEventByIdQuery(eventId);
  const event: IAdminEventDetails =
    apiData?.data || getAdminEventDetailsById(eventId) || staticAdminEventDetails;

  const isPremium = event.tier === "Premium";

  return (
    <div className={cn("w-full space-y-8 pb-12", className)}>
      {/* Top Navigation Bar: Back Link & Tier Badge */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors font-work-sans group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Events</span>
        </Link>

        {/* Tier Badge */}
        <span
          className={cn(
            "px-3.5 py-1 rounded-full text-xs font-medium",
            isPremium
              ? "bg-[#FEF7EC] text-[#B89047]"
              : "bg-[#EBF5FF] text-[#2563EB]"
          )}
        >
          {event.tier}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Section 1: Host or Client Information */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
            Host or Client Information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Host or Client Name"
                value={event.hostName}
              />
              <ReadOnlyField
                label="Host Type"
                value={event.hostType}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Email Address"
                value={event.email}
              />
              <ReadOnlyField
                label="Phone Number"
                value={event.phone}
              />
            </div>

            <ReadOnlyField
              label="Company Name"
              value={event.companyName}
            />
          </div>
        </div>

        {/* Section 2: Basic Event Information */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
            Basic Event Information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Event Name"
                value={event.eventName}
              />
              <ReadOnlyField
                label="Event Type"
                value={event.eventType}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-neutral-800 font-work-sans block">
                Event Description
              </label>
              <div className="w-full min-h-[100px] p-4 rounded-xl bg-[#FBFBFA] border border-neutral-200/70 text-xs sm:text-sm text-neutral-600 font-work-sans leading-relaxed">
                {event.eventDescription}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Event Date and Time */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
            Event Date and Time
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Event Date"
                value={event.eventDate}
                icon={<Calendar className="size-4 text-neutral-400" />}
              />
              <ReadOnlyField
                label="End Date"
                value={event.endDate}
                icon={<Calendar className="size-4 text-neutral-400" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Start Time"
                value={event.startTime}
              />
              <ReadOnlyField
                label="End Time"
                value={event.endTime}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Venue and Location */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
            Venue and Location
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Venue"
                value={event.venue}
              />
              <ReadOnlyField
                label="Room"
                value={event.room}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Venue State"
                value={event.venueState}
              />
              <ReadOnlyField
                label="City"
                value={event.city}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ReadOnlyField
                label="Postal Code"
                value={event.postalCode}
              />
              <ReadOnlyField
                label="Venue Contact"
                value={event.venueContact}
              />
            </div>
          </div>
        </div>

        {/* Section 5: Attendance and Capacity */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900">
            Attendance and Capacity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ReadOnlyField
              label="Venue Guest Capacity"
              value={event.venueGuestCapacity}
            />
            <ReadOnlyField
              label="Estimate Guest Count"
              value={event.estimateGuestCount}
            />
          </div>
        </div>

        {/* Section 6: Guest List Table */}
        <div className="mt-8 border border-neutral-200/80 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-white">
                  <th className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                    Guest Name
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                    Email
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                    Ticket Type
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans text-right sm:text-left">
                    Seat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {event.guests.map((guest: IAdminEventGuest) => (
                  <tr
                    key={guest.id}
                    className="hover:bg-neutral-50/60 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-medium text-neutral-900 font-work-sans whitespace-nowrap">
                      {guest.name}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-neutral-600 font-work-sans whitespace-nowrap">
                      {guest.email}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-neutral-700 font-work-sans whitespace-nowrap">
                      {guest.ticketType}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-neutral-700 font-work-sans whitespace-nowrap text-right sm:text-left">
                      {guest.seat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetails;

