"use client";

import Lenis from "@studio-freight/lenis";

let lenisInstance = null;

const createLenis = () => {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 0.9,
    lerp: 0.08,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    smoothTouch: true,
    wheelMultiplier: 1.1,
  });

  return lenisInstance;
};

export const lenis = createLenis();

export const startLenis = () => {
  const instance = createLenis();
  if (!instance) return () => { };

  let frame;
  const raf = (time) => {
    instance.raf(time);
    frame = requestAnimationFrame(raf);
  };

  frame = requestAnimationFrame(raf);

  return () => cancelAnimationFrame(frame);
};
