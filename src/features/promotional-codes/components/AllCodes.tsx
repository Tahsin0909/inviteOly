"use client";

import React, { useMemo, useState } from "react";
import { Tag, Copy, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IPromotionalCode } from "../promotional-codes.interface";
import { staticPromotionalCodes } from "../data/promotional-codes.data";
import {
    useGetPromotionalCodesQuery,
    useDeletePromotionalCodeMutation,
} from "../promotional-codes.api";
import { CreateCodes } from "./Create-Codes";

interface AllCodesProps {
    className?: string;
}

export const AllCodes: React.FC<AllCodesProps> = ({ className }) => {
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Local state for promo codes to support immediate addition & deletion
    const [localPromoCodes, setLocalPromoCodes] =
        useState<IPromotionalCode[]>(staticPromotionalCodes);

    // RTK Query API
    const { data: apiData } = useGetPromotionalCodesQuery({
        page: currentPage,
        limit: 10,
    });
    const [deletePromotionalCode] = useDeletePromotionalCodeMutation();

    const codesList: IPromotionalCode[] = useMemo(() => {
        const rawData = apiData?.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
            return rawData;
        }
        return localPromoCodes;
    }, [apiData, localPromoCodes]);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`Promo code "${code}" copied to clipboard!`);
    };

    const handleDeleteCode = async (id: string, code: string) => {
        setLocalPromoCodes((prev: IPromotionalCode[]) =>
            prev.filter((item) => item.id !== id)
        );

        try {
            await deletePromotionalCode(id).unwrap();
        } catch {
            // Local fallback
        }

        toast.success(`Promo code "${code}" removed.`);
    };

    const handleCodeCreated = (newCode: IPromotionalCode) => {
        setLocalPromoCodes((prev: IPromotionalCode[]) => [newCode, ...prev]);
    };

    return (
        <div
            className={cn(
                "w-full space-y-6 font-work-sans text-neutral-800 dark:text-neutral-200",
                className
            )}
        >
            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                        Promotional Codes
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Create and manage discount and promotional codes
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="size-4" />
                    Create Promotional Codes
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[760px]">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/60">
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Promotional Codes
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Type
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Value
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Valid Period
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Status
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {codesList.length > 0 ? (
                                codesList.map((promo: IPromotionalCode) => (
                                    <tr
                                        key={promo.id}
                                        className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
                                    >
                                        {/* Promotional Code with Tag Icon & Copy button */}
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-2">
                                                <Tag className="size-3.5 text-[#B89047] shrink-0" />
                                                <span className="font-semibold text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-space-grotesk">
                                                    {promo.code}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyCode(promo.code)}
                                                    className="size-6 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors ml-1 cursor-pointer"
                                                    title="Copy Code"
                                                >
                                                    <Copy className="size-3.5" />
                                                </button>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                                            {promo.type}
                                        </td>

                                        {/* Value */}
                                        <td className="py-4 px-5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-space-grotesk">
                                            {promo.value}
                                        </td>

                                        {/* Valid Period */}
                                        <td className="py-4 px-5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                            {promo.validFrom} to {promo.validTo}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-5">
                                            <span
                                                className={cn(
                                                    "inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border",
                                                    promo.status === "Active"
                                                        ? "bg-[#E8F8EE] dark:bg-emerald-950/40 text-[#0FA958] dark:text-emerald-400 border-[#0FA958]/20 dark:border-emerald-800/40"
                                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-400 border-neutral-200/60 dark:border-neutral-700"
                                                )}
                                            >
                                                {promo.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-5 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCode(promo.id, promo.code)}
                                                className="size-8 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-auto cursor-pointer"
                                                title="Delete Code"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-sm text-neutral-400 dark:text-neutral-500 font-medium"
                                    >
                                        No promotional codes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5 py-4 px-5 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 cursor-pointer"
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "size-8 rounded-lg font-bold text-xs transition-colors flex items-center justify-center cursor-pointer",
                                currentPage === page
                                    ? "bg-[#B89047] text-white"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            )}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
                        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 cursor-pointer"
                        disabled={currentPage === 5}
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>

            {/* Create Promo Code Slide-over Drawer */}
            <CreateCodes
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onCodeCreated={handleCodeCreated}
            />
        </div>
    );
};

export default AllCodes;

