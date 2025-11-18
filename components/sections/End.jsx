'use client'
import React from 'react'
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from '@/animations';

export default function End() {
    return (
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
                <motion.h3 variants={fadeUp} className="text-7xl font-bold tracking-widest">
                    Journey Complete
                </motion.h3>
            </motion.div>
        </section>
    )
}
