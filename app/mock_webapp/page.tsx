"use client";

import React, { useState, useEffect, useRef } from "react";
import Joyride, { Step, STATUS } from "react-joyride";
import { useRouter } from "next/navigation";

export default function MockWebAppWithTour() {
  const router = useRouter();

  const [runTour, setRunTour] = useState(true);

  const steps: Step[] = [
    {
      target: "#welcome-anchor",
      content:
        "Welcome to your contextual workspace. Everything you’ve opened here can be read together by JRNLI, so it understands the exact context of your project and delivers more precise results.",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: "#chatbot",
      content:
        "Your writing partner is here. It can read your open documents to help you ideate, refine tone, cross-update sections, polish, and make updates with guidance on demand. Just ask!",
      placement: "left",
    },
    {
      target: "#editor",
      content:
        "Start anywhere! This is your editor to think and write. The editor supports every stage—ideation, synthesis, organization, planning, writing, editing, and proofreading—so you can shape your work as you go.",
      placement: "bottom",
    },
    {
      target: "#share-icon",
      content:
        "Bring your people in. Equip them with this preloaded workspace so they can create faster, stay on-message, and keep enriching the reference base for everyone.",
      placement: "right",
    },
  ];

  const welcomeAnchorRef = useRef<HTMLDivElement | null>(null);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setRunTour(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            primaryColor: "#0D090A",
            zIndex: 10000,
          },
        }}
        locale={{
          next: "Next",
          back: "Back",
          last: "Done",
          skip: "Skip",
        }}
        callback={handleJoyrideCallback}
      />

      <div className="flex h-screen">
        {/* Left collapsed nav */}
        <aside className="w-16 bg-white border-r border-gray-200 flex flex-col justify-between items-center py-4">
          <div className="flex flex-col items-center gap-4 mt-2">
            <button
              aria-label="home"
              className="p-2 rounded hover:bg-gray-100"
              title="Home"
              onClick={() => router.push("/")}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10.5z"
                />
              </svg>
            </button>

            <button
              id="share-icon"
              aria-label="share"
              className="p-2 rounded hover:bg-gray-100"
              title="Share"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v12"
                />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7l4-4 4 4"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 mb-2">
            <button
              aria-label="profile"
              className="p-2 rounded hover:bg-gray-100"
              title="Profile"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12a5 5 0 100-10 5 5 0 000 10z"
                />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21a8 8 0 10-18 0"
                />
              </svg>
            </button>

            <button
              aria-label="settings"
              className="p-2 rounded hover:bg-gray-100"
              title="Settings"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-.33V3a2 2 0 014 0v.09c.2.12.4.27.58.43"
                />
              </svg>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div
            id="welcome-anchor"
            ref={welcomeAnchorRef}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ top: "30vh" }}
          >
            <div className="w-0 h-0" />
          </div>

          <div className="h-full grid grid-cols-[1fr_360px] gap-6">
            <section className="bg-white rounded shadow p-6" id="editor">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Editor</h3>
                <div className="text-xs text-gray-500">Start writing</div>
              </div>
              <div className="border border-gray-200 rounded p-3 min-h-[60vh]">
                <textarea
                  className="w-full h-full resize-none text-sm outline-none"
                  placeholder="Begin typing your draft here..."
                  style={{ minHeight: "56vh" }}
                />
              </div>
            </section>

            <aside
              id="chatbot"
              className="bg-white rounded shadow p-4 w-[360px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Writing partner</h4>
                <span className="text-xs text-gray-500">AI</span>
              </div>
              <div className="flex-1 overflow-auto border border-gray-100 rounded p-3 mb-3">
                <div className="text-sm text-gray-600">
                  Ask your writing partner any question or paste text to get
                  started.
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Message the assistant..."
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D090A]"
                />
                <button className="px-3 py-2 bg-[#0D090A] text-white rounded">
                  Send
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

// counter left aligned not working code
// "use client";

// import React, { useState, useRef } from "react";
// import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
// import { useRouter } from "next/navigation";

