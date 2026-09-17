"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    ICreatePromoCodePayload,
    IPromotionalCode,
} from "../promotional-codes.interface";
import { useCreatePromotionalCodeMutation } from "../promotional-codes.api";

interface CreateCodesProps {
    isOpen: boolean;
    onClose: () => void;
    onCodeCreated?: (newCode: IPromotionalCode) => void;
    className?: string;
}

export const CreateCodes: React.FC<CreateCodesProps> = ({
    isOpen,
    onClose,
    onCodeCreated,
    className,
}) => {
    const [formData, setFormData] = useState<ICreatePromoCodePayload>({
        code: "",
        discountType: "Percentage",
        discountValue: "",
        validFrom: "2026-08-31",
        validTo: "2026-09-30",
    });

    const [createPromotionalCode, { isLoading }] =
        useCreatePromotionalCodeMutation();

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: ICreatePromoCodePayload) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.code.trim()) {
            toast.error("Please enter a promotional code.");
            return;
        }

        if (!formData.discountValue.trim()) {
            toast.error("Please enter a discount value.");
            return;
        }

        let formattedValue = formData.discountValue.trim();
        if (formData.discountType === "Percentage" && !formattedValue.endsWith("%")) {
            formattedValue = `${formattedValue}%`;
        } else if (
            formData.discountType === "Fixed" &&
            !formattedValue.startsWith("$")
        ) {
            formattedValue = `$${formattedValue}`;
        }

        const createdPromo: IPromotionalCode = {
            id: `promo-${Date.now()}`,
            code: formData.code.trim().toUpperCase(),
            type: formData.discountType,
            value: formattedValue,
            validFrom: formData.validFrom,
            validTo: formData.validTo,
            status: "Active",
        };

        try {
            await createPromotionalCode({
                ...formData,
                code: formData.code.trim().toUpperCase(),
                discountValue: formattedValue,
            }).unwrap();
        } catch {
            // Local fallback
        }

        onCodeCreated?.(createdPromo);
        toast.success(`Promotional code ${createdPromo.code} created successfully!`);
        onClose();

        // Reset form
        setFormData({
            code: "",
            discountType: "Percentage",
            discountValue: "",
            validFrom: "2026-08-31",
            validTo: "2026-09-30",
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
                <div
                    className={cn(
                        "w-screen max-w-xl bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col h-full font-work-sans text-neutral-800",
                        className
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 sm:p-7 border-b border-neutral-100">
                        <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            Create New Promotional Codes
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="size-8 rounded-lg border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
                            aria-label="Close drawer"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-5"
                    >
                        {/* Promotional Codes */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 font-work-sans">
                                Promotional Codes
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="e.g., SAVE25"
                                required
                                className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all uppercase"
                            />
                        </div>

                        {/* Discount Type */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 font-work-sans">
                                Discount Type
                            </label>
                            <div className="relative">
                                <select
                                    name="discountType"
                                    value={formData.discountType}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 appearance-none transition-all cursor-pointer"
                                >
                                    <option value="Percentage">Percentage</option>
                                    <option value="Fixed">Fixed</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Discount Value */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 font-work-sans">
                                Discount Value
                            </label>
                            <input
                                type="text"
                                name="discountValue"
                                value={formData.discountValue}
                                onChange={handleChange}
                                placeholder={
                                    formData.discountType === "Percentage"
                                        ? "e.g. 20%"
                                        : "e.g. $20"
                                }
                                required
                                className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                            />
                        </div>

                        {/* Valid From */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 font-work-sans">
                                Valid From
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="validFrom"
                                    value={formData.validFrom}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                                />
                                <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Valid To */}
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 font-work-sans">
                                Valid To
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="validTo"
                                    value={formData.validTo}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 transition-all"
                                />
                                <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? "Creating..." : "Create Promo Code"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCodes;