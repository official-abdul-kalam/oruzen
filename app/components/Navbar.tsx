"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Monitor, Smartphone, Terminal, ArrowRight, Star, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { clearSharedAuthCookie } from "@/lib/auth-utils";
import { productsData } from "@/lib/data/products";
import { toolsData } from "@/lib/data/tools";

export default function Navbar({
    theme = 'light',
    ctaText,
    ctaHref,
}: {
    theme?: 'light' | 'dark',
    ctaText?: string,
    ctaHref?: string,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState<'software' | 'apps' | 'open-source' | 'projects'>('software');
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
            window.location.href = `/signin?redirect_url=${window.location.origin}`;
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
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${theme === 'dark' && !scrolled ? 'bg-white text-black' : 'bg-primary text-white'}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" className="opacity-25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                    </div>
                    <span className={`text-2xl font-bold font-heading tracking-tighter ${theme === 'dark' && !scrolled ? 'text-white' : 'text-primary'}`}>
                        Oruzen<span className={theme === 'dark' && !scrolled ? 'text-white/80' : 'text-secondary'}>.</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">

                    {/* Tools Mega Menu */}
                    <div className="relative group">
                        <Link href="/tools" className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${theme === 'dark' && !scrolled ? 'text-white/80 hover:text-white' : 'text-text-muted hover:text-primary'}`}>
                            Tools <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-[450px] z-50">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-4 grid grid-cols-2 gap-2">
                                {toolsData.slice(0, 4).map(tool => (
                                    <Link key={tool.id} href={tool.href} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors group/item flex flex-col gap-1.5 border border-transparent hover:border-slate-100">
                                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors flex items-center justify-between">
                                            {tool.name}
                                            {tool.badge && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold uppercase">{tool.badge}</span>}
                                        </p>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{tool.description}</p>
                                    </Link>
                                ))}
                                <div className="col-span-2 mt-2 pt-2 border-t border-slate-100">
                                    <Link href="/tools" className="text-sm font-bold text-primary hover:text-white hover:bg-primary flex items-center justify-center gap-2 w-full p-3 bg-primary/5 rounded-xl transition-colors">
                                        Browse all tools <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Mega Menu */}
                    <div className="relative group">
                        <Link href="/software" className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${theme === 'dark' && !scrolled ? 'text-white/80 hover:text-white' : 'text-text-muted hover:text-primary'}`}>
                            Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-[650px] z-50">
                            <div className="bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-slate-200 overflow-hidden flex">

                                {/* Sidebar categories */}
                                <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100 flex flex-col gap-2">
                                    <Link href="/software" onMouseEnter={() => setActiveCategory('software')} className={`px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3 ${activeCategory === 'software' ? 'bg-white border text-primary border-primary/20 shadow-sm' : 'border border-transparent text-slate-600 hover:bg-slate-100'}`}>
                                        <Monitor size={18} className={activeCategory === 'software' ? 'text-primary' : 'text-slate-400'} /> Software
                                    </Link>
                                    <Link href="/apps" onMouseEnter={() => setActiveCategory('apps')} className={`px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3 ${activeCategory === 'apps' ? 'bg-white border text-blue-500 border-blue-500/20 shadow-sm' : 'border border-transparent text-slate-600 hover:bg-slate-100'}`}>
                                        <Smartphone size={18} className={activeCategory === 'apps' ? 'text-blue-500' : 'text-slate-400'} /> Apps
                                    </Link>
                                    <Link href="/open-source" onMouseEnter={() => setActiveCategory('open-source')} className={`px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3 ${activeCategory === 'open-source' ? 'bg-white border text-slate-800 border-slate-800/20 shadow-sm' : 'border border-transparent text-slate-600 hover:bg-slate-100'}`}>
                                        <Terminal size={18} className={activeCategory === 'open-source' ? 'text-slate-800' : 'text-slate-400'} /> Open S.
                                    </Link>
                                    <div className="h-px bg-slate-200 my-1"></div>
                                    <Link href="/projects" onMouseEnter={() => setActiveCategory('projects')} className={`px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3 ${activeCategory === 'projects' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-500/20 shadow-md text-white' : 'border border-transparent text-slate-600 hover:bg-slate-100'}`}>
                                        <Code2 size={18} className={activeCategory === 'projects' ? 'text-white' : 'text-slate-400'} /> Student Projects
                                    </Link>
                                </div>

                                {/* Top Products Grid */}
                                <div className="w-2/3 p-6 bg-white">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        Featured {activeCategory === 'software' ? 'Software' : activeCategory === 'apps' ? 'Apps' : activeCategory === 'projects' ? 'Source Codes' : 'Open Source'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {activeCategory === 'projects' ? (
                                            /* Import is tricky here since projectsData is separate,
                                               so we use a dedicated Link for projects directly */
                                            <div className="col-span-2 space-y-3">
                                                <Link href="/projects" className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-sm">
                                                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold group-hover/item:scale-105 transition-transform shadow-md">
                                                        <Code2 size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-blue-900 mb-1">Explore all Source Codes</p>
                                                        <p className="text-xs text-blue-700/70 font-medium">Download React, Python, Node.js projects for your next assignment.</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : (
                                            productsData.filter(p => p.category === activeCategory).slice(0, 4).map(product => (
                                                <Link key={product.id} href={`/${activeCategory}/${product.id}`} className="group/item flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover/item:text-primary font-bold text-lg text-slate-400 group-hover/item:scale-105 transition-transform shadow-sm">
                                                        {product.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors line-clamp-1 mb-0.5">{product.name}</p>
                                                        <p className="text-[11px] text-slate-500 line-clamp-1">{product.tagline}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                        <Link href={`/${activeCategory}`} className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors">
                                            Explore {activeCategory === 'open-source' || activeCategory === 'projects' ? 'ecosystem' : activeCategory} <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/about" className={`text-sm font-medium transition-colors ${theme === 'dark' && !scrolled ? 'text-white/80 hover:text-white' : 'text-text-muted hover:text-primary'}`}>
                        Philosophy
                    </Link>
                    <Link href="/contact" className={`text-sm font-medium transition-colors ${theme === 'dark' && !scrolled ? 'text-white/80 hover:text-white' : 'text-text-muted hover:text-primary'}`}>
                        Contact
                    </Link>
                    {user ? (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className={`flex items-center justify-center p-0.5 rounded-full transition-all group border-2 ${theme === 'dark' && !scrolled ? 'border-white/20 hover:border-white/40' : 'border-transparent hover:border-slate-300'} shadow-sm hover:shadow-md h-[42px] w-[42px]`}
                            >
                                <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-slate-100 text-slate-600`}>
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="font-bold text-sm tracking-widest">{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white overflow-hidden transform origin-top-right p-2 z-[60]"
                                    >
                                        <div className="px-4 py-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl mb-2 border border-slate-100">
                                            <p className="text-sm font-black font-heading text-slate-900 truncate mb-0.5">{user.displayName || 'Oruzen User'}</p>
                                            <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Link href="/accounts" onClick={() => setShowProfileMenu(false)}>
                                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-primary rounded-xl transition-all group">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-sm">
                                                        <LayoutDashboard size={16} />
                                                    </div>
                                                    Manage Account
                                                </button>
                                            </Link>
                                            <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 group-hover:text-red-600 group-hover:bg-red-100 transition-colors shadow-sm">
                                                    <LogOut size={16} />
                                                </div>
                                                Log Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href={ctaHref || `/signin?redirect_url=${redirectUrl}`}>
                            <button className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg ${theme === 'dark' && !scrolled ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md' : 'bg-primary text-white hover:bg-slate-800 shadow-primary/10'}`}>
                                {ctaText || 'Sign In'}
                            </button>
                        </Link>
                    )}
                </div>

                <button
                    className={`md:hidden p-2 ${theme === 'dark' && !scrolled ? 'text-white' : 'text-text-main'}`}
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
                                Tools
                            </Link>

                            <div className="flex flex-col gap-3 py-2 border-y border-slate-100">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Products</span>
                                <Link
                                    href="/software"
                                    className="flex items-center gap-3 text-base font-medium text-text-main pl-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Monitor size={18} className="text-primary" /> Software
                                </Link>
                                <Link
                                    href="/apps"
                                    className="flex items-center gap-3 text-base font-medium text-text-main pl-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Smartphone size={18} className="text-blue-500" /> Apps
                                </Link>
                                <Link
                                    href="/open-source"
                                    className="flex items-center gap-3 text-base font-medium text-text-main pl-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Terminal size={18} className="text-slate-800" /> Open Source
                                </Link>
                                <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                <Link
                                    href="/projects"
                                    className="flex items-center gap-3 text-base font-bold text-blue-600 pl-2 bg-blue-50 py-2 rounded-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Code2 size={18} /> Student Projects
                                </Link>
                            </div>

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
                                    <Link href="/accounts" onClick={() => setIsOpen(false)}>
                                        <button className="flex items-center gap-3 w-full py-3 px-4 bg-slate-50 text-slate-700 font-bold rounded-2xl">
                                            <LayoutDashboard size={20} />
                                            Manage Account
                                        </button>
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
                                <Link href={`/signin?redirect_url=${redirectUrl}`}>
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
