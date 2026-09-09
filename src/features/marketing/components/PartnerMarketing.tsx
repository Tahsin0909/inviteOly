"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { partnerMarketingAssets } from "../data/marketing.data";

interface PartnerMarketingProps {
  className?: string;
}

export const PartnerMarketing: React.FC<PartnerMarketingProps> = ({ className }) => {
  const handleDownload = (title: string, fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  return (
    <div
      className={cn(
        "w-full space-y-6 font-work-sans pb-16",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* 1. Header */}
      {/* ========================================================================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
          Marketing
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
          Manage campaigns, promotions, and marketing activities
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. Marketing Asset Cards Grid */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {partnerMarketingAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-all"
          >
            <div>
              {/* Card Header with Title and Download Icon */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-bold font-space-grotesk text-neutral-900 text-sm sm:text-base">
                  {asset.title}
                </h3>
                <button
                  type="button"
                  onClick={() => handleDownload(asset.title, asset.fileName)}
                  title={`Download ${asset.fileName}`}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <Download className="size-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-work-sans mb-4">
                {asset.description}
              </p>
            </div>

            {/* Asset Preview Image */}
            {asset.imageUrl && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-2xs">
                <Image
                  src={asset.imageUrl}
                  alt={asset.title}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerMarketing;

