"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { lenis } from "./lenis";
import FloatingMenu from "@/components/FloatingMenu";

const pseudoRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const createParticles = (count = 18) =>
  Array.from({ length: count }, (_, index) => {
    const base = index + 1;
    return {
      id: base,
      top: `${pseudoRandom(base * 2.3) * 100}%`,
      left: `${pseudoRandom(base * 3.1) * 100}%`,
      delay: pseudoRandom(base * 4.7) * 4,
      duration: pseudoRandom(base * 5.9) * 8 + 6,
      size: pseudoRandom(base * 7.3) * 2 + 1,
    };
  });

const particlesPreset = createParticles();

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

function StoryPanel({ step, onActive, index }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 1, 0.6]);

  useEffect(() => {
    if (isInView) onActive(step.id);
  }, [isInView, onActive, step.id]);

  const beatNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      id={step.id}
      ref={sectionRef}
      className="relative min-h-[90vh] px-6 py-28 md:px-16"
    >
      <motion.div
        className="pointer-events-none absolute inset-6 -z-10 rounded-[48px] bg-gradient-to-br from-white/4 via-white/2 to-transparent blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 rounded-[40px] border border-white/10 bg-white/[0.04] px-10 py-16 backdrop-blur-[60px] md:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div className="space-y-8" style={{ opacity: textOpacity }}>
          <div className="flex items-center gap-6 text-white/60">
            <span className="text-5xl font-light tracking-[0.3em] text-white/20">
              {beatNumber}
            </span>
            <span className="h-px flex-1 bg-white/20" />
            <p className="text-[10px] uppercase tracking-[0.6em]">
              {step.label}
            </p>
          </div>

          <div className="space-y-6">
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.4em] text-white/50"
            >
              {step.kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-serif leading-tight text-white md:text-5xl"
            >
              {step.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg text-white/70 md:text-xl"
            >
              {step.summary}
            </motion.p>
          </div>

          <motion.ul
            variants={fadeUp}
            className="relative pl-6 text-base text-white/80"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
            {step.points.map((point) => (
              <li key={point} className="py-2">
                <p className="font-light">{point}</p>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="relative h-[28rem] w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/5">
          <motion.div
            style={{ opacity: glowOpacity }}
            className={`absolute inset-0 ${step.accent} blur-3xl`}
          />
          <motion.div
            style={{ y: mediaY }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <Image
              src={step.media.src}
              alt={step.media.alt}
              width={280}
              height={280}
              className="opacity-90 drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-x-12 bottom-10 flex justify-between text-[10px] uppercase tracking-[0.4em] text-white/40"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          >
            <span>{step.label}</span>
            <span>{beatNumber}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    audioRef.current = new Audio("/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = useCallback(async () => {
    if (!audioRef.current) return;
    if (audioOn) {
      audioRef.current.pause();
      setAudioOn(false);
      return;
    }

    try {
      await audioRef.current.play();
      setAudioOn(true);
    } catch (error) {
      console.warn("Unable to start audio", error);
    }
  }, [audioOn]);

  const particles = particlesPreset;

  const handleSectionActivate = useCallback((id) => {
    setActiveSection(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010101] text-white">
      <motion.div
        className="fixed inset-0 -z-20 bg-linear-to-b from-black via-[#050505] to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(91,139,255,0.3), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,149,174,0.2), transparent 35%), radial-gradient(circle at 50% 80%, rgba(115,255,198,0.18), transparent 45%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="fixed inset-0 -z-10 opacity-30 blur-[140px]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        style={{
          background:
            "linear-gradient(120deg, rgba(97,170,255,0.4), rgba(255,186,160,0.4), rgba(127,255,212,0.3))",
          backgroundSize: "200% 200%",
        }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="pointer-events-none fixed -z-5 block rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: ["0%", "-30%", "10%"],
            opacity: [0.2, 0.9, 0.4],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      <motion.div
        className="fixed left-0 top-0 z-30 h-px w-full origin-left bg-white/40"
        style={{ scaleX: progress }}
      />

      <main className="relative z-10">
        <section
          ref={heroRef}
          className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12"
        >
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.p
              initial={{ letterSpacing: "0.6em", opacity: 0 }}
              animate={{ letterSpacing: "0.3em", opacity: 0.7 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.3em] text-white/60"
            >
              BrainTech Assignment
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-8 text-5xl font-serif leading-tight md:text-7xl"
            >
              From Spirit to Human
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="mx-auto mt-8 max-w-3xl text-lg text-white/70 md:text-xl"
            >
              A scroll-activated narrative exploring how intangible stories
              settle into human form. Built with Next.js, Framer Motion, and
              Lenis for the Frontend Developer hiring challenge.
            </motion.p>
          </motion.div>
        </section>

        {storyBeats.map((step, index) => (
          <StoryPanel
            key={step.id}
            step={step}
            index={index}
            onActive={handleSectionActivate}
          />
        ))}
      </main>

      <FloatingMenu sections={storyBeats} activeId={activeSection} />

      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-8 left-8 z-20 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
      >
        {audioOn ? "Sound On" : "Sound Off"}
      </motion.button>
    </div>
  );
}

