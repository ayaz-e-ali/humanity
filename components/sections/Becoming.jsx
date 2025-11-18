'use client'
import React from 'react'
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from '@/animations';

export default function Becoming() {

    return (
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
                <motion.h3 variants={fadeUp} className="text-7xl font-bold tracking-widest">
                    Becoming Human
                </motion.h3>

                <motion.p variants={fadeUp} className="text-lg font-serif font-light">
                    Moments turned into stories.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg font-serif font-light">
                    Steps shaped identity.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg font-serif font-light">
                    And the spirit slowly became human.
                </motion.p>
            </motion.div>
        </section>
    )
}
