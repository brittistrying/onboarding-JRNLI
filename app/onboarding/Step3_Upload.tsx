"use client";

import React, { useEffect, useState } from "react";
import type { WorkspaceData } from "../types";

interface Step3Handlers {
  setStepValid: (valid: boolean) => void;
  workspaceData: WorkspaceData;
  setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceData>>;
  isSkipped?: boolean;
}

export default function Step3_Upload({
  setStepValid,
  workspaceData,
  setWorkspaceData,
  isSkipped = false,
}: Step3Handlers) {
  const [files, setFiles] = useState<File[]>(workspaceData.uploadedFiles || []);
  const [skipText, setSkipText] = useState(workspaceData.tellUsText || "");

  useEffect(() => {
    if (isSkipped) {
      setStepValid(skipText.trim().length > 0);
    } else {
      setStepValid(files.length > 0);
    }

    setWorkspaceData((prev) => ({
      ...prev,
      uploadedFiles: files,
      tellUsText: skipText,
    }));

    console.log("Step 3 files:", files);
    console.log("Step 3 skipped text:", skipText);
  }, [files, skipText, isSkipped, setStepValid, setWorkspaceData]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);
    const combinedFiles = [...files, ...selectedFiles].slice(0, 3);
    setFiles(combinedFiles);
  }

  function removeFile(index: number) {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }

  if (isSkipped) {
    return (
      <section className="p-6 bg-white rounded shadow flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-semibold">Tell Us Instead</h1>
        </header>

        <textarea
          value={skipText}
          onChange={(e) => setSkipText(e.target.value)}
          placeholder={`Tell us what you’re working toward so we can write with you, not just for you. The more context you share - like goals, tone, audience, or key points - the better your writing partner can assist you.`}
          className="w-full min-h-[160px] border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D090A]"
        />
      </section>
    );
  }

  return (
    <section className="p-6 bg-white rounded shadow flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">
          Do you have any materials or notes you're working from?
        </h1>
      </header>

      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">Upload Documents</h2>
        <span className="bg-[#0D090A] text-white text-xs px-2 py-0.5 rounded-full">
          Highly Recommended
        </span>
      </div>

      <p className="text-sm text-gray-500">
        Got any notes, drafts, or references? Upload them here so we can tailor
        your workspace.
      </p>

      <div className="flex flex-col gap-2">
        {/* File upload area */}
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-black transition-colors ${
            files.length >= 3
              ? "opacity-50 cursor-not-allowed border-gray-200"
              : "border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m-8-8h16"
            />
          </svg>

          <span className="text-sm text-gray-600">
            {files.length >= 3
              ? "Maximum 3 files uploaded"
              : "Click to select files (max 3)"}
          </span>
        </label>

        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
          className="hidden"
          onChange={handleFileChange}
          disabled={files.length >= 3}
        />

        {/* Uploaded files list */}
        {files.length > 0 && (
          <ul className="mt-2 flex flex-col gap-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center border px-3 py-2 rounded shadow-sm bg-gray-50"
              >
                {/* File name + uploaded icon */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{file.name}</span>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-black hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M6 18L18 6"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-gray-500 mt-1">
          {files.length}/3 files uploaded
        </p>
      </div>
    </section>
  );
}
