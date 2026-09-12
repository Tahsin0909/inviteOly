"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommissionRate } from "../../store/reward.slice";
import { toast } from "sonner";

interface AdminCommissionControlProps {
  currentRate: number;
}

export const AdminCommissionControl: React.FC<AdminCommissionControlProps> = ({
  currentRate,
}) => {
  const dispatch = useDispatch();
  const [localCommission, setLocalCommission] = useState<string>(
    String(currentRate || 20)
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setLocalCommission(String(currentRate || 20));
  }, [currentRate]);

  const handleApply = () => {
    const cleanStr = localCommission.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleanStr);

    if (isNaN(num) || num < 0 || num > 100) {
      toast.error("Please enter a valid commission percentage between 0 and 100");
      return;
    }

    dispatch(setCommissionRate(num));
    setIsSaved(true);
    toast.success(`Commission rate updated to ${num}%`);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col sm:items-end gap-1 font-work-sans">
      <span className="text-xs text-neutral-600 font-medium">Commission %</span>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            value={localCommission}
            onChange={(e) => setLocalCommission(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApply();
            }}
            placeholder="20%"
            className="w-20 px-3 py-1.5 border border-neutral-200 rounded-lg text-xs font-semibold text-center text-neutral-800 focus:outline-none focus:border-[#C39B4C] bg-white shadow-2xs"
          />
          {!localCommission.includes("%") && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none">
              %
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-1.5 bg-[#C39B4C] hover:bg-[#B38A3B] active:scale-[0.98] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
        >
          Apply
        </button>
      </div>

      {isSaved && (
        <span className="text-[11px] text-emerald-600 font-medium">
          Saved!
        </span>
      )}
    </div>
  );
};

export default AdminCommissionControl;

