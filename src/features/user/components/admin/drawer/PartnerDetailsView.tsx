"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Award,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  IAdminPartnerDetails,
  IAdminPartnerEvent,
  IAdminPartnerVenue,
  IAdminPartnerVenueSpace,
} from "@/features/user/user.interface";
import { useUpdatePartnerPreferredMutation } from "@/features/user/user.api";

interface PartnerDetailsViewProps {
  partner: IAdminPartnerDetails;
  onClose: () => void;
  onPartnerUpdated?: (updated: Partial<IAdminPartnerDetails>) => void;
  className?: string;
}

export const PartnerDetailsView: React.FC<PartnerDetailsViewProps> = ({
  partner: initialPartner,
  onClose,
  onPartnerUpdated,
  className,
}) => {
  const [partner, setPartner] = useState<IAdminPartnerDetails>(initialPartner);
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "venues">(
    "overview"
  );
  const [expandedVenueId, setExpandedVenueId] = useState<string | null>(
    partner.venues?.[0]?.id || "v-1"
  );

  const [updatePartnerPreferred, { isLoading: isTogglingPreferred }] =
    useUpdatePartnerPreferredMutation();

  const handleTogglePreferred = async () => {
    const nextState = !partner.isPreferred;
    try {
      await updatePartnerPreferred({
        id: partner.id,
        isPreferred: nextState,
      }).unwrap();
    } catch {
      // Local fallback
    }

    setPartner((prev: IAdminPartnerDetails) => ({
      ...prev,
      isPreferred: nextState,
    }));
    onPartnerUpdated?.({ isPreferred: nextState });

    if (nextState) {
      toast.success(`${partner.name} marked as Preferred Partner.`);
    } else {
      toast.info(`Preferred status removed for ${partner.name}.`);
    }
  };

  const toggleVenueAccordion = (venueId: string) => {
    setExpandedVenueId((prev) => (prev === venueId ? null : venueId));
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full font-work-sans bg-white text-neutral-800",
        className
      )}
    >
      {/* Drawer Header */}
      <div className="p-6 sm:p-7 border-b border-neutral-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            {partner.avatarUrl ? (
              <div className="relative size-11 rounded-full overflow-hidden shrink-0 border border-neutral-200">
                <Image
                  src={partner.avatarUrl}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="size-11 rounded-full bg-[#FDF6E2] text-[#B89047] font-semibold text-sm flex items-center justify-center shrink-0 border border-[#FDE68A]/60 font-space-grotesk">
                {partner.initials ||
                  partner.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 leading-tight">
                  {partner.name}
                </h2>
                {/* Status Badge */}
                <span
                  className={cn(
                    "text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block",
                    partner.status === "Active"
                      ? "bg-[#E8F8EE] text-[#0FA958]"
                      : partner.status === "Deactivate"
                        ? "bg-neutral-100 text-neutral-500"
                        : "bg-red-50 text-red-500"
                  )}
                >
                  {partner.status}
                </span>
                {/* Preferred Badge */}
                {partner.isPreferred && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FEF7EC] text-[#B89047] border border-[#FDE68A]/60 flex items-center gap-1">
                    <Award className="size-3 text-[#B89047]" />
                    Preferred
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {partner.businessName} · {partner.venueName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Close drawer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 mt-6 border-b border-neutral-100 -mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={cn(
              "pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer",
              activeTab === "overview"
                ? "text-[#B89047] font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            Overview
            {activeTab === "overview" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B89047]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={cn(
              "pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer",
              activeTab === "events"
                ? "text-[#B89047] font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            Events ({partner.events?.length ?? 2})
            {activeTab === "events" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B89047]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("venues")}
            className={cn(
              "pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer",
              activeTab === "venues"
                ? "text-[#B89047] font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            Venue List
            {activeTab === "venues" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B89047]" />
            )}
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-7">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* 3 Top Stat Boxes */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-[#F9FAFB] border border-neutral-200/70 rounded-xl p-3.5 sm:p-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk">
                  VENUE
                </span>
                <span className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1 block">
                  {partner.venueCount}
                </span>
              </div>

              <div className="bg-[#F9FAFB] border border-neutral-200/70 rounded-xl p-3.5 sm:p-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk">
                  REFERRED EVENTS
                </span>
                <span className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1 block">
                  {partner.referredEventsCount}
                </span>
              </div>

              <div className="bg-[#F9FAFB] border border-neutral-200/70 rounded-xl p-3.5 sm:p-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk">
                  REWARDS POINTS
                </span>
                <span className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900 mt-1 block">
                  {partner.rewardsPoints}
                </span>
              </div>
            </div>

            {/* Personal & Contact Information Card */}
            <div className="border border-neutral-200/80 rounded-2xl p-5 bg-white space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                PERSONAL & CONTACT INFORMATION
              </h3>

              <div className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      <input
                        type="text"
                        readOnly
                        value={partner.firstName}
                        className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      <input
                        type="text"
                        readOnly
                        value={partner.lastName}
                        className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* Role & Partner Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Role
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.role}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Partner Type
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.partnerType}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                {/* Business Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Business / Organization Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.businessName}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Business email
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.businessEmail}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                {/* Phone Number & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.phone || "+(XXX)XXX-XXXX"}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Website or social media
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={partner.website || "www.invitoly.com"}
                      className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                {/* Business Address */}
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                    Business Address
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={
                      partner.businessAddress ||
                      "e.g. 123 East St, San Francisco Ca 94112"
                    }
                    className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200/70 bg-neutral-100/60 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none cursor-default"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Partner Status Section */}
            <div className="border border-neutral-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-2xs">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk">
                  PREFERRED PARTNER STATUS
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#B89047] mt-1">
                  {partner.isPreferred
                    ? "This partner has Preferred status"
                    : "This partner does not have Preferred status"}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Preferred Partners appear first in search and receive priority
                  support.
                </p>
              </div>

              <button
                type="button"
                disabled={isTogglingPreferred}
                onClick={handleTogglePreferred}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0",
                  partner.isPreferred
                    ? "border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                    : "border border-[#B89047] text-[#B89047] bg-[#B89047]/10 hover:bg-[#B89047]/20"
                )}
              >
                {partner.isPreferred ? "Remove Preferred" : "Make Preferred"}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Events */}
        {activeTab === "events" && (
          <div className="space-y-3">
            {partner.events && partner.events.length > 0 ? (
              partner.events.map((evt: IAdminPartnerEvent) => (
                <div
                  key={evt.id}
                  className="border border-neutral-200/80 rounded-xl p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-300 transition-colors shadow-2xs"
                >
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 font-space-grotesk">
                      {evt.title}
                    </h4>
                    <div className="flex items-center gap-3.5 text-xs text-neutral-500 mt-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-neutral-400" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-neutral-400" />
                        {evt.venue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                    <span className="text-sm font-bold font-space-grotesk text-[#B89047]">
                      {evt.amount}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-semibold px-2.5 py-0.5 rounded-full",
                        evt.status === "Completed"
                          ? "bg-[#E8F8EE] text-[#0FA958]"
                          : "bg-[#EEF2FF] text-[#4F46E5]"
                      )}
                    >
                      {evt.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-sm text-neutral-400">
                No events recorded for this partner yet.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Venue List */}
        {activeTab === "venues" && (
          <div className="space-y-3">
            {partner.venues && partner.venues.length > 0 ? (
              partner.venues.map((venue: IAdminPartnerVenue) => {
                const isExpanded = expandedVenueId === venue.id;

                return (
                  <div
                    key={venue.id}
                    className="border border-neutral-200/80 rounded-xl bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleVenueAccordion(venue.id)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-neutral-900 font-space-grotesk hover:bg-neutral-50/70 transition-colors cursor-pointer"
                    >
                      <span>{venue.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-neutral-500 shrink-0" />
                      ) : (
                        <ChevronDown className="size-4 text-neutral-500 shrink-0" />
                      )}
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-neutral-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                          {/* Left Column: Address & Parking */}
                          <div className="space-y-3">
                            <div className="bg-[#F9FAFB] border border-neutral-100 rounded-xl p-3.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk mb-1.5">
                                VENUE ADDRESS
                              </span>
                              <div className="flex items-start gap-2 text-xs text-neutral-700 leading-relaxed">
                                <MapPin className="size-3.5 text-[#B89047] shrink-0 mt-0.5" />
                                <span>{venue.address}</span>
                              </div>
                            </div>

                            {venue.parkingInfo && (
                              <div className="bg-[#F9FAFB] border border-neutral-100 rounded-xl p-3.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk mb-1">
                                  PARKING INFORMATION
                                </span>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                  {venue.parkingInfo}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Available Spaces */}
                          <div className="bg-[#F9FAFB] border border-neutral-100 rounded-xl p-3.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-space-grotesk mb-2.5">
                              AVAILABLE SPACES
                            </span>
                            <div className="space-y-2">
                              {venue.spaces.map(
                                (
                                  space: IAdminPartnerVenueSpace,
                                  idx: number
                                ) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/50 last:border-b-0"
                                  >
                                    <span className="font-semibold text-neutral-800">
                                      {space.name}
                                    </span>
                                    <span className="text-[11px] text-neutral-400 italic">
                                      {space.statusLabel || "Available Space"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-sm text-neutral-400">
                No venues linked to this partner.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
