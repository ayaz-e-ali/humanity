import Lenis from "@studio-freight/lenis";

export const lenis = new Lenis({
  duration: 0.7,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothTouch: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
