"use client";

import { useEffect } from "react";
import { startLenis } from "@/app/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const stop = startLenis();
    return () => {
      stop?.();
    };
  }, []);

  return null;
}
