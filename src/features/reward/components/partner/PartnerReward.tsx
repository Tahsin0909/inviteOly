"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setActiveTab,
  setCurrentPage,
  openPayoutModal,
} from "../../store/reward.slice";
import PartnerRewardStats from "./PartnerRewardStats";
import PartnerPendingRewardTable from "./PartnerPendingRewardTable";
import PartnerPayoutHistoryTable from "./PartnerPayoutHistoryTable";
import PartnerPayoutModal from "./PartnerPayoutModal";
import { RewardTabs } from "../shared/RewardTabs";
import {
  Search,
  Calendar,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  CreditCard,
  User,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { IPendingRewardItem, IPayoutHistoryItem, TRewardStatus } from "../../reward.interface";
import { cn } from "@/lib/utils";

export const PartnerReward: React.FC = () => {
  const dispatch = useDispatch();
  const rewardState = useSelector((state: RootState) => state.reward);

  const rawPendingRewards = rewardState?.pendingRewards;
  const rawPayoutHistory = rewardState?.payoutHistory;
  const pendingRewards = useMemo(() => rawPendingRewards || [], [rawPendingRewards]);
  const payoutHistory = useMemo(() => rawPayoutHistory || [], [rawPayoutHistory]);
  const activeTab = rewardState?.activeTab || "pending";
  const currentPage = rewardState?.currentPage || 1;
  const pageSize = 5;

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("All Time");

  // Event Details Modal State
  const [selectedEventReward, setSelectedEventReward] =
    useState<IPendingRewardItem | null>(null);
  const [selectedPayoutItem, setSelectedPayoutItem] =
    useState<IPayoutHistoryItem | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Automatic calculation of totals
  const calculatedStats = useMemo(() => {
    // Paid rewards from payout history
    const paidSum = payoutHistory.reduce((sum, item) => {
      const val =
        typeof item.reward === "string"
          ? parseFloat(item.reward.replace(/[^0-9.-]+/g, ""))
          : item.reward || 0;
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    // Pending & Approved & On Hold rewards from pending list
    const pendingSum = pendingRewards
      .filter((r) => r.status !== "Paid" && r.status !== "Canceled" && r.status !== "Rejected")
      .reduce((sum, item) => {
        const val =
          typeof item.reward === "string"
            ? parseFloat(item.reward.replace(/[^0-9.-]+/g, ""))
            : item.reward || 0;
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    const totalSum = paidSum + pendingSum;

    return {
      totalRewards: totalSum,
      pendingRewards: pendingSum,
      paidRewards: paidSum,
      nextPayoutDate: "October 1, 2026",
    };
  }, [pendingRewards, payoutHistory]);

  // Pointer events cleanup
  useEffect(() => {
    if (!detailsModalOpen) {
      document.body.style.pointerEvents = "";
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [detailsModalOpen]);

  // Filter pending rewards based on Search, Status, and Date Range
  const filteredPendingRewards = useMemo(() => {
    return pendingRewards.filter((item) => {
      // 1. Search Query (Event or Host)
      if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase().trim();
        const matchesEvent = item.eventName.toLowerCase().includes(lower);
        const matchesHost =
          item.hostName?.toLowerCase().includes(lower) ||
          item.partnerName?.toLowerCase().includes(lower);
        if (!matchesEvent && !matchesHost) return false;
      }

      // 2. Status Filter
      if (statusFilter !== "All Statuses") {
        if (item.status !== statusFilter) return false;
      }

      // 3. Date Range Filter
      if (dateRangeFilter !== "All Time") {
        const itemDate = new Date(item.hostPaymentDate || item.date || "");
        const now = new Date();

        if (dateRangeFilter === "Today") {
          const isToday =
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear();
          if (!isToday) return false;
        } else if (dateRangeFilter === "Last 7 Days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          if (!isNaN(itemDate.getTime()) && itemDate < sevenDaysAgo) return false;
        } else if (dateRangeFilter === "This Month") {
          if (!item.hostPaymentDate?.includes("Sep") && !item.date?.includes("Sep")) {
            return false;
          }
        } else if (dateRangeFilter === "Last 30 Days") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          if (!isNaN(itemDate.getTime()) && itemDate < thirtyDaysAgo) return false;
        }
      }

      return true;
    });
  }, [pendingRewards, searchTerm, statusFilter, dateRangeFilter]);

  // Filter payout history
  const filteredPayoutHistory = useMemo(() => {
    return payoutHistory.filter((item) => {
      if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase().trim();
        const matchesId = item.payoutId.toLowerCase().includes(lower);
        const matchesRef = item.referenceId.toLowerCase().includes(lower);
        const matchesMethod = item.method.toLowerCase().includes(lower);
        if (!matchesId && !matchesRef && !matchesMethod) return false;
      }
      return true;
    });
  }, [payoutHistory, searchTerm]);

  // Paginated records
  const currentItems =
    activeTab === "pending" ? filteredPendingRewards : filteredPayoutHistory;
  const totalItems = currentItems.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedPendingRewards = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPendingRewards.slice(start, start + pageSize);
  }, [filteredPendingRewards, currentPage, pageSize]);

  const paginatedPayoutHistory = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPayoutHistory.slice(start, start + pageSize);
  }, [filteredPayoutHistory, currentPage, pageSize]);

  // Handle opening event reward details
  const handleOpenEventDetails = (item: IPendingRewardItem) => {
    setSelectedEventReward(item);
    setSelectedPayoutItem(null);
    setDetailsModalOpen(true);
  };

  // Handle opening payout history details
  const handleOpenPayoutDetails = (item: IPayoutHistoryItem) => {
    setSelectedPayoutItem(item);
    setSelectedEventReward(null);
    setDetailsModalOpen(true);
  };

  const renderStatusBadge = (status: TRewardStatus | string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200/60">
            Pending
          </span>
        );
      case "On Hold":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/60">
            On Hold
          </span>
        );
      case "Paid":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
            Paid
          </span>
        );
      case "Canceled":
      case "Rejected":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
            Canceled
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header with Title and Payout Details Action */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
            Partner Rewards
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
            Track rewards earned from your referred events and view upcoming payouts.
          </p>
        </div>

        {/* Payout Details Button */}
        <button
          type="button"
          onClick={() => dispatch(openPayoutModal())}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#C39B4C] text-[#C39B4C] hover:bg-[#C39B4C]/10 active:scale-[0.98] text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <FileText className="size-4" />
          <span>Payout Details</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Top Summary Cards + Next Payout Banner */}
      {/* ========================================================================= */}
      <PartnerRewardStats stats={calculatedStats} />

      {/* ========================================================================= */}
      {/* 3. Notice Message */}
      {/* ========================================================================= */}
      <p className="text-xs sm:text-sm text-neutral-600 font-medium">
        Partners earn a 10% reward on every eligible paid booking.
      </p>

      {/* ========================================================================= */}
      {/* 4. Tabs: Pending & Approved | Payout History */}
      {/* ========================================================================= */}
      <RewardTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          dispatch(setActiveTab(tab));
          dispatch(setCurrentPage(1));
        }}
      />

      {/* ========================================================================= */}
      {/* 5. Filters Row: Search + Status + Date Range */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              dispatch(setCurrentPage(1));
            }}
            placeholder="Search event or host"
            className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C]/20 shadow-2xs font-work-sans transition-all"
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

        {/* Status Filter */}
        <div className="sm:col-span-3 relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              dispatch(setCurrentPage(1));
            }}
            className="w-full h-10 px-3.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-[#C39B4C] shadow-2xs appearance-none cursor-pointer"
          >
            <option value="All Statuses">Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
            <option value="Paid">Paid</option>
            <option value="Canceled">Canceled</option>
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
            ▼
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="sm:col-span-3 relative">
          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          <select
            value={dateRangeFilter}
            onChange={(e) => {
              setDateRangeFilter(e.target.value);
              dispatch(setCurrentPage(1));
            }}
            className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-[#C39B4C] shadow-2xs appearance-none cursor-pointer"
          >
            <option value="All Time">Date Range</option>
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

      {/* ========================================================================= */}
      {/* 6. Table Card (Pending vs Payout History) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        {activeTab === "pending" ? (
          <PartnerPendingRewardTable
            items={paginatedPendingRewards}
            onViewDetails={handleOpenEventDetails}
          />
        ) : (
          <PartnerPayoutHistoryTable
            items={paginatedPayoutHistory}
            onViewDetails={handleOpenPayoutDetails}
          />
        )}

        {/* ========================================================================= */}
        {/* 7. Pagination & Results Count Footer */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 px-6 border-t border-neutral-100 bg-white text-xs text-neutral-500">
          <p>
            Showing{" "}
            <strong className="text-neutral-900">
              {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </strong>{" "}
            to{" "}
            <strong className="text-neutral-900">
              {Math.min(currentPage * pageSize, totalItems)}
            </strong>{" "}
            of <strong className="text-neutral-900">{totalItems}</strong> results
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
              className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isCurrent = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => dispatch(setCurrentPage(pageNum))}
                  className={cn(
                    "size-8 rounded-lg font-bold text-xs transition-colors flex items-center justify-center cursor-pointer",
                    isCurrent
                      ? "bg-[#C39B4C] text-white shadow-2xs"
                      : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
              }
              className="size-8 rounded-lg border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. Payout Details Modal */}
      {/* ========================================================================= */}
      <PartnerPayoutModal />

      {/* ========================================================================= */}
      {/* 9. Event Reward Details Modal */}
      {/* ========================================================================= */}
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
          className="max-w-md bg-white border border-neutral-200 p-6 font-work-sans text-neutral-900"
        >
          {selectedEventReward && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C39B4C] flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    Event Reward Breakdown
                  </span>
                  {renderStatusBadge(selectedEventReward.status)}
                </div>
                <DialogTitle className="text-lg font-bold font-space-grotesk text-neutral-900 mt-2">
                  {selectedEventReward.eventName}
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500">
                  Referral reward details for booking by {selectedEventReward.hostName}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-3 text-xs">
                {/* Reward Highlight Box */}
                <div className="p-4 rounded-xl bg-[#FCF7ED] border border-[#F3E7D3] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium">Reward Earned (10%)</p>
                    <p className="text-2xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
                      {selectedEventReward.rewardEarned || selectedEventReward.reward}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-neutral-500 font-medium">Payout Date</p>
                    <p className="font-semibold text-neutral-900 mt-0.5 font-space-grotesk">
                      {selectedEventReward.payoutDate || "October 1, 2026"}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <User className="size-3" />
                      Host Name
                    </p>
                    <p className="font-semibold text-neutral-900 mt-1">
                      {selectedEventReward.hostName}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <Calendar className="size-3" />
                      Payment Date
                    </p>
                    <p className="font-semibold text-neutral-900 mt-1">
                      {selectedEventReward.hostPaymentDate || selectedEventReward.date}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <Tag className="size-3" />
                      Package
                    </p>
                    <p className="font-semibold text-neutral-900 mt-1">
                      {selectedEventReward.packageName || "Signature Tier"}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <CreditCard className="size-3" />
                      Eligible Booking
                    </p>
                    <p className="font-semibold text-neutral-900 mt-1">
                      {selectedEventReward.bookingAmount || selectedEventReward.ticketRevenue || "$499.00"}
                    </p>
                  </div>
                </div>

                {/* Status Explanation */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
                  <p className="text-[11px] font-semibold text-neutral-700">Status Details</p>
                  <p className="text-neutral-600 leading-relaxed">
                    {selectedEventReward.status === "Approved" &&
                      "Approved — included in the upcoming payout on October 1, 2026."}
                    {selectedEventReward.status === "Pending" &&
                      "Pending — awaiting standard verification review."}
                    {selectedEventReward.status === "On Hold" &&
                      "On Hold — payment or account issue requires review. Partner support is actively investigating."}
                    {selectedEventReward.status === "Paid" &&
                      "Paid — reward has been disbursed to your registered payout account."}
                    {selectedEventReward.status === "Canceled" &&
                      "Canceled — the booking no longer qualifies for rewards."}
                  </p>
                </div>

                {/* Internal / Audit Note */}
                {selectedEventReward.note && (
                  <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 flex items-start gap-2">
                    <Info className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
                    <p className="text-neutral-600 text-[11px]">{selectedEventReward.note}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="pt-2">
                <button
                  type="button"
                  onClick={() => setDetailsModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close
                </button>
              </DialogFooter>
            </>
          )}

          {selectedPayoutItem && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
                    <FileText className="size-3.5" />
                    Disbursement Record
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {selectedPayoutItem.status}
                  </span>
                </div>
                <DialogTitle className="text-lg font-bold font-space-grotesk text-neutral-900 mt-2">
                  Payout {selectedPayoutItem.payoutId}
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500">
                  Disbursement completed on {selectedPayoutItem.date}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-3 text-xs">
                <div className="p-4 rounded-xl bg-[#FCF7ED] border border-[#F3E7D3] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium">Disbursed Amount</p>
                    <p className="text-2xl font-bold font-space-grotesk text-neutral-900 mt-0.5">
                      {selectedPayoutItem.reward}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-neutral-500 font-medium">Payout Method</p>
                    <p className="font-semibold text-neutral-900 mt-0.5">
                      {selectedPayoutItem.method}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Reference ID:</span>
                    <span className="font-mono font-semibold text-neutral-900">
                      {selectedPayoutItem.referenceId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Disbursement Date:</span>
                    <span className="font-semibold text-neutral-900">
                      {selectedPayoutItem.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Destination Account:</span>
                    <span className="font-semibold text-neutral-900">
                      Chase Bank (•••• 4892)
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <button
                  type="button"
                  onClick={() => setDetailsModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerReward;
