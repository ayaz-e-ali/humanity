"use client";
import FloatingMenu from "@/components/FloatingMenu";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const letterVariants = {
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


export default function Home() {
  const [activatedId, setActivatedId] = useState("Origin");

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

  const toggleAudio = async () => {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["Origin", "Descent", "Becoming"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      console.log('test');
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActivatedId(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <FloatingMenu activeId={activatedId} />
      {/* SECTION 1 */}
      <section
        id="Origin"
        className="relative h-screen flex items-center justify-center flex-col gap-2 overflow-hidden"
      >
        <div
          ref={parallaxRef}
          className="fixed inset-0 bg-linear-to-br "
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform',
            zIndex: -1,
          }}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h1 variants={fadeUp} className="text-6xl font-serif tracking-widest">
            {"From Spirit to Human".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                custom={index}
                style={{ display: 'inline-block' }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg font-sans font-light  ">
            Before form, there was only spirit.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-sans font-light ">
            A silent spark drifting in the dark.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 */}
      <section
        id="Descent"
        className="h-screen flex items-center justify-center flex-col gap-2 bg-gray-800/30 backdrop-blur-sm"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h3 variants={fadeUp} className="text-6xl font-serif tracking-widest">
            The Descent
          </motion.h3>

          <motion.p variants={fadeUp} className="text-lg font-light font-sans ">
            With the first breath, light met flesh.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-light font-sans ">
            The spirit learned weight, time, and direction.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 3 */}
      <section
        id="Becoming"
        className="h-screen flex items-center justify-center flex-col gap-2 bg-neutral-800/30 backdrop-blur-sm"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h3 variants={fadeUp} className="text-6xl font-serif tracking-widest">
            Becoming Human
          </motion.h3>

          <motion.p variants={fadeUp} className="text-lg font-sans font-light">
            Moments turned into stories.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-sans font-light">
            Steps shaped identity.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg font-sans font-light">
            And the spirit slowly became human.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 3 */}
      <section
        id="End"
        className="h-screen flex items-center justify-center flex-col gap-2"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h3 variants={fadeUp} className="text-6xl font-serif tracking-widest">
            Journey Complete
          </motion.h3>
        </motion.div>
      </section>


      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-8 left-8 z-20 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
      >
        {audioOn ? "Sound On" : "Sound Off"}
      </motion.button>

    </div >
  );
}