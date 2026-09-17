import { AllUserList } from "@/features/user/components/admin/AllUserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management - InviteOnly",
};

export default function AdminUsersPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-space-grotesk text-neutral-900 tracking-tight">
          User Management
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-work-sans leading-relaxed">
          Manage users, roles, and permissions efficiently.
        </p>
      </div>

      {/* User Management List */}
      <AllUserList />
    </div>
  );
}
