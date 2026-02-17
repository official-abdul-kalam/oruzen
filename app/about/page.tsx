"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-primary mb-8 leading-tight">
                        We build the silent infrastructure of the internet.
                    </h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        Oruzen is not just a company. It is a philosophy of subtraction.
                        We believe that the best software is the one you don't notice.
                        It just works. quietly. smartly. powerfully.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Quiet</h3>
                        <p className="text-text-muted">
                            No notifications that don't matter. No clutter. Just focus.
                            We design for peace of mind in a chaotic digital world.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Smart</h3>
                        <p className="text-text-muted">
                            Our algorithms anticipate your needs before you do.
                            Automation should feel like magic, not configuration.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Powerful</h3>
                        <p className="text-text-muted">
                            Under the minimal hood lies an engine built for enterprise scale.
                            We don't compromise on performance for aesthetics.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
