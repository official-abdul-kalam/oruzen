"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                        {/* Abstract 'O' Logo Mark */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" className="opacity-25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold font-heading text-primary tracking-tighter">
                        Oruzen<span className="text-secondary">.</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/tools" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                        Our Tools
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                        Philosophy
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                        Contact
                    </Link>
                    <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5">
                        Explore Ecosystem
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-text-main"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            <Link
                                href="/tools"
                                className="text-base font-medium text-text-main"
                                onClick={() => setIsOpen(false)}
                            >
                                Our Tools
                            </Link>
                            <Link
                                href="/about"
                                className="text-base font-medium text-text-main"
                                onClick={() => setIsOpen(false)}
                            >
                                Philosophy
                            </Link>
                            <Link
                                href="/contact"
                                className="text-base font-medium text-text-main"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                            <button className="w-full py-3 bg-primary text-white font-medium rounded-lg">
                                Explore Ecosystem
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
