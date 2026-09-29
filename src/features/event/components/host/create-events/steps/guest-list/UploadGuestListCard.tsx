"use client";

import React, { useRef, useState } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface UploadGuestListCardProps {
  selectedTicketType: string;
  onFileUpload: (ticketType: string, guestsCount: number, fileName: string) => void;
}

export const UploadGuestListCard: React.FC<UploadGuestListCardProps> = ({
  selectedTicketType,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastUploaded, setLastUploaded] = useState<{
    fileName: string;
    count: number;
    ticketType: string;
  } | null>(null);

  const processFile = (file: File) => {
    setUploadError(null);

    // Validate ticket type selection
    if (!selectedTicketType) {
      setUploadError("Please select a ticket type in Step 1 before uploading your CSV.");
      return;
    }

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setUploadError("Only .csv files are supported. Please upload a valid CSV file.");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        setUploadError("The uploaded CSV file is empty.");
        return;
      }

      // Count data rows (excluding empty rows and header row)
      const lines = content
        .split(/\r\n|\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const guestCount = Math.max(lines.length > 1 ? lines.length - 1 : 1, 1);

      onFileUpload(selectedTicketType, guestCount, file.name);
      setLastUploaded({
        fileName: file.name,
        count: guestCount,
        ticketType: selectedTicketType,
      });

      // Clear input so same file can be re-selected if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      setUploadError("Failed to read the CSV file. Please try again.");
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 sm:p-6 shadow-2xs font-work-sans">
      {/* Header with Step 2 Badge */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="size-6 sm:size-7 rounded-md bg-[#B89047] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs shrink-0">
          2
        </div>
        <h3 className="text-sm sm:text-base font-semibold font-space-grotesk text-neutral-900 dark:text-white">
          Upload Guest List
        </h3>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4 pl-8 sm:pl-9.5">
        Upload a CSV file containing only guests for the selected ticket type
      </p>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full rounded-xl border border-dashed py-9 sm:py-11 px-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none ${isDragging
          ? "border-[#B89047] bg-[#FFF8E7]/50 dark:bg-[#B89047]/10 scale-[0.99]"
          : "border-neutral-200/90 dark:border-neutral-800 bg-[#FBFBFA] dark:bg-neutral-950/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700"
          }`}
      >
        {/* Upload Icon Badge */}
        <div className="size-10 sm:size-11 rounded-full bg-[#FBF4E8] dark:bg-[#B89047]/10 flex items-center justify-center text-[#B89047] shadow-2xs border border-[#B89047]/15 dark:border-[#B89047]/20 mb-3">
          <Upload className="size-5 stroke-[2.2]" />
        </div>

        <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Drag &amp; drop Guest List file here
        </p>
        <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
          or click to browse
        </p>
        <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          Accepted formats: .csv, (Max 5MB)
        </p>
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="mt-3.5 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 text-xs animate-in fade-in">
          <AlertCircle className="size-4 shrink-0 text-red-500" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Upload Success Feedback */}
      {lastUploaded && !uploadError && (
        <div className="mt-3.5 flex items-center justify-between p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-emerald-900 dark:text-emerald-300 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              Uploaded <strong className="font-semibold">{lastUploaded.fileName}</strong> (
              {lastUploaded.count} {lastUploaded.ticketType} guests added)
            </span>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 rounded">
            Success
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadGuestListCard;

