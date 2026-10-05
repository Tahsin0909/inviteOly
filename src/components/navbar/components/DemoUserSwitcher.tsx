"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { IUser, IRole } from "@/features/user/user.interface";
import { mockUsers, getTokenForUser, currentUser as defaultFallbackUser } from "@/features/user/data/user.data";
import { setUser, setToken } from "@/features/auth/store/auth.slice";
import { saveToken } from "@/utils/tokenHandler";
import { Check, Sparkles, Shield, User, Building2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface DemoUserSwitcherProps {
  onSelectUser?: () => void;
}

export const DemoUserSwitcher: React.FC<DemoUserSwitcherProps> = ({ onSelectUser }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const authUser = useSelector((state: RootState) => state.auth.user);
  const activeUser = authUser || defaultFallbackUser;

  const getTargetRouteForUser = (user: IUser): string => {
    if (user.role === IRole.ADMIN) {
      return "/admin";
    }
    if (user.role === IRole.PARTNER) {
      return "/partner";
    }
    if (user.role === IRole.HOST || user.role === IRole.USER) {
      // If referred host, direct to referred create event route!
      if (user.referredBy || user.referredByHostId) {
        return "/host/r-create-events";
      }
      return "/host";
    }
    return "/dashboard";
  };

  const handleSwitchUser = (user: IUser) => {
    const token = getTokenForUser(user);

    // 1. Update Redux Auth state
    dispatch(setUser(user));
    dispatch(setToken(token));

    // 2. Persist to storage & cookies
    saveToken(token);

    // 3. Determine target route
    const targetRoute = getTargetRouteForUser(user);

    const roleLabel =
      user.role === IRole.HOST && user.referredBy
        ? "Referred Host"
        : user.role === IRole.PARTNER && user.partnerType
          ? `${user.partnerType} Partner`
          : user.role;

    toast.success(`Switched to ${user.firstName} ${user.lastName} (${roleLabel})`);

    // 4. Close dropdown if handler provided
    if (onSelectUser) {
      onSelectUser();
    }

    // 5. Navigate to target dashboard/route
    router.push(targetRoute);
  };

  const getRoleBadge = (user: IUser) => {
    if (user.role === IRole.ADMIN) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/30 px-1.5 py-0.5 rounded-full">
          <Shield className="size-2.5" />
          Admin
        </span>
      );
    }
    if (user.role === IRole.PARTNER) {
      const partnerLabel = user.partnerType
        ? `${user.partnerType} Partner`
        : "Partner";
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 dark:border-sky-500/30 px-1.5 py-0.5 rounded-full">
          <Building2 className="size-2.5" />
          {partnerLabel}
        </span>
      );
    }
    if (user.referredBy || user.referredByHostId) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-500/30 px-1.5 py-0.5 rounded-full">
          <Sparkles className="size-2.5" />
          Referred Host
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8C6B28] dark:text-[#E5C170] bg-[#C39B4C]/10 dark:bg-[#C39B4C]/15 border border-[#C39B4C]/25 dark:border-[#C39B4C]/30 px-1.5 py-0.5 rounded-full">
        <User className="size-2.5" />
        Host
      </span>
    );
  };

  return (
    <div className="py-1 px-1 font-work-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 mb-1 text-xs">
        <span className="font-semibold text-neutral-500 dark:text-neutral-400 text-[11px] tracking-wide uppercase">
          Demo Switcher
        </span>
        <span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/80 px-1.5 py-0.5 rounded border border-neutral-300/60 dark:border-neutral-700/60">
          Click to switch
        </span>
      </div>

      {/* User list */}
      <div className="space-y-1">
        {mockUsers.map((user) => {
          const isSelected = activeUser?.id === user.id;
          const targetRoute = getTargetRouteForUser(user);

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => handleSwitchUser(user)}
              className={`w-full text-left p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${isSelected
                  ? "bg-[#C39B4C]/10 dark:bg-[#C39B4C]/15 border border-[#C39B4C]/40 dark:border-[#C39B4C]/50 shadow-xs"
                  : "hover:bg-neutral-200/60 dark:hover:bg-neutral-800/70 border border-transparent"
                }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* User Avatar Circle */}
                <div
                  className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isSelected
                      ? "bg-[#C39B4C]/20 dark:bg-[#C39B4C]/25 text-[#8C6B28] dark:text-[#E5C170] border border-[#C39B4C]/40 dark:border-[#C39B4C]/50"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-300/70 dark:border-neutral-700/80 group-hover:bg-neutral-300/80 dark:group-hover:bg-neutral-700"
                    }`}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>

                {/* User Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate group-hover:text-[#C39B4C] dark:group-hover:text-[#E5C170] transition-colors">
                      {user.firstName} {user.lastName}
                    </p>
                    {getRoleBadge(user)}
                  </div>
                  {user.businessName && (
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      {user.businessName}
                    </p>
                  )}
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate flex items-center gap-1 mt-0.5">
                    <span>Redirects:</span>
                    <span className="font-mono text-neutral-700 dark:text-neutral-300 font-medium">
                      {targetRoute}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status / Selection Indicator */}
              <div className="shrink-0 ml-2">
                {isSelected ? (
                  <div className="size-5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30 dark:border-emerald-500/40">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                ) : (
                  <ArrowRight className="size-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DemoUserSwitcher;

