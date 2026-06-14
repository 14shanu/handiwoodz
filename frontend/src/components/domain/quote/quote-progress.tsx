"use client";

import { quoteBasketContent } from "@/lib/content";

interface QuoteProgressProps {
  currentStep: number;
}

export default function QuoteProgress({ currentStep }: QuoteProgressProps) {
  const steps = quoteBasketContent.progress.steps;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted
                    ? "bg-primary text-on-primary"
                    : isActive
                    ? "bg-secondary text-on-primary"
                    : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={`hidden md:inline font-body text-xs ${
                  isActive ? "text-secondary font-semibold" : "text-on-surface-variant"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-6 md:w-10 h-0.5 ${
                  isCompleted ? "bg-primary" : "bg-outline-variant"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
