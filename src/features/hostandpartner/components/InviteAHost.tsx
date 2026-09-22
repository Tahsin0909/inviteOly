"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HostInviteList from "./HostInviteList";
import InviteHostForm from "./InviteHostForm";

export const InviteAHost: React.FC = () => {
    const { activeView } = useSelector(
        (state: RootState) => state.hostandpartner
    );

    return (
        <div className="w-full">
            {activeView === "invite-form" && <InviteHostForm />}
            {activeView === "list" && <HostInviteList />}
            {/* Fallback for any legacy select-plan state to directly show invite-form */}
            {activeView === "select-plan" && <InviteHostForm />}
        </div>
    );
};

export default InviteAHost;