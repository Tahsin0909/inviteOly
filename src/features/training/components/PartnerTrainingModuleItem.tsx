"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ITrainingModule } from "../training.interface";

interface PartnerTrainingModuleItemProps {
  module: ITrainingModule;
  isOpen: boolean;
  onToggle: () => void;
}

export const PartnerTrainingModuleItem: React.FC<PartnerTrainingModuleItemProps> = ({
  module,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200 overflow-hidden",
        isOpen
          ? "border border-neutral-200/80 bg-white shadow-2xs"
          : "bg-[#F7F7F7] hover:bg-[#F2F2F2]"
      )}
    >
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left font-work-sans transition-colors cursor-pointer",
          isOpen ? "text-neutral-900 font-semibold" : "text-neutral-800 font-medium"
        )}
      >
        <span className="text-xs sm:text-sm">{module.title}</span>
        <span className="text-neutral-400 shrink-0 ml-3">
          {isOpen ? (
            <ChevronUp className="size-4 text-neutral-500" />
          ) : (
            <ChevronDown className="size-4 text-neutral-400" />
          )}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 sm:pb-6 pt-2 border-t border-neutral-100 text-xs sm:text-sm font-work-sans space-y-4 leading-relaxed text-neutral-600">
          {/* Optional Intro Text */}
          {module.introText && (
            <p className="text-neutral-800 font-medium">{module.introText}</p>
          )}

          {/* 1. Numbered List (e.g. 1, 2, 3 serials) */}
          {module.numberedList && module.numberedList.length > 0 && (
            <ol className="space-y-2.5 list-none pt-0.5">
              {module.numberedList.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed text-neutral-700"
                >
                  <span className="font-semibold text-neutral-900 shrink-0 select-none">
                    {idx + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}

          {/* 2. Structured Steps with Title & Paragraphs */}
          {module.steps && module.steps.length > 0 && (
            <div className="space-y-4">
              {module.steps.map((step) => (
                <div key={step.number} className="space-y-1.5">
                  <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm pt-1">
                    {step.number}. {step.title}
                  </h4>

                  {step.paragraphs &&
                    step.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-neutral-600 leading-relaxed">
                        {para}
                      </p>
                    ))}

                  {/* Special Responsibilities Breakdown */}
                  {step.responsibilities && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <p className="font-medium text-neutral-800 mb-1">
                          Partner Responsibilities:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-600">
                          {step.responsibilities.partner.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="font-medium text-neutral-800 mb-1">
                          Host Responsibilities:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-600">
                          {step.responsibilities.host.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 3. Bullet Points (e.g. InviteOly Scanning & Entry Procedure) */}
          {module.bulletPoints && module.bulletPoints.length > 0 && (
            <ul className="space-y-2.5 list-disc list-outside pl-4 text-neutral-700 pt-0.5">
              {module.bulletPoints.map((point, idx) =>
                typeof point === "string" ? (
                  <li key={idx} className="leading-relaxed pl-1">
                    {point}
                  </li>
                ) : (
                  <li key={idx} className="leading-relaxed pl-1 space-y-1">
                    <span>{point.text}</span>
                    {point.subBullets && (
                      <ul className="list-none pl-4 space-y-1 mt-1 text-neutral-600">
                        {point.subBullets.map((sub, sIdx) => (
                          <li key={sIdx}>- {sub}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          )}

          {/* 4. Situations (e.g. Common Event-Day Situations) */}
          {module.situations && module.situations.length > 0 && (
            <div className="space-y-4 pt-0.5">
              {module.situations.map((situation, idx) => (
                <div key={idx} className="space-y-1">
                  <h5 className="font-semibold text-neutral-900 text-xs sm:text-sm">
                    {situation.title}
                  </h5>
                  <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm">
                    {situation.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PartnerTrainingModuleItem;