// interface CustomTooltipProps {
//   step: Step;
//   index: number;
//   totalSteps: number;
//   close: () => void;
//   next: () => void;
//   back?: () => void;
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({
//   step,
//   index,
//   totalSteps,
//   close,
//   next,
//   back,
// }) => (
//   <div className="p-4 bg-white rounded shadow flex flex-col gap-2 relative">
//     <button
//       className="absolute top-2 right-2 text-gray-400 hover:text-black"
//       onClick={close}
//     >
//       ✕
//     </button>

//     <div>{step.content}</div>

//     <div className="flex justify-between items-center mt-3">
//       <span className="text-sm text-gray-500">
//         {index + 1} of {totalSteps}
//       </span>
//       <div className="flex gap-2">
//         {back && (
//           <button onClick={back} className="px-3 py-1 text-sm border rounded">
//             Back
//           </button>
//         )}
//         <button
//           onClick={next}
//           className="px-3 py-1 text-sm bg-[#0D090A] text-white rounded"
//         >
//           {index === totalSteps - 1 ? "Done" : "Next"}
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default function MockWebAppWithTour() {
//   const router = useRouter();
//   const [runTour, setRunTour] = useState(true);
//   const [stepIndex, setStepIndex] = useState(0);

//   const steps: Step[] = [
//     {
//       target: "#welcome-anchor",
//       content:
//         "Welcome to your contextual workspace. Everything you’ve opened here can be read together by JRNLI, so it understands the exact context of your project and delivers more precise results.",
//       placement: "center",
//       disableBeacon: true,
//     },
//     {
//       target: "#chatbot",
//       content:
//         "Your writing partner is here. It can read your open documents to help you ideate, refine tone, cross-update sections, polish, and make updates with guidance on demand. Just ask!",
//       placement: "left",
//     },
//     {
//       target: "#editor",
//       content:
//         "Start anywhere! This is your editor to think and write. The editor supports every stage—ideation, synthesis, organization, planning, writing, editing, and proofreading—so you can shape your work as you go.",
//       placement: "bottom",
//     },
//     {
//       target: "#share-icon",
//       content:
//         "Bring your people in. Equip them with this preloaded workspace so they can create faster, stay on-message, and keep enriching the reference base for everyone.",
//       placement: "right",
//     },
//   ];

//   const welcomeAnchorRef = useRef<HTMLDivElement | null>(null);

//   const nextStep = () => {
//     if (stepIndex < steps.length - 1) {
//       setStepIndex(stepIndex + 1);
//     } else {
//       setRunTour(false);
//       setStepIndex(0);
//     }
//   };

//   const backStep = () => {
//     if (stepIndex > 0) setStepIndex(stepIndex - 1);
//   };

//   const closeTooltip = () => setRunTour(false);

//   const handleJoyrideCallback = (data: CallBackProps) => {
//     const { status, index } = data;
//     if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
//       setRunTour(false);
//       setStepIndex(0);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Joyride
//         steps={steps}
//         run={runTour}
//         stepIndex={stepIndex}
//         continuous
//         showSkipButton
//         showProgress={false}
//         tooltipComponent={({ step }) => (
//           <CustomTooltip
//             step={step}
//             index={stepIndex}
//             totalSteps={steps.length}
//             close={closeTooltip}
//             next={nextStep}
//             back={stepIndex > 0 ? backStep : undefined}
//           />
//         )}
//         callback={handleJoyrideCallback}
//         styles={{
//           options: {
//             primaryColor: "#0D090A",
//             zIndex: 10000,
//             width: 350,
//           },
//         }}
//       />

//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <aside className="w-16 bg-white border-r border-gray-200 flex flex-col justify-between items-center py-4">
//           <div className="flex flex-col items-center gap-4 mt-2">
//             <button
//               aria-label="home"
//               className="p-2 rounded hover:bg-gray-100"
//               title="Home"
//               onClick={() => router.push("/")}
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10.5z"
//                 />
//               </svg>
//             </button>

//             <button
//               id="share-icon"
//               aria-label="share"
//               className="p-2 rounded hover:bg-gray-100"
//               title="Share"
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v12"
//                 />
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M8 7l4-4 4 4"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="flex flex-col items-center gap-4 mb-2">
//             <button
//               aria-label="profile"
//               className="p-2 rounded hover:bg-gray-100"
//               title="Profile"
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 12a5 5 0 100-10 5 5 0 000 10z"
//                 />
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21a8 8 0 10-18 0"
//                 />
//               </svg>
//             </button>

//             <button
//               aria-label="settings"
//               className="p-2 rounded hover:bg-gray-100"
//               title="Settings"
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
//                 />
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-.33V3a2 2 0 014 0v.09c.2.12.4.27.58.43"
//                 />
//               </svg>
//             </button>
//           </div>
//         </aside>

//         {/* Main area */}
//         <main className="flex-1 p-8">
//           <div
//             id="welcome-anchor"
//             ref={welcomeAnchorRef}
//             className="absolute inset-0 pointer-events-none flex items-center justify-center"
//             style={{ top: "30vh" }}
//           >
//             <div className="w-0 h-0" />
//           </div>

//           <div className="h-full grid grid-cols-[1fr_360px] gap-6">
//             {/* Editor */}
//             <section className="bg-white rounded shadow p-6" id="editor">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium">Editor</h3>
//                 <div className="text-xs text-gray-500">Start writing</div>
//               </div>
//               <div className="border border-gray-200 rounded p-3 min-h-[60vh]">
//                 <textarea
//                   className="w-full h-full resize-none text-sm outline-none"
//                   placeholder="Begin typing your draft here..."
//                   style={{ minHeight: "56vh" }}
//                 />
//               </div>
//             </section>

//             {/* Chatbot */}
//             <aside
//               id="chatbot"
//               className="bg-white rounded shadow p-4 w-[360px] flex flex-col"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="font-medium">Writing partner</h4>
//                 <span className="text-xs text-gray-500">AI</span>
//               </div>
//               <div className="flex-1 overflow-auto border border-gray-100 rounded p-3 mb-3">
//                 <div className="text-sm text-gray-600">
//                   Ask your writing partner any question or paste text to get
//                   started.
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Message the assistant..."
//                   className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D090A]"
//                 />
//                 <button className="px-3 py-2 bg-[#0D090A] text-white rounded">
//                   Send
//                 </button>
//               </div>
//             </aside>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
