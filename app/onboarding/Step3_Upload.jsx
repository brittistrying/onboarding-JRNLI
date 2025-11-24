import React, { useState } from "react";

export function Step3_Upload({ files, setFiles, onCreate, onBack }) {
  const black = "#0D090A";
  const white = "#FFFFFF";
  const contentMaxWidth = 500;
  const currentStep = 3;

  const [mode, setMode] = useState("upload"); // "upload" or "context"
  const [context, setContext] = useState("");

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files).slice(0, 3 - files.length);
    setFiles([...files, ...selected]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: white,
        minHeight: "100vh",
      }}
    >
      {/* Step Counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        {[1, 2, 3].map((s, index) => {
          const isCompleted = s < currentStep;
          const isCurrent = s === currentStep;
          return (
            <React.Fragment key={s}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  border: isCurrent ? `3px solid ${black}` : "none",
                  backgroundColor: isCompleted ? black : white,
                  color: isCompleted ? white : isCurrent ? black : "#555",
                  zIndex: 1,
                }}
              >
                {isCompleted ? "✔" : s}
              </div>
              {index < 2 && (
                <div
                  style={{
                    width: 48,
                    height: 2,
                    backgroundColor: "#555",
                    margin: "0 8px",
                    alignSelf: "center",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {mode === "upload" && (
        <>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Archiv Grotesk, sans-serif",
              fontWeight: 600,
              color: black,
              marginBottom: 24,
            }}
          >
            Do you have any materials or notes?
          </h2>

          {/* Upload Section */}
          <div
            style={{
              width: "100%",
              maxWidth: contentMaxWidth,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "Archiv Grotesk, sans-serif",
                  color: black,
                }}
              >
                Upload Documents
              </h3>
              <span
                style={{
                  backgroundColor: black,
                  color: white,
                  borderRadius: 9999,
                  padding: "2px 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Highly Recommended
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
              Got any notes, drafts, or references? Upload them here so we can tailor your workspace.
            </p>

            {/* Upload box */}
            <div
              style={{
                width: "100%",
                border: "2px dashed #ccc",
                borderRadius: 8,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 12,
                backgroundColor: "#fafafa",
              }}
            >
              <label
                style={{
                  padding: "8px 16px",
                  backgroundColor: black,
                  color: white,
                  borderRadius: 6,
                  cursor: files.length >= 3 ? "not-allowed" : "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {files.length >= 3 ? "Max files uploaded" : "Upload File"}
                <input
                  type="file"
                  onChange={handleFiles}
                  style={{ display: "none" }}
                  disabled={files.length >= 3}
                />
              </label>

              <p style={{ fontSize: 12, color: "#555", margin: 0 }}>Upload up to 3 files</p>

              {/* Uploaded files */}
              {files.length > 0 && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        padding: "6px 12px",
                        borderRadius: 4,
                        width: "100%",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeFile(idx)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          color: black,
                          cursor: "pointer",
                          fontSize: 14,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation buttons aligned with upload box */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 16,
                alignItems: "center",
              }}
            >
              <button
                onClick={onBack}
                style={{
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: `1px solid #ccc`,
                  backgroundColor: white,
                  color: black,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Back
              </button>

              <span
                onClick={() => setMode("context")}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: black,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Skip
              </span>

              <button
                disabled={files.length === 0}
                onClick={onCreate}
                style={{
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: files.length > 0 ? black : "#ccc",
                  color: white,
                  cursor: files.length > 0 ? "pointer" : "not-allowed",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Create Workspace
              </button>
            </div>
          </div>
        </>
      )}

      {mode === "context" && (
        <>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Archiv Grotesk, sans-serif",
              fontWeight: 600,
              color: black,
              marginBottom: 12,
            }}
          >
            Tell Us
          </h2>

          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            style={{
              width: "100%",
              maxWidth: contentMaxWidth,
              height: 150,
              padding: 12,
              fontFamily: "Inter, sans-serif",
              borderRadius: 8,
              border: "1px solid #ccc",
              resize: "vertical",
              marginBottom: 16,
              color: black,
            }}
            placeholder="Tell us what you’re working toward so we can write with you, not just for you. The more context you share - like goals, tone, audience, or key points - the better your writing partner can assist you."
          />

          {/* Navigation buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: contentMaxWidth,
              alignItems: "center",
            }}
          >
            <button
              onClick={onBack}
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: `1px solid #ccc`,
                backgroundColor: white,
                color: black,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Back
            </button>

            <span style={{ flex: 1 }} /> {/* filler to keep spacing */}

            <button
              disabled={!context.trim()}
              onClick={onCreate}
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: "none",
                backgroundColor: context.trim() ? black : "#ccc",
                color: white,
                cursor: context.trim() ? "pointer" : "not-allowed",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Create Workspace
            </button>
          </div>
        </>
      )}

      {/* Data Privacy centered near bottom */}
      <div style={{ marginTop: 64, textAlign: "center", width: "100%" }}>
        <a
          href="/privacy"
          style={{ color: black, textDecoration: "underline", fontFamily: "Inter, sans-serif" }}
        >
          Data Privacy
        </a>
      </div>
    </div>
  );
}

