"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/features/event/store/createEvent.slice";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    UserCheck,
} from "lucide-react";
import {
    StepPackage,
    StepEventDetails,
    StepEventSettings,
    StepPreviewTicket,
    StepGuestList,
} from "../create-events/steps";

interface IStepItem {
    id: number;
    numberStr: string;
    title: string;
}

const STEPS: IStepItem[] = [
    { id: 1, numberStr: "01", title: "Package" },
    { id: 2, numberStr: "02", title: "Event Details" },
    { id: 3, numberStr: "03", title: "Event Settings" },
    { id: 4, numberStr: "04", title: "Preview Ticket" },
    { id: 5, numberStr: "05", title: "Guest List" },
];

export const RefereedCreateEvents: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { user, profile } = useAuth();
    const currentStep = useSelector(
        (state: RootState) => state.createEvent?.currentStep || 1
    );

    // If redirected with ?step=X from payment or links, sync Redux step
    const urlStep = searchParams?.get("step");
    useEffect(() => {
        if (urlStep) {
            const stepNum = Number(urlStep);
            if (stepNum >= 1 && stepNum <= 5) {
                dispatch(setCurrentStep(stepNum));
            }
        }
    }, [urlStep, dispatch]);

    const activeUser = user || profile;
    const referrerName =
        activeUser?.referredBy ||
        activeUser?.referredByHostName ||
        "James Smith (Host Partner)";
    const referralCode = activeUser?.referralCode || "HOST-REF-SMITH26";

    const renderCurrentStepComponent = () => {
        switch (currentStep) {
            case 1:
                return <StepPackage />;
            case 2:
                return <StepEventDetails />;
            case 3:
                return <StepEventSettings />;
            case 4:
                return <StepPreviewTicket />;
            case 5:
                return <StepGuestList />;
            default:
                return <StepPackage />;
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            dispatch(setCurrentStep(currentStep + 1));
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            dispatch(setCurrentStep(currentStep - 1));
        }
    };

    return (
        <div className="w-full space-y-8 font-work-sans pb-16">
            {/* Top Back Link */}
            <button
                type="button"
                onClick={() => router.push("/host/events")}
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer group"
            >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Events Management</span>
            </button>

            {/* Page Header with Referred Host Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                            Create Event
                        </h1>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D97706] border border-amber-200/60 shadow-2xs">
                            <Sparkles className="h-3 w-3" />
                            Referred Host
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 font-work-sans">
                        Follow the steps below to configure your event under your referral benefits.
                    </p>
                </div>

                {/* Referrer Details Card */}
                <div className="inline-flex items-center gap-3 rounded-xl bg-neutral-50 border border-neutral-200/80 px-3.5 py-2 text-xs self-start sm:self-auto shadow-2xs">
                    <div className="h-7 w-7 rounded-full bg-[#C39B4C]/10 text-[#C39B4C] flex items-center justify-center font-bold font-space-grotesk text-xs">
                        <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-[11px] text-neutral-400 leading-none">Referred by</p>
                        <p className="font-semibold text-neutral-800 text-xs mt-0.5">
                            {referrerName}
                        </p>
                    </div>
                    <div className="border-l border-neutral-200 pl-3 ml-1">
                        <span className="font-mono text-[11px] text-[#C39B4C] font-semibold">
                            {referralCode}
                        </span>
                    </div>
                </div>
            </div>

            {/* Referral Perks Notice */}
            <div className="flex items-center gap-3 rounded-xl bg-amber-50/70 border border-[#C39B4C]/30 p-3.5 text-xs text-amber-900">
                <Sparkles className="h-4 w-4 text-[#C39B4C] shrink-0" />
                <span>
                    <strong>Host Referral Benefit Active:</strong> Because you were referred by{" "}
                    <strong>{referrerName}</strong>, your account receives expedited invoice processing,
                    custom ticket branding, and VIP attendee roster allocation.
                </span>
            </div>

            {/* Stepper matching media_1789206859662.png */}
            <div className="w-full max-w-4xl mx-auto py-4 px-4">
                <div className="relative flex items-center justify-between">
                    {/* Connecting Line behind the circles */}
                    <div className="absolute left-6 right-6 top-4 h-[1.5px] bg-neutral-400/80 -translate-y-1/2 z-0" />

                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep || (currentStep === 5 && step.id <= 5);
                        const isActive = step.id === currentStep;

                        return (
                            <div
                                key={step.id}
                                onClick={() => dispatch(setCurrentStep(step.id))}
                                className="relative z-10 flex flex-col items-center cursor-pointer group"
                            >
                                {/* Circle node */}
                                <div
                                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all ${isCompleted
                                        ? "bg-[#0FA958] text-white shadow-2xs"
                                        : isActive
                                            ? "bg-white border-2 border-[#0FA958] text-[#0FA958] font-semibold ring-4 ring-[#0FA958]/10"
                                            : "bg-white border border-neutral-500 text-neutral-700 font-medium group-hover:border-neutral-700"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <Check className="h-4 w-4 stroke-[3]" />
                                    ) : (
                                        <span className="text-xs sm:text-[13px] font-space-grotesk leading-none">
                                            {step.numberStr}
                                        </span>
                                    )}
                                </div>

                                {/* Step Title Label */}
                                <span
                                    className={`mt-2.5 text-xs sm:text-[13px] font-work-sans text-center whitespace-nowrap transition-colors ${isActive
                                        ? "font-semibold text-neutral-900"
                                        : isCompleted
                                            ? "font-medium text-neutral-800"
                                            : "text-neutral-600 group-hover:text-neutral-900"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Current Step Component */}
            <div className="w-full max-w-4xl mx-auto">
                {renderCurrentStepComponent()}
            </div>

            {/* Step Navigation Controls */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-2">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous Step</span>
                </button>

                <span className="text-xs text-neutral-400 font-medium">
                    Step {currentStep} of {STEPS.length}
                </span>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === STEPS.length}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#C39B4C] hover:bg-[#b08b3e] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer shadow-2xs"
                >
                    <span>{currentStep === STEPS.length ? "Finish" : "Next Step"}</span>
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default RefereedCreateEvents;