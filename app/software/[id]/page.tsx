"use client";

import { useParams } from "next/navigation";
import { productsData } from "@/lib/data/products";
import Link from "next/link";
import { ArrowLeft, Download, Monitor, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function SoftwareDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const product = productsData.find(p => p.id === id && p.category === 'software');

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h1 className="text-3xl font-bold text-text-main mb-4">Software Not Found</h1>
                <Link href="/software" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Software
                </Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <div className="relative pt-32 pb-20 overflow-hidden border-b border-border bg-gradient-to-b from-slate-50 to-white">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Link href="/software" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-12 text-sm font-medium">
                            <ArrowLeft size={16} /> Back to All Software
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="fade-up">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide rounded-lg mb-6">
                                    <Monitor size={14} /> Desktop Application
                                </div>

                                <h1 className="text-5xl lg:text-6xl font-black font-heading tracking-tighter text-text-main mb-6 leading-tight">
                                    {product.name}
                                </h1>

                                <p className="text-xl text-text-muted mb-8 leading-relaxed max-w-xl">
                                    {product.description}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                                    <button className="w-full sm:w-auto px-8 h-14 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1">
                                        <Download size={20} />
                                        Download for {product.platforms[0] || "Windows"}
                                        <span className="text-white/60 text-sm font-normal">v{product.version}</span>
                                    </button>
                                    <button className="w-full sm:w-auto px-8 h-14 bg-white border border-border text-text-main font-bold rounded-2xl hover:bg-slate-50 transition-colors">
                                        View Pricing ({product.price})
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-green-500" />
                                        Safe & Verified by Oruzen Protect
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                        {product.downloads} Downloads
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image/Screenshot */}
                            <div className="relative fade-up" style={{ animationDelay: '0.2s' }}>
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 group relative">
                                    <div className="absolute inset-x-0 top-0 h-8 bg-slate-800 flex items-center px-4 gap-2 z-20">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <img
                                        src={product.screenshots[0]}
                                        alt={`${product.name} interface`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pt-8"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content (Features & Screenshots) */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* Features */}
                            <section className="fade-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-3 mb-8">
                                    <Zap size={24} className="text-amber-500" />
                                    <h2 className="text-3xl font-bold font-heading">Core Features</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-primary/20 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={16} className="text-green-600" />
                                            </div>
                                            <span className="font-medium text-slate-700 leading-snug pt-1">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Screenshots Gallery */}
                            {product.screenshots.length > 1 && (
                                <section className="fade-up" style={{ animationDelay: '0.2s' }}>
                                    <h2 className="text-3xl font-bold font-heading mb-8">Interface Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {product.screenshots.slice(1).map((shot, idx) => (
                                            <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-border shadow-sm group">
                                                <img src={shot} alt="App Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8 fade-up" style={{ animationDelay: '0.3s' }}>
                            <div className="bg-slate-50 border border-border rounded-3xl p-8 sticky top-32">
                                <h3 className="text-lg font-bold font-heading mb-6 border-b border-border pb-4">Software Information</h3>

                                <dl className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 border-dashed">
                                        <dt className="text-slate-500 text-sm font-medium">Version</dt>
                                        <dd className="font-bold text-slate-800">{product.version}</dd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 border-dashed">
                                        <dt className="text-slate-500 text-sm font-medium">Last Updated</dt>
                                        <dd className="font-bold text-slate-800">{product.updatedAt}</dd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 border-dashed">
                                        <dt className="text-slate-500 text-sm font-medium">Pricing Model</dt>
                                        <dd className="font-bold text-slate-800">{product.price}</dd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 border-dashed">
                                        <dt className="text-slate-500 text-sm font-medium">Developer</dt>
                                        <dd className="font-bold text-primary">{product.developer}</dd>
                                    </div>
                                </dl>

                                <div className="mt-8 pt-6 border-t border-border">
                                    <p className="text-sm font-bold text-slate-800 mb-3">Compatible Platforms</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.platforms.map(p => (
                                            <span key={p} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
