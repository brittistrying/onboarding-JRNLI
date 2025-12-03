// deals with Step_Counter states - active, complete, default
// deals with button states - back, continue, create workspace, skip
// has placeholder invisible buttons so the continue button doesn't jump (alignment solution)
// deals with storing data in state - files, text

"use client";

import React, { useState, useEffect } from "react";
import type { WorkspaceData } from "./types";
import { useRouter } from "next/navigation";
import Step_Counter from "./Step_Counter";
import Button from "./Button";
import Step1_ProjectType from "./onboarding/Step1_ProjectType";
import Step2_WorkspaceName from "./onboarding/Step2_WorkspaceName";
import Step3_Upload from "./onboarding/Step3_Upload";
import posthog from "../lib/posthog";

export default function Page_Flow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const totalSteps = 3;
  const router = useRouter();

  useEffect(() => {
    if (currentStep !== 3) setIsSkipped(false);
    setIsStepValid(false);
  }, [currentStep]);

  const nextStep = () => {
    posthog.capture("Step Reached", {
      stepNumber: currentStep,
      timestamp: new Date().toISOString(),
    });

    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };
  const prevStep = () => {
    if (currentStep === 3 && isSkipped) {
      setIsSkipped(false);
      setIsStepValid(false);
      return;
    }
    currentStep > 1 && setCurrentStep((s) => s - 1);
  };

  const skipStep = () => {
    if (currentStep === 3) {
      setIsSkipped(true);
      setIsStepValid(false);
    } else {
      setCurrentStep(3);
      setIsSkipped(true);
      setIsStepValid(false);
    }
  };

  // Create Workspace captures data to console & posthog
  const goCreateWorkspace = () => {
    console.log("Workspace data captured:", workspaceData);
    posthog.capture("Workspace Created", {
      uploadedFilesCount: workspaceData.uploadedFiles.length,
      usedTellUsText: workspaceData.tellUsText.trim().length > 0,
      projectType: workspaceData.projectType || "Just Exploring",
      workspaceName: workspaceData.workspaceName,
      lastStepReached: currentStep,
      timestamp: new Date().toISOString(),
    });
    router.push("/app/home"); // <-- replace with route to app that contains user inputs
  };

  const renderStep = () => {
    const commonProps = {
      setStepValid: setIsStepValid,
      workspaceData,
      setWorkspaceData,
    };

    switch (currentStep) {
      case 1:
        return <Step1_ProjectType {...commonProps} />;
      case 2:
        return <Step2_WorkspaceName {...commonProps} />;
      case 3:
        return <Step3_Upload {...commonProps} isSkipped={isSkipped} />;
      default:
        return null;
    }
  };

  const buttonPlaceholder = (
    <div className="invisible">
      <Button variant="secondary">Back</Button>
    </div>
  );
  const skipPlaceholder = (
    <div className="invisible">
      <span>Skip</span>
    </div>
  );

  const initialWorkspaceData: WorkspaceData = {
    projectType: null,
    workspaceName: "",
    uploadedFiles: [],
    tellUsText: "",
  };
  const [workspaceData, setWorkspaceData] =
    useState<WorkspaceData>(initialWorkspaceData);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Step_Counter currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mt-8">{renderStep()}</div>

      {/* Buttons grid */}
      <div className="grid grid-cols-3 mt-6 items-center">
        <div className="flex justify-start">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
          ) : (
            buttonPlaceholder
          )}
        </div>

        <div className="flex justify-center">
          {currentStep === totalSteps ? (
            <span
              onClick={skipStep}
              className="underline text-[#0D090A] cursor-pointer"
            >
              Skip
            </span>
          ) : (
            skipPlaceholder
          )}
        </div>

        <div className="flex justify-end">
          {currentStep === totalSteps ? (
            <Button
              variant="primary"
              onClick={goCreateWorkspace}
              disabled={!isStepValid}
            >
              Create Workspace
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={nextStep}
              disabled={!isStepValid}
            >
              Continue
            </Button>
          )}
        </div>
      </div>

      {currentStep === totalSteps && (
        <div className="mt-15 flex justify-center">
          <span
            onClick={() => router.push("/data-privacy")}
            className="underline text-[#0D090A] cursor-pointer text-sm"
          >
            Data Privacy
          </span>
        </div>
      )}
    </div>
  );
}
