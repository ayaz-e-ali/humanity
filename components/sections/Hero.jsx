'use client'
import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { fadeUp, letterVariants, staggerContainer } from '@/animations';

export default function Hero({ }) {
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
        <section
            id="Origin"
            className="relative h-screen flex items-center justify-center flex-col gap-2 overflow-hidden"
        >
            <div
                ref={parallaxRef}
                className="fixed top-0 left-0 w-full h-full"
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
                <motion.h1 variants={fadeUp} className="text-7xl font-bold tracking-widest">
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

                <motion.p variants={fadeUp} className="text-lg font-serif font-light  ">
                    Before form, there was only spirit.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg font-serif font-light ">
                    A silent spark drifting in the dark.
                </motion.p>
                <motion.p variants={fadeUp} className="animate-bounce duration-[1.5s]">
                    ↓
                </motion.p>
            </motion.div>
        </section>
    )
}