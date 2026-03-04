"use client";

import { useParams } from "next/navigation";
import { productsData } from "@/lib/data/products";
import Link from "next/link";
import { ArrowLeft, Github, Star, GitFork, BookOpen, Terminal, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function OpenSourceDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const project = productsData.find(p => p.id === id && p.category === 'open-source');

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white">
                <h1 className="text-3xl font-bold font-mono mb-4">Repository Not Found</h1>
                <Link href="/open-source" className="text-blue-400 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Open Source
                </Link>
            </div>
        );
    }

    const repoName = `oruzen/${project.name.toLowerCase().replace(/ /g, '-')}`;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0d1117] text-slate-300 font-sans pb-24">

                {/* Minimal Header */}
                <div className="border-b border-[#30363d] bg-[#161b22] pt-24 pb-6 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6">
                        <Link href="/open-source" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors mb-6 text-sm font-medium">
                            <ArrowLeft size={16} /> Open Source
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 fade-up">
                            <div className="flex items-center gap-3">
                                <BookOpen size={24} className="text-slate-500" />
                                <h1 className="text-2xl font-semibold text-blue-400 font-mono hover:underline cursor-pointer">
                                    {repoName}
                                </h1>
                                <span className="px-2 py-0.5 border border-[#30363d] rounded-full text-xs font-mono text-slate-400 ml-2">Public</span>
                            </div>

                            <div className="flex items-center gap-3 font-mono text-xs">
                                <button className="flex items-center gap-2 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e] transition-colors rounded-md px-3 py-1.5 focus:outline-none">
                                    <Star size={14} className="text-slate-400" />
                                    <span className="font-semibold text-slate-200">Star</span>
                                    <span className="px-1.5 bg-[#30363d] rounded-full text-slate-200 ml-1">{project.stars}</span>
                                </button>
                                <button className="flex items-center gap-2 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e] transition-colors rounded-md px-3 py-1.5 focus:outline-none">
                                    <GitFork size={14} className="text-slate-400" />
                                    <span className="font-semibold text-slate-200">Fork</span>
                                    <span className="px-1.5 bg-[#30363d] rounded-full text-slate-200 ml-1">1.2k</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Main Content (Readme & Terminal) */}
                        <div className="lg:col-span-3 space-y-8 fade-up" style={{ animationDelay: '0.1s' }}>

                            <div className="flex items-center gap-4 border-b border-[#30363d] pb-4">
                                <Link href={project.githubUrl || "#"} className="flex flex-col items-center gap-1 group">
                                    <span className="text-sm font-semibold text-slate-200 flex items-center gap-2 px-4 py-2 bg-[#21262d] rounded-lg border border-[#30363d] cursor-pointer hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
                                        <Terminal size={16} /> Code
                                    </span>
                                </Link>
                            </div>

                            {/* Quick Install Terminal */}
                            <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden font-mono text-sm shadow-xl shadow-black/50">
                                <div className="bg-[#21262d] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-slate-400">
                                    <span>Quick Install</span>
                                </div>
                                <div className="p-6 overflow-x-auto whitespace-pre">
                                    <span className="text-slate-500">$</span>{' '}
                                    <span className="text-blue-400">git</span>{' '}
                                    <span className="text-slate-200">clone {project.githubUrl}.git</span>
                                    <br />
                                    <span className="text-slate-500">$</span>{' '}
                                    <span className="text-blue-400">cd</span>{' '}
                                    <span className="text-slate-200">{project.name.toLowerCase().replace(/ /g, '-')}</span>
                                    <br />
                                    <span className="text-slate-500">$</span>{' '}
                                    <span className="text-green-400">npm</span>{' '}
                                    <span className="text-slate-200">install</span>
                                    <br />
                                    <span className="text-slate-500">$</span>{' '}
                                    <span className="text-green-400">npm</span>{' '}
                                    <span className="text-slate-200">run start</span>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="border border-[#30363d] rounded-xl bg-[#0d1117] overflow-hidden">
                                <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] font-semibold text-slate-200 flex items-center gap-2">
                                    <BookOpen size={16} /> Key Features
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-4">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-300">
                                                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Screenshots */}
                            {project.screenshots.length > 0 && (
                                <div className="border border-[#30363d] rounded-xl overflow-hidden">
                                    <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] font-semibold text-slate-200">
                                        Preview
                                    </div>
                                    <div className="p-1 max-h-[500px] overflow-hidden bg-[#0d1117]">
                                        <img src={project.screenshots[0]} alt="Project Preview" className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="pb-6 border-b border-[#21262d]">
                                <h3 className="font-semibold text-slate-200 mb-4">About</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <Link href={project.githubUrl || "#"} className="flex flex-col items-center gap-1 group">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#21262d] rounded-lg border border-[#30363d] text-sm font-semibold text-slate-300 hover:text-white cursor-pointer hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
                                        <Github size={16} /> View on GitHub
                                    </button>
                                </Link>
                            </div>

                            <div className="pb-6 border-b border-[#21262d]">
                                <h3 className="font-semibold text-slate-200 mb-4 text-sm">Details</h3>
                                <dl className="space-y-3 text-sm text-slate-400 font-mono">
                                    <div className="flex justify-between">
                                        <dt>License</dt>
                                        <dd className="text-blue-400">{project.license}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Version</dt>
                                        <dd>{project.version}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Downloads</dt>
                                        <dd>{project.downloads}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-200 mb-4 text-sm">Languages & Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.platforms.map(lang => (
                                        <span key={lang} className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 bg-[#21262d] px-2.5 py-1 rounded-full border border-[#30363d]">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
