"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero-bg.webp"
                    alt="Abstract Background"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-secondary uppercase bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100">
                            Quietly Powerful
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-primary leading-[1.1] mb-6 tracking-tight">
                            Smart solutions for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-600">
                                modern complexity.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-muted mb-8 max-w-xl leading-relaxed">
                            Oruzen brings clarity to your workflow. Minimalist design meets maximum efficiency in a platform built for trust.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="https://accounts.oruzen.com/signup" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-slate-800 transition-all text-center transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                                Start Building
                            </a>
                            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-text-main border border-border font-medium rounded-lg hover:bg-white transition-all">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
