/**
 * @type {import("framer-motion").Variants}
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

/**
 * @type {import("framer-motion").Variants}
 */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

/**
 * @type {import("framer-motion").Variants}
 */
export const letterVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03, // Stagger delay for each letter
      duration: 0.5,
      ease: "easeOut"
    }
  })
};