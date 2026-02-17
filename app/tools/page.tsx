"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Box, Activity, Zap, Lock, BarChart3, Cloud, Layout, Smartphone } from "lucide-react";

// Dummy Tools Data
const tools = [
    {
        icon: Layout,
        title: "Oruzen Flow",
        desc: "A minimalist project management workspace that adapts to your brain.",
        tag: "Productivity",
    },
    {
        icon: Lock,
        title: "Oruzen Shield",
        desc: "Enterprise-grade identity protection for your entire digital ecosystem.",
        tag: "Security",
    },
    {
        icon: BarChart3,
        title: "Oruzen Pulse",
        desc: "Real-time analytics that turn noise into actionable signals.",
        tag: "Analytics",
    },
    {
        icon: Cloud,
        title: "Oruzen Sync",
        desc: "Seamless cloud storage with zero-knowledge encryption.",
        tag: "Infrastructure",
    },
    {
        icon: Smartphone,
        title: "Oruzen Go",
        desc: "The companion mobile app for managing your empire on the fly.",
        tag: "Mobile",
    },
    {
        icon: Zap,
        title: "Oruzen Spark",
        desc: "AI-powered innovative assistant that helps you write code faster.",
        tag: "AI Dev",
    },
];

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-semibold tracking-wider text-sm uppercase">The Ecosystem</span>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mt-3 mb-6">
                        Tools built for mastery.
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Each Oruzen tool is designed to stand alone, yet powerful enough to work together.
                        We build the quiet infrastructure for your loud ambitions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group p-8 border border-border rounded-xl hover:shadow-xl hover:border-secondary/20 transition-all duration-300 bg-white"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <tool.icon size={24} />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-full">
                                    {tool.tag}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 font-heading">{tool.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                {tool.desc}
                            </p>
                            <button className="text-sm font-semibold text-secondary flex items-center gap-1 hover:gap-2 transition-all">
                                Learn More <span>→</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
