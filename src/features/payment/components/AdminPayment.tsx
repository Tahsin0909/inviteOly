"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Banknote,
    TrendingUp,
    AlertCircle,
    Plus,
    Eye,
    X,
    Copy,
    Calendar,
    CreditCard,
    Tag,
    FileText,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    IAdminTransaction,
    IAdminPaymentMetrics,
    TAdminPaymentStatus,
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
    // Search & Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
    const [dateRangeFilter, setDateRangeFilter] = useState<string>("All Time");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;

    // Modals state
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedTx, setSelectedTx] = useState<IAdminTransaction | null>(null);
    const [manualPaymentModalOpen, setManualPaymentModalOpen] = useState(false);

    // Manual Payment Form State
    const [manualForm, setManualForm] = useState({
        customerName: "",
        customerEmail: "",
        eventName: "",
        packageName: "Signature Tier",
        amount: "",
        paymentMethod: "Bank Wire",
        paymentDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }),
        note: "",
    });

    // Local transactions state to support immediate interactive additions & updates
    const [localTransactions, setLocalTransactions] =
        useState<IAdminTransaction[]>(staticAdminTransactions);

    // RTK Query hooks
    const { data: metricsData } = useGetAdminPaymentMetricsQuery();
    const { data: transactionsApiData } = useGetAdminTransactionsQuery({
        page: currentPage,
        limit: 15,
        searchTerm: searchTerm || undefined,
    });
    const [addCustomPayment, { isLoading: isAddingManual }] =
        useAddCustomPaymentMutation();

    const metrics: IAdminPaymentMetrics =
        metricsData?.data || staticAdminPaymentMetrics;

    const rawTransactionsList: IAdminTransaction[] = useMemo(() => {
        const rawData = transactionsApiData?.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
            return rawData;
        }
        return localTransactions;
    }, [transactionsApiData, localTransactions]);

    // Clean up pointer events whenever all modals are closed to prevent DOM lock
    useEffect(() => {
        if (!detailsModalOpen && !manualPaymentModalOpen) {
            document.body.style.pointerEvents = "";
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = "";
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [detailsModalOpen, manualPaymentModalOpen]);

    // Filter transactions based on Search, Status Filter, and Date Range Filter
    const filteredTransactions = useMemo(() => {
        return rawTransactionsList.filter((tx) => {
            // 1. Search Query (Host, Event, Email, Transaction ID, Package)
            if (searchTerm.trim()) {
                const lower = searchTerm.toLowerCase().trim();
                const matchesSearch =
                    tx.transactionId.toLowerCase().includes(lower) ||
                    (tx.hostName && tx.hostName.toLowerCase().includes(lower)) ||
                    (tx.customerName && tx.customerName.toLowerCase().includes(lower)) ||
                    (tx.customerEmail && tx.customerEmail.toLowerCase().includes(lower)) ||
                    (tx.eventName && tx.eventName.toLowerCase().includes(lower)) ||
                    (tx.packageName && tx.packageName.toLowerCase().includes(lower)) ||
                    tx.amount.toLowerCase().includes(lower);

                if (!matchesSearch) return false;
            }

            // 2. Status Filter
            if (statusFilter !== "All Statuses") {
                if (statusFilter === "Paid") {
                    if (tx.status !== "Paid" && tx.status !== "Success") return false;
                } else if (statusFilter === "Payment Failed") {
                    if (
                        tx.status !== "Payment Failed" &&
                        tx.status !== "Payment Field"
                    )
                        return false;
                } else if (statusFilter === "Refunded") {
                    if (tx.status !== "Refunded") return false;
                }
            }

            // 3. Date Range Filter
            if (dateRangeFilter !== "All Time") {
                const txDate = new Date(tx.paymentDate);
                const now = new Date();

                if (dateRangeFilter === "Today") {
                    const isToday =
                        txDate.getDate() === now.getDate() &&
                        txDate.getMonth() === now.getMonth() &&
                        txDate.getFullYear() === now.getFullYear();
                    if (!isToday && !tx.paymentDate.toLowerCase().includes("today")) {
                        return false;
                    }
                } else if (dateRangeFilter === "Last 7 Days") {
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(now.getDate() - 7);
                    if (!isNaN(txDate.getTime()) && txDate < sevenDaysAgo) {
                        return false;
                    }
                } else if (dateRangeFilter === "This Month") {
                    if (
                        !isNaN(txDate.getTime()) &&
                        (txDate.getMonth() !== now.getMonth() ||
                            txDate.getFullYear() !== now.getFullYear())
                    ) {
                        // Also allow string matching for current month e.g. "Oct"
                        if (!tx.paymentDate.includes("Oct")) {
                            return false;
                        }
                    }
                } else if (dateRangeFilter === "Last 30 Days") {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(now.getDate() - 30);
                    if (!isNaN(txDate.getTime()) && txDate < thirtyDaysAgo) {
                        return false;
                    }
                }
            }

            return true;
        });
    }, [rawTransactionsList, searchTerm, statusFilter, dateRangeFilter]);

    // Pagination
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTransactions.slice(start, start + pageSize);
    }, [filteredTransactions, currentPage, pageSize]);

    // Open Details Modal
    const handleOpenDetails = (tx: IAdminTransaction) => {
        setSelectedTx(tx);
        setDetailsModalOpen(true);
    };

    // Copy Transaction ID Helper
    const handleCopyTxId = (txId: string) => {
        navigator.clipboard.writeText(txId);
        toast.success(`Copied Transaction ID ${txId} to clipboard.`);
    };

    // Handle Recording Manual Payment
    const handleRecordManualPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Required Field Validations
        if (!manualForm.customerName.trim()) {
            toast.error("Customer name is required.");
            return;
        }
        if (!manualForm.customerEmail.trim()) {
            toast.error("Customer email is required.");
            return;
        }
        if (!manualForm.eventName.trim()) {
            toast.error("Event name is required.");
            return;
        }
        if (!manualForm.note.trim()) {
            toast.error("A note explaining why this payment was entered is required.");
            return;
        }

        const cleanAmount = manualForm.amount.replace(/[^0-9.]/g, "");
        if (!cleanAmount || isNaN(Number(cleanAmount)) || Number(cleanAmount) <= 0) {
            toast.error("Please enter a valid positive payment amount.");
            return;
        }

        const formattedAmount = `$${Number(cleanAmount).toFixed(2)}`;
        const randomInv = `#INV-${Math.floor(8822 + Math.random() * 200)}`;

        const newTx: IAdminTransaction = {
            id: `manual-${Date.now()}`,
            transactionId: randomInv,
            paymentType: "Manual Payment",
            amount: formattedAmount,
            status: "Paid",
            paymentDate: manualForm.paymentDate || "Oct 24, 2024",
            hostName: manualForm.customerName,
            customerName: manualForm.customerName,
            customerEmail: manualForm.customerEmail,
            eventName: manualForm.eventName,
            packageName: manualForm.packageName || "Signature Tier",
            paymentMethod: manualForm.paymentMethod || "Bank Wire",
            note: manualForm.note,
        };

        setLocalTransactions((prev) => [newTx, ...prev]);

        try {
            await addCustomPayment({
                amount: Number(cleanAmount),
                customerName: manualForm.customerName,
                customerEmail: manualForm.customerEmail,
                eventName: manualForm.eventName,
                packageName: manualForm.packageName,
                paymentMethod: manualForm.paymentMethod,
                paymentDate: manualForm.paymentDate,
                paymentType: "Manual Payment",
                note: manualForm.note,
            }).unwrap();
        } catch {
            // Local state fallback already updated
        }

        toast.success(
            `Manual payment of ${formattedAmount} recorded for ${manualForm.customerName} (${randomInv}).`
        );

        // Reset and close
        setManualForm({
            customerName: "",
            customerEmail: "",
            eventName: "",
            packageName: "Signature Tier",
            amount: "",
            paymentMethod: "Bank Wire",
            paymentDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            note: "",
        });
        setManualPaymentModalOpen(false);
    };

    // Status Badge Helper
    const renderStatusBadge = (status: TAdminPaymentStatus | string) => {
        const isPaid = status === "Paid" || status === "Success";
        const isFailed = status === "Payment Failed" || status === "Payment Field";
        const isRefunded = status === "Refunded";

        if (isPaid) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F8EE] text-[#0FA958] border border-[#0FA958]/20">
                    <span className="size-1.5 rounded-full bg-[#0FA958]" />
                    Paid
                </span>
            );
        }

        if (isFailed) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEECEB] text-[#EA3829] border border-[#EA3829]/20">
                    <span className="size-1.5 rounded-full bg-[#EA3829]" />
                    Payment Failed
                </span>
            );
        }

        if (isRefunded) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEF3EB] text-[#D97706] border border-[#D97706]/20">
                    <span className="size-1.5 rounded-full bg-[#D97706]" />
                    Refunded
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                {status}
            </span>
        );
    };

    return (
        <div
            className={cn(
                "w-full space-y-6 font-work-sans text-neutral-800",
                className
            )}
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                        Payments Management
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                        Track and manage all customer payments, refunds, and manual transaction entries in one place.
                    </p>
                </div>

                {/* Action: Record Manual Payment */}
                <button
                    type="button"
                    onClick={() => setManualPaymentModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
                >
                    <Plus className="size-4 stroke-[2.5]" />
                    <span>Record Manual Payment</span>
                </button>
            </div>

            {/* 3 Improved Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Total Revenue */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="size-11 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                            <Banknote className="size-5" />
                        </div>
                        <span className="bg-[#E8F8EE] text-[#0FA958] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <TrendingUp className="size-3" />
                            {metrics.totalRevenueTrend || "+8.5%"}
                        </span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                            {metrics.totalRevenue}
                        </span>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            Total Revenue
                        </p>
                    </div>
                </div>

                {/* Card 2: This Month’s Revenue */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="size-11 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                            <TrendingUp className="size-5" />
                        </div>
                        <span className="bg-[#E8F8EE] text-[#0FA958] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <TrendingUp className="size-3" />
                            {metrics.thisMonthRevenueTrend || "+12.4%"}
                        </span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                            {metrics.thisMonthRevenue}
                        </span>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            This Month’s Revenue
                        </p>
                    </div>
                </div>

                {/* Card 3: Refunded or Failed Payments */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="size-11 rounded-xl bg-red-50 flex items-center justify-center text-[#EA3829]">
                            <AlertCircle className="size-5" />
                        </div>
                        <span className="bg-[#FEECEB] text-[#EA3829] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <RotateCcw className="size-3" />
                            {metrics.refundedOrFailedTrend || "4 transactions"}
                        </span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-space-grotesk text-neutral-900">
                            {metrics.refundedOrFailed || "$796.00"}
                        </span>
                        <p className="text-xs text-neutral-500 font-medium mt-1">
                            Refunded or Failed Payments
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Bar: Search + Status Filter + Date Range Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Search Bar */}
                <div className="sm:col-span-6 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by host, event, email, or transaction ID..."
                        className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 shadow-2xs font-work-sans transition-all"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                        >
                            <X className="size-3.5" />
                        </button>
                    )}
                </div>

                {/* Filter: Payment Status */}
                <div className="sm:col-span-3 relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-10 px-3.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-[#B89047] shadow-2xs appearance-none cursor-pointer"
                    >
                        <option value="All Statuses">All Payment Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Payment Failed">Payment Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                        ▼
                    </div>
                </div>

                {/* Filter: Date Range */}
                <div className="sm:col-span-3 relative">
                    <select
                        value={dateRangeFilter}
                        onChange={(e) => {
                            setDateRangeFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-10 px-3.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-[#B89047] shadow-2xs appearance-none cursor-pointer"
                    >
                        <option value="All Time">All Time</option>
                        <option value="Today">Today</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="This Month">This Month</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                        ▼
                    </div>
                </div>
            </div>

            {/* Transactions Table Card */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="border-b border-neutral-100 bg-neutral-50/70">
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Transaction ID
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Host Name
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Event Name
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Package Purchased
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Amount
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Payment Status
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk">
                                    Payment Date
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-space-grotesk text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {paginatedTransactions.length > 0 ? (
                                paginatedTransactions.map((tx: IAdminTransaction) => (
                                    <tr
                                        key={tx.id}
                                        className="hover:bg-neutral-50/70 transition-colors group"
                                    >
                                        {/* Transaction ID */}
                                        <td className="py-4 px-5 font-semibold text-xs sm:text-sm text-neutral-900 font-mono">
                                            {tx.transactionId}
                                        </td>

                                        {/* Host Name & Email */}
                                        <td className="py-4 px-5 text-xs sm:text-sm">
                                            <p className="font-semibold text-neutral-900">
                                                {tx.hostName || tx.customerName}
                                            </p>
                                            {tx.customerEmail && (
                                                <p className="text-[11px] text-neutral-400 font-normal mt-0.5">
                                                    {tx.customerEmail}
                                                </p>
                                            )}
                                        </td>

                                        {/* Event Name */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-800 font-medium max-w-[220px] truncate">
                                            <span title={tx.eventName}>{tx.eventName}</span>
                                        </td>

                                        {/* Package Purchased */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-700">
                                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 font-medium text-neutral-800">
                                                {tx.packageName || tx.paymentType || "Signature Tier"}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-5 text-xs sm:text-sm font-bold text-neutral-900 font-space-grotesk">
                                            {tx.amount}
                                        </td>

                                        {/* Payment Status */}
                                        <td className="py-4 px-5 text-xs sm:text-sm">
                                            {renderStatusBadge(tx.status)}
                                        </td>

                                        {/* Payment Date */}
                                        <td className="py-4 px-5 text-xs sm:text-sm text-neutral-600 font-medium">
                                            {tx.paymentDate}
                                        </td>

                                        {/* View Details Button */}
                                        <td className="py-4 px-5 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenDetails(tx)}
                                                className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                                            >
                                                <Eye className="size-3.5 text-neutral-500" />
                                                <span>View Details</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-12 text-center text-sm text-neutral-400 font-medium"
                                    >
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination & Count */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 px-5 border-t border-neutral-100 bg-white text-xs text-neutral-500">
                    <p>
                        Showing{" "}
                        <strong className="text-neutral-900">
                            {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
                            {Math.min(currentPage * pageSize, totalItems)}
                        </strong>{" "}
                        of <strong className="text-neutral-900">{totalItems}</strong> transactions
                    </p>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={cn(
                                        "size-8 rounded-lg font-bold text-xs transition-colors flex items-center justify-center cursor-pointer",
                                        currentPage === page
                                            ? "bg-[#B89047] text-white"
                                            : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                                    )}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
                            disabled={currentPage >= totalPages}
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* =========================================================================
          MODAL 1: TRANSACTION DETAILS WINDOW
          ========================================================================= */}
            <Dialog
                open={detailsModalOpen}
                onOpenChange={(open) => {
                    setDetailsModalOpen(open);
                    if (!open) {
                        setTimeout(() => {
                            document.body.style.pointerEvents = "";
                        }, 250);
                    }
                }}
            >
                <DialogContent
                    onCloseAutoFocus={(e) => {
                        e.preventDefault();
                        document.body.style.pointerEvents = "";
                    }}
                    className="max-w-lg bg-white border border-neutral-200 p-0 overflow-hidden font-work-sans text-neutral-900"
                >
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 relative">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C170] flex items-center gap-1.5">
                                <FileText className="size-3.5" />
                                Transaction Receipt & Details
                            </span>
                            {selectedTx && renderStatusBadge(selectedTx.status)}
                        </div>
                        <div className="mt-3">
                            <h3 className="text-xl font-bold font-space-grotesk tracking-tight">
                                {selectedTx?.amount}
                            </h3>
                            <p className="text-xs text-neutral-400 font-mono mt-0.5">
                                ID: {selectedTx?.transactionId}
                            </p>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-5 text-xs">
                        {/* Grid of Key Properties */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Customer Name & Email */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 col-span-2 sm:col-span-1">
                                <p className="text-neutral-400 font-medium">Customer Name & Email</p>
                                <p className="font-bold text-neutral-900 mt-1">
                                    {selectedTx?.customerName}
                                </p>
                                <p className="text-neutral-500 font-normal">
                                    {selectedTx?.customerEmail}
                                </p>
                            </div>

                            {/* Event Name */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 col-span-2 sm:col-span-1">
                                <p className="text-neutral-400 font-medium">Event</p>
                                <p className="font-bold text-neutral-900 mt-1">
                                    {selectedTx?.eventName}
                                </p>
                                <p className="text-neutral-500">Host: {selectedTx?.hostName || selectedTx?.customerName}</p>
                            </div>

                            {/* Package */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium">Package Purchased</p>
                                <p className="font-bold text-neutral-900 mt-1">
                                    {selectedTx?.packageName || selectedTx?.paymentType || "Signature Tier"}
                                </p>
                            </div>

                            {/* Amount Paid */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium">Amount Paid</p>
                                <p className="font-bold text-neutral-900 mt-1 font-space-grotesk text-sm">
                                    {selectedTx?.amount}
                                </p>
                            </div>

                            {/* Promo Code or Discount */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium flex items-center gap-1">
                                    <Tag className="size-3" />
                                    Promo Code / Discount
                                </p>
                                <p className="font-semibold text-neutral-900 mt-1">
                                    {selectedTx?.promoCode || selectedTx?.discount || "None"}
                                </p>
                            </div>

                            {/* Payment Method */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium flex items-center gap-1">
                                    <CreditCard className="size-3" />
                                    Payment Method
                                </p>
                                <p className="font-semibold text-neutral-900 mt-1">
                                    {selectedTx?.paymentMethod || "Visa ending in 4242"}
                                </p>
                            </div>

                            {/* Transaction ID */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium">Transaction ID</p>
                                <p className="font-mono font-bold text-neutral-900 mt-1">
                                    {selectedTx?.transactionId}
                                </p>
                            </div>

                            {/* Payment Date */}
                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-neutral-400 font-medium flex items-center gap-1">
                                    <Calendar className="size-3" />
                                    Payment Date
                                </p>
                                <p className="font-semibold text-neutral-900 mt-1">
                                    {selectedTx?.paymentDate}
                                </p>
                            </div>
                        </div>

                        {/* Refund Information Section (if applicable) */}
                        {(selectedTx?.status === "Refunded" ||
                            selectedTx?.refundInfo?.isRefunded ||
                            selectedTx?.status === "Payment Failed" ||
                            selectedTx?.status === "Payment Field") && (
                                <div className="p-4 rounded-xl border border-red-200/80 bg-red-50/50 space-y-2">
                                    <div className="flex items-center gap-2 text-red-700 font-semibold">
                                        <AlertCircle className="size-4" />
                                        <span>
                                            {selectedTx.status === "Refunded" || selectedTx.refundInfo?.isRefunded
                                                ? "Refund Information"
                                                : "Failure / Decline Details"}
                                        </span>
                                    </div>
                                    {selectedTx.refundInfo?.refundAmount && (
                                        <p className="text-neutral-700">
                                            <strong>Refund Amount:</strong> {selectedTx.refundInfo.refundAmount}
                                        </p>
                                    )}
                                    {selectedTx.refundInfo?.refundDate && (
                                        <p className="text-neutral-700">
                                            <strong>Refund Date:</strong> {selectedTx.refundInfo.refundDate}
                                        </p>
                                    )}
                                    <p className="text-neutral-700">
                                        <strong>Reason:</strong>{" "}
                                        {selectedTx.refundInfo?.reason ||
                                            "Payment was declined by issuing financial institution during authentication."}
                                    </p>
                                </div>
                            )}

                        {/* If Paid and no refund */}
                        {selectedTx?.status === "Paid" && !selectedTx.refundInfo?.isRefunded && (
                            <div className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 flex items-center justify-between text-neutral-600">
                                <span className="font-medium">Refund Information:</span>
                                <span className="text-neutral-500">N/A - Payment successful, no refund requested</span>
                            </div>
                        )}

                        {/* Note / Audit Trail */}
                        {selectedTx?.note && (
                            <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70">
                                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                                    Internal / Auditor Note
                                </p>
                                <p className="text-neutral-700 mt-1 font-normal">
                                    {selectedTx.note}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedTx) handleCopyTxId(selectedTx.transactionId);
                                }}
                                className="flex-1 py-2 rounded-xl bg-[#B89047] text-white text-xs font-semibold hover:bg-[#A37E36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                                <Copy className="size-3.5" />
                                <span>Copy Transaction ID</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setDetailsModalOpen(false)}
                                className="py-2 px-5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* =========================================================================
          MODAL 2: RECORD MANUAL PAYMENT MODAL
          ========================================================================= */}
            <Dialog
                open={manualPaymentModalOpen}
                onOpenChange={(open) => {
                    setManualPaymentModalOpen(open);
                    if (!open) {
                        setTimeout(() => {
                            document.body.style.pointerEvents = "";
                        }, 250);
                    }
                }}
            >
                <DialogContent
                    onCloseAutoFocus={(e) => {
                        e.preventDefault();
                        document.body.style.pointerEvents = "";
                    }}
                    className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
                >
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold font-space-grotesk text-neutral-900 flex items-center gap-2">
                            <Sparkles className="size-4.5 text-[#B89047]" />
                            Record Manual Payment
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">
                            Record an offline bank wire, cash settlement, or manual payment connected to a customer and event.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleRecordManualPayment} className="space-y-4 pt-2 text-xs">
                        {/* Customer Name */}
                        <div className="space-y-1">
                            <label className="font-medium text-neutral-700">
                                Customer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={manualForm.customerName}
                                onChange={(e) =>
                                    setManualForm((prev) => ({ ...prev, customerName: e.target.value }))
                                }
                                placeholder="e.g. Marcus Thorne"
                                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                            />
                        </div>

                        {/* Customer Email */}
                        <div className="space-y-1">
                            <label className="font-medium text-neutral-700">
                                Customer Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={manualForm.customerEmail}
                                onChange={(e) =>
                                    setManualForm((prev) => ({ ...prev, customerEmail: e.target.value }))
                                }
                                placeholder="m.thorne@example.com"
                                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                            />
                        </div>

                        {/* Event Name */}
                        <div className="space-y-1">
                            <label className="font-medium text-neutral-700">
                                Event Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={manualForm.eventName}
                                onChange={(e) =>
                                    setManualForm((prev) => ({ ...prev, eventName: e.target.value }))
                                }
                                placeholder="e.g. Apex Annual Tech Gala 2024"
                                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                            />
                        </div>

                        {/* Package & Amount Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="font-medium text-neutral-700">
                                    Package <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={manualForm.packageName}
                                    onChange={(e) =>
                                        setManualForm((prev) => ({ ...prev, packageName: e.target.value }))
                                    }
                                    className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                                >
                                    <option value="Signature Tier">Signature Tier</option>
                                    <option value="Grand Gala">Grand Gala</option>
                                    <option value="VIP Luxury Tier">VIP Luxury Tier</option>
                                    <option value="Intimate Soiree">Intimate Soiree</option>
                                    <option value="Platinum Wedding Package">Platinum Wedding Package</option>
                                    <option value="Executive Suite Package">Executive Suite Package</option>
                                    <option value="Custom Package">Custom Package</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-medium text-neutral-700">
                                    Amount ($) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={manualForm.amount}
                                    onChange={(e) =>
                                        setManualForm((prev) => ({ ...prev, amount: e.target.value }))
                                    }
                                    placeholder="e.g. 500.00"
                                    className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                                />
                            </div>
                        </div>

                        {/* Payment Method & Date Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="font-medium text-neutral-700">
                                    Payment Method <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={manualForm.paymentMethod}
                                    onChange={(e) =>
                                        setManualForm((prev) => ({
                                            ...prev,
                                            paymentMethod: e.target.value,
                                        }))
                                    }
                                    className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                                >
                                    <option value="Bank Wire">Bank Wire</option>
                                    <option value="Bank Transfer (ACH)">Bank Transfer (ACH)</option>
                                    <option value="Credit Card (Manual POS)">Credit Card (Manual POS)</option>
                                    <option value="Check">Check</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Stripe Invoice">Stripe Invoice</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-medium text-neutral-700">
                                    Payment Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={manualForm.paymentDate}
                                    onChange={(e) =>
                                        setManualForm((prev) => ({ ...prev, paymentDate: e.target.value }))
                                    }
                                    placeholder="e.g. Oct 24, 2024"
                                    className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047]"
                                />
                            </div>
                        </div>

                        {/* Note Explaining Why Entered (Required) */}
                        <div className="space-y-1">
                            <label className="font-medium text-neutral-700 flex items-center justify-between">
                                <span>
                                    Note Explaining Why Entered <span className="text-red-500">*</span>
                                </span>
                                <span className="text-[10px] text-neutral-400">Required</span>
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={manualForm.note}
                                onChange={(e) =>
                                    setManualForm((prev) => ({ ...prev, note: e.target.value }))
                                }
                                placeholder="Explain why this payment was entered manually (e.g. Wire reference #WIRE-9821 verified with accounting, client paid cash directly at venue)..."
                                className="w-full p-2.5 rounded-lg border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#B89047] resize-none"
                            />
                        </div>

                        <DialogFooter className="pt-2">
                            <button
                                type="button"
                                onClick={() => setManualPaymentModalOpen(false)}
                                className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isAddingManual}
                                className="px-4 py-2 rounded-lg bg-[#B89047] hover:bg-[#A37E36] text-white text-xs font-semibold cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                Record Payment
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminPayment;
