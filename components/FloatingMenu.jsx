'use client'
import { lenis } from "@/app/lenis";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingMenu({}) {
    const sections = [
        { id: "Origin", label: "From Spirit to Human" },
        { id: "Descent", label: "The Descent" },
        { id: "Becoming", label: "The Becoming" },
        { id: "End", label: "The End" },
    ];

    const [activatedId, setActivatedId] = useState("Origin");
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["Origin", "Descent", "Becoming", "End"];
            const scrollPosition = window.scrollY + window.innerHeight / 2;
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

    return (
        <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="fixed right-6 top-1/2 z-20 -translate-y-1/2 space-y-4 rounded-3xl border border-white/10 bg-black/30 px-4 py-6 backdrop-blur-xl"
        >
            {sections.map((item, index) => {
                const isActive = activatedId === item.id;
                return (
                    <li key={item.id}>
                        <motion.button
                            whileHover={{ x: -4, opacity: 1 }}
                            className="flex items-center gap-3 text-left text-sm text-white/60 transition-colors hover:text-white"
                            onClick={() => {
                                if (lenis) {
                                    lenis.scrollTo(`#${item.id}`);
                                } else {
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        >
                            <span className={`h-1.5 w-8 rounded-full transition-all ${isActive ? "bg-white" : "bg-white/30"}`} />
                            <span className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                                    {`0${index + 1}`}
                                </span>
                                <span
                                    className={`font-semibold ${isActive ? "text-white" : "text-white/60"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </span>
                        </motion.button>
                    </li>
                );
            })}
        </motion.ul>
    );
}
