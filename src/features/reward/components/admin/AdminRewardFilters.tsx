"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { setDateFilter } from "../../store/reward.slice";
import { Calendar } from "lucide-react";

interface AdminRewardFiltersProps {
  dateFrom: string;
  dateTo: string;
}

export const AdminRewardFilters: React.FC<AdminRewardFiltersProps> = ({
  dateFrom,
  dateTo,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 font-work-sans">
      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Date From
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="mm/dd/yy"
            value={dateFrom}
            onChange={(e) =>
              dispatch(setDateFilter({ dateFrom: e.target.value, dateTo }))
            }
            className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#C39B4C] shadow-2xs"
          />
          <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Date To
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="mm/dd/yy"
            value={dateTo}
            onChange={(e) =>
              dispatch(setDateFilter({ dateFrom, dateTo: e.target.value }))
            }
            className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#C39B4C] shadow-2xs"
          />
          <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AdminRewardFilters;

