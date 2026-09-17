"use client";

import React, { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Banknote } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    IAdminTransaction,
    IAdminPaymentMetrics,
} from "../payment.interface";
import {
    staticAdminPaymentMetrics,
    staticAdminTransactions,
} from "../data/adminPayment.data";
import {
    useGetAdminPaymentMetricsQuery,
    useGetAdminTransactionsQuery,
    useAddCustomPaymentMutation,
} from "../payment.api";

interface AdminPaymentProps {
    className?: string;
}

export const AdminPayment: React.FC<AdminPaymentProps> = ({ className }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [customAmount, setCustomAmount] = useState<string>("$1000");

    // Local transactions state to support immediate interactive addition
    const [localTransactions, setLocalTransactions] =
        useState<IAdminTransaction[]>(staticAdminTransactions);

    // RTK Query hooks
    const { data: metricsData } = useGetAdminPaymentMetricsQuery();
    const { data: transactionsApiData } = useGetAdminTransactionsQuery({
        page: currentPage,
        limit: 15,
        searchTerm: searchTerm || undefined,
    });
    const [addCustomPayment, { isLoading: isAddingCustom }] =
        useAddCustomPaymentMutation();

    const metrics: IAdminPaymentMetrics =
        metricsData?.data || staticAdminPaymentMetrics;

    const transactionsList: IAdminTransaction[] = useMemo(() => {
        const rawData = transactionsApiData?.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
            return rawData;
        }
        return localTransactions;
    }, [transactionsApiData, localTransactions]);

    // Filter transactions based on search query
    const filteredTransactions = useMemo(() => {
        if (!searchTerm.trim()) return transactionsList;
        const lower = searchTerm.toLowerCase();
        return transactionsList.filter(
            (tx) =>
                tx.transactionId.toLowerCase().includes(lower) ||
                tx.paymentType.toLowerCase().includes(lower) ||
                tx.amount.toLowerCase().includes(lower) ||
                tx.paymentDate.toLowerCase().includes(lower) ||
                (tx.customerName && tx.customerName.toLowerCase().includes(lower)) ||
                (tx.customerEmail && tx.customerEmail.toLowerCase().includes(lower))
        );
    }, [transactionsList, searchTerm]);

    // Handle adding custom payment
    const handleAddCustomPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanAmount = customAmount.replace(/[^0-9.]/g, "");
        if (!cleanAmount || isNaN(Number(cleanAmount)) || Number(cleanAmount) <= 0) {
            toast.error("Please enter a valid payment amount.");
            return;
        }

        const formattedAmount = `$${Number(cleanAmount).toFixed(2)}`;
        const randomInv = `#INV-${Math.floor(8800 + Math.random() * 100)}`;

        const newTx: IAdminTransaction = {
            id: `custom-${Date.now()}`,
            transactionId: randomInv,
            paymentType: "Costume",
            amount: formattedAmount,
            status: "Success",
            paymentDate: "Oct 24, 2024",
        };

        setLocalTransactions((prev: IAdminTransaction[]) => [newTx, ...prev]);

        try {
            await addCustomPayment({
                amount: Number(cleanAmount),
                paymentType: "Costume",
            }).unwrap();
        } catch {
            // Local fallback
        }

        toast.success(`Custom payment of ${formattedAmount} added successfully (${randomInv}).`);
    };

    return (
        <div
            className={cn(
                "w-full space-y-6 font-work-sans text-neutral-800",
                className
            )}
        >
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                    Payments Management
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Track and manage all payment transactions in one place.
                </p>
            </div>

            {/* 3 Top Revenue Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Total Revenue */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                        <Banknote className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                                {metrics.totalRevenue}
                            </span>
                            <span className="bg-[#E8F8EE] text-[#0FA958] text-xs font-semibold px-2 py-0.5 rounded-md flex items-center">
                                {metrics.totalRevenueTrend || "+8.5%"}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            Total Revenue
                        </p>
                    </div>
                </div>

                {/* Card 2: This Month Revenue */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                        <Banknote className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                                {metrics.thisMonthRevenue}
                            </span>
                            <span className="bg-[#E8F8EE] text-[#0FA958] text-xs font-semibold px-2 py-0.5 rounded-md flex items-center">
                                {metrics.thisMonthRevenueTrend || "+8.5%"}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            This Month Revenue
                        </p>
                    </div>
                </div>

                {/* Card 3: Today Revenue */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                        <Banknote className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                                {metrics.todayRevenue}
                            </span>
                            <span className="bg-[#E8F8EE] text-[#0FA958] text-xs font-semibold px-2 py-0.5 rounded-md flex items-center">
                                {metrics.todayRevenueTrend || "+8.5%"}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            Today Revenue
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Bar & Add Custom Payment */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search partner, business, or email..."
                        className="w-full h-11 pl-11 pr-4 rounded-full border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 shadow-2xs font-work-sans transition-all"
                    />
                </div>

                {/* Add Custom Payment Box */}
                <form
                    onSubmit={handleAddCustomPayment}
                    className="flex flex-col items-start sm:items-end"
                >
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                        Add Custom Payment
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="$1000"
                            className="h-10 px-3.5 rounded-l-xl border border-neutral-200 border-r-0 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] w-28 sm:w-32 shadow-2xs transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isAddingCustom}
                            className="h-10 px-4 rounded-r-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>

            {/* Transactions Table Card */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-neutral-100 bg-neutral-50/50">
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    transaction IDs
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Payment Type
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    amount
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Payments Status
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Payment date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx: IAdminTransaction) => (
                                    <tr
                                        key={tx.id}
                                        className="hover:bg-neutral-50/70 transition-colors"
                                    >
                                        {/* Transaction ID */}
                                        <td className="py-4 px-5 font-semibold text-xs sm:text-sm text-neutral-800">
                                            {tx.transactionId}
                                        </td>

                                        {/* Payment Type */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-700 font-medium">
                                            {tx.paymentType}
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-5 text-xs sm:text-sm font-semibold text-neutral-800 font-space-grotesk">
                                            {tx.amount}
                                        </td>

                                        {/* Payments Status */}
                                        <td className="py-4 px-5 text-xs sm:text-sm">
                                            <span
                                                className={cn(
                                                    "font-medium",
                                                    tx.status === "Success"
                                                        ? "text-[#0FA958]"
                                                        : "text-[#EA3829]"
                                                )}
                                            >
                                                {tx.status}
                                            </span>
                                        </td>

                                        {/* Payment Date */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-600 font-medium">
                                            {tx.paymentDate}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-12 text-center text-sm text-neutral-400 font-medium"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5 py-4 px-5 border-t border-neutral-100 bg-white">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
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
                                    : "text-neutral-600 hover:bg-neutral-50"
                            )}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
                        className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
                        disabled={currentPage === 5}
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPayment;

