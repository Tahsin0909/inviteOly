"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layers,
  Search,
  Eye,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
} from "lucide-react";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import {
  openCreateDrawer,
  openDetailsDrawer,
  openEditDrawer,
  deleteMaterial,
  setActiveTab,
  setSearchQuery,
  TMarketingTab,
} from "../store/marketing.slice";
import { MarketingDrawer } from "./MarketingDrawer";

export const AllMarketing: React.FC = () => {
  const dispatch = useDispatch();
  const { materials, stats, activeTab, searchQuery } = useSelector(
    (state: RootState) => state.marketing
  );

  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(2); // Page 2 as displayed in reference screenshot

  // Filter materials based on activeTab and searchQuery
  const filteredMaterials = materials.filter((item) => {
    // Tab filter
    if (activeTab === "Partner Materials" && item.audience !== "Partner") {
      return false;
    }
    if (activeTab === "Host Materials" && item.audience !== "Host") {
      return false;
    }
    if (activeTab === "Both Audiences" && item.audience !== "Both") {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.fileName.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.audience.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "Host":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "Partner":
        return "bg-[#EEF2FF] text-[#4F46E5]";
      case "Both":
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-[#EAF7EE] text-[#16A34A]";
      case "Draft":
        return "bg-[#FEF3C7] text-[#D97706]";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="w-full space-y-6 font-work-sans pb-16">
      {/* ========================================================================= */}
      {/* 1. Header with Add Material Button */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Marketing
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1">
            Manage marketing materials, promotional content, and campaigns for Partners and Hosts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(openCreateDrawer())}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.99] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add Material</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. Top Summary Stat Cards */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* Total Materials */}
        <div className="bg-white dark:bg-neutral-900/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center text-[#C39B4C] dark:text-amber-400 mb-4">
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              {stats.totalMaterials}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5">
              Total Materials
            </p>
          </div>
        </div>

        {/* Partner Materials */}
        <div className="bg-white dark:bg-neutral-900/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center text-[#C39B4C] dark:text-amber-400 mb-4">
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              {stats.partnerMaterials}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5">
              Partner Materials
            </p>
          </div>
        </div>

        {/* Host Materials */}
        <div className="bg-white dark:bg-neutral-900/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="size-9 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center text-[#C39B4C] dark:text-amber-400 mb-4">
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              {stats.hostMaterials}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-0.5">
              Host Materials
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Filter Tabs & Search Bar */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              "All Materials",
              "Partner Materials",
              "Host Materials",
              "Both Audiences",
            ] as TMarketingTab[]
          ).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => dispatch(setActiveTab(tab))}
              className={cn(
                "px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer",
                activeTab === tab
                  ? "bg-[#C39B4C] text-white shadow-2xs"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="size-4 text-neutral-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search partner, business, or email..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C] transition-all"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Marketing Materials Table */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-neutral-900/40 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/60 text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-space-grotesk">
                <th className="py-3.5 px-5">Material</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated Dates</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
              {filteredMaterials.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  {/* Material Name & File Info */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white font-space-grotesk text-xs sm:text-sm">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-work-sans mt-0.5">
                        {row.fileName} · {row.fileSize}
                      </p>
                    </div>
                  </td>

                  {/* Type Pill */}
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {row.type}
                    </span>
                  </td>

                  {/* User / Audience Pill */}
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-[11px] font-medium",
                        getAudienceBadge(row.audience)
                      )}
                    >
                      {row.audience}
                    </span>
                  </td>

                  {/* Status Pill */}
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-[11px] font-medium",
                        getStatusBadge(row.status)
                      )}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Updated Date */}
                  <td className="py-4 px-4 text-xs text-neutral-600 dark:text-neutral-400 font-work-sans">
                    {row.updatedDate}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right relative">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => dispatch(openDetailsDrawer(row))}
                        title="View Details"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-[#C39B4C] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        <Eye className="size-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveDropdownId(
                              activeDropdownId === row.id ? null : row.id
                            )
                          }
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="size-4" />
                        </button>

                        {activeDropdownId === row.id && (
                          <>
                            <div
                              onClick={() => setActiveDropdownId(null)}
                              className="fixed inset-0 z-20"
                            />
                            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(openDetailsDrawer(row));
                                  setActiveDropdownId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                              >
                                <Eye className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                                <span>View Details</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(openEditDrawer(row));
                                  setActiveDropdownId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                              >
                                <Edit3 className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                                <span>Edit</span>
                              </button>
                              <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(deleteMaterial(row.id));
                                  setActiveDropdownId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                              >
                                <Trash2 className="size-3.5 text-red-500 dark:text-red-400" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMaterials.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    No marketing materials found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-900/60">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={cn(
                "size-8 rounded-lg text-xs font-medium transition-all cursor-pointer",
                currentPage === page
                  ? "bg-[#C39B4C] text-white shadow-2xs font-semibold"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Central Marketing Drawer */}
      <MarketingDrawer />
    </div>
  );
};

export default AllMarketing;