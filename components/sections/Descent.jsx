'use client'
const { staggerContainer, fadeUp } = require("@/animations");
const { motion } = require("framer-motion");

export default function Descent({ }) {
    return (
        <section id="Descent" className="h-screen flex items-center justify-center flex-col gap-2 bg-gray-800/30 backdrop-blur-sm">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{
                once: true,
                amount: 0.4
            }} className="flex flex-col items-center gap-4">
                <motion.h3 variants={fadeUp} className="text-7xl font-bold tracking-widest">
                    The Descent
                </motion.h3>

                <motion.p variants={fadeUp} className="text-lg font-light font-serif ">
                    With the first breath, light met flesh.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg font-light font-serif ">
                    The spirit learned weight, time, and direction.
                </motion.p>
            </motion.div>
        </section>
    );
}
