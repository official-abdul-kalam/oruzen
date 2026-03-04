"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Layers } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Secure by Default",
        desc: "Enterprise-grade protection integrated into every layer of our platform.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        desc: "Optimized for speed with zero bloat. Experience seamless interactions.",
    },
    {
        icon: Layers,
        title: "Scalable Architecture",
        desc: "Built to grow with you. Modular components that fit your evolving needs.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold font-heading text-primary mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
