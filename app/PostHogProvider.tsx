"use client";

import React, { useEffect, ReactNode } from "react";
import posthog from "posthog-js";

export { posthog };

type PostHogProviderProps = {
  children: ReactNode;
};

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    posthog.init("phc_l8tCJYT9EmrXOTWawM75KmgnQq5s80rjJJDGXzTvrwf", {
      api_host: "https://app.posthog.com",
      loaded: () => console.log("PostHog initialized"),
    });
    (window as any).posthog = posthog;
  }, []);

  return <>{children}</>;
}
