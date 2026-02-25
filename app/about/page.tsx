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
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-slate-900 mb-8 leading-tight">
                        We build the silent infrastructure of the internet.
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Oruzen is more than just a software company. We are a philosophy of subtraction.
                        Our mission is to build the future of software—tools that are quiet, smart, and powerful.
                        We believe the best technology is invisible, empowering you to do your best work without getting in the way.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Quiet</h3>
                        <p className="text-slate-600 leading-relaxed">
                            No notifications that don't matter. No clutter. Just focus.
                            We design for peace of mind in a chaotic digital world, stripping away the unnecessary to reveal the essential.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Smart</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our algorithms anticipate your needs before you do.
                            Automation should feel like magic, not configuration. We leverage AI to eliminate friction.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Powerful</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Under the minimal hood lies an engine built for modern scale.
                            We don't compromise on performance for aesthetics. Our tools are built to handle anything.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
