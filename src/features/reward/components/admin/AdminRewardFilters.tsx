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
        <label className="block text-xs font-medium text-neutral-700 mb-1">
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
            className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C39B4C] shadow-2xs"
          />
          <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
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
            className="w-36 pl-3 pr-8 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C39B4C] shadow-2xs"
          />
          <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AdminRewardFilters;

