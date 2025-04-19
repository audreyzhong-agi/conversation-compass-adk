
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: "upload" | "analysis" | "draft";
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { id: "upload", label: "Share" },
    { id: "analysis", label: "Understand" },
    { id: "draft", label: "Respond" },
  ];

  return (
    <div className="relative mb-8">
      <div className="absolute top-5 w-full h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{
            width: currentStep === "upload" ? "0%" : currentStep === "analysis" ? "50%" : "100%",
          }}
        />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex flex-col items-center",
              step.id === currentStep && "text-primary",
              steps.indexOf(step) < steps.findIndex(s => s.id === currentStep) && "text-primary"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300",
                step.id === currentStep && "border-primary",
                steps.indexOf(step) < steps.findIndex(s => s.id === currentStep) && "border-primary bg-primary text-white"
              )}
            >
              {steps.indexOf(step) < steps.findIndex(s => s.id === currentStep) ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm">{steps.indexOf(step) + 1}</span>
              )}
            </div>
            <span className="mt-2 text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
