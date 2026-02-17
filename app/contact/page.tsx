"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold font-heading text-primary mb-6">
                            Let's build together.
                        </h1>
                        <p className="text-lg text-text-muted mb-12">
                            Whether you're interested in our ecosystem or want to partner with Oruzen,
                            we're ready to listen.
                        </p>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary border border-slate-200">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Email Us</h3>
                                    <p className="text-text-muted">partners@oruzen.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary border border-slate-200">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Global HQ</h3>
                                    <p className="text-text-muted">100 Innovation Drive, Tech City</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary border border-slate-200">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Presence</h3>
                                    <p className="text-text-muted">Working across 12 countries</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl border border-border shadow-sm"
                    >
                        <form className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-text-main">First Name</label>
                                    <input type="text" className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-slate-50" placeholder="Jane" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-text-main">Last Name</label>
                                    <input type="text" className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-slate-50" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">Email Address</label>
                                <input type="email" className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-slate-50" placeholder="jane@company.com" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">Message</label>
                                <textarea rows={4} className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-slate-50" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-all">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
