"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setEventSettings,
  setCurrentStep,
} from "@/features/event/store/createEvent.slice";
import {
  createEventSettingsSchema,
  TCreateEventSettingsSchema,
} from "@/features/event/event.schema";
import { cn } from "@/lib/utils";

export const StepEventSettings: React.FC = () => {
  const dispatch = useDispatch();
  const savedSettings = useSelector(
    (state: RootState) => state.createEvent.eventSettings
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCreateEventSettingsSchema>({
    resolver: zodResolver(createEventSettingsSchema),
    defaultValues: {
      venue: savedSettings?.venue || "",
      room: savedSettings?.room || "",
      address: savedSettings?.address || "",
      state: savedSettings?.state || savedSettings?.venueState || "",
      city: savedSettings?.city || "",
      postalCode: savedSettings?.postalCode || "",
      ticketNote: savedSettings?.ticketNote || "",
    },
  });

  // Re-sync with Redux when mounted if savedSettings change
  useEffect(() => {
    if (savedSettings) {
      Object.entries(savedSettings).forEach(([key, val]) => {
        if (val) {
          setValue(key as keyof TCreateEventSettingsSchema, val);
        }
      });
      if (!savedSettings.state && savedSettings.venueState) {
        setValue("state", savedSettings.venueState);
      }
    }
  }, [savedSettings, setValue]);

  const onSubmit = (data: TCreateEventSettingsSchema) => {
    dispatch(
      setEventSettings({
        ...data,
        venueState: data.state,
      })
    );
    // Advance to Step 4 (Preview Ticket)
    dispatch(setCurrentStep(4));
  };

  const handleCancel = () => {
    dispatch(setCurrentStep(2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto space-y-8 font-work-sans py-2"
    >
      {/* Section 1: Venue and Location */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          Venue and Location
        </h2>

        {/* Venue & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Dhaka"
              {...register("venue")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.venue
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.venue && (
              <p className="text-xs text-red-500 mt-1">
                {errors.venue.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Room
            </label>
            <input
              type="text"
              placeholder="Hall DU"
              {...register("room")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.room
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.room && (
              <p className="text-xs text-red-500 mt-1">
                {errors.room.message}
              </p>
            )}
          </div>
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
            Full Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 123 Main Street, Suite 100"
            {...register("address")}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
              errors.address
                ? "border-red-400 focus:ring-red-200"
                : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
            )}
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City, State & Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Dhaka"
              {...register("city")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.city
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Dhaka Division"
              {...register("state")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.state
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="1219"
              {...register("postalCode")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.postalCode
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.postalCode && (
              <p className="text-xs text-red-500 mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Ticket Note */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          NOTE FROM HOST
        </h2>

        <div>
          <textarea
            rows={5}
            {...register("ticketNote")}
            placeholder="Write a personalized note for guests to display on their tickets, such as a welcome message or special instructions"
            className="w-full p-4 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Bottom Action Controls matching media_1789290340150.png */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-7 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#b08b3e] text-white text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default StepEventSettings;
