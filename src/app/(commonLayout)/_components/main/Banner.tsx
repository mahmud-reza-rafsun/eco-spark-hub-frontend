"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Lightbulb,
    Rocket,
    ArrowRight,
    Sparkles,
    MousePointer2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import IdeaPostForm from "../PostIdea/createPost/IdeaPostForm";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: "easeOut",
        },
    }),
};

const Banner = () => {
    const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);

    return (
        <section className="relative w-full bg-white dark:bg-[#09090b] pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden rounded-lg">
            {/* Animated Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px]"
                />

                <motion.div
                    animate={{
                        scale: [1.15, 1, 1.15],
                        opacity: [0.25, 0.15, 0.25],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-medium mb-6"
                    >
                        <Sparkles size={14} />
                        <span>Fueling the Next Generation of Creators</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        custom={0.15}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight text-gray-900 dark:text-white"
                    >
                        Have a Great Idea? <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-400">
                            Make it Spark.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        custom={0.3}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl md:max-w-2xl text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 leading-relaxed"
                    >
                        Join EcoSpark Hub to share your innovative solutions, collaborate
                        with experts, and turn your raw concepts into impactful realities.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        custom={0.45}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Button
                            onClick={() => setIsIdeaModalOpen(true)}
                            className="group px-6 py-6.5 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                        >
                            <Lightbulb
                                size={18}
                                className="group-hover:rotate-12 transition-transform"
                            />
                            Post Your Idea
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Button>

                        <Link
                            href="/ideas"
                            className="px-6 py-3.5 bg-transparent border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
                        >
                            Explore Ideas
                        </Link>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 80,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.6,
                            ease: "easeOut",
                        }}
                        className="mt-12 w-full max-w-4xl relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09090b] to-transparent z-10 h-16 bottom-0"></div>

                        <div className="p-3 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#111113]/50 backdrop-blur-sm shadow-2xl">
                            <div className="rounded-[1.2rem] overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c0c0e] aspect-[21/9] flex items-center justify-center relative group">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-3"
                                    >
                                        <Rocket size={28} />
                                    </motion.div>

                                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                                        Dashboard Mockup Preview
                                    </p>
                                </div>

                                {/* Floating Collaborate Badge */}
                                <motion.div
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute bottom-6 right-12 hidden md:flex items-center gap-2 bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg shadow-lg"
                                >
                                    <MousePointer2 size={12} fill="currentColor" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        Collaborate
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <IdeaPostForm
                isOpen={isIdeaModalOpen}
                onClose={() => setIsIdeaModalOpen(false)}
            />
        </section>
    );
};

export default Banner;
