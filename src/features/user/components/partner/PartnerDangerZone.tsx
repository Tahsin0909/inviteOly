"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerDangerZoneProps {
  onDeleteAccount?: () => void | Promise<void>;
  isDeleting?: boolean;
  className?: string;
}

export const PartnerDangerZone: React.FC<PartnerDangerZoneProps> = ({
  onDeleteAccount,
  isDeleting: externalIsDeleting = false,
  className,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [localIsDeleting, setLocalIsDeleting] = useState(false);

  const isDeleting = externalIsDeleting || localIsDeleting;

  const handleConfirmDelete = async () => {
    try {
      setLocalIsDeleting(true);
      await onDeleteAccount?.();
      setIsDeleteDialogOpen(false);
    } finally {
      setLocalIsDeleting(false);
    }
  };

  return (
    <>
      <div
        data-testid="partner-danger-zone"
        className={cn(
          "bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7 transition-colors",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
              Danger Zone
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5 max-w-lg">
              Permanently remove your account and all associated data. This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            data-testid="open-delete-modal-btn"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FFEBEB] dark:bg-red-950/40 hover:bg-[#FEDDDD] dark:hover:bg-red-900/40 text-[#FF4D4F] dark:text-red-400 border border-transparent dark:border-red-900/30 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-center"
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Account Deletion */}
      {isDeleteDialogOpen && (
        <div
          data-testid="delete-account-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-space-grotesk text-neutral-900 dark:text-white">
                  Delete Account
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-work-sans">
                  Are you sure you want to permanently delete your account? All your event data,
                  attendee information, and business records will be removed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                disabled={isDeleting}
                data-testid="cancel-delete-btn"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                data-testid="confirm-delete-btn"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-[#FF4D4F] hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
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

