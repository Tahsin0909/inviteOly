"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IRole } from "@/features/user/user.interface";
import PartnerReward from "./partner/PartnerReward";
import AdminPartnerReward from "./admin/AdminPartnerReward";

interface RewardProps {
  role?: "admin" | "partner" | "host";
}

export const Reward: React.FC<RewardProps> = ({ role }) => {
  const user = useSelector((state: RootState) => state.auth?.user);

  const effectiveRole =
    role || (user?.role === IRole.ADMIN ? "admin" : "partner");

  if (effectiveRole === "admin") {
    return <AdminPartnerReward />;
  }

  return <PartnerReward />;
};

export default Reward;

