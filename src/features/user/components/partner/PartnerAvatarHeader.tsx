"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PartnerAvatarHeaderProps {
  name: string;
  email: string;
  avatar: string;
  onUploadPhoto?: (file: File) => void;
  onRemovePhoto?: () => void;
  className?: string;
}

export const PartnerAvatarHeader: React.FC<PartnerAvatarHeaderProps> = ({
  name,
  email,
  avatar,
  onUploadPhoto,
  onRemovePhoto,
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
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-7",
        className
      )}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        {/* Avatar with Camera Badge */}
        <div className="relative size-20 sm:size-24 shrink-0 mx-auto sm:mx-0">
          <Image
            src={avatar}
            alt={name}
            width={96}
            height={96}
            unoptimized
            className="size-full rounded-full object-cover border border-neutral-200 bg-neutral-100 shadow-2xs"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Change profile photo"
            className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 bg-white rounded-full p-1.5 shadow-sm border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer text-neutral-700 hover:text-neutral-900"
          >
            <Camera className="size-3.5 sm:size-4" />
          </button>
        </div>

        {/* User Info and Photo Action Buttons */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
              {name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
              {email}
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-[#C39B4C] text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Upload New
            </button>
            <button
              type="button"
              onClick={onRemovePhoto}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-[#FFEBEB] hover:bg-[#FEDDDD] text-[#FF4D4F] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Remove Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerAvatarHeader;

