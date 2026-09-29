"use client";

import { initialVenues } from "@/features/venue/data/venue.data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { IHostInvite } from "../hostandpartner.interface";
import {
  HostInviteFormValues,
  hostInviteSchema,
} from "../hostandpartner.schema";
import {
  addInvite,
  resetInviteFlow,
  setActiveView,
} from "../store/hostandpartner.slice";

export const InviteHostForm: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HostInviteFormValues>({
    resolver: zodResolver(hostInviteSchema),
    defaultValues: {
      hostName: "",
      hostEmail: "",
      hostPhone: "",
      venueId: initialVenues[0]?.id || "",
      room: initialVenues[0]?.spaces[0]?.name || "",
      eventDate: "",
      endDate: "",
      eventName: "",
    },
    mode: "onBlur",
  });

  const selectedVenueId = watch("venueId");
  const selectedVenue =
    initialVenues.find((v) => v.id === selectedVenueId) || initialVenues[0];

  const onFormSubmit = (data: HostInviteFormValues) => {
    const newInvite: IHostInvite = {
      id: `invite-${Date.now()}`,
      eventName:
        data.eventName?.trim() || `${data.hostName.trim()}'s Event`,
      hostName: data.hostName.trim(),
      hostEmail: data.hostEmail.trim(),
      hostPhone: data.hostPhone?.trim() || "",
      venueId: data.venueId,
      venueName: selectedVenue?.name || "The Grand Ballroom",
      room: data.room || selectedVenue?.spaces[0]?.name || "Main Hall",
      eventDate: data.eventDate,
      endDate: data.endDate || data.eventDate,
      eventTime: "7:00 PM - 11:00 PM",
      totalGuest: 200,
      status: "Pending Confirmation",
      packageId: "",
      packageName: "Host Selects Package",
      tierId: "",
      tierLabel: "Host Selects Package",
      packagePrice: "",
      createdAt: new Date().toISOString(),
    };

    dispatch(addInvite(newInvite));
    toast.success(`Invite successfully sent to ${newInvite.hostName}!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-work-sans pb-16">
      {/* Top Navigation */}
      <div>
        <button
          type="button"
          onClick={() => dispatch(setActiveView("list"))}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Invitations</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-neutral-900/80 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-10 shadow-xs">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Invite Host to Create Event
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1">
            Provide the host and event booking details below. The host will receive an invitation to select their package and set up their event.
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-6">
          {/* Host or Client Name */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
              Host or Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("hostName")}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none transition-all bg-white dark:bg-neutral-950 ${errors.hostName
                ? "border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                : "border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                }`}
            />
            {errors.hostName && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">
                {errors.hostName.message}
              </p>
            )}
          </div>

          {/* Email Address & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("hostEmail")}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none transition-all bg-white dark:bg-neutral-950 ${errors.hostEmail
                  ? "border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                  : "border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                  }`}
              />
              {errors.hostEmail && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">
                  {errors.hostEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("hostPhone")}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white dark:bg-neutral-950"
              />
            </div>
          </div>

          {/* Venue & Room Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                Venue <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("venueId")}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white dark:bg-neutral-950 cursor-pointer"
                >
                  <option value="">Select Venue</option>
                  {initialVenues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              </div>
              {errors.venueId && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">
                  {errors.venueId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                Room <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("room")}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white dark:bg-neutral-950 cursor-pointer"
                >
                  <option value="">Select Room</option>
                  {selectedVenue?.spaces.map((s, idx) => (
                    <option key={s.id || idx} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              </div>
              {errors.room && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">
                  {errors.room.message}
                </p>
              )}
            </div>
          </div>

          {/* Event Date */}
          <div className="pt-2">
            <h3 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4">
              Event Date
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("eventDate")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-all bg-white dark:bg-neutral-950 cursor-pointer ${errors.eventDate
                      ? "border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                      : "border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                      }`}
                  />
                  <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                </div>
                {errors.eventDate && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("endDate")}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white dark:bg-neutral-950 cursor-pointer"
                  />
                  <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => dispatch(resetInviteFlow())}
              className="px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              Send Invite to Host
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteHostForm;

