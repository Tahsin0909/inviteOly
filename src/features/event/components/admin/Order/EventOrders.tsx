"use client";

import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React, { useState } from "react";
import { staticAdminEventOrders } from "../../../data/adminEventOrders.data";
import { useApproveEventOrderMutation, useGetAdminEventOrdersQuery } from "../../../event.api";
import { IEventOrderItem } from "../../../event.interface";
import { PaymentProofModal } from "./PaymentProofModal";

// 1. Host User Icon
const HostUserIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-neutral-400 shrink-0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
);

// 2. Pavilion Venue Icon
const VenuePavilionIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-neutral-400 shrink-0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 10L12 4l9 6" />
        <path d="M5 10v10" />
        <path d="M10 10v10" />
        <path d="M14 10v10" />
        <path d="M19 10v10" />
        <path d="M2 20h20" />
    </svg>
);

interface EventOrdersProps {
    className?: string;
}

export const EventOrders: React.FC<EventOrdersProps> = ({ className }) => {
    const { data: apiData } = useGetAdminEventOrdersQuery();
    const [approveMutation] = useApproveEventOrderMutation();
    const [orderList, setOrderList] = useState<IEventOrderItem[]>(staticAdminEventOrders);
    const [selectedOrder, setSelectedOrder] = useState<IEventOrderItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(2);

    const orders = apiData?.data || orderList;

    const handleOpenModal = (order: IEventOrderItem) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleApproveOrder = async (orderId: string) => {
        try {
            await approveMutation(orderId).unwrap();
        } catch {
            // Local fallback
        }
        setOrderList((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: "Approved" } : o))
        );
    };

    const getBadgeStyle = (status: string) => {
        switch (status) {
            case "Waiting Approval":
            case "Awaiting Approval":
                return "bg-[#FEF7EC] dark:bg-amber-950/40 text-[#D97706] dark:text-amber-400 border border-[#FDE68A]/60 dark:border-amber-800/60";
            case "Upload Invoice":
                return "bg-[#FFFBEB] dark:bg-yellow-950/40 text-[#B45309] dark:text-yellow-400 border border-[#FDE68A]/70 dark:border-yellow-800/60";
            case "Approved":
                return "bg-[#ECFDF3] dark:bg-emerald-950/40 text-[#027A48] dark:text-emerald-400 border border-[#ABEFC6]/60 dark:border-emerald-800/60";
            default:
                return "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300";
        }
    };

    return (
        <div className={cn("w-full space-y-6 sm:space-y-8", className)}>
            {/* 3-column Event Order Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-neutral-900/60 rounded-2xl p-5 sm:p-6 border border-neutral-200/70 dark:border-neutral-800 shadow-xs hover:shadow-md dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between"
                    >
                        <div>
                            {/* Status Badge */}
                            <div>
                                <span
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium font-work-sans inline-block",
                                        getBadgeStyle(order.status)
                                    )}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {/* Event Title */}
                            <h3 className="text-base sm:text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mt-3 sm:mt-3.5 leading-snug">
                                {order.title}
                            </h3>

                            {/* Date & Time */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-work-sans mt-3 sm:mt-3.5">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 sm:size-4 text-neutral-400 shrink-0" />
                                    <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="size-3.5 sm:size-4 text-neutral-400 shrink-0" />
                                    <span>{order.time}</span>
                                </div>
                            </div>

                            {/* Host */}
                            <div className="flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-200 font-medium font-work-sans mt-3">
                                <HostUserIcon />
                                <span className="truncate">{order.hostName}</span>
                            </div>

                            {/* Venue */}
                            <div className="flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-200 font-medium font-work-sans mt-3">
                                <VenuePavilionIcon />
                                <span className="truncate">{order.venue}</span>
                            </div>

                            {/* Total Guest */}
                            <div className="mt-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-work-sans">
                                    Total Guest
                                </p>
                                <p className="text-2xl sm:text-[26px] font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight mt-0.5">
                                    {order.totalGuests}
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-5">
                            {order.status === "Approved" ? (
                                <div className="w-full rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 py-2.5 text-xs sm:text-sm font-medium font-work-sans text-center border border-emerald-200/60 dark:border-emerald-800/60">
                                    Approved
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleOpenModal(order)}
                                    className="w-full rounded-xl border border-[#B89047] py-2.5 text-xs sm:text-sm font-medium text-[#B89047] hover:bg-[#B89047] hover:text-white transition-colors cursor-pointer font-work-sans text-center shadow-2xs"
                                >
                                    View Payment Proof
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-center gap-1.5 py-4 font-work-sans select-none">
                <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="size-8 rounded-lg flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                    <ChevronLeft className="size-4" />
                </button>

                {[1, 2, 3, 4, 5].map((page) => {
                    const isActive = currentPage === page;
                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "size-8 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center transition-all cursor-pointer",
                                isActive
                                    ? "bg-[#B89047] text-white shadow-xs font-semibold"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                            )}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                    className="size-8 rounded-lg flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                    <ChevronRight className="size-4" />
                </button>
            </div>

            {/* Payment Proof Modal */}
            <PaymentProofModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onApprove={handleApproveOrder}
            />
        </div>
    );
};

export default EventOrders;
