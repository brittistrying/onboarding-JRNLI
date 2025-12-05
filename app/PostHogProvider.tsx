"use client";

import React, { ReactNode } from "react";
import posthog from "posthog-js";

export { posthog };

type PostHogProviderProps = {
  children: ReactNode;
};

posthog.init("phc_l8tCJYT9EmrXOTWawM75KmgnQq5s80rjJJDGXzTvrwf", {
  api_host: "https://app.posthog.com",
  loaded: () => console.log("PostHog initialized"),
});

export default function PostHogProvider({ children }: PostHogProviderProps) {
  return <>{children}</>;
}
