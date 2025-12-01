"use client";

import React, { useState, useEffect } from "react";

export default function Step2_WorkspaceName({
  setStepValid,
  workspaceData,
  setWorkspaceData,
}) {
  const [workspaceName, setWorkspaceName] = useState(
    workspaceData.workspaceName || ""
  );
  const maxChars = 40;

  useEffect(() => {
    setStepValid(workspaceName.trim().length > 0);

    // Update workspace title data
    setWorkspaceData((prev) => ({ ...prev, workspaceName }));

    console.log("Step 2 workspace name:", workspaceName);
  }, [workspaceName]);

  function handleChange(e) {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setWorkspaceName(value);
    }
  }

  return (
    <section className="p-6 bg-white rounded shadow flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Name Your Workspace</h1>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={workspaceName}
          onChange={handleChange}
          placeholder="e.g. Q1 Product Launch, Weekly Newsletter, My Practice Space"
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D090A] font-primary text-[#0D090A]"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>
            Name your workspace after a specific objective or focus. This space
            will hold the supporting documents.
          </span>
          <span>
            {workspaceName.length} / {maxChars}
          </span>
        </div>
      </div>
    </section>
  );
}
