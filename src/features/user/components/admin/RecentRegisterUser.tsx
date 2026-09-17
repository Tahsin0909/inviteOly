"use client";

import { staticRecentRegisteredUsers } from "@/features/metrics/data/adminMetrics.data";
import { IRecentRegisteredUser } from "@/features/metrics/metrics.interface";
import { cn } from "@/lib/utils";
import React from "react";

interface RecentRegisterUserProps {
    users?: IRecentRegisteredUser[];
    className?: string;
}

export const RecentRegisterUser: React.FC<RecentRegisterUserProps> = ({
    users,
    className,
}) => {
    const userList = users || staticRecentRegisteredUsers;

    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/70 shadow-xs",
                className
            )}
        >
            <h2 className="text-sm sm:text-base font-semibold text-neutral-900 font-work-sans mb-4">
                Recent Registered User
            </h2>

            {/* Table Box */}
            <div className="border border-neutral-200/80 rounded-xl overflow-hidden bg-white">
                {/* Table Header */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200/80 bg-white">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                        User Name
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 font-work-sans">
                        User Role
                    </span>
                </div>

                {/* User Rows */}
                <div className="divide-y divide-neutral-100">
                    {userList.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between px-6 py-3.5 sm:py-4 hover:bg-neutral-50/50 transition-colors duration-150"
                        >
                            <span className="text-xs sm:text-sm text-neutral-900 font-work-sans">
                                {user.name}
                            </span>
                            <span className="text-xs sm:text-sm text-neutral-700 font-work-sans">
                                {user.role}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentRegisterUser;

