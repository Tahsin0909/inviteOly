"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PartnerAvatarHeaderProps {
  name: string;
  email: string;
  avatar?: string | null;
  onUploadPhoto?: (file: File) => void;
  onRemovePhoto?: () => void;
  isUploading?: boolean;
  isRemoving?: boolean;
  className?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";

export const PartnerAvatarHeader: React.FC<PartnerAvatarHeaderProps> = ({
  name,
  email,
  avatar,
  onUploadPhoto,
  onRemovePhoto,
  isUploading = false,
  isRemoving = false,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      onUploadPhoto?.(file);
      // Reset input value so same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const displayAvatar = avatar || DEFAULT_AVATAR;

  return (
    <div
      data-testid="partner-avatar-header"
      className={cn(
        "bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7 transition-colors",
        className
      )}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        data-testid="avatar-file-input"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        {/* Avatar with Camera Badge */}
        <div className="relative size-20 sm:size-24 shrink-0 mx-auto sm:mx-0">
          <Image
            src={displayAvatar}
            alt={name || "User Avatar"}
            width={96}
            height={96}
            unoptimized
            data-testid="avatar-image"
            className="size-full rounded-full object-cover border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-2xs"
          />
          <button
            type="button"
            disabled={isUploading || isRemoving}
            onClick={() => fileInputRef.current?.click()}
            title="Change profile photo"
            data-testid="camera-change-photo-btn"
            className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 bg-white dark:bg-neutral-800 rounded-full p-1.5 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white disabled:opacity-50"
          >
            <Camera className="size-3.5 sm:size-4" />
          </button>
        </div>

        {/* User Info and Photo Action Buttons */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h2
              data-testid="profile-name"
              className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight"
            >
              {name}
            </h2>
            <p
              data-testid="profile-email"
              className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5"
            >
              {email}
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
            <button
              type="button"
              disabled={isUploading || isRemoving}
              onClick={() => fileInputRef.current?.click()}
              data-testid="upload-photo-btn"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-[#C39B4C] dark:text-[#D4AF37] text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload New"}
            </button>
            <button
              type="button"
              disabled={isUploading || isRemoving}
              onClick={onRemovePhoto}
              data-testid="remove-photo-btn"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-[#FFEBEB] dark:bg-red-950/40 hover:bg-[#FEDDDD] dark:hover:bg-red-900/40 text-[#FF4D4F] dark:text-red-400 border border-transparent dark:border-red-900/30 text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {isRemoving ? "Removing..." : "Remove Photo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerAvatarHeader;

