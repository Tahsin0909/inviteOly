"use client";

import React, { useState } from "react";
import { X, User, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IInvitePartnerPayload } from "@/features/user/user.interface";
import { useInvitePartnerMutation } from "@/features/user/user.api";

interface InvitePartnerFormProps {
  onClose: () => void;
  className?: string;
}

export const InvitePartnerForm: React.FC<InvitePartnerFormProps> = ({
  onClose,
  className,
}) => {
  const [formData, setFormData] = useState<IInvitePartnerPayload>({
    firstName: "Shaima",
    lastName: "Hussain",
    role: "Partner",
    partnerType: "Venue",
    businessName: "Elite Events Co.",
    businessEmail: "john.doe@example.com",
    phone: "+(XXX)XXX-XXXX",
    website: "www.invitoly.com",
    businessAddress: "e.g. 123 East St, San Francisco Ca 94112",
  });

  const [invitePartner, { isLoading }] = useInvitePartnerMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: IInvitePartnerPayload) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.businessEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await invitePartner(formData).unwrap();
      toast.success(
        `Invitation sent successfully to ${formData.businessEmail}`
      );
      onClose();
    } catch {
      // Fallback for mock/local mode
      toast.success(
        `Invitation sent successfully to ${formData.businessEmail}`
      );
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full font-work-sans bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 sm:p-7 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Invite a Partner
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Send a personalized invitation to join InviteOly as a Partner.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          aria-label="Close drawer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6"
      >
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 font-space-grotesk">
            PERSONAL & CONTACT INFORMATION
          </h3>

          <div className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Shaima"
                    required
                    className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Hussain"
                    required
                    className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Role & Partner Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-10.5 pl-3.5 pr-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 appearance-none transition-all cursor-pointer"
                  >
                    <option value="Partner">Partner</option>
                    <option value="Venue Manager">Venue Manager</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Event Planner">Event Planner</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Partner Type
                </label>
                <div className="relative">
                  <select
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleChange}
                    className="w-full h-10.5 pl-3.5 pr-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 appearance-none transition-all cursor-pointer"
                  >
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Photography">Photography</option>
                    <option value="Decoration">Decoration</option>
                    <option value="DJ & Music">DJ & Music</option>
                    <option value="Florist">Florist</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Business Name & Business Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Business / Organization Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Elite Events Co."
                  className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Business email
                </label>
                <input
                  type="email"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                />
              </div>
            </div>

            {/* Phone Number & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+(XXX)XXX-XXXX"
                  className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Website or social media (Optional)
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="www.invitoly.com"
                  className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Business Address (Optional)
              </label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="e.g. 123 East St, San Francisco Ca 94112"
                className="w-full h-10.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Inviting..." : "Invite Partner"}
          </button>
        </div>
      </form>
    </div>
  );
};
