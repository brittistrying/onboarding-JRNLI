"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { WorkspaceData } from "../types";

const EXPLORE_URL = "/mock_webapp"; // <-- replace with route to app w sample data

const OPTIONS = [
  "Email or Newsletter",
  "Blog Post or Article",
  "Research or Academic",
  "Business Document",
  "Marketing Copy",
  "Other",
];

interface Step1Handlers {
  setStepValid: (valid: boolean) => void;
  workspaceData: WorkspaceData;
  setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceData>>;
}

export default function Step1_ProjectType({
  setStepValid,
  workspaceData,
  setWorkspaceData,
}: Step1Handlers) {
  const router = useRouter();

  const [selected, setSelected] = useState<string | null>(
    workspaceData.projectType || null
  );

  useEffect(() => {
    setStepValid(Boolean(selected));

    setWorkspaceData((prev) => ({ ...prev, projectType: selected }));

    console.log("Step 1 selected project type:", selected);
  }, [selected, setStepValid, setWorkspaceData]);

  function handleOptionClick(option: string) {
    setSelected(option);
  }

  function handleExploreClick() {
    router.push(EXPLORE_URL);
  }

  return (
    <section className="p-6 bg-white rounded shadow flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">
          Let's Create Your First Workspace!
        </h1>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          Contextual workspaces are dedicated focus areas that group your
          documents, notes, and assets relevant to a specific objective.
        </p>
      </header>

      <div>
        <h2 className="text-lg font-medium">
          What type of project are you working on?
        </h2>
        <p className="text-xs text-gray-500 mt-1">Choose one to continue.</p>
      </div>

      {/* Options grid + Just Exploring */}
      <div className="flex flex-col gap-1 mt-3">
        <div
          role="radiogroup"
          aria-label="Project type"
          className="grid grid-cols-3 gap-4"
        >
          {OPTIONS.map((opt) => {
            const active = selected === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => handleOptionClick(opt)}
                className={
                  "rounded-lg px-3 py-3 text-sm text-center w-full transition-shadow duration-150 " +
                  (active
                    ? "bg-[#0D090A] text-white ring-2 ring-offset-2 ring-[#0D090A]"
                    : "bg-white border border-gray-200 text-[#0D090A] hover:shadow-sm")
                }
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <span
            onClick={handleExploreClick}
            className="underline text-[#0D090A] cursor-pointer text-sm"
          >
            Just Exploring
          </span>
        </div>
      </div>
    </section>
  );
}
