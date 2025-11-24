'use client'

import { useState } from "react";
import { Step1_ProjectType } from "./onboarding/Step1_ProjectType";
import { Step2_WorkspaceName } from "./onboarding/Step2_WorkspaceName";
import { Step3_Upload } from "./onboarding/Step3_Upload";

export default function Home() { 
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [context, setContext] = useState("");

  const createWorkspace = () => {
    alert("Workspace created!\n\nName: " + name);
    // Later we'll connect this to Firebase
  };

    return (
        <>
        {step === 1 && (
          <Step1_ProjectType
            projectType={projectType}
            setProjectType={setProjectType}
            onNext={() => setStep(2)}
            onSample={() => alert("Load sample workspace")}
          />
        )}
  
        {step === 2 && (
          <Step2_WorkspaceName
            name={name}
            setName={setName}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
  
        {step === 3 && (
          <Step3_Upload
            files={files}
            setFiles={setFiles}
            context={context}
            setContext={setContext}
            onBack={() => setStep(2)}
            onCreate={createWorkspace}
          />
        )}
      </>
    );
}