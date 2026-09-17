"use client";

import { UserEvent } from "@/features/event/components/admin/UserEvent";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import {
  getAdminUserProfileById,
  staticAdminUserProfile,
} from "../../data/adminUser.data";
import { useGetAdminUserProfileQuery, useSuspendUserMutation } from "../../user.api";
import { IAdminUserProfile } from "../../user.interface";

interface AdminUserDetailsProps {
  userId: string;
  className?: string;
}

export const AdminUserDetails: React.FC<AdminUserDetailsProps> = ({
  userId,
  className,
}) => {
  const { data: apiData } = useGetAdminUserProfileQuery(userId);
  const [suspendUserMutation] = useSuspendUserMutation();

  const user: IAdminUserProfile =
    apiData?.data || getAdminUserProfileById(userId) || staticAdminUserProfile;

  const handleSuspendUser = async () => {
    try {
      await suspendUserMutation(userId);
      toast.success(`User ${user.name} has been suspended.`);
    } catch {
      toast.info(`Account status updated for ${user.name}.`);
    }
  };

  return (
    <div className={cn("w-full space-y-6 pb-12", className)}>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors font-work-sans group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Users</span>
        </Link>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900">
        User Profile
      </h1>

      {/* Hero Profile Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-xs">
        {/* Banner with blurry green / nature overlay */}
        <div className="relative w-full h-32 sm:h-40 bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 overflow-hidden">
          <Image
            src={user.bannerUrl || "/dashboardMetricsBg.png"}
            alt="User Profile Banner"
            fill
            priority
            className="object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/30" />
        </div>

        {/* User Info with Overlapping Avatar */}
        <div className="px-6 sm:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* Left: Avatar & Text */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="relative size-20 sm:size-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-10 sm:-mt-12 shrink-0 bg-neutral-100">
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-neutral-900">
                  {user.name}
                </h2>
                <div className="text-xs sm:text-sm text-neutral-500 font-work-sans space-y-0.5 mt-1">
                  <p>Email: {user.email}</p>
                  <p>Address: {user.address}</p>
                  <p>Current Plan: {user.currentPlan}</p>
                </div>
              </div>
            </div>

            {/* Right: Suspend User Button */}
            <button
              type="button"
              onClick={handleSuspendUser}
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer font-work-sans self-start sm:self-end shadow-xs"
            >
              Suspend User
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Details Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]/60">
          <h3 className="text-sm sm:text-base font-bold font-space-grotesk text-neutral-900">
            Subscription Details
          </h3>
        </div>

        <div className="divide-y divide-neutral-100">
          <div className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-sm font-work-sans">
            <span className="text-neutral-500">Plan</span>
            <span className="font-semibold text-neutral-900">{user.subscription.plan}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-sm font-work-sans">
            <span className="text-neutral-500">Price</span>
            <span className="font-semibold text-neutral-900">{user.subscription.price}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-sm font-work-sans">
            <span className="text-neutral-500">Last Event Date</span>
            <span className="font-semibold text-neutral-900">{user.subscription.lastEventDate}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-sm font-work-sans">
            <span className="text-neutral-500">Total Event</span>
            <span className="font-semibold text-neutral-900">{user.subscription.totalEvent}</span>
          </div>
        </div>
      </div>

      {/* User Events Grid */}
      <UserEvent events={user.events} />
    </div>
  );
};

export default AdminUserDetails;

