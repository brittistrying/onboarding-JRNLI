"use client";

import { Toaster as SonnerToaster, toast as shadcnToast } from "sonner";

export function useToast() {
  return {
    toast: shadcnToast,
  };
}

export default SonnerToaster;
