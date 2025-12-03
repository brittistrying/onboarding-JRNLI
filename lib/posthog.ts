import posthog from "posthog-js";

export function initPostHog() {
  if (!posthog.__loaded) {
    posthog.init("phc_l8tCJYT9EmrXOTWawM75KmgnQq5s80rjJJDGXzTvrwf", {
      api_host: "https://app.posthog.com",
    });
  }
}

export default posthog;
