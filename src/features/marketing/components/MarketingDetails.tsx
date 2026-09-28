"use client";

import React from "react";
import Image from "next/image";
import { X, Download, Edit3, Trash2, FileText, Calendar, Users, Tag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IMarketing } from "../marketing.interface";

interface MarketingDetailsProps {
    material: IMarketing;
    onClose: () => void;
    onEdit: (material: IMarketing) => void;
    onDelete: (id: string) => void;
    className?: string;
}

export const MarketingDetails: React.FC<MarketingDetailsProps> = ({
    material,
    onClose,
    onEdit,
    onDelete,
    className,
}) => {
    const handleDownload = () => {
        toast.success(`Downloading ${material.fileName}...`);
    };

    const handleDelete = () => {
        onDelete(material.id);
        toast.success("Marketing material deleted");
        onClose();
    };

    return (
        <div
            className={cn(
                "flex flex-col h-full font-work-sans bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span
                            className={cn(
                                "text-[11px] font-medium px-2.5 py-0.5 rounded-full",
                                material.status === "Published"
                                    ? "bg-[#EAF7EE] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400"
                                    : "bg-[#FEF3C7] dark:bg-amber-950/40 text-[#D97706] dark:text-amber-400"
                            )}
                        >
                            {material.status}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {material.type}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                        {material.title}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5">
                        {material.fileName} · {material.fileSize}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                    <X className="size-5" />
                </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Visual Preview */}
                {material.imageUrl && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                        <Image
                            src={material.imageUrl}
                            alt={material.title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Overview Stats / Metadata */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF9F6] dark:bg-neutral-850/60 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                        <Users className="size-4 text-[#C39B4C] dark:text-amber-400" />
                        <div>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Target Audience</p>
                            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                {material.audience}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Calendar className="size-4 text-[#C39B4C] dark:text-amber-400" />
                        <div>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Last Updated</p>
                            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                {material.updatedDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Tag className="size-4 text-[#C39B4C] dark:text-amber-400" />
                        <div>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Resource Category</p>
                            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                {material.type}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <FileText className="size-4 text-[#C39B4C] dark:text-amber-400" />
                        <div>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">File Size</p>
                            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                {material.fileSize}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white font-space-grotesk mb-1.5">
                        Description
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-work-sans">
                        {material.description || "No description provided for this resource."}
                    </p>
                </div>

                {/* Download File Card */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900/80 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-[#C39B4C] dark:text-amber-400">
                            <FileText className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                {material.fileName}
                            </p>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">{material.fileSize}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleDownload}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                        <Download className="size-3.5" />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/60">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[#FF4D4F] dark:text-red-400 hover:bg-[#FFEBEB] dark:hover:bg-red-950/30 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                </button>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => onEdit(material)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                        <Edit3 className="size-3.5" />
                        <span>Edit Material</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketingDetails;