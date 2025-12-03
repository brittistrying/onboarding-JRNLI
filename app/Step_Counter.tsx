import React from "react";
import { Check } from "lucide-react";

type StepCounterProps = {
  currentStep: number;
  totalSteps?: number;
};

export default function Step_Counter({
  currentStep,
  totalSteps = 3,
}: StepCounterProps) {
  const steps: number[] = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
      {steps.map((step, index) => {
        const completed = step < currentStep;
        const active = step === currentStep;

        let circleClasses =
          "w-10 h-10 flex items-center justify-center rounded-full border-2 font-primary text-sm z-10 transition-colors duration-300";
        if (completed)
          circleClasses += " bg-[#0D090A] border-[#0D090A] text-[#FFFFFF]";
        else if (active)
          circleClasses += " bg-[#FFFFFF] border-[#0D090A] text-[#0D090A]";
        else circleClasses += " bg-[#FFFFFF] border-gray-400 text-[#0D090A]";

        return (
          <React.Fragment key={step}>
            {/* Circle */}
            <div className={circleClasses}>
              {completed ? <Check className="w-5 h-5" /> : step}
            </div>

            {/* Line between circles */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-0.5 transition-colors duration-300 ${
                  step < currentStep ? "bg-[#0D090A]" : "bg-gray-400"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
