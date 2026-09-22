"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setEventDetails,
  setCurrentStep,
} from "@/features/event/store/createEvent.slice";
import {
  createEventDetailsSchema,
  TCreateEventDetailsSchema,
} from "@/features/event/event.schema";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  "Wedding",
  "Birthday Celebration",
  "Anniversary Party",
  "Corporate Gala",
  "Private Reception",
  "Networking Soiree",
  "Product Launch",
  "Charity Fundraiser",
  "Conference",
  "Other Luxury Event",
];

const ID_REQUIREMENTS = [
  "Not Required",
  "Government ID Required",
  "18+ Photo ID Required",
  "21+ Photo ID Required",
];

const DRESS_CODES = [
  "Black Tie / Formal",
  "White Tie",
  "Cocktail Attire",
  "Smart Casual",
  "Semi-Formal",
  "Traditional Luxury Attire",
  "Casual Chic",
  "No Specific Dress Code",
];

export const StepEventDetails: React.FC = () => {
  const dispatch = useDispatch();
  const savedDetails = useSelector(
    (state: RootState) => state.createEvent.eventDetails
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TCreateEventDetailsSchema>({
    resolver: zodResolver(createEventDetailsSchema),
    mode: "onChange",
    defaultValues: {
      hostName: savedDetails?.hostName || "",
      email: savedDetails?.email || "",
      phone: savedDetails?.phone || "",
      eventName: savedDetails?.eventName || "",
      eventType: savedDetails?.eventType || "",
      eventDate: savedDetails?.eventDate || "",
      endDate: savedDetails?.endDate || "",
      startTime: savedDetails?.startTime || "",
      endTime: savedDetails?.endTime || "",
      ageRestriction: savedDetails?.ageRestriction || "",
      idRequirement: savedDetails?.idRequirement || "",
      dressCode: savedDetails?.dressCode || "",
      ticketRequirementAge: savedDetails?.ticketRequirementAge || "",
    },
  });

  const eventDate = watch("eventDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const ticketRequirementAge = watch("ticketRequirementAge");

  // Re-validate endDate whenever eventDate changes
  useEffect(() => {
    if (endDate) {
      trigger("endDate");
    }
  }, [eventDate, endDate, trigger]);

  // Re-validate endTime whenever startTime, eventDate, or endDate changes
  useEffect(() => {
    if (endTime) {
      trigger("endTime");
    }
  }, [startTime, eventDate, endDate, endTime, trigger]);

  // Re-sync with Redux when mounted if savedDetails change
  useEffect(() => {
    if (savedDetails) {
      Object.entries(savedDetails).forEach(([key, val]) => {
        if (val) {
          setValue(key as keyof TCreateEventDetailsSchema, val);
        }
      });
    }
  }, [savedDetails, setValue]);

  const onSubmit = (data: TCreateEventDetailsSchema) => {
    dispatch(setEventDetails(data));
    dispatch(setCurrentStep(3));
  };

  const handleCancel = () => {
    dispatch(setCurrentStep(1));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto space-y-8 font-work-sans py-2"
    >
      {/* Section 1: New Event / Host Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          Host’s Information
        </h2>

        {/* Host or Client Name */}
        <div>
          <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("hostName")}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
              errors.hostName
                ? "border-red-400 focus:ring-red-200"
                : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
            )}
          />
          {errors.hostName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.hostName.message}
            </p>
          )}
        </div>

        {/* Email Address & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+1XXXXXXXX-XXXX"
              {...register("phone")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.phone
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Basic Event Information */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold font-space-grotesk text-neutral-900">
          Basic Event Information
        </h2>

        {/* Event Name */}
        <div>
          <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("eventName")}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
              errors.eventName
                ? "border-red-400 focus:ring-red-200"
                : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
            )}
          />
          {errors.eventName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.eventName.message}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
            Event Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("eventType")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer",
                errors.eventType
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            >
              <option value="">Select</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          </div>
          {errors.eventType && (
            <p className="text-xs text-red-500 mt-1">
              {errors.eventType.message}
            </p>
          )}
        </div>

        {/* Event Date & End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Event Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                {...register("eventDate")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                  errors.eventDate
                    ? "border-red-400 focus:ring-red-200"
                    : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
                )}
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
            {errors.eventDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                min={eventDate || undefined}
                {...register("endDate")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                  errors.endDate
                    ? "border-red-400 focus:ring-red-200"
                    : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
                )}
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
            {errors.endDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Start Time & End Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              placeholder="--:-- --"
              {...register("startTime")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.startTime
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.startTime && (
              <p className="text-xs text-red-500 mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              placeholder="--:-- --"
              min={
                eventDate && endDate && eventDate === endDate && startTime
                  ? startTime
                  : undefined
              }
              {...register("endTime")}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
                errors.endTime
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-200 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C]"
              )}
            />
            {errors.endTime && (
              <p className="text-xs text-red-500 mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Age Restriction & ID Requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Age Requirement
            </label>
            <input
              type="text"
              placeholder="All Ages / 18+ / 21+ / Custom Age"
              {...register("ageRestriction")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              ID Requirement
            </label>
            <div className="relative">
              <select
                {...register("idRequirement")}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all cursor-pointer"
              >
                <option value="">Select</option>
                {ID_REQUIREMENTS.map((idReq) => (
                  <option key={idReq} value={idReq}>
                    {idReq}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dress Code & Ticket Requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Dress Code
            </label>
            <div className="relative">
              <select
                {...register("dressCode")}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all cursor-pointer"
              >
                <option value="">Select</option>
                {DRESS_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] font-medium text-neutral-700 mb-1.5">
              Ticket Age Exception{" "}
              <span className="text-neutral-400 font-normal">
                (Children Under{" "}
                {ticketRequirementAge && ticketRequirementAge.toString().trim() !== ""
                  ? ticketRequirementAge.toString().trim()
                  : "[Age]"}{" "}
                Do Not Require a Ticket)
              </span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="5"
              {...register("ticketRequirementAge")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Controls matching media_1789290331573.png */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Back
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

export default StepEventDetails;
