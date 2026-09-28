"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { setCurrentStep } from "@/features/event/store/createEvent.slice";
import { RootState } from "@/redux/store";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    StepEventDetails,
    StepEventSettings,
    StepGuestList,
    StepPackage,
    StepPreviewTicket,
    StepEventPreview,
} from "./steps";

interface IStepItem {
    id: number;
    numberStr: string;
    title: string;
}

export const CreateEvents: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { user, profile } = useAuth();

    // Read packageSelection and currentStep from Redux store
    const packageSelection = useSelector(
        (state: RootState) => state.createEvent?.packageSelection
    );
    const isStandard =
        packageSelection?.tier?.toLowerCase() === "standard" ||
        packageSelection?.packageName?.toLowerCase().includes("standard");

    const steps: IStepItem[] = isStandard
        ? [
            { id: 1, numberStr: "01", title: "Package" },
            { id: 2, numberStr: "02", title: "Event Details" },
            { id: 3, numberStr: "03", title: "Event Settings" },
            { id: 4, numberStr: "04", title: "Preview Ticket" },
            { id: 5, numberStr: "05", title: "Preview" },
        ]
        : [
            { id: 1, numberStr: "01", title: "Package" },
            { id: 2, numberStr: "02", title: "Event Details" },
            { id: 3, numberStr: "03", title: "Event Settings" },
            { id: 4, numberStr: "04", title: "Preview Ticket" },
            { id: 5, numberStr: "05", title: "Guest List" },
            { id: 6, numberStr: "06", title: "Preview" },
        ];

    const currentStep = useSelector(
        (state: RootState) => state.createEvent?.currentStep || 1
    );

    // If redirected with ?step=X from payment or links, sync Redux step
    const urlStep = searchParams?.get("step");
    useEffect(() => {
        if (urlStep) {
            const stepNum = Number(urlStep);
            const maxStep = isStandard ? 5 : 6;
            if (stepNum >= 1 && stepNum <= maxStep) {
                dispatch(setCurrentStep(stepNum));
            }
        }
    }, [urlStep, isStandard, dispatch]);

    // Ensure step does not exceed max step for standard
    useEffect(() => {
        if (isStandard && currentStep > 5) {
            dispatch(setCurrentStep(5));
        }
    }, [isStandard, currentStep, dispatch]);

    useEffect(() => {
        const activeUser = user || profile;
        const isReferred = Boolean(
            activeUser?.referredBy ||
            activeUser?.referredByHostId ||
            activeUser?.referredByHostName
        );
        if (isReferred) {
            router.replace("/host/r-create-events");
        }
    }, [user, profile, router]);

    const handleStepClick = (stepId: number) => {
        dispatch(setCurrentStep(stepId));
    };

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
                return isStandard ? <StepEventPreview /> : <StepGuestList />;
            case 6:
                return <StepEventPreview />;
            default:
                return <StepPackage />;
        }
    };

    return (
        <div className="w-full space-y-8 font-work-sans pb-16">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
                    Create Event
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-work-sans mt-1">
                    Follow the steps below to configure your packages, details, ticket
                    design, and guest list.
                </p>
            </div>

            {/* Stepper */}
            <div className="w-full max-w-4xl mx-auto py-6 px-4">
                <div className="relative flex items-center justify-between">
                    {/* Connecting Line behind the circles */}
                    <div className="absolute left-6 right-6 top-4 h-[1.5px] bg-neutral-300 dark:bg-neutral-700 -translate-y-1/2 z-0" />

                    {steps.map((step) => {
                        const maxStep = isStandard ? 5 : 6;
                        const isCompleted = step.id < currentStep || (currentStep === maxStep && step.id <= maxStep);
                        const isActive = step.id === currentStep;

                        return (
                            <div
                                key={step.id}
                                onClick={() => handleStepClick(step.id)}
                                className="relative z-10 flex flex-col items-center cursor-pointer group select-none"
                            >
                                {/* Circle node */}
                                <div
                                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all ${isCompleted
                                        ? "bg-[#0FA958] text-white shadow-2xs"
                                        : isActive
                                            ? "bg-white dark:bg-neutral-900 border-2 border-[#0FA958] text-[#0FA958] font-semibold ring-4 ring-[#0FA958]/10"
                                            : "bg-white dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 group-hover:border-neutral-700 dark:group-hover:border-neutral-300"
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
                                        ? "font-semibold text-neutral-900 dark:text-white"
                                        : isCompleted
                                            ? "font-medium text-neutral-800 dark:text-neutral-200"
                                            : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
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
            <div className="w-full max-w-6xl mx-auto">
                {renderCurrentStepComponent()}
            </div>
        </div>
    );
};

export default CreateEvents;

