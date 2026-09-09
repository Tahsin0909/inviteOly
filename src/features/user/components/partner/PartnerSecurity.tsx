"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PartnerSecurityProps {
  onUpdatePassword?: (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  className?: string;
}

export const PartnerSecurity: React.FC<PartnerSecurityProps> = ({
  onUpdatePassword,
  className,
}) => {
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordState.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!passwordState.newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (passwordState.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      onUpdatePassword?.(passwordState);
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully");
    }, 400);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7",
        className
      )}
    >
      <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 pb-3 border-b border-neutral-100 mb-4 tracking-tight">
        Security
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password - Full Width */}
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
            Current password
          </label>
          <div className="flex items-center bg-white border border-neutral-200 focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
            <input
              type={showCurrentPass ? "text" : "password"}
              value={passwordState.currentPassword}
              onChange={(e) =>
                setPasswordState((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
              placeholder="*********"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="text-neutral-400 hover:text-neutral-600 ml-2 focus:outline-none cursor-pointer"
            >
              {showCurrentPass ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password & Confirm Password Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          {/* New Password */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              New password
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
              <input
                type={showNewPass ? "text" : "password"}
                value={passwordState.newPassword}
                onChange={(e) =>
                  setPasswordState((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="text-neutral-400 hover:text-neutral-600 ml-2 focus:outline-none cursor-pointer"
              >
                {showNewPass ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5 font-work-sans">
              Confirm password
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-[#C39B4C] focus-within:ring-1 focus-within:ring-[#C39B4C] rounded-lg px-3.5 py-2.5 transition-colors">
              <input
                type={showConfirmPass ? "text" : "password"}
                value={passwordState.confirmPassword}
                onChange={(e) =>
                  setPasswordState((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="bg-transparent w-full text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-work-sans"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-neutral-400 hover:text-neutral-600 ml-2 focus:outline-none cursor-pointer"
              >
                {showConfirmPass ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Update Password Button (Bottom-Right aligned) */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-70"
          >
            {isUpdating ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerSecurity;

