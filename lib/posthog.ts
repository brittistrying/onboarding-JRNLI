"use client";

import posthog from "posthog-js";

posthog.init("phc_l8tCJYT9EmrXOTWawM75KmgnQq5s80rjJJDGXzTvrwf", {
  api_host: "https://app.posthog.com",
  loaded: () => console.log("PostHog initialized"),
});

//testing console use
if (typeof window !== "undefined") {
  (window as any).posthog = posthog;
}

export default posthog;

// import posthog from "posthog-js";

// export function initPostHog() {
//   if (!posthog.__loaded) {
//     posthog.init("phc_l8tCJYT9EmrXOTWawM75KmgnQq5s80rjJJDGXzTvrwf", {
//       api_host: "https://app.posthog.com",
//     });
//   }
// }

// export default posthog;
