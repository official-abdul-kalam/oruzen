"use client";

import { useParams } from "next/navigation";
import { productsData } from "@/lib/data/products";
import Link from "next/link";
import { ArrowLeft, Star, Download, Smartphone, ShieldCheck, Share2, Info } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function AppDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const app = productsData.find(p => p.id === id && p.category === 'apps');

    if (!app) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h1 className="text-3xl font-bold text-text-main mb-4">App Not Found</h1>
                <Link href="/apps" className="text-blue-500 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Apps
                </Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background pb-24">

                {/* Minimal App Header */}
                <div className="border-b border-border bg-white pt-24 pb-12 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/apps" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 text-sm font-medium">
                            <ArrowLeft size={16} /> Back
                        </Link>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start">
                            {/* App Icon Large */}
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 fade-up">
                                <span className="text-6xl font-black text-slate-300 pointer-events-none select-none drop-shadow-sm">{app.name.charAt(0)}</span>
                            </div>

                            {/* Title & Actions */}
                            <div className="flex-1 fade-up" style={{ animationDelay: '0.1s' }}>
                                <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-2">
                                    {app.name}
                                </h1>
                                <p className="text-lg text-blue-600 font-bold mb-4">{app.developer}</p>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 text-sm text-slate-600 font-medium">
                                    <div className="flex flex-col">
                                        <span className="flex items-center gap-1 font-bold text-slate-900 text-lg">
                                            4.8 <Star size={18} className="text-yellow-400 fill-yellow-400 -mt-0.5" />
                                        </span>
                                        <span className="text-xs uppercase tracking-wider text-slate-400">12K Reviews</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 text-lg">{app.downloads}</span>
                                        <span className="text-xs uppercase tracking-wider text-slate-400">Downloads</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 text-lg">E</span>
                                        <span className="text-xs uppercase tracking-wider text-slate-400">Everyone</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="px-10 h-14 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 w-full sm:w-auto text-lg">
                                        Install ({app.price})
                                    </button>
                                    <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shrink-0">
                                        <Share2 size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 pt-12">

                    {/* Horizontal Screenshots Scroll */}
                    <div className="mb-16 fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                            {app.screenshots.map((shot, idx) => (
                                <div key={idx} className="w-[280px] sm:w-[320px] shrink-0 snap-center rounded-[2rem] overflow-hidden border-4 border-slate-800 bg-slate-900 shadow-xl relative aspect-[9/19]">
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-3xl z-20"></div>
                                    <img src={shot} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover relative z-10" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold font-heading text-slate-900">About this app</h2>
                            <ArrowLeft size={24} className="text-slate-400 rotate-180" />
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                            <p className="text-lg font-medium text-slate-800 mb-6 leading-relaxed">
                                {app.tagline}
                            </p>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-8">
                                {app.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-6 border-t border-slate-100">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Updated on</h3>
                                    <p className="text-slate-600">{app.updatedAt}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Version</h3>
                                    <p className="text-slate-600">{app.version}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Requires Android</h3>
                                    <p className="text-slate-600">8.0 and up</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Offered by</h3>
                                    <p className="text-slate-600">{app.developer}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Safety */}
                    <div className="mt-8 fade-up" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 flex items-center gap-3">
                                <ShieldCheck size={28} className="text-green-500" /> Data safety
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50">
                                    <Info size={24} className="text-slate-400 shrink-0" />
                                    <div>
                                        <p className="font-bold text-slate-900">No data shared with third parties</p>
                                        <p className="text-sm text-slate-500">Learn more about how developers declare sharing</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50">
                                    <ShieldCheck size={24} className="text-green-500 shrink-0" />
                                    <div>
                                        <p className="font-bold text-slate-900">Data is encrypted in transit</p>
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
