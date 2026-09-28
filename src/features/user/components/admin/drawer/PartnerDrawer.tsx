"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { IAdminPartnerDetails } from "@/features/user/user.interface";
import { InvitePartnerForm } from "./InvitePartnerForm";
import { PartnerDetailsView } from "./PartnerDetailsView";

interface PartnerDrawerProps {
  isOpen: boolean;
  mode: "invite" | "details";
  partner?: IAdminPartnerDetails | null;
  onClose: () => void;
  onPartnerUpdated?: (updated: Partial<IAdminPartnerDetails>) => void;
}

export const PartnerDrawer: React.FC<PartnerDrawerProps> = ({
  isOpen,
  mode,
  partner,
  onClose,
  onPartnerUpdated,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Panel from Right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className={cn(
            "w-screen max-w-xl bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col h-full"
          )}
        >
          {mode === "details" && partner ? (
            <PartnerDetailsView
              partner={partner}
              onClose={onClose}
              onPartnerUpdated={onPartnerUpdated}
            />
          ) : (
            <InvitePartnerForm onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDrawer;
