"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
    StepPackage,
    StepEventDetails,
    StepEventSettings,
    StepPreviewTicket,
    StepGuestList,
} from "./steps";

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

export const CreateEvents: React.FC = () => {
    const router = useRouter();
    const { user, profile } = useAuth();
    const [currentStep, setCurrentStep] = useState<number>(1);

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
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full space-y-8 font-work-sans pb-16">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 tracking-tight">
                    Create Event
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 font-work-sans mt-1">
                    Follow the steps below to configure your packages, details, ticket design, and guest list.
                </p>
            </div>

            {/* Stepper matching media_1789206859662.png */}
            <div className="w-full max-w-4xl mx-auto py-6 px-4">
                <div className="relative flex items-center justify-between">
                    {/* Connecting Line behind the circles */}
                    <div className="absolute left-6 right-6 top-4 h-[1.5px] bg-neutral-400/80 -translate-y-1/2 z-0" />

                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep;
                        const isActive = step.id === currentStep;

                        return (
                            <div
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
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

export default CreateEvents;