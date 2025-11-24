import React from "react";

// Make sure you have these fonts imported in your project, e.g. via CSS:
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Archiv+Grotesk:wght@500;600&display=swap');

export function Step2_WorkspaceName({ name, setName, onNext, onBack }) {
  const contentMaxWidth = 500;
  const step = 2;
  const black = "#0D090A";
  const white = "#FFFFFF";

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Inter, sans-serif", // Primary font
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: white,
        minHeight: "100vh",
      }}
    >
      {/* Step Counter */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 32 }}>
        {[1, 2, 3].map((s, index) => {
          const isCompleted = s < step;
          const isCurrent = s === step;

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
                  border: isCurrent ? `3px solid ${black}` : "2px solid #555",
                  color: isCompleted ? white : isCurrent ? black : "#555",
                  backgroundColor: isCompleted ? black : white,
                  zIndex: 1,
                }}
              >
                {isCompleted ? "✔" : s} {/* <-- checkmark for completed step */}
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

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: contentMaxWidth,
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: black,
            fontFamily: "Archiv Grotesk, sans-serif", // Secondary font for header
            fontWeight: 600,
          }}
        >
          Name Your Workspace
        </h2>

        {/* Input + help text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <input
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: `1px solid #ccc`,
              fontSize: 16,
              outline: "none",
              color: black,
              backgroundColor: white,
              fontFamily: "Inter, sans-serif",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q1 Product Launch, Weekly Newsletter, My Practice Space"
            onFocus={(e) => (e.target.style.borderColor = black)}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <div
            style={{
              fontSize: 14,
              color: "#0D090A",
              lineHeight: 1.2,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Name your workspace after a specific objective or focus, this space will hold the supporting documents.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
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

          <button
            disabled={!name.trim()}
            onClick={onNext}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: "none",
              backgroundColor: name.trim() ? black : "#ccc",
              color: white,
              cursor: name.trim() ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
