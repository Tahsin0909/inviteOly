"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerDangerZoneProps {
  onDeleteAccount?: () => void;
  className?: string;
}

export const PartnerDangerZone: React.FC<PartnerDangerZoneProps> = ({
  onDeleteAccount,
  className,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      onDeleteAccount?.();
    }, 600);
  };

  return (
    <>
      <div
        className={cn(
          "bg-white rounded-xl sm:rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 tracking-tight">
              Danger Zone
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5 max-w-lg">
              Permanently remove your account and all associated data. This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FFEBEB] hover:bg-[#FEDDDD] text-[#FF4D4F] text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-center"
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Account Deletion */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-space-grotesk text-neutral-900">
                  Delete Partner Account
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-work-sans">
                  Are you sure you want to permanently delete your account? All your event data,
                  attendee information, and business records will be removed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-[#FF4D4F] hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerDangerZone;

