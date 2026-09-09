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
                "flex flex-col h-full font-work-sans bg-white",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-neutral-100">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span
                            className={cn(
                                "text-[11px] font-medium px-2.5 py-0.5 rounded-full",
                                material.status === "Published"
                                    ? "bg-[#EAF7EE] text-[#16A34A]"
                                    : "bg-[#FEF3C7] text-[#D97706]"
                            )}
                        >
                            {material.status}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                            {material.type}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        {material.title}
                    </h2>
                    <p className="text-xs text-neutral-500 font-work-sans mt-0.5">
                        {material.fileName} · {material.fileSize}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                    <X className="size-5" />
                </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Visual Preview */}
                {material.imageUrl && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-200 shadow-2xs">
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
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2.5">
                        <Users className="size-4 text-[#C39B4C]" />
                        <div>
                            <p className="text-[11px] text-neutral-400">Target Audience</p>
                            <p className="text-xs font-semibold text-neutral-800">
                                {material.audience}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Calendar className="size-4 text-[#C39B4C]" />
                        <div>
                            <p className="text-[11px] text-neutral-400">Last Updated</p>
                            <p className="text-xs font-semibold text-neutral-800">
                                {material.updatedDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Tag className="size-4 text-[#C39B4C]" />
                        <div>
                            <p className="text-[11px] text-neutral-400">Resource Category</p>
                            <p className="text-xs font-semibold text-neutral-800">
                                {material.type}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <FileText className="size-4 text-[#C39B4C]" />
                        <div>
                            <p className="text-[11px] text-neutral-400">File Size</p>
                            <p className="text-xs font-semibold text-neutral-800">
                                {material.fileSize}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h4 className="text-xs font-semibold text-neutral-900 font-space-grotesk mb-1.5">
                        Description
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-work-sans">
                        {material.description || "No description provided for this resource."}
                    </p>
                </div>

                {/* Download File Card */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-amber-50 flex items-center justify-center text-[#C39B4C]">
                            <FileText className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-semibold text-neutral-800">
                                {material.fileName}
                            </p>
                            <p className="text-[11px] text-neutral-400">{material.fileSize}</p>
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
            <div className="p-6 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[#FF4D4F] hover:bg-[#FFEBEB] text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                </button>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
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