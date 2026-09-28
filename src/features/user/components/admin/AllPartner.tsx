"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
    Search,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Users,
    CheckCircle2,
    Award,
    Tag,
    Plus,
    ShieldAlert,
    UserCheck,
    UserX,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    IAdminPartnerDetails,
    IAdminPartnerListItem,
    TPartnerStatus,
} from "../../user.interface";
import {
    defaultPartnerDetails,
    staticAdminPartners,
    staticAdminPartnerStats,
} from "../../data/adminPartner.data";
import {
    useGetAdminPartnersQuery,
    useUpdatePartnerPreferredMutation,
    useUpdatePartnerStatusMutation,
} from "../../user.api";
import { PartnerDrawer } from "./drawer/PartnerDrawer";

interface AllPartnerProps {
    className?: string;
}

export const AllPartner: React.FC<AllPartnerProps> = ({ className }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"invite" | "details">("details");
    const [selectedPartner, setSelectedPartner] =
        useState<IAdminPartnerDetails | null>(null);

    // Local state for partners table to support immediate optimistic interactions
    const [localPartners, setLocalPartners] =
        useState<IAdminPartnerListItem[]>(staticAdminPartners);

    // RTK Query
    const { data: apiData } = useGetAdminPartnersQuery({
        page: currentPage,
        limit: 10,
        searchTerm: searchTerm || undefined,
        status: statusFilter || undefined,
    });

    const [updatePartnerPreferred] = useUpdatePartnerPreferredMutation();
    const [updatePartnerStatus] = useUpdatePartnerStatusMutation();

    // Combine API data with local fallback
    const partnersList = useMemo(() => {
        const rawData = apiData?.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
            return rawData;
        }
        return localPartners;
    }, [apiData, localPartners]);

    // Filtered partners
    const filteredPartners = useMemo(() => {
        return partnersList.filter((item) => {
            const matchesSearch =
                !searchTerm ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.venueName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                !statusFilter ||
                item.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [partnersList, searchTerm, statusFilter]);

    // Open Details Drawer
    const handleOpenDetails = (partner: IAdminPartnerListItem) => {
        // Generate or fetch full details
        const partnerDetails: IAdminPartnerDetails = {
            ...defaultPartnerDetails,
            id: partner.id,
            name: partner.name,
            email: partner.email,
            businessName: partner.businessName,
            venueName: partner.venueName,
            status: partner.status,
            isPreferred: partner.isPreferred,
            initials:
                partner.initials ||
                partner.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase(),
            avatarUrl: partner.avatarUrl,
            referredEventsCount: partner.eventCount || 17,
            venueCount: 5,
        };

        setSelectedPartner(partnerDetails);
        setDrawerMode("details");
        setIsDrawerOpen(true);
        setActiveMenuId(null);
    };

    // Open Invite Drawer
    const handleOpenInvite = () => {
        setDrawerMode("invite");
        setIsDrawerOpen(true);
    };

    // Toggle Preferred Status
    const handleTogglePreferred = async (
        e: React.MouseEvent,
        partner: IAdminPartnerListItem
    ) => {
        e.stopPropagation();
        const nextPreferred = !partner.isPreferred;

        setLocalPartners((prev) =>
            prev.map((p) =>
                p.id === partner.id ? { ...p, isPreferred: nextPreferred } : p
            )
        );

        if (selectedPartner?.id === partner.id) {
            setSelectedPartner((prev) =>
                prev ? { ...prev, isPreferred: nextPreferred } : null
            );
        }

        setActiveMenuId(null);

        try {
            await updatePartnerPreferred({
                id: partner.id,
                isPreferred: nextPreferred,
            }).unwrap();
        } catch {
            // Local fallback
        }

        if (nextPreferred) {
            toast.success(`${partner.name} marked as Preferred Partner.`);
        } else {
            toast.info(`Preferred status removed for ${partner.name}.`);
        }
    };

    // Change Partner Status
    const handleChangeStatus = async (
        e: React.MouseEvent,
        partner: IAdminPartnerListItem,
        newStatus: TPartnerStatus
    ) => {
        e.stopPropagation();

        setLocalPartners((prev) =>
            prev.map((p) =>
                p.id === partner.id ? { ...p, status: newStatus } : p
            )
        );

        if (selectedPartner?.id === partner.id) {
            setSelectedPartner((prev) =>
                prev ? { ...prev, status: newStatus } : null
            );
        }

        setActiveMenuId(null);

        try {
            await updatePartnerStatus({
                id: partner.id,
                status: newStatus,
            }).unwrap();
        } catch {
            // Local fallback
        }

        toast.success(`Partner status updated to ${newStatus}.`);
    };

    // Callback when updated inside Details Drawer
    const handlePartnerUpdatedInDrawer = (
        updated: Partial<IAdminPartnerDetails>
    ) => {
        if (!selectedPartner) return;
        setLocalPartners((prev) =>
            prev.map((p) =>
                p.id === selectedPartner.id ? { ...p, ...updated } : p
            )
        );
    };

    return (
        <div
            className={cn(
                "w-full space-y-6 font-work-sans text-neutral-800",
                className
            )}
        >
            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                        Partners Management
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Manage partner accounts, venue relationships, referrals, activity,
                        and partner status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleOpenInvite}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B89047] hover:bg-[#A37E36] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="size-4" />
                    Invite Partner
                </button>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Total Partners */}
                <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 dark:bg-amber-950/30 flex items-center justify-center text-[#B89047] dark:text-amber-400">
                        <Users className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                                {staticAdminPartnerStats.totalPartners}
                            </span>
                            <span className="bg-[#E8F8EE] dark:bg-emerald-950/30 text-[#0FA958] dark:text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-md flex items-center">
                                {staticAdminPartnerStats.totalPartnersTrend}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                            Total Partners
                        </p>
                    </div>
                </div>

                {/* Card 2: Active Partners */}
                <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 dark:bg-amber-950/30 flex items-center justify-center text-[#B89047] dark:text-amber-400">
                        <CheckCircle2 className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                                {staticAdminPartnerStats.activePartners}
                            </span>
                            <span className="bg-[#E8F8EE] dark:bg-emerald-950/30 text-[#0FA958] dark:text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-md flex items-center">
                                {staticAdminPartnerStats.activePartnersTrend}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                            Active Partners
                        </p>
                    </div>
                </div>

                {/* Card 3: Preferred Partners */}
                <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 dark:bg-amber-950/30 flex items-center justify-center text-[#B89047] dark:text-amber-400">
                        <Award className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                                {staticAdminPartnerStats.preferredPartners}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                            Preferred Partners
                        </p>
                    </div>
                </div>

                {/* Card 4: Referred Events */}
                <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                    <div className="size-11 rounded-xl bg-[#B89047]/10 dark:bg-amber-950/30 flex items-center justify-center text-[#B89047] dark:text-amber-400">
                        <Tag className="size-5" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                                {staticAdminPartnerStats.referredEvents}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                            Referred Events
                        </p>
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search partner, business, or email..."
                        className="w-full h-11 pl-11 pr-4 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#B89047] focus:ring-1 focus:ring-[#B89047]/20 shadow-2xs font-work-sans transition-all"
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                    <button
                        type="button"
                        onClick={() =>
                            setStatusFilter((prev) => (prev === "Active" ? null : "Active"))
                        }
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border shadow-2xs",
                            statusFilter === "Active"
                                ? "bg-[#B89047] text-white border-[#B89047]"
                                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        )}
                    >
                        Active Partner
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setStatusFilter((prev) =>
                                prev === "Deactivate" ? null : "Deactivate"
                            )
                        }
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border shadow-2xs",
                            statusFilter === "Deactivate"
                                ? "bg-[#B89047] text-white border-[#B89047]"
                                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        )}
                    >
                        Deactivate Partner
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setStatusFilter((prev) =>
                                prev === "Suspended" ? null : "Suspended"
                            )
                        }
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border shadow-2xs",
                            statusFilter === "Suspended"
                                ? "bg-[#B89047] text-white border-[#B89047]"
                                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        )}
                    >
                        Suspended Partner
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[850px]">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/60">
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Partner
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Business / Venue
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Status
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Event Count
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Preferred
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk">
                                    Join Dates
                                </th>
                                <th className="py-3.5 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-space-grotesk text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredPartners.length > 0 ? (
                                filteredPartners.map((partner) => (
                                    <tr
                                        key={partner.id}
                                        onClick={() => handleOpenDetails(partner)}
                                        className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                                    >
                                        {/* Partner: Avatar + Name + Email */}
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3">
                                                {partner.avatarUrl ? (
                                                    <div className="relative size-9 rounded-full overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
                                                        <Image
                                                            src={partner.avatarUrl}
                                                            alt={partner.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="size-9 rounded-full bg-[#FDF6E2] dark:bg-amber-950/40 text-[#B89047] dark:text-amber-400 font-semibold text-xs flex items-center justify-center shrink-0 border border-[#FDE68A]/60 dark:border-amber-800/40 font-space-grotesk">
                                                        {partner.initials || "PT"}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-[#B89047] transition-colors">
                                                        {partner.name}
                                                    </p>
                                                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-work-sans">
                                                        {partner.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Business / Venue */}
                                        <td className="py-4 px-5">
                                            <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                                                {partner.businessName}
                                            </p>
                                            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-work-sans">
                                                {partner.venueName}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-5">
                                            <span
                                                className={cn(
                                                    "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                                                    partner.status === "Active"
                                                        ? "bg-[#E8F8EE] dark:bg-emerald-950/30 text-[#0FA958] dark:text-emerald-400"
                                                        : partner.status === "Deactivate"
                                                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                                            : "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400"
                                                )}
                                            >
                                                {partner.status}
                                            </span>
                                        </td>

                                        {/* Event Count */}
                                        <td className="py-4 px-5 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                            {String(partner.eventCount).padStart(2, "0")}
                                        </td>

                                        {/* Preferred */}
                                        <td className="py-4 px-5">
                                            {partner.isPreferred ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF7EC] dark:bg-amber-950/30 text-[#B89047] dark:text-amber-400 border border-[#FDE68A]/60 dark:border-amber-800/40">
                                                    Preferred
                                                </span>
                                            ) : (
                                                <span className="text-neutral-400 dark:text-neutral-500 text-sm font-medium">
                                                    --
                                                </span>
                                            )}
                                        </td>

                                        {/* Join Dates */}
                                        <td className="py-4 px-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                                            {partner.joinDate}
                                        </td>

                                        {/* Actions */}
                                        <td
                                            className="py-4 px-5 text-right relative"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenDetails(partner)}
                                                    className="size-8 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="size-4" />
                                                </button>

                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveMenuId((prev) =>
                                                                prev === partner.id ? null : partner.id
                                                            )
                                                        }
                                                        className="size-8 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                                                        title="Actions"
                                                    >
                                                        <MoreVertical className="size-4" />
                                                    </button>

                                                    {/* Action Dropdown Menu */}
                                                    {activeMenuId === partner.id && (
                                                        <div className="absolute right-0 top-9 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleOpenDetails(partner)}
                                                                className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                                            >
                                                                <Eye className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                                                                View Full Profile
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={(e) =>
                                                                    handleTogglePreferred(e, partner)
                                                                }
                                                                className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                                            >
                                                                <Award className="size-3.5 text-[#B89047] dark:text-amber-400" />
                                                                {partner.isPreferred
                                                                    ? "Remove Preferred"
                                                                    : "Make Preferred"}
                                                            </button>

                                                            <div className="border-t border-neutral-100 dark:border-neutral-800 my-1" />

                                                            {partner.status !== "Active" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) =>
                                                                        handleChangeStatus(e, partner, "Active")
                                                                    }
                                                                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 flex items-center gap-2"
                                                                >
                                                                    <UserCheck className="size-3.5" />
                                                                    Mark as Active
                                                                </button>
                                                            )}

                                                            {partner.status !== "Deactivate" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) =>
                                                                        handleChangeStatus(e, partner, "Deactivate")
                                                                    }
                                                                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                                                >
                                                                    <UserX className="size-3.5" />
                                                                    Mark as Deactivated
                                                                </button>
                                                            )}

                                                            {partner.status !== "Suspended" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) =>
                                                                        handleChangeStatus(e, partner, "Suspended")
                                                                    }
                                                                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                                                                >
                                                                    <ShieldAlert className="size-3.5" />
                                                                    Mark as Suspended
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-12 text-center text-sm text-neutral-400 dark:text-neutral-500 font-medium"
                                    >
                                        No partners found matching your search.
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
                        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40"
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
                        className="size-8 rounded-lg border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40"
                        disabled={currentPage === 5}
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>

            {/* Slide-over Partner Drawer */}
            <PartnerDrawer
                isOpen={isDrawerOpen}
                mode={drawerMode}
                partner={selectedPartner}
                onClose={() => setIsDrawerOpen(false)}
                onPartnerUpdated={handlePartnerUpdatedInDrawer}
            />
        </div>
    );
};

export default AllPartner;

