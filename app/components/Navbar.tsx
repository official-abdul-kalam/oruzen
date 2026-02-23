"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { clearSharedAuthCookie } from "@/lib/auth-utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            unsubscribe();
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            clearSharedAuthCookie();
            window.location.href = `https://accounts.oruzen.com/signin?redirect_url=${window.location.origin}`;
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const redirectUrl = typeof window !== "undefined" ? window.location.origin : "";

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
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

                    {user ? (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all group border border-transparent hover:border-slate-200"
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden border border-primary/20">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform origin-top-right p-1.5 z-[60]"
                                    >
                                        <div className="px-3 py-3 border-b border-slate-100 mb-1">
                                            <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'Oruzen User'}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="https://accounts.oruzen.com/account"
                                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                <LayoutDashboard size={16} />
                                            </div>
                                            Manage Account
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-100/50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                                <LogOut size={16} />
                                            </div>
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href={`https://accounts.oruzen.com/signin?redirect_url=${redirectUrl}`}>
                            <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/10">
                                Sign In
                            </button>
                        </Link>
                    )}
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

                            {user ? (
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt={user.displayName || ""} />
                                            ) : (
                                                <User className="text-primary" size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{user.displayName || 'Oruzen User'}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="https://accounts.oruzen.com/account"
                                        className="flex items-center gap-3 w-full py-3 px-4 bg-slate-100 text-slate-900 font-bold rounded-2xl"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LayoutDashboard size={20} />
                                        Manage Account
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-2xl"
                                    >
                                        <LogOut size={20} />
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link href={`https://accounts.oruzen.com/signin?redirect_url=${redirectUrl}`}>
                                    <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/10">
                                        Sign In
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
