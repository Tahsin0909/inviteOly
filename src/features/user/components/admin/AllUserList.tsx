"use client";

import { cn } from "@/lib/utils";
import {
    Ban,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    Search,
    ShieldCheck,
    Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { staticAdminUsers } from "../../data/adminUser.data";
import { useGetAdminUsersQuery } from "../../user.api";
import { IAdminUserListItem } from "../../user.interface";

interface AllUserListProps {
    className?: string;
}

export const AllUserList: React.FC<AllUserListProps> = ({ className }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("All role");
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    // Local state for venue partner verification status
    const [verificationMap, setVerificationMap] = useState<Record<string, boolean>>(() => {
        const initialMap: Record<string, boolean> = {};
        staticAdminUsers.forEach((u) => {
            if (u.isVerified) {
                initialMap[u.id] = true;
            }
        });
        return initialMap;
    });

    const { data: apiData } = useGetAdminUsersQuery({
        searchTerm: searchTerm || undefined,
        role: selectedRole !== "All role" && selectedRole !== "Venue Partner" ? selectedRole : undefined,
        page: currentPage,
        limit: 10,
    });

    const rawData = apiData?.data;
    const users: IAdminUserListItem[] = Array.isArray(rawData)
        ? rawData
        : rawData && "data" in rawData && Array.isArray(rawData.data)
            ? (rawData.data as IAdminUserListItem[])
            : staticAdminUsers;

    // Filter users based on search term and role filter
    const filteredUsers = useMemo(() => {
        return users.filter((user: IAdminUserListItem) => {
            const matchesSearch =
                !searchTerm ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.partnerType && user.partnerType.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesRole =
                selectedRole === "All role" ||
                (selectedRole === "Venue Partner"
                    ? user.role.toLowerCase() === "partner" && user.partnerType?.toLowerCase() === "venue"
                    : user.role.toLowerCase() === selectedRole.toLowerCase());

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, selectedRole]);

    const handleDeleteUser = (e: React.MouseEvent, user: IAdminUserListItem) => {
        e.stopPropagation();
        toast.success(`User ${user.name} removed successfully.`);
    };

    const handleSuspendUser = (e: React.MouseEvent, user: IAdminUserListItem) => {
        e.stopPropagation();
        toast.info(`Account status updated for ${user.name}.`);
    };

    const handleVerifyVenuePartner = (e: React.MouseEvent, user: IAdminUserListItem) => {
        e.stopPropagation();
        const currentlyVerified = verificationMap[user.id] ?? !!user.isVerified;
        const newStatus = !currentlyVerified;

        setVerificationMap((prev) => ({
            ...prev,
            [user.id]: newStatus,
        }));

        if (newStatus) {
            toast.success(`Venue Partner "${user.name}" has been verified successfully!`);
        } else {
            toast.info(`Verification revoked for Venue Partner "${user.name}".`);
        }
    };

    return (
        <div className={cn("w-full space-y-5", className)}>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Name, email, ID or partner type..."
                        className="w-full h-11 pl-11 pr-4 rounded-full border border-neutral-200/80 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C39B4C] focus:ring-1 focus:ring-[#C39B4C]/20 shadow-2xs font-work-sans transition-colors"
                    />
                </div>

                {/* Role Dropdown Filter */}
                <div className="relative self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
                        className="h-11 px-4 rounded-xl border border-neutral-200/80 bg-white text-xs sm:text-sm text-neutral-700 flex items-center gap-2 cursor-pointer shadow-2xs hover:border-neutral-300 font-work-sans transition-colors select-none"
                    >
                        <span>{selectedRole}</span>
                        <ChevronDown className="size-4 text-neutral-400" />
                    </button>

                    {isRoleDropdownOpen && (
                        <div className="absolute right-0 mt-1.5 w-40 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg z-30 font-work-sans text-xs sm:text-sm animate-in fade-in zoom-in-95">
                            {["All role", "Host", "Partner", "Venue Partner"].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => {
                                        setSelectedRole(role);
                                        setIsRoleDropdownOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors cursor-pointer",
                                        selectedRole === role
                                            ? "text-[#B89047] font-semibold bg-[#FDFBF7]"
                                            : "text-neutral-700"
                                    )}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Users Table */}
            <div className="border border-neutral-200/70 rounded-2xl bg-white shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-200/70 bg-white">
                                <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                                    Name
                                </th>
                                <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                                    User Role
                                </th>
                                <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                                    Join Dates
                                </th>
                                <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                                    Event Count
                                </th>
                                <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-neutral-500 font-work-sans">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => {
                                    const isVenuePartner =
                                        user.role.toLowerCase() === "partner" &&
                                        user.partnerType?.toLowerCase() === "venue";
                                    const isVerified = verificationMap[user.id] ?? !!user.isVerified;

                                    return (
                                        <tr
                                            key={user.id}
                                            onClick={() => router.push(`/admin/users/${user.id}`)}
                                            className="hover:bg-neutral-50/60 transition-colors duration-150 cursor-pointer group"
                                        >
                                            {/* Name & Avatar Column */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full overflow-hidden bg-neutral-100 shrink-0 relative border border-neutral-200/60">
                                                        <Image
                                                            src={user.avatarUrl}
                                                            alt={user.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover size-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-neutral-900 font-work-sans group-hover:text-[#B89047] transition-colors">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-xs text-neutral-400 font-work-sans">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role & Partner Type & Verification Badge */}
                                            <td className="py-4 px-6 text-sm text-neutral-700 font-work-sans whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-neutral-900">
                                                        {user.role}
                                                    </span>
                                                    {user.partnerType && (
                                                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF9EE] text-[#B58500] border border-[#FDE68A]/60">
                                                            {user.partnerType}
                                                        </span>
                                                    )}
                                                    {isVenuePartner && (
                                                        isVerified ? (
                                                            <span
                                                                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                                                                title="Verified Venue Partner"
                                                            >
                                                                <CheckCircle2 className="size-3 text-emerald-600" />
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200"
                                                                title="Pending Admin Verification"
                                                            >
                                                                <Clock className="size-3 text-amber-600" />
                                                                Pending
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>

                                            {/* Join Dates */}
                                            <td className="py-4 px-6 text-sm text-neutral-700 font-work-sans whitespace-nowrap">
                                                {user.joinDate}
                                            </td>

                                            {/* Event Count (e.g. 02/05) */}
                                            <td className="py-4 px-6 text-sm font-work-sans whitespace-nowrap">
                                                <span className="font-bold text-neutral-900">
                                                    {String(user.eventCount.active).padStart(2, "0")}
                                                </span>
                                                <span className="text-neutral-500">
                                                    /{String(user.eventCount.total).padStart(2, "0")}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Verify Venue Partner Action Button - ONLY for Partner with partnerType === "Venue" */}
                                                    {isVenuePartner && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleVerifyVenuePartner(e, user)}
                                                            className={cn(
                                                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs font-work-sans",
                                                                isVerified
                                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                                                                    : "bg-[#C39B4C] text-white hover:bg-[#B38A3B] border border-[#C39B4C]"
                                                            )}
                                                            title={
                                                                isVerified
                                                                    ? "Venue Partner verified (click to toggle)"
                                                                    : "Verify this Venue Partner"
                                                            }
                                                        >
                                                            {isVerified ? (
                                                                <>
                                                                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                                                                    <span>Verified</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ShieldCheck className="size-3.5 text-white" />
                                                                    <span>Verify Venue</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {/* Eye (View Profile) */}
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                                                        title="View user details"
                                                    >
                                                        <Eye className="size-4" />
                                                    </Link>

                                                    {/* Trash (Delete) */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDeleteUser(e, user)}
                                                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>

                                                    {/* Ban / Slash-circle (Suspend) */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleSuspendUser(e, user)}
                                                        className="p-1.5 text-neutral-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                                        title="Suspend user"
                                                    >
                                                        <Ban className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="py-6 flex items-center justify-center gap-1.5 border-t border-neutral-100 font-work-sans select-none">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="size-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
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
                                        ? "bg-[#B89047] text-white font-semibold shadow-xs"
                                        : "text-neutral-600 hover:bg-neutral-100"
                                )}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                        className="size-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllUserList;
