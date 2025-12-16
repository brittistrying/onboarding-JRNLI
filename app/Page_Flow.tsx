"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Step_Counter from "./Step_Counter";
import Step1_ProjectType from "./onboarding/Step1_ProjectType";
import Step2_WorkspaceName from "./onboarding/Step2_WorkspaceName";
import Step3_Upload from "./onboarding/Step3_Upload";
import { WorkspaceData } from "./types";

// safe wrapper to ensure PostHog is ready
const safeCapture = (event: string, props?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog?.capture) {
    (window as any).posthog.capture(event, props);
    console.log("PostHog capture fired:", event, props);
  } else {
    console.warn("PostHog not ready for event:", event, props);
  }
};

export default function Page_Flow() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    projectType: null,
    workspaceName: "",
    uploadedFiles: [],
    tellUsText: "",
  });

  const steps = [
    {
      id: 1,
      render: () => (
        <Step1_ProjectType
          setStepValid={setIsStepValid}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          next={nextStep}
          prev={prevStep}
        />
      ),
    },
    {
      id: 2,
      render: () => (
        <Step2_WorkspaceName
          setStepValid={setIsStepValid}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          next={nextStep}
          prev={prevStep}
        />
      ),
    },
    {
      id: 3,
      render: () => (
        <Step3_Upload
          setStepValid={setIsStepValid}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          isSkipped={isSkipped}
          next={nextStep}
          prev={prevStep}
          skip={skipStep}
          createWorkspace={goCreateWorkspace}
        />
      ),
    },
  ];

  const renderStep = (currentStep: number) => {
    return steps[currentStep - 1].render();
  };

  // Capture step reached whenever currentStep changes
  useEffect(() => {
    // Only fire for normal navigation, skip is captured inside skipStep
    if (currentStep <= steps.length && !isSkipped) {
      safeCapture("Step Reached", {
        stepNumber: String(currentStep),
        timestamp: new Date().toISOString(),
      });
    }

    setIsStepValid(false);
  }, [currentStep, isSkipped]);

  const nextStep = () => {
    // Guard Clause
    if (currentStep >= steps.length) return;

    setCurrentStep((s) => s + 1);
    setIsSkipped(false);
    setIsStepValid(false);
  };

  const prevStep = () => {
    // Guard Clause
    if (currentStep <= 1) return;

    setCurrentStep((s) => s - 1);
    setIsSkipped(false);
    setIsStepValid(false);
  };

  const skipStep = () => {
    setIsSkipped(true);
    nextStep();
  };

  const goCreateWorkspace = () => {
    console.log("Workspace data captured:", workspaceData);
    safeCapture("Workspace Created", {
      uploadedFilesCount: workspaceData.uploadedFiles.length,
      usedTellUsText: workspaceData.tellUsText.trim().length > 0,
      projectType: workspaceData.projectType || "Just Exploring",
      workspaceName: workspaceData.workspaceName,
      lastStepReached: currentStep,
      timestamp: new Date().toISOString(),
    });
    router.push("/mock_webapp");
  };

  // Optional: track abandonment on refresh/close
  useEffect(() => {
    const handleBeforeUnload = () => {
      safeCapture("Onboarding Abandoned", {
        lastStepReached: currentStep,
        isSkipped,
        timestamp: new Date().toISOString(),
      });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentStep, isSkipped]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Step_Counter currentStep={currentStep} totalSteps={steps.length} />

      <div className="mt-8">{renderStep(currentStep)}</div>
    </div>
  );
}
