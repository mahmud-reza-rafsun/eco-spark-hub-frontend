"use client";

import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

// A high-quality, verified Lottie animation featuring minimal gray-toned characters
// collaborating, helping each other, and building ideas together.
const COLLABORATION_ANIMATION_URL = "https://lottie.host/8040db42-4f9e-49b5-901d-557cb3e1c618/bWq3AALVz2.json";

export function HeroRelayAnimation() {
    return (
        <div className="relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-transparent">

            {/* Background Glow Effect - Using Indigo 500 */}
            <motion.div
                className="absolute h-60 w-60 rounded-full bg-indigo-500/10 blur-[80px] dark:bg-indigo-500/20"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Lottie Cartoon Human Animation Container */}
            <div className="relative z-10 w-full max-w-[300px] md:max-w-[340px]">
                <Lottie
                    animationData={null} // Left null to load from the path below safely
                    path={COLLABORATION_ANIMATION_URL}
                    loop={true}
                    className="w-full h-full opacity-90 dark:opacity-95 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                />
            </div>

            {/* Interactive Indigo Floating Badge */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-6 z-20 flex items-center gap-2.5 rounded-full border border-indigo-500/20 bg-white/60 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-600 shadow-sm backdrop-blur-md dark:bg-neutral-900/60 dark:text-indigo-400"
            >
                {/* Animated Indigo Pulse Ring */}
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                </span>
                Empowering Communities Together
            </motion.div>

            {/* Subtle background context particles */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-12 left-12 h-1.5 w-1.5 rounded-full bg-indigo-400/60 animate-pulse" />
                <div className="absolute bottom-20 right-16 h-2 w-2 rounded-full bg-indigo-400/40 animate-ping [animation-duration:3s]" />
            </div>
        </div>
    );
}
