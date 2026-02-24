"use client";

import Link from "next/link";
import { productsData } from "@/lib/data/products";
import { Monitor, Download, Star, ArrowRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function SoftwarePage() {
    const softwareList = productsData.filter(p => p.category === 'software');

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-16 fade-up">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-6">
                            <Monitor size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6 tracking-tight">
                            Premium Desktop Software
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Powerful, meticulously crafted applications for Windows and macOS. Built for professionals, loved by creators.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {softwareList.map((software, index) => (
                            <Link href={`/software/${software.id}`} key={software.id} className="group fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="bg-white rounded-3xl border border-border p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden">

                                    {/* Background Gradient Blob */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                                {/* Using a generic icon representation, since dynamic icon imports are tricky in typical Next.js without a map. */}
                                                {/* Alternatively, we can use an image or an initial letter. Let's use first letter for simplicity across all icons if we don't map them. */}
                                                <span className="text-2xl font-bold font-heading">{software.name.charAt(0)}</span>
                                            </div>
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                                                {software.price}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-text-main mb-2 font-heading group-hover:text-primary transition-colors">
                                            {software.name}
                                        </h3>
                                        <p className="text-text-muted text-sm mb-6 flex-grow line-clamp-2">
                                            {software.tagline}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                                <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                                    <Download size={16} />
                                                    <span>{software.downloads}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="flex gap-1">
                                                        {software.platforms.map(platform => (
                                                            <span key={platform} className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] uppercase font-bold text-slate-500">
                                                                {platform.substring(0, 3)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
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
