"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { lenis } from "./lenis";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Home() {
  return (
    <div className="relative">
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, #ffffff15, transparent 70%)" }}
        initial={{ y: -60 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* SECTION 1 */}
      <section
        id="Origin"
        className="h-screen flex items-center justify-center flex-col gap-2"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h1 variants={fadeUp} className="text-6xl font-serif">
            From Spirit to Human
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            Before form, there was only spirit.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            A silent spark drifting in the dark.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 */}
      <section
        id="Descent"
        className="h-screen flex items-center justify-center flex-col gap-2"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h3 variants={fadeUp} className="text-6xl font-serif">
            The Descent
          </motion.h3>

          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            With the first breath, light met flesh.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            The spirit learned weight, time, and direction.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 3 */}
      <section
        id="Becoming"
        className="h-screen flex items-center justify-center flex-col gap-2"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h3 variants={fadeUp} className="text-6xl font-serif">
            Becoming Human
          </motion.h3>

          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            Moments turned into stories.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            Steps shaped identity.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-bold font-sans">
            And the spirit slowly became human.
          </motion.p>
        </motion.div>
      </section>

      {/* FLOATING MENU */}
      <ul className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 mr-8 py-3 px-4 rounded-lg backdrop-blur bg-white/10 shadow-lg border border-white/20">
        {[
          { id: "Origin", label: "Origin" },
          { id: "Descent", label: "Descent" },
          { id: "Becoming", label: "Becoming" },
        ].map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="cursor-pointer"
          >
            <a
              className="font-semibold text-white/80 hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(item.id)
                if (el) lenis.scrollTo(el)
              }}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </motion.div>
        ))}
      </ul>

    </div >
  );
}
