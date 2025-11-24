import React from "react";

const OPTIONS = [
  "Email or Newsletter",
  "Blog Post or Article",
  "Research or Academic",
  "Business Document",
  "Marketing Copy",
  "Other"
];

export function Step1_ProjectType({ projectType, setProjectType, onNext, onSample }) {
  const contentMaxWidth = 500;
  const black = "#0D090A";
  const white = "#FFFFFF";

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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 32 }}>
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
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
                border: step === 1 ? `3px solid ${black}` : "2px solid #555",
                color: step === 1 ? black : "#555",
                backgroundColor: white,
                zIndex: 1,
              }}
            >
              {step}
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
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: contentMaxWidth,
          alignItems: "center",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Archiv Grotesk, sans-serif",
            fontWeight: 600,
            color: black,
          }}
        >
          Let's Create Your First Workspace!
        </h2>

        <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", color: "#0D090A" }}>
          Contextual workspaces are dedicated focus areas that group your documents, notes, and assets relevant to a specific objective.
          By organizing everything in one place, each item is meant to work together so the workspace steadily moves you toward the goal it’s designed to achieve.
        </p>

        <h2
          style={{
            textAlign: "center",
            fontFamily: "Archiv Grotesk, sans-serif",
            fontWeight: 600,
            color: black,
          }}
        >
          What type of project are you working on?
        </h2>

        {/* Buttons + Just Exploring wrapped in single div */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              width: "100%",
            }}
          >
            {OPTIONS.map((o) => (
              <button
                key={o}
                onClick={() => setProjectType(o)}
                style={{
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: projectType === o ? `2px solid ${black}` : "1px solid #ccc",
                  backgroundColor: projectType === o ? black : white,
                  color: projectType === o ? white : black,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {o}
              </button>
            ))}
          </div>

          {/* Just Exploring below buttons */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={onSample}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: black,
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Just Exploring
            </span>
          </div>
        </div>
      </div>

      {/* Continue button right-aligned */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: contentMaxWidth,
          marginTop: 32,
        }}
      >
        <button
          disabled={!projectType}
          onClick={onNext}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: projectType ? black : "#ccc",
            color: white,
            cursor: projectType ? "pointer" : "not-allowed",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

