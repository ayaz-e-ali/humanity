"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
    useEffect(() => {
        let lenis = new Lenis({
            duration: .6, // Control the duration of the scroll
            easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
            smooth: true,
            smoothTouch: true, // Enable smooth scrolling on touch devices
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    return null;
}
