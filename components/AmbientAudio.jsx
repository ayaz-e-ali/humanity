'use client'
import { useEffect, useRef, useState } from "react";

export default function AmbientAudio() {
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

    return (
        <button
            onClick={toggleAudio}
            className="fixed bottom-8 left-8 z-20 rounded-full border border-white/20 bg-black/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:scale-105 transition backdrop-blur"
        >
            {audioOn ? "Sound On" : "Sound Off"}
        </button>
    )
}
