"use client";

import Link from "next/link";
import { productsData } from "@/lib/data/products";
import { Smartphone, Download, Star, ExternalLink } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function AppsPage() {
    const appsList = productsData.filter(p => p.category === 'apps');

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-16 fade-up">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-500 rounded-2xl mb-6">
                            <Smartphone size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-main mb-6 tracking-tight">
                            Mobile Applications
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Discover powerful, beautifully designed apps for your Android and iOS devices. Enhance your daily life on the go.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appsList.map((app, index) => (
                            <Link href={`/apps/${app.id}`} key={app.id} className="group fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="bg-white rounded-[2rem] border border-border p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 relative overflow-hidden flex flex-col">

                                    <div className="flex gap-5 mb-5">
                                        {/* App Icon */}
                                        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform overflow-hidden relative">
                                            <div className="text-4xl font-black text-slate-300 pointer-events-none select-none drop-shadow-sm">{app.name.charAt(0)}</div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <h3 className="text-lg font-bold text-text-main font-heading leading-tight mb-1 group-hover:text-blue-500 transition-colors">
                                                {app.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium mb-2">{app.developer}</p>
                                            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 w-fit px-2 py-0.5 rounded-full">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                4.8
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                        {app.description}
                                    </p>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{app.category}</span>
                                        <button className="px-5 py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                                            Get
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
