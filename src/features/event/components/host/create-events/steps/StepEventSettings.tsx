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
      venueState: savedSettings?.venueState || "",
      city: savedSettings?.city || "",
      postalCode: savedSettings?.postalCode || "",
      venueContact: savedSettings?.venueContact || "",
      venueGuestCapacity: savedSettings?.venueGuestCapacity || "",
      estimateGuestCount: savedSettings?.estimateGuestCount || "",
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
    }
  }, [savedSettings, setValue]);

  const onSubmit = (data: TCreateEventSettingsSchema) => {
    dispatch(setEventSettings(data));
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
              Room <span className="text-red-500">*</span>
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

        {/* Venue State & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Venue State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Banasree,Dhaka,Bangladesh"
              {...register("venueState")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.venueState
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.venueState && (
              <p className="text-xs text-red-500 mt-1">
                {errors.venueState.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Banasree,Dhaka,Bangladesh"
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
        </div>

        {/* Postal Code & Venue Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Banasree,Dhaka,Bangladesh"
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

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Venue Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+015487456489"
              {...register("venueContact")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.venueContact
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.venueContact && (
              <p className="text-xs text-red-500 mt-1">
                {errors.venueContact.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Attendance and Capacity */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          Attendance and Capacity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Venue Guest Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g,500"
              {...register("venueGuestCapacity")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.venueGuestCapacity
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.venueGuestCapacity && (
              <p className="text-xs text-red-500 mt-1">
                {errors.venueGuestCapacity.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Estimate Guest Count <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g,400"
              {...register("estimateGuestCount")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.estimateGuestCount
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.estimateGuestCount && (
              <p className="text-xs text-red-500 mt-1">
                {errors.estimateGuestCount.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Ticket Note */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          Ticket Note
        </h2>

        <div>
          <textarea
            rows={5}
            placeholder="Lorem ipsum dolor sit amet consectetur. Purus sem egestas suspendisse sit tristique libero massa imperdiet laoreet. Nunc iaculis pharetra enim integer feugiat. Arcu lectus consectetur vitae etiam urna urna congue ut metus. Orci montes mus a magnis lobortis quis faucibus eget. Morbi faucibus pulvinar tristique quis lectus. Sem nisi mauris tristique mauris lorem. Ut adipiscing viverra varius justo sit."
            {...register("ticketNote")}
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
