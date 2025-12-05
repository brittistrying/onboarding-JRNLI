"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Step_Counter from "./Step_Counter";
import Button from "./Button";
import Step1_ProjectType from "./onboarding/Step1_ProjectType";
import Step2_WorkspaceName from "./onboarding/Step2_WorkspaceName";
import Step3_Upload from "./onboarding/Step3_Upload";
import { WorkspaceData } from "./types";
import posthog from "../lib/posthog";

// safe wrapper to ensure PostHog is ready
const safeCapture = (event: string, props?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog?.capture) {
    (window as any).posthog.capture(event, props);
    console.log("PostHog capture fired:", event, props);
  } else {
    console.warn("PostHog not ready for event:", event, props);
  }
};

interface StepHandlers {
  setStepValid: (valid: boolean) => void;
  workspaceData: WorkspaceData;
  setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceData>>;
}

export default function Page_Flow() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  const initialWorkspaceData: WorkspaceData = {
    projectType: null,
    workspaceName: "",
    uploadedFiles: [],
    tellUsText: "",
  };
  const [workspaceData, setWorkspaceData] =
    useState<WorkspaceData>(initialWorkspaceData);

  const totalSteps = 3;
  const router = useRouter();

  // Capture step reached whenever currentStep changes
  useEffect(() => {
    // Only fire for normal navigation, skip is captured inside skipStep
    if (currentStep !== 3 || !isSkipped) {
      safeCapture("Step Reached", {
        stepNumber: String(currentStep),
        isSkipped: false,
        timestamp: new Date().toISOString(),
      });
    }

    if (currentStep !== 3) setIsSkipped(false);
    setIsStepValid(false);
  }, [currentStep, isSkipped]);

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

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep === 3 && isSkipped) {
      setIsSkipped(false);
      setIsStepValid(false);
      return;
    }
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  // Skip still represents step 3, but with a different view
  const skipStep = () => {
    if (currentStep === 3) {
      setIsSkipped(true);
      setIsStepValid(false);

      safeCapture("Step Reached", {
        stepNumber: "3",
        isSkipped: true,
        timestamp: new Date().toISOString(),
      });
    } else {
      setCurrentStep(3);
      setIsSkipped(true);
      setIsStepValid(false);

      safeCapture("Step Reached", {
        stepNumber: "3",
        isSkipped: true,
        timestamp: new Date().toISOString(),
      });
    }
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

  const stepProps: StepHandlers = {
    setStepValid: setIsStepValid,
    workspaceData,
    setWorkspaceData,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_ProjectType {...stepProps} />;
      case 2:
        return <Step2_WorkspaceName {...stepProps} />;
      case 3:
        return <Step3_Upload {...stepProps} isSkipped={isSkipped} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Step_Counter currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mt-8">{renderStep()}</div>

      {/* Buttons */}
      <div className="grid grid-cols-3 mt-6 items-center">
        <div className="flex justify-start">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div className="invisible">
              <Button variant="secondary">Back</Button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {currentStep === totalSteps && !isSkipped ? (
            <span
              onClick={skipStep}
              className="underline text-[#0D090A] cursor-pointer"
            >
              Skip
            </span>
          ) : (
            <div className="invisible">
              <span>Skip</span>
            </div>
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

// messing with posthog above below is working code wo posthog
// deals with Step_Counter states - active, complete, default
// deals with button states - back, continue, create workspace, skip
// has placeholder invisible buttons so the continue button doesn't jump (alignment solution)
// deals with storing data in state - files, text

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Step_Counter from "./Step_Counter";
// import Button from "./Button";
// import Step1_ProjectType from "./onboarding/Step1_ProjectType";
// import Step2_WorkspaceName from "./onboarding/Step2_WorkspaceName";
// import Step3_Upload from "./onboarding/Step3_Upload";
// import { WorkspaceData } from "./types";
// import posthog from "../lib/posthog";

// interface StepHandlers {
//   setStepValid: (valid: boolean) => void;
//   workspaceData: WorkspaceData;
//   setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceData>>;
// }

// export default function Page_Flow() {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [isStepValid, setIsStepValid] = useState<boolean>(false);
//   const [isSkipped, setIsSkipped] = useState<boolean>(false);

//   const initialWorkspaceData: WorkspaceData = {
//     projectType: null,
//     workspaceName: "",
//     uploadedFiles: [],
//     tellUsText: "",
//   };
//   const [workspaceData, setWorkspaceData] =
//     useState<WorkspaceData>(initialWorkspaceData);

//   const totalSteps = 3;
//   const router = useRouter();

//   useEffect(() => {
//     if (currentStep !== 3) setIsSkipped(false);
//     setIsStepValid(false);
//   }, [currentStep]);

//   const nextStep = () => {
//     posthog.capture("Step Reached", {
//       stepNumber: currentStep,
//       timestamp: new Date().toISOString(),
//     });

//     if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
//   };

//   const prevStep = () => {
//     if (currentStep === 3 && isSkipped) {
//       setIsSkipped(false);
//       setIsStepValid(false);
//       return;
//     }
//     if (currentStep > 1) setCurrentStep((s) => s - 1);
//   };

//   const skipStep = () => {
//     if (currentStep === 3) {
//       setIsSkipped(true);
//       setIsStepValid(false);
//     } else {
//       setCurrentStep(3);
//       setIsSkipped(true);
//       setIsStepValid(false);
//     }
//   };

//   const goCreateWorkspace = () => {
//     console.log("Workspace data captured:", workspaceData);
//     posthog.capture("Workspace Created", {
//       uploadedFilesCount: workspaceData.uploadedFiles.length,
//       usedTellUsText: workspaceData.tellUsText.trim().length > 0,
//       projectType: workspaceData.projectType || "Just Exploring",
//       workspaceName: workspaceData.workspaceName,
//       lastStepReached: currentStep,
//       timestamp: new Date().toISOString(),
//     });
//     router.push("/mock_webapp");
//   };

//   const stepProps: StepHandlers = {
//     setStepValid: setIsStepValid,
//     workspaceData,
//     setWorkspaceData,
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <Step1_ProjectType {...stepProps} />;
//       case 2:
//         return <Step2_WorkspaceName {...stepProps} />;
//       case 3:
//         return <Step3_Upload {...stepProps} isSkipped={isSkipped} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <Step_Counter currentStep={currentStep} totalSteps={totalSteps} />

//       <div className="mt-8">{renderStep()}</div>

//       {/* Buttons */}
//       <div className="grid grid-cols-3 mt-6 items-center">
//         <div className="flex justify-start">
//           {currentStep > 1 ? (
//             <Button variant="secondary" onClick={prevStep}>
//               Back
//             </Button>
//           ) : (
//             <div className="invisible">
//               <Button variant="secondary">Back</Button>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-center">
//           {currentStep === totalSteps && !isSkipped ? (
//             <span
//               onClick={skipStep}
//               className="underline text-[#0D090A] cursor-pointer"
//             >
//               Skip
//             </span>
//           ) : (
//             <div className="invisible">
//               <span>Skip</span>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end">
//           {currentStep === totalSteps ? (
//             <Button
//               variant="primary"
//               onClick={goCreateWorkspace}
//               disabled={!isStepValid}
//             >
//               Create Workspace
//             </Button>
//           ) : (
//             <Button
//               variant="primary"
//               onClick={nextStep}
//               disabled={!isStepValid}
//             >
//               Continue
//             </Button>
//           )}
//         </div>
//       </div>

//       {currentStep === totalSteps && (
//         <div className="mt-15 flex justify-center">
//           <span
//             onClick={() => router.push("/data-privacy")}
//             className="underline text-[#0D090A] cursor-pointer text-sm"
//           >
//             Data Privacy
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
