"use client";

import React from "react";
import { User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PartnerContactInfoFormData {
  firstName: string;
  lastName: string;
  role: string;
  partnerType: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  website: string;
  businessAddress: string;
}

interface PartnerContactInfoProps {
  data: PartnerContactInfoFormData;
  onChange: (field: keyof PartnerContactInfoFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving?: boolean;
  className?: string;
}

export const PartnerContactInfo: React.FC<PartnerContactInfoProps> = ({
  data,
  onChange,
  onSubmit,
  isSaving = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7 transition-colors",
        className
      )}
    >
      <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white mb-5 tracking-tight">
        Personal &amp; Contact Information
      </h3>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          {/* First Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              First Name
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <UserIcon className="size-4 text-neutral-400 dark:text-neutral-500 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="First name"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Last Name
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <UserIcon className="size-4 text-neutral-400 dark:text-neutral-500 mr-2.5 shrink-0" />
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Role (Read-only) */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Role
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800/60 rounded-lg px-3.5 py-2.5 border border-transparent dark:border-neutral-800 cursor-not-allowed">
              <input
                type="text"
                value={data.role}
                disabled
                readOnly
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 cursor-not-allowed focus:outline-none font-work-sans select-none"
              />
            </div>
          </div>

          {/* Partner Type */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Partner Type
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <input
                type="text"
                value={data.partnerType}
                onChange={(e) => onChange("partnerType", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="e.g. Venue, Catering, Photography"
              />
            </div>
          </div>

          {/* Business / Organization Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Business / Organization Name
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => onChange("businessName", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="Business or organization name"
              />
            </div>
          </div>

          {/* Business Email */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Business email
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <input
                type="email"
                value={data.businessEmail}
                onChange={(e) => onChange("businessEmail", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="business@example.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Phone Number
            </label>
            <div className="flex items-center bg-[#ECECEC] dark:bg-neutral-800 hover:bg-[#E7E7E7] dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-950 focus-within:ring-1 focus-within:ring-[#C39B4C] focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors border border-transparent dark:border-neutral-700/60">
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Website or Social Media (Optional) */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Website or social media (Optional)
            </label>
            <div className="flex items-center bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
              <input
                type="text"
                value={data.website}
                onChange={(e) => onChange("website", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="www.invitoly.com"
              />
            </div>
          </div>

          {/* Business Address (Optional) - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 font-work-sans">
              Business Address (Optional)
            </label>
            <div className="flex items-center bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus-within:border-[#C39B4C] dark:focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
              <input
                type="text"
                value={data.businessAddress}
                onChange={(e) => onChange("businessAddress", e.target.value)}
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-work-sans"
                placeholder="e.g. 123 East St. San Francisco Ca 94112"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button (Bottom-Right aligned) */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerContactInfo;

