"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    IMarketing,
    TMarketingAudience,
    TMarketingType,
} from "../../marketing.interface";

interface CreateMarketingProps {
    initialData?: IMarketing | null;
    onClose: () => void;
    onSubmit: (material: IMarketing) => void;
    className?: string;
}

export const CreateMarketing: React.FC<CreateMarketingProps> = ({
    initialData,
    onClose,
    onSubmit,
    className,
}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [type, setType] = useState<TMarketingType | string>(
        initialData?.type || "Brochure"
    );
    const [audience, setAudience] = useState<TMarketingAudience>(
        initialData?.audience || "Partner"
    );
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState(
        initialData?.fileName || ""
    );
    const [fileSize, setFileSize] = useState(
        initialData?.fileSize || ""
    );

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setType(initialData.type);
            setAudience(initialData.audience);
            setDescription(initialData.description);
            setFileName(initialData.fileName);
            setFileSize(initialData.fileSize);
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setFileName(selected.name);
            const sizeInMB = (selected.size / (1024 * 1024)).toFixed(1);
            setFileSize(`${sizeInMB} MB`);
            toast.success(`File "${selected.name}" selected`);
        }
    };

    const handleSave = (status: "Published" | "Draft") => {
        if (!title.trim()) {
            toast.error("Please provide a material title");
            return;
        }

        const newMaterial: IMarketing = {
            id: initialData?.id || `mkt-${Date.now()}`,
            title: title.trim(),
            fileName: fileName || `${title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
            fileSize: fileSize || "2.4 MB",
            fileType: file?.type || "application/pdf",
            type,
            audience,
            status,
            updatedDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            description: description.trim(),
            imageUrl:
                initialData?.imageUrl ||
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        };

        onSubmit(newMaterial);
        toast.success(
            status === "Published"
                ? "Marketing material published successfully"
                : "Marketing material saved as draft"
        );
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
                    <h2 className="text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        {initialData ? "Edit Marketing Material" : "Create Marketing Material"}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-0.5">
                        Upload and publish a new resource for Partners or Hosts.
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

            {/* Form Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* File Upload Area */}
                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-work-sans">
                        File
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.zip,.png,.jpg,.jpeg"
                        className="hidden"
                    />

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "border border-amber-200/80 bg-[#FFFDF8] hover:bg-[#FFF9EE] rounded-xl p-7 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 group shadow-2xs",
                            fileName && "border-green-300 bg-emerald-50/30"
                        )}
                    >
                        {fileName ? (
                            <div className="flex items-center gap-2 text-emerald-700">
                                <FileCheck className="size-6 text-emerald-600" />
                                <span className="text-xs sm:text-sm font-medium">
                                    {fileName} ({fileSize})
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="size-10 rounded-full bg-amber-50 flex items-center justify-center text-[#C39B4C] group-hover:scale-110 transition-transform">
                                    <UploadCloud className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 font-space-grotesk">
                                        Click to upload file
                                    </p>
                                    <p className="text-[11px] text-neutral-400 mt-0.5">
                                        PDF, ZIP, PNG up to 50 MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Material Title */}
                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-work-sans">
                        Material Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Partner Welcome Brochure 2026"
                        className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C] transition-all"
                    />
                </div>

                {/* Material Type */}
                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-work-sans">
                        Material Type
                    </label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Brochure"
                        className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C] transition-all"
                    />
                </div>

                {/* Audience */}
                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-work-sans">
                        Audience
                    </label>
                    <div className="flex items-center gap-2">
                        {(["Partner", "Host", "Both"] as TMarketingAudience[]).map(
                            (option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setAudience(option)}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer",
                                        audience === option
                                            ? "bg-[#C39B4C] text-white shadow-2xs"
                                            : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                                    )}
                                >
                                    {option}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-work-sans">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of this material..."
                        className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C] transition-all resize-none font-work-sans"
                    />
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50/50">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => handleSave("Draft")}
                    className="px-4 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                >
                    Save as Draft
                </button>
                <button
                    type="button"
                    onClick={() => handleSave("Published")}
                    className="px-5 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                >
                    Publish Material
                </button>
            </div>
        </div>
    );
};

export default CreateMarketing;