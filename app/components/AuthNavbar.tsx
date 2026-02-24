"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Code2, Monitor, Smartphone, Star, Terminal } from "lucide-react";
import { productsData } from "@/lib/data/products";
import { toolsData } from "@/lib/data/tools";
import { useState } from "react";

export default function AuthNavbar({
    ctaText,
    ctaHref,
}: {
    ctaText: string,
    ctaHref: string,
}) {
    const [activeCategory, setActiveCategory] = useState<'software' | 'apps' | 'open-source' | 'projects'>('software');

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 py-6">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm bg-white text-black">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" className="opacity-25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold font-heading tracking-tighter text-white">
                        Oruzen<span className="text-white/80">.</span>
                    </span>
                </Link>

                {/* Desktop Links - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">

                    {/* Tools Mega Menu */}
                    <div className="relative group">
                        <Link href="/tools" className="flex items-center gap-1 text-sm font-medium transition-colors py-2 text-white/80 hover:text-white">
                            Tools <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-[450px] z-50">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-4 grid grid-cols-2 gap-2 text-black">
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
                        <Link href="/software" className="flex items-center gap-1 text-sm font-medium transition-colors py-2 text-white/80 hover:text-white">
                            Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-[650px] z-50">
                            <div className="bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-slate-200 overflow-hidden flex text-black">

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

                    <Link href="/about" className="text-sm font-medium transition-colors text-white/80 hover:text-white">
                        Philosophy
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors text-white/80 hover:text-white">
                        Contact
                    </Link>
                </div>

                {/* Right Action (Not centered, pushed to right) */}
                <div className="flex items-center gap-4">
                    <Link href={ctaHref}>
                        <button className="px-6 py-2.5 text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md">
                            {ctaText}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
